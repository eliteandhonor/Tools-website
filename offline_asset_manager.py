import json
import hashlib
import sys
from pathlib import Path
from urllib.parse import urlparse
from zipfile import ZipFile, ZIP_DEFLATED

import requests
import typer
from rich.console import Console
from rich.progress import (
    Progress,
    SpinnerColumn,
    BarColumn,
    DownloadColumn,
    TransferSpeedColumn,
    TimeRemainingColumn,
)
from tkinter import Tk, filedialog, messagebox, StringVar, BooleanVar, ttk

app = typer.Typer(add_completion=False)
console = Console()

BUILT_IN_ASSETS = [
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
    "https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js",
]


def sha256sum(path: Path) -> str:
    hash_obj = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            hash_obj.update(chunk)
    return hash_obj.hexdigest()


def ensure_head_ok(session: requests.Session, url: str) -> int:
    resp = session.head(url, allow_redirects=True, timeout=10)
    if resp.status_code != 200:
        raise RuntimeError(f"HEAD {resp.status_code}")
    return int(resp.headers.get("content-length", 0))


def download_file(
    session: requests.Session,
    url: str,
    dest: Path,
    output_dir: Path,
    verify_only: bool,
    manifest: dict,
    *,
    progress: Progress | None = None,
    task: int | None = None,
    size: int = 0,
) -> None:
    if size == 0:
        size = ensure_head_ok(session, url)
    else:
        ensure_head_ok(session, url)
    rel = dest.relative_to(output_dir)
    if verify_only:
        if not dest.exists():
            raise FileNotFoundError(dest)
        if manifest.get(str(rel)) != sha256sum(dest):
            raise RuntimeError(f"Hash mismatch for {dest}")
        return
    if dest.exists() and manifest.get(str(rel)) == sha256sum(dest):
        console.log(f"Using cached {rel}")
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    resp = session.get(url, stream=True, timeout=10)
    resp.raise_for_status()
    with dest.open("wb") as f:
        for chunk in resp.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)
                if progress and task is not None:
                    progress.update(task, advance=len(chunk))
    manifest[str(rel)] = sha256sum(dest)


def build_manifest(asset_urls, output_dir: Path, verify_only: bool) -> dict:
    session = requests.Session()
    manifest_path = output_dir / "manifest.json"
    manifest = {}
    if manifest_path.exists():
        try:
            manifest = json.loads(manifest_path.read_text())
        except Exception:
            console.print("[yellow]Warning: manifest corrupted; rebuilding[/yellow]")
            manifest = {}
    progress = Progress(
        SpinnerColumn(),
        "[progress.description]{task.description}",
        BarColumn(),
        DownloadColumn(),
        TransferSpeedColumn(),
        TimeRemainingColumn(),
        console=console,
    )
    with progress:
        for url in asset_urls:
            parsed = urlparse(url)
            dest = output_dir / parsed.netloc / parsed.path.lstrip("/")
            size = ensure_head_ok(session, url)
            if verify_only:
                console.log(f"Verifying {url}")
                download_file(session, url, dest, output_dir, True, manifest)
            else:
                task = progress.add_task(f"{parsed.path.split('/')[-1]}", total=size or None)
                download_file(
                    session,
                    url,
                    dest,
                    output_dir,
                    False,
                    manifest,
                    progress=progress,
                    task=task,
                    size=size,
                )
    manifest_path.write_text(json.dumps(manifest, indent=2))
    return manifest


def create_zip(output_dir: Path) -> None:
    zip_path = output_dir.with_suffix(".zip")
    console.log(f"Creating {zip_path.name}")
    with ZipFile(zip_path, "w", ZIP_DEFLATED) as zf:
        for file in output_dir.rglob("*"):
            if file.is_file():
                zf.write(file, file.relative_to(output_dir))


def run_manager(
    config: Path | None, output: Path, verify_only: bool, zip_output: bool
) -> None:
    assets = BUILT_IN_ASSETS.copy()
    if config and config.exists():
        console.log(f"Loading config {config}")
        data = json.loads(config.read_text())
        assets.extend(data.get("assets", []))
    output.mkdir(parents=True, exist_ok=True)
    console.print(f"[bold]Processing {len(assets)} assets[/bold]")
    build_manifest(assets, output, verify_only)
    if zip_output and not verify_only:
        create_zip(output)


@app.command()
def main(
    config: Path = typer.Option(None, help="Path to config JSON"),
    output: Path = typer.Option(Path("assets_offline"), help="Destination directory"),
    verify_only: bool = typer.Option(False, help="Only verify URLs and existing files"),
    zip_output: bool = typer.Option(False, help="Create ZIP archive of output"),
    headless: bool = typer.Option(False, help="Run without launching the GUI"),
):
    if not headless and len(sys.argv) == 1:
        launch_gui()
        raise typer.Exit()
    try:
        run_manager(config, output, verify_only, zip_output)
    except Exception as exc:
        console.print(f"[red]Error: {exc}[/red]")
        raise typer.Exit(code=1)


class GUI:
    def __init__(self) -> None:
        self.root = Tk()
        self.root.title("Offline CDN Asset Manager")
        self.config_path = StringVar()
        self.output_dir = StringVar(value=str(Path("assets_offline")))
        self.verify_only = BooleanVar()
        self.zip_output = BooleanVar()
        self.build()

    def browse_config(self):
        path = filedialog.askopenfilename(filetypes=[("JSON files", "*.json")])
        if path:
            self.config_path.set(path)

    def browse_output(self):
        path = filedialog.askdirectory()
        if path:
            self.output_dir.set(path)

    def run(self):
        try:
            run_manager(
                Path(self.config_path.get()) if self.config_path.get() else None,
                Path(self.output_dir.get()),
                self.verify_only.get(),
                self.zip_output.get(),
            )
            messagebox.showinfo("Completed", "Operation finished successfully")
        except Exception as exc:
            messagebox.showerror("Error", str(exc))

    def build(self):
        frm = ttk.Frame(self.root, padding=10)
        frm.pack(fill="both", expand=True)

        ttk.Label(frm, text="Config file:").grid(column=0, row=0, sticky="w")
        ttk.Entry(frm, textvariable=self.config_path, width=40).grid(column=1, row=0, sticky="ew")
        ttk.Button(frm, text="Browse", command=self.browse_config).grid(column=2, row=0)

        ttk.Label(frm, text="Output directory:").grid(column=0, row=1, sticky="w")
        ttk.Entry(frm, textvariable=self.output_dir, width=40).grid(column=1, row=1, sticky="ew")
        ttk.Button(frm, text="Browse", command=self.browse_output).grid(column=2, row=1)

        ttk.Checkbutton(frm, text="Verify only", variable=self.verify_only).grid(column=0, row=2, columnspan=2, sticky="w")
        ttk.Checkbutton(frm, text="Zip output", variable=self.zip_output).grid(column=0, row=3, columnspan=2, sticky="w")

        ttk.Button(frm, text="Run", command=self.run).grid(column=0, row=4, pady=5)
        ttk.Button(frm, text="Quit", command=self.root.destroy).grid(column=1, row=4, pady=5)
        frm.columnconfigure(1, weight=1)

    def start(self):
        self.root.mainloop()


def launch_gui():
    GUI().start()


if __name__ == "__main__":
    app()
