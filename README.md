# Terminal Portfolio

A responsive single-page portfolio built with:

- `HTML`
- `CSS`
- vanilla `JavaScript`
- `WebTUI CSS`

## Run locally

Because this is a static site, you have a few easy options.

### Option 1: Open directly

Open `index.html` in your browser.

This works for most cases because the site is fully static.

### Option 2: Use a local server (recommended)

From the `portfolio` directory, run:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

### Option 3: VS Code Live Server

If you use VS Code:

1. Install the **Live Server** extension
2. Open the `portfolio` folder
3. Right-click `index.html`
4. Click **Open with Live Server**

## Deploy to GitHub Pages

This project is already structured for static hosting.

### 1. Push the project to GitHub

Create a repository, then push the contents of the `portfolio` folder.

### 2. Make sure these files are included

Important runtime files:

- `index.html`
- `styles.css`
- `script.js`
- `vendor/webtui.css`
- `assets/resume.txt` (or your real resume file)

> Note: The site uses `vendor/webtui.css`, so it does **not** depend on `node_modules` in production.

### 3. Enable GitHub Pages

In your GitHub repository:

1. Go to **Settings**
2. Open **Pages**
3. Under **Build and deployment**, choose:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Save

GitHub Pages will publish the site and give you a URL like:

```text
https://yourusername.github.io/your-repository-name/
```

## Personalization checklist

Before sending the site to recruiters, update:

- `Your Name`
- social links
- email address
- GitHub project URLs
- live demo URLs
- resume file
- timeline details
- certifications
- GitHub stats placeholders

## Replace the resume placeholder

The download button currently points to:

```text
assets/resume.txt
```

To use your real resume:

1. Add your file, for example `assets/resume.pdf`
2. Update the link in `index.html`

Example:

```html
<a href="./assets/resume.pdf" download>Download Résumé</a>
```
