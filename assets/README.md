Image organization

-- assets/images/header-backgrounds/ : Put the hero background image here. The site uses a single header image named `Dragonfly_HeaderBackground.jpg` by default and `css/styles.css` points at `assets/images/header-backgrounds/Dragonfly_HeaderBackground.jpg`.
- assets/images/experiences/ : Put logos, gifs, and profile images used on the experience cards and pages here.

Quick steps to move existing files (Windows PowerShell):
1. From the repository root run: 
   powershell -ExecutionPolicy Bypass -File .\tools\move-images.ps1

Manual fallback: You can also manually move `Dragonfly_HeaderBackground.jpg` into `assets/images/header-backgrounds/` and update `css/styles.css` if needed.
