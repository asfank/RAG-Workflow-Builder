// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


// Print Node version
console.log(`Hello Node.js v${process.versions.node}!`);

// Test that .env variables are being read
console.log('Supabase URL:', process.env.SUPABASE_URL);
console.log('Supabase Service Role Key:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Loaded ✅' : 'Missing ❌');
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Loaded ✅' : 'Missing ❌');
console.log(process.env)
app.post('/api/run-workflow', async (req, res) => {
  try {
    // your logic here
    res.json({ message: 'Workflow executed successfully!' });
  } catch (err) {
    console.error('Workflow error:', err);
    res.status(500).json({ error: 'Workflow failed' });
  }
});
