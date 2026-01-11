// Backend Proxy Server for Printful API
// This solves CORS issues by proxying requests through your server
// 
// Setup:
// 1. Install dependencies: npm install
// 2. Create .env file with: PRINTFUL_API_KEY=your-token-here
// 3. Run: npm start
// 4. Open merch.html in browser - it will automatically use the proxy

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files (your HTML, CSS, JS, images)
app.use(express.static('.'));

// Proxy endpoint to get stores (for debugging)
app.get('/api/printful/stores', async (req, res) => {
  try {
    const apiKey = process.env.PRINTFUL_API_KEY || req.query.token;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'PRINTFUL_API_KEY not set' 
      });
    }

    console.log('Fetching stores from Printful...');
    
    const response = await fetch('https://api.printful.com/stores', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Printful API error:', response.status, errorText.substring(0, 200));
      return res.status(response.status).json({ 
        error: `Printful API error: ${response.status}`,
        details: errorText.substring(0, 500)
      });
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response received:', text.substring(0, 200));
      return res.status(500).json({ 
        error: 'API returned non-JSON response',
        contentType: contentType,
        preview: text.substring(0, 500)
      });
    }

    const data = await response.json();
    console.log(`Found ${data.result?.length || 0} stores`);
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for Printful products list
app.get('/api/printful/products', async (req, res) => {
  try {
    const apiKey = process.env.PRINTFUL_API_KEY || req.query.token;
    const storeId = req.query.store_id; // Optional store ID
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'PRINTFUL_API_KEY not set. Add it to .env file or pass as ?token=xxx' 
      });
    }

    // Try default store first (the one linked to the API token)
    // This is the recommended approach - the token is automatically linked to a store
    let apiUrl = 'https://api.printful.com/store/products';
    let targetStoreId = storeId || process.env.PRINTFUL_STORE_ID;
    
    console.log('Fetching products from default store (linked to API token)');
    console.log(`API URL: ${apiUrl}`);
    
    // Note: If you need a specific store, use: /stores/{id}/products
    // But the token must be linked to that store
    
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Printful API error:', response.status, errorText.substring(0, 200));
      return res.status(response.status).json({ 
        error: `Printful API error: ${response.status}`,
        details: errorText.substring(0, 500)
      });
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response received:', text.substring(0, 200));
      return res.status(500).json({ 
        error: 'API returned non-JSON response',
        contentType: contentType,
        preview: text.substring(0, 500)
      });
    }

    const data = await response.json();
    console.log(`Successfully fetched ${data.result?.length || 0} products`);
    if (data.result && data.result.length > 0) {
      console.log('First product:', JSON.stringify(data.result[0], null, 2).substring(0, 300));
    }
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for individual product details
app.get('/api/printful/products/:id', async (req, res) => {
  try {
    const apiKey = process.env.PRINTFUL_API_KEY || req.query.token;
    const productId = req.params.id;
    const storeId = req.query.store_id || process.env.PRINTFUL_STORE_ID || '17521480';

    if (!apiKey) {
      return res.status(500).json({ 
        error: 'PRINTFUL_API_KEY not set' 
      });
    }

    const externalId = req.query.external_id;
    console.log(`Fetching product ${productId} details (external_id: ${externalId}) from store ${storeId}...`);

    let response;
    
    // Try 1: Store-specific product endpoint
    response = await fetch(`https://api.printful.com/stores/${storeId}/products/${productId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Try 2: If that fails and we have external_id, try sync_product by external_id
    if (!response.ok && externalId) {
      console.log('Store product endpoint failed, trying sync_product by external_id...');
      response = await fetch(`https://api.printful.com/sync/products/${externalId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Try 3: If still fails, try sync_product by product ID
    if (!response.ok && response.status === 404) {
      console.log('Trying sync_product endpoint with product ID...');
      response = await fetch(`https://api.printful.com/sync/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ 
        error: `Printful API error: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Printful proxy server is running',
    hasApiKey: !!process.env.PRINTFUL_API_KEY
  });
});

app.listen(PORT, () => {
  console.log('\n🚀 Printful Proxy Server Running!');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/printful/products`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`\n📝 Open merch.html in your browser to see your products!`);
  console.log(`⚠️  Make sure PRINTFUL_API_KEY is set in .env file\n`);
});
