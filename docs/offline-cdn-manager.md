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

## Example output

Running without options downloads the built-in assets and shows progress bars:

```
Processing 3 assets
⠸ bootstrap.min.css       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 232.8/? kB 245.6 MB/s
⠸ bootstrap.bundle.min.js ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 80.7/? kB  128.4 MB/s
⠸ jquery.min.js           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 87.5/? kB  119.4 MB/s
```
