Folders:
- header-backgrounds/: place the hero background image here. The site uses a single header image named `HeaderBackground.jpg` by default.
- experiences/: place images used on experience cards and pages (logos, gifs, profile images).

How to change the hero background image:
- Option A (quick): Edit `css/styles.css` and change the `--header-image` variable inside :root to point to the new image path (relative to the CSS file), e.g. `--header-image: '../assets/images/header-backgrounds/MyHeader.jpg';`
-- Option B (file replace): Put a new image file named `HeaderBackground.jpg` in `assets/images/header-backgrounds/` to replace the default background.

The `index.html` and experience pages now reference images from `assets/images/experiences/` to keep media organized.
