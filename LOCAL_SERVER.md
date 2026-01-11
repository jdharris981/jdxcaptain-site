# Running a Local Server to Preview the Site

## Quick Start (Recommended)

### Option 1: Python HTTP Server (Most Common)
```bash
# Navigate to the project directory
cd "/Users/jharris6/Desktop/RB/Cursor Projects/jdxcaptain-site"

# Start the server
python3 -m http.server 8000
```

Then open your browser and go to: **http://localhost:8000**

### Option 2: Node.js http-server
If you have Node.js installed:
```bash
# Install http-server globally (one time only)
npm install -g http-server

# Navigate to project directory
cd "/Users/jharris6/Desktop/RB/Cursor Projects/jdxcaptain-site"

# Start the server
http-server -p 8000
```

### Option 3: PHP Built-in Server
If you have PHP installed:
```bash
cd "/Users/jharris6/Desktop/RB/Cursor Projects/jdxcaptain-site"
php -S localhost:8000
```

### Option 4: VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Why Use a Local Server?

Opening HTML files directly in a browser (`file://`) can cause issues with:
- Loading local assets (fonts, images)
- CORS restrictions
- Relative paths
- JavaScript modules

A local server simulates how the site will work when hosted online.

## Stopping the Server

Press `Ctrl + C` in the terminal where the server is running.

## Troubleshooting

- **Port already in use?** Try a different port: `python3 -m http.server 8080`
- **Can't access localhost?** Make sure the server is running and check the terminal for the correct URL
- **Assets not loading?** Verify the `assets/` folder structure matches the paths in `index.html`
