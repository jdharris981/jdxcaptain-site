# Backend Proxy Setup - Quick Start

The backend proxy is already configured! Just follow these steps:

## Prerequisites: Install Node.js

**If you see "command not found" for npm, you need to install Node.js first:**

### Quick Install (Easiest):
1. Go to: https://nodejs.org/
2. Download the **LTS version** for macOS
3. Run the installer
4. Restart your terminal

### Or use Homebrew:
```bash
brew install node
```

### Verify Installation:
```bash
node --version
npm --version
```

If both show version numbers, you're ready! See `INSTALL_NODE.md` for more details.

---

## Step 1: Install Dependencies

Open terminal in your project directory and run:

```bash
npm install
```

This will install:
- `express` - Web server
- `node-fetch` - For API calls
- `dotenv` - For environment variables
- `cors` - For CORS handling

## Step 2: Create .env File

Create a file named `.env` in your project root with your Printful token:

```
PRINTFUL_API_KEY=Z3K1qN67Fo41UXptU96s3J8CzcRcWTd482IIhZcs
```

**Note:** The `.env` file is already in `.gitignore` so it won't be committed to git.

## Step 3: Start the Server

Run:

```bash
npm start
```

You should see:
```
🚀 Printful Proxy Server Running!
📡 Server: http://localhost:3000
📦 Products API: http://localhost:3000/api/printful/products
💚 Health Check: http://localhost:3000/api/health

📝 Open merch.html in your browser to see your products!
```

## Step 4: Open Your Merch Page

Open `merch.html` in your browser (or go to `http://localhost:3000/merch.html`)

Your Printful products should now load without CORS errors! 🎉

## Troubleshooting

### "Cannot find module" error
- Make sure you ran `npm install` first
- Check that `node_modules` folder exists

### "PRINTFUL_API_KEY not set" error
- Make sure `.env` file exists in the project root
- Check that the file contains: `PRINTFUL_API_KEY=your-token-here`
- Make sure there are no spaces around the `=` sign

### Port 3000 already in use
- Change the port in `server.js`: `const PORT = 3001;` (or any other port)
- Or stop the other process using port 3000

### Products not loading
- Check the server console for error messages
- Open browser console (F12) to see any errors
- Verify your Printful token is correct
- Make sure you have products in your Printful store

## What the Proxy Does

The proxy server:
- ✅ Handles CORS issues by proxying requests through your server
- ✅ Keeps your API token secure (not exposed to browser)
- ✅ Serves your static files (HTML, CSS, JS, images)
- ✅ Provides API endpoints for Printful products

## Production Deployment

For production, you can deploy this to:
- **Heroku** - Free tier available
- **Railway** - Free tier available  
- **Render** - Free tier available
- **DigitalOcean** - Paid but affordable
- **Your own server** - If you have one

Just make sure to set the `PRINTFUL_API_KEY` environment variable in your hosting platform.
