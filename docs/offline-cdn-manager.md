# Offline CDN Asset Manager

This Python utility downloads JavaScript and CSS libraries so the site can run fully offline. It works on Windows and offers both a command line interface and a simple Tkinter GUI. Assets are saved locally and a manifest file tracks SHA-256 hashes for quick verification.

## Features
- **Offline availability** – Mirror CDN files and their dependencies (fonts, images) into a local folder.
- **Online/offline switching** – Map CDN URLs to local copies so pages use local files when offline.
- **Integrity checks** – Performs HEAD requests before downloading and verifies file hashes.
- **Custom asset packs** – Accepts a JSON config to define additional libraries to fetch.
- **ZIP packaging** – Can bundle the output directory into a single archive when finished.

## Command line usage
```
python offline_asset_manager.py [options]
```
- `--config <file>` – Path to a JSON configuration file of asset definitions.
- `--output <folder>` – Destination directory for downloaded files.
- `--verify-only` – Check URLs and existing files without downloading.
- `--zip-output` – Create a ZIP archive of the downloaded assets.
- `--headless` – Run without launching the Tkinter GUI.

Run the script with `-h` to see all options. When launched without arguments the GUI opens by default.

### Manifest format

After a successful run the tool writes a `manifest.json` file inside the output directory. This file maps each downloaded path to its SHA-256 hash:

```json
{
  "cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css": "1d6bf3...",
  "cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js": "9a2215..."
}
```

### ZIP output

If you pass `--zip-output`, the entire output folder is also archived as `<output>.zip`. Using the default output directory this creates `assets_offline.zip` alongside the folder and `manifest.json`.
