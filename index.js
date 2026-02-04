const http = require('http');
const PORT = process.env.PORT || 3000;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zoom Hackathon - Deploy to Render with OpenClaw</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background: #0a0a0a;
      color: #e0e0e0;
    }
    h1 { color: #2D8CFF; border-bottom: 2px solid #2D8CFF; padding-bottom: 10px; }
    h2 { color: #4CAF50; margin-top: 30px; }
    code {
      background: #1a1a2e;
      padding: 2px 8px;
      border-radius: 4px;
      font-family: 'Monaco', 'Consolas', monospace;
      color: #00ff88;
    }
    pre {
      background: #1a1a2e;
      padding: 15px;
      border-radius: 8px;
      overflow-x: auto;
      border-left: 4px solid #2D8CFF;
    }
    pre code { padding: 0; background: none; }
    .step {
      background: #16213e;
      padding: 20px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .step-num {
      display: inline-block;
      background: #2D8CFF;
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      text-align: center;
      line-height: 30px;
      margin-right: 10px;
      font-weight: bold;
    }
    .warning {
      background: #3d2914;
      border-left: 4px solid #ff9800;
      padding: 15px;
      margin: 15px 0;
      border-radius: 0 8px 8px 0;
    }
    a { color: #2D8CFF; }
    .logo { font-size: 2em; margin-right: 10px; }
    .header { display: flex; align-items: center; margin-bottom: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <span class="logo">🚀</span>
    <h1>Deploy to Render with OpenClaw</h1>
  </div>
  
  <p>Welcome, Zoom Hackathon participants! This guide shows you how to use <strong>OpenClaw</strong> (your AI agent) to deploy Node.js or Python projects to <strong>Render.com</strong>.</p>

  <h2>Prerequisites</h2>
  <ul>
    <li>OpenClaw installed and running</li>
    <li>A <a href="https://render.com" target="_blank">Render.com</a> account</li>
    <li>A GitHub repository with your project</li>
  </ul>

  <h2>Setup Steps</h2>

  <div class="step">
    <span class="step-num">1</span>
    <strong>Get your Render API Key</strong>
    <p>Go to <a href="https://dashboard.render.com/u/settings/api-keys" target="_blank">Render Dashboard → Account Settings → API Keys</a></p>
    <p>Click <strong>"Create API Key"</strong> and copy it.</p>
  </div>

  <div class="step">
    <span class="step-num">2</span>
    <strong>Add the API Key to OpenClaw</strong>
    <p>Tell your OpenClaw agent:</p>
    <pre><code>"Save this Render API key to my .env file: rnd_YOUR_API_KEY_HERE"</code></pre>
    <p>Or manually add to your workspace <code>.env</code> file:</p>
    <pre><code>RENDER_API_KEY=rnd_YOUR_API_KEY_HERE</code></pre>
  </div>

  <div class="step">
    <span class="step-num">3</span>
    <strong>Get your Render Owner ID</strong>
    <p>Ask OpenClaw:</p>
    <pre><code>"List my Render workspaces"</code></pre>
    <p>It will run:</p>
    <pre><code>curl -s -H "Authorization: Bearer $RENDER_API_KEY" \\
  "https://api.render.com/v1/owners" | jq '.[].owner'</code></pre>
    <p>Note down the <code>id</code> of your workspace (starts with <code>tea-</code> or <code>usr-</code>).</p>
  </div>

  <div class="step">
    <span class="step-num">4</span>
    <strong>Deploy your project!</strong>
    <p>Simply ask OpenClaw:</p>
    <pre><code>"Deploy my project at ~/myapp to Render"</code></pre>
    <p>OpenClaw will:</p>
    <ol>
      <li>Push your code to GitHub (if needed)</li>
      <li>Create a new Render service via API</li>
      <li>Monitor deployment until it's live</li>
      <li>Give you the URL</li>
    </ol>
  </div>

  <h2>Example Commands</h2>
  
  <p><strong>Deploy a Node.js app:</strong></p>
  <pre><code>"Deploy my Express app to Render with npm start"</code></pre>

  <p><strong>Deploy a Python app:</strong></p>
  <pre><code>"Deploy my Flask app to Render with python app.py"</code></pre>

  <p><strong>Check deployment status:</strong></p>
  <pre><code>"What's the status of my Render deployments?"</code></pre>

  <p><strong>List all services:</strong></p>
  <pre><code>"List all my Render services"</code></pre>

  <div class="warning">
    <strong>⚠️ Important:</strong> Render's free tier sleeps after 15 minutes of inactivity. The first request after sleeping takes ~30 seconds to wake up.
  </div>

  <h2>Useful Links</h2>
  <ul>
    <li><a href="https://docs.render.com" target="_blank">Render Documentation</a></li>
    <li><a href="https://developers.zoom.us" target="_blank">Zoom Developer Platform</a></li>
    <li><a href="https://api-docs.render.com" target="_blank">Render API Reference</a></li>
    <li><a href="https://docs.openclaw.ai" target="_blank">OpenClaw Documentation</a></li>
  </ul>

  <hr style="border-color: #333; margin: 40px 0;">
  <p style="color: #666; font-size: 0.9em;">
    Built with 💠 by Cortana | Zoom Hackathon 2026
  </p>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/api' || req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      message: 'Zoom Hackathon - OpenClaw Render Deployment Guide',
      timestamp: new Date().toISOString()
    }));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }
});

server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
