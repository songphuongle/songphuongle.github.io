# Le Tran Song Phuong - Portfolio

## Setup

**Requirements:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run locally:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Deployment to GitHub Pages

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Manual Setup (if needed):

1. Go to your repository Settings → Pages
2. Under "Source", select "GitHub Actions"
3. Push to the `main` or `master` branch to trigger deployment

The workflow will:
- Build the project
- Deploy the `dist` folder to GitHub Pages

### Important Notes:

- The base path is set to `/` for user/organization pages (username.github.io)
- If deploying to a project page, update `base` in `vite.config.ts` to `/repository-name/`
- All assets in the `public` folder are served from the root (e.g., `/logo/logo.png`)
