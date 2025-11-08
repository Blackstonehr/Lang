# View Pages Offline

You can now view all pages offline without needing the full development server!

## Quick Start

### Option 1: Use the Batch File (Windows)
Double-click `view-offline.bat` - it will build and serve the pages automatically.

### Option 2: Manual Commands
```bash
# Build the project
npm run build

# Start the static server
npm run serve
```

Then open your browser to:
- **Home**: http://localhost:3000/
- **Programs**: http://localhost:3000/programs  
- **Contact**: http://localhost:3000/contact

## What's Included

The static build includes:
- ✅ All React components and pages
- ✅ All CSS styles (Tailwind)
- ✅ All images
- ✅ Mock API data (for offline viewing)
- ✅ Client-side routing

## Files Created

- `dist/public/` - Built static files (HTML, CSS, JS, images)
- `serve-static.js` - Simple Node.js server for offline viewing
- `view-offline.bat` - Windows batch file for easy access

## Notes

- The static server includes mock program data so you can see the pages working
- Forms will submit but won't actually save data (mock responses)
- All pages work with client-side routing
- No database connection needed for viewing

## Stop the Server

Press `Ctrl+C` in the terminal where the server is running.

