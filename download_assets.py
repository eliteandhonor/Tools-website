#!/usr/bin/env python3
"""
Offline‑Assets Downloader  v3
– Validates every mirror, auto‑retries the next one on failure
– Creates vendor/cdn & vendor/webfonts, overwriting existing files
– GUI: Tkinter check‑boxes (all ON by default)
"""

import os, urllib.request, ssl, tkinter as tk
from urllib.error import URLError, HTTPError
from tkinter import messagebox

# -------------------------------------------------------------------------
# Networking helpers
# -------------------------------------------------------------------------

ctx = ssl.create_default_context()
ctx.check_hostname = True
ctx.verify_mode = ssl.CERT_REQUIRED

def _try_head(url: str) -> bool:
    """Return True if HEAD (or small‑range GET) succeeds with 200."""
    req = urllib.request.Request(url, method="HEAD")
    try:
        with urllib.request.urlopen(req, timeout=15, context=ctx) as r:
            return 200 <= r.status < 300
    except (URLError, HTTPError):
        # Some CDNs disallow HEAD – fallback to GET first 1 KB.
        try:
            rng = urllib.request.Request(url, headers={"Range": "bytes=0-1023"})
            with urllib.request.urlopen(rng, timeout=15, context=ctx) as r:
                return 200 <= r.status < 400
        except Exception:
            return False

def _download(dest: str, mirrors: list[str]) -> tuple[bool, str]:
    """Save the first working mirror to *dest*.  Return (ok, url_used_or_err)."""
    os.makedirs(os.path.dirname(dest), exist_ok=True)

    for m in mirrors:
        if not _try_head(m):
            continue
        try:
            with urllib.request.urlopen(m, timeout=60, context=ctx) as resp, \
                 open(dest, "wb") as fh:
                fh.write(resp.read())
            return True, m
        except Exception as e:
            err = f"{type(e).__name__}: {e}"
            continue
    return False, "All mirrors failed"

# -------------------------------------------------------------------------
# Catalogue (mirrors are searched in the given order)
# -------------------------------------------------------------------------

ASSETS = {
    "Tailwind + DaisyUI": {
        "tailwind.js": (
            "vendor/cdn/tailwind.js",
            [
                "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
                "https://unpkg.com/@tailwindcss/browser@4",
            ],
        ),
        "daisyui.css": (
            "vendor/cdn/daisyui.css",
            [
                "https://cdn.jsdelivr.net/npm/daisyui@5/daisyui.css",
                "https://unpkg.com/daisyui@5/daisyui.css",
            ],
        ),
    },
    "Alpine (core + UI)": {
        "alpine.min.js": (
            "vendor/cdn/alpine.min.js",
            [
                "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js",
                "https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js",
            ],
        ),
        "alpine-ui.min.js": (
            "vendor/cdn/alpine-ui.min.js",
            [
                "https://cdn.jsdelivr.net/npm/@alpinejs/ui@3.x.x/dist/cdn.min.js",
                "https://unpkg.com/@alpinejs/ui@3.x.x/dist/cdn.min.js",
            ],
        ),
    },
    "AOS (Animate‑on‑Scroll)": {
        "aos.js": (
            "vendor/cdn/aos.js",
            [
                "https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js",
                "https://unpkg.com/aos@2.3.4/dist/aos.js",
            ],
        ),
        "aos.css": (
            "vendor/cdn/aos.css",
            [
                "https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css",
                "https://unpkg.com/aos@2.3.4/dist/aos.css",
            ],
        ),
    },
    "GSAP + ScrollTrigger": {
        "gsap.min.js": (
            "vendor/cdn/gsap.min.js",
            [
                "https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js",
                "https://unpkg.com/gsap@3.12.2/dist/gsap.min.js",
            ],
        ),
        "ScrollTrigger.min.js": (
            "vendor/cdn/ScrollTrigger.min.js",
            [
                "https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/ScrollTrigger.min.js",
                "https://unpkg.com/gsap@3.12.2/dist/ScrollTrigger.min.js",
            ],
        ),
    },
    "Font Awesome 6 (Free)": {
        "fontawesome.min.css": (
            "vendor/cdn/fontawesome.min.css",
            [
                "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/css/all.min.css",
                "https://unpkg.com/@fortawesome/fontawesome-free@6.7.2/css/all.min.css",
            ],
        ),
        "fa-solid-900.woff2": (
            "vendor/webfonts/fa-solid-900.woff2",
            [
                "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/webfonts/fa-solid-900.woff2",
                "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/webfonts/fa-solid-900.woff2",
            ],
        ),
        "fa-regular-400.woff2": (
            "vendor/webfonts/fa-regular-400.woff2",
            [
                "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/webfonts/fa-regular-400.woff2",
                "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/webfonts/fa-regular-400.woff2",
            ],
        ),
        "fa-brands-400.woff2": (
            "vendor/webfonts/fa-brands-400.woff2",
            [
                "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/webfonts/fa-brands-400.woff2",
                "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/webfonts/fa-brands-400.woff2",
            ],
        ),
    },
}

# -------------------------------------------------------------------------
# Tkinter GUI
# -------------------------------------------------------------------------

root = tk.Tk()
root.title("Offline‑Assets Downloader v3")

tk.Label(root, text="Select the asset groups to download:").pack(padx=10, pady=(10, 4), anchor="w")
frame = tk.Frame(root)
frame.pack(padx=10, anchor="w")

vars = {grp: tk.IntVar(value=1) for grp in ASSETS}
for g, v in vars.items():
    tk.Checkbutton(frame, text=g, variable=v).pack(anchor="w")

def run():
    btn.config(state=tk.DISABLED)
    outcome = []
    for grp, ch in vars.items():
        if not ch.get():
            continue
        ok, fail = [], []
        for label, (dest, mirrors) in ASSETS[grp].items():
            success, info = _download(dest, mirrors)
            (ok if success else fail).append(f"{label}  ←  {info if success else ''}")
        outcome.append((grp, ok, fail))

    lines = []
    for grp, ok, fail in outcome:
        lines.append(f"{grp}:  {len(ok)} OK, {len(fail)} failed")
        lines += [f"   ✗ {f}" for f in fail] if fail else []

    (messagebox.showinfo if all(not f for _, _, f in outcome) else messagebox.showwarning)(
        "Download report", "\n".join(lines)
    )
    btn.config(state=tk.NORMAL)

btn = tk.Button(root, text="Download", command=run)
btn.pack(pady=10)

root.mainloop()
