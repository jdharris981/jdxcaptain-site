# Printful Integration Setup Guide

## Quick Start

### Step 1: Get Your Printful API Key

1. Log in to your [Printful Dashboard](https://www.printful.com/dashboard)
2. Go to **Settings** → **API**
3. Click **"Generate API key"** or use your existing key
4. Copy the API key (it looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Step 2: Configure Your API Key

1. Open `config.js` in your project
2. Replace `YOUR_PRINTFUL_API_KEY_HERE` with your actual API key:

```javascript
const PRINTFUL_CONFIG = {
  API_KEY: 'your-actual-api-key-here', // ← Paste your key here
  STORE_ID: null,
  API_BASE_URL: 'https://api.printful.com'
};
```

3. Save the file

### Step 3: Test the Integration

1. Open `merch.html` in your browser (or use your local server)
2. The page should automatically load your products from Printful
3. If you see an error, check the browser console (F12) for details

## Troubleshooting

### "API Key Not Configured" Error

- Make sure `config.js` exists and contains your API key
- Check that the API key is not wrapped in quotes incorrectly
- Verify the file is in the same directory as `merch.html`

### "No Products Found" Error

- Make sure you have created product templates in your Printful dashboard
- Go to **Printful Dashboard** → **Products** → **Add Product**
- Create at least one product template
- Wait a few seconds and refresh the merch page

### CORS Error (Cross-Origin Request Blocked)

**This is expected!** Printful API doesn't allow direct browser requests due to CORS security.

**Solutions:**

#### Option 1: Use a Backend Proxy (Recommended for Production)

Create a simple backend endpoint that proxies requests to Printful:

**Node.js Example:**
```javascript
// server.js (using Express)
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.static('.')); // Serve static files

app.get('/api/printful/products', async (req, res) => {
  try {
    const response = await fetch('https://api.printful.com/store/products', {
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

Then update `merch.html` to use `/api/printful/products` instead of direct Printful API.

#### Option 2: Use Netlify Functions (Free Hosting)

1. Deploy to Netlify
2. Create `netlify/functions/printful.js`:

```javascript
exports.handler = async (event, context) => {
  const response = await fetch('https://api.printful.com/store/products', {
    headers: {
      'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
};
```

3. Set `PRINTFUL_API_KEY` in Netlify environment variables

#### Option 3: Use Printful Store Widget (Easiest)

Instead of API integration, embed Printful's store widget:

1. In Printful Dashboard, go to **Stores** → **Create Store**
2. Choose **"Storefront"** option
3. Get your store URL
4. Embed it in your merch page or redirect to it

### "Error Loading Products" Error

- Check your API key is correct
- Verify you have products in your Printful store
- Check browser console for detailed error messages
- Make sure your Printful account is active

## Security Notes

⚠️ **Important:** Never commit `config.js` to git! It contains your API key.

- `config.js` is already in `.gitignore`
- Use `config.js.example` as a template for others
- For production, use environment variables or a backend proxy

## Next Steps

1. ✅ Add your API key to `config.js`
2. ✅ Test loading products
3. ✅ Set up backend proxy (if needed for production)
4. ✅ Customize product display (if needed)
5. ✅ Set up cart/checkout functionality

## Cart Functionality

Currently, the "Add to Cart" button shows a message. To enable full cart functionality:

1. **Option A:** Set up a Printful store and redirect to it
2. **Option B:** Implement a shopping cart with backend integration
3. **Option C:** Use Printful's embedded store widget

## Need Help?

- [Printful API Documentation](https://developers.printful.com/)
- [Printful Support](https://www.printful.com/help)
- Check browser console (F12) for detailed error messages
