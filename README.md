# Terminal Portfolio

A terminal-inspired, single-page portfolio built with:

- `HTML`
- `CSS`
- vanilla `JavaScript`
- `@webtui/css`

## Features

- Boot-screen intro animation
- Fixed top navbar and status bar
- Section-based workspace navigation
- Theme selector in the status bar
- Dynamic theme loading from `themes.json`
- Per-theme section border colors
- ANSI-style ASCII art hero header
- Project cards with image sidebars
- Responsive layout for smaller screens

## Project sections

- `home`
- `about`
- `skills`
- `projects`
- `contact`

## Notable projects

The portfolio currently highlights:

- **AeroScan** — aerial imagery analysis
- **CTF Platform** — infrastructure and security challenges
- **ModelGate** — backend/API work in progress

## Key files

- `index.html` — page structure
- `styles.css` — layout and theme styling
- `script.js` — navigation, boot screen, and theme loading
- `themes.json` — theme definitions and color mappings

## Assets

- `assets/AeroScan.png`
- `assets/CTFplatform.png`
- `assets/Resume.pdf`

## Run locally

Because this is a static site, you can open `index.html` directly in a browser.

For a better local experience, run a simple server from the `portfolio` directory:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Notes

- The site uses the CDN version of `@webtui/css` in `index.html`.
- Theme colors and section border colors are controlled through `themes.json`.
- The project image cards are implemented as reusable shared layouts in CSS.

## Customization

If you want to personalize the portfolio, update:

- your name and ASCII hero text in `index.html`
- social links and email address
- project descriptions and URLs
- `assets/resume.txt`
- `themes.json` if you want to add or tweak themes
