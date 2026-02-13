const http = require('http');
const PORT = process.env.PORT || 3000;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zoom @ Stanford TreeHacks - Deploy Guide</title>
  <meta name="description" content="Guide for humans and LLMs: Deploy Node.js/Python projects to Render using OpenClaw AI agent.">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0b0b0f;
      color: #fff;
      min-height: 100vh;
    }
    
    /* Zoom-style header */
    .header {
      background: linear-gradient(180deg, #0b0b0f 0%, #131318 100%);
      border-bottom: 1px solid #2a2a35;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .zoom-logo {
      width: 40px;
      height: 40px;
      background: #2D8CFF;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 18px;
    }
    .header-title {
      font-size: 18px;
      font-weight: 600;
    }
    .header-subtitle {
      font-size: 13px;
      color: #8a8a9a;
    }
    
    /* Main layout */
    .container {
      display: flex;
      min-height: calc(100vh - 73px);
    }
    
    /* Zoom-style sidebar */
    .sidebar {
      width: 240px;
      background: #131318;
      border-right: 1px solid #2a2a35;
      padding: 16px 0;
      flex-shrink: 0;

      /* Keep the left nav anchored while scrolling */
      position: sticky;
      top: 0;
      align-self: flex-start;
      height: calc(100vh - 73px);
      overflow-y: auto;
    }
    .nav-item {
      padding: 12px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      color: #8a8a9a;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
      text-decoration: none;
    }
    .nav-item:hover, .nav-item.active {
      background: #1e1e28;
      color: #fff;
      text-decoration: none;
    }
    .nav-item.active {
      border-left: 3px solid #2D8CFF;
      padding-left: 17px;
    }
    .nav-icon {
      width: 20px;
      text-align: center;
    }
    
    /* Main content */
    .main {
      flex: 1;
      padding: 32px 40px;
      overflow-y: auto;
      max-width: 900px;
    }
    
    h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    h2 {
      font-size: 20px;
      font-weight: 600;
      margin: 32px 0 16px;
      color: #2D8CFF;
    }
    h3 {
      font-size: 16px;
      font-weight: 600;
      margin: 24px 0 12px;
    }
    p {
      color: #b4b4c4;
      line-height: 1.6;
      margin-bottom: 12px;
    }
    
    /* Zoom-style cards */
    .card {
      background: #1a1a24;
      border: 1px solid #2a2a35;
      border-radius: 12px;
      padding: 20px;
      margin: 16px 0;
    }
    .card-highlight {
      border-color: #2D8CFF;
      background: linear-gradient(135deg, #1a1a24 0%, #1a2030 100%);
    }
    .card-warning {
      border-color: #ff9800;
      background: linear-gradient(135deg, #1a1a24 0%, #2a2010 100%);
    }
    
    /* Code blocks */
    pre {
      background: #0d0d12;
      border: 1px solid #2a2a35;
      border-radius: 8px;
      padding: 16px;
      overflow-x: auto;
      font-family: 'SF Mono', Monaco, Consolas, monospace;
      font-size: 13px;
      line-height: 1.5;
    }
    code {
      color: #7dd3fc;
    }
    .code-comment { color: #6a6a7a; }
    
    /* Zoom-style buttons */
    .btn {
      background: #2D8CFF;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }
    .btn:hover {
      background: #1a7ae8;
    }
    
    /* Steps */
    .step {
      display: flex;
      gap: 16px;
      margin: 20px 0;
    }
    .step-num {
      width: 32px;
      height: 32px;
      background: #2D8CFF;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      flex-shrink: 0;
    }
    .step-content {
      flex: 1;
    }
    .step-title {
      font-weight: 600;
      margin-bottom: 8px;
    }
    
    /* Skills table */
    .skills-table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
    }
    .skills-table td {
      padding: 12px;
      border-bottom: 1px solid #2a2a35;
      font-size: 14px;
    }
    .skills-table td:first-child {
      color: #2D8CFF;
      font-weight: 500;
      width: 160px;
    }
    .skills-table tr:hover {
      background: #1e1e28;
    }
    
    /* Links */
    a {
      color: #2D8CFF;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }

    /* Embedded chat */
    .embed {
      border: 1px solid #2a2a35;
      border-radius: 12px;
      overflow: hidden;
      background: #0d0d12;
      margin: 16px 0;
    }
    .embed iframe {
      width: 100%;
      height: 820px;
      border: 0;
      display: block;
    }
    
    /* Tag */
    .tag {
      background: #2D8CFF;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      margin-left: 8px;
    }
    
    /* Footer */
    .footer {
      text-align: center;
      padding: 32px;
      border-top: 1px solid #2a2a35;
      color: #6a6a7a;
      font-size: 13px;
    }
    .footer a {
      color: #8a8a9a;
    }
    
    /* Fun closing */
    .closing {
      background: linear-gradient(135deg, #1a2030 0%, #1a1a24 100%);
      border: 1px solid #2D8CFF;
      border-radius: 12px;
      padding: 32px;
      text-align: center;
      margin: 32px 0;
    }
    .closing-quote {
      font-size: 20px;
      margin-bottom: 16px;
    }
    .closing-slop {
      color: #ff9800;
      font-size: 13px;
      margin: 12px 0;
    }
    
    /* LLM note */
    .llm-note {
      background: #0d1a0d;
      border-left: 3px solid #4CAF50;
      padding: 12px 16px;
      margin: 16px 0;
      font-size: 13px;
      color: #a0d0a0;
    }
    
    @media (max-width: 768px) {
      .sidebar { display: none; }
      .main { padding: 20px; }
    }
  </style>
</head>
<body>
  <!-- 
  FOR LLMs: Key data in JSON at /llm endpoint
  Agent skills: https://github.com/tanchunsiong/agent-skills
  -->

  <header class="header">
    <div class="zoom-logo">Z</div>
    <div>
      <div class="header-title">Zoom @ Stanford TreeHacks</div>
      <div class="header-subtitle">Deploy to Render with OpenClaw</div>
    </div>
  </header>

  <div class="container">
    <nav class="sidebar">
      <a href="#getting-started" class="nav-item active"><span class="nav-icon">🚀</span> Getting Started</a>
      <a href="#agent-skills" class="nav-item"><span class="nav-icon">🧪</span> Agent Skills</a>
      <a href="#chat" class="nav-item"><span class="nav-icon">💬</span> Chat</a>
      <a href="#setup-steps" class="nav-item"><span class="nav-icon">⚙️</span> Setup Steps</a>
      <a href="#quick-reference" class="nav-item"><span class="nav-icon">📋</span> Quick Reference</a>
      <a href="#useful-links" class="nav-item"><span class="nav-icon">🔗</span> Useful Links</a>
    </nav>

    <main class="main">
      <h1 id="getting-started">Deploy to Render with OpenClaw</h1>
      <p>Welcome, TreeHacks participants! Use your AI agent to deploy Node.js or Python projects to Render.com.</p>

      <div class="llm-note">
        🤖 <strong>For LLMs:</strong> This page is designed for both humans and AI agents. 
        Hit <code>/llm</code> for pure JSON. Structured data in HTML comments.
      </div>

      <div class="card">
        <strong>ℹ️ This page runs on:</strong> Render Web Service (Node.js, free tier)<br>
        <strong>Port:</strong> process.env.PORT (auto-assigned) · <strong>Region:</strong> Oregon
      </div>

      <h2 id="agent-skills">🧪 Zoom Developer Agent Skills <span class="tag">NEW</span></h2>
      <p>Specialized skills to help your LLM build Zoom integrations faster:</p>
      <p><a href="https://github.com/tanchunsiong/agent-skills" style="font-size: 16px; font-weight: 600;">📦 github.com/tanchunsiong/agent-skills</a></p>

      <div class="card card-highlight">
        <strong>✅ Tested with:</strong>
        qwen/qwen3-coder-next · z-ai/glm-5 · anthropic opus 4.5 · gpt 5.2 · moonshotai/minimax-m2.5
      </div>
      
      <table class="skills-table">
        <tr><td>zoom-general</td><td>Hub skill - Core concepts, auth, OAuth flows, routing</td></tr>
        <tr><td>zoom-rest-api</td><td>600+ REST endpoints - Meetings, users, webinars, recordings</td></tr>
        <tr><td>zoom-meeting-sdk</td><td>Embed Zoom meetings in web apps (React, Vue, JS)</td></tr>
        <tr><td>zoom-video-sdk</td><td>Build custom video experiences with full UI control</td></tr>
        <tr><td>zoom-webhooks</td><td>Real-time event notifications</td></tr>
        <tr><td>zoom-websockets</td><td>Real-time WebSocket connections</td></tr>
        <tr><td>zoom-rtms</td><td>Real-Time Media Streams - Live audio, video, transcripts</td></tr>
        <tr><td>zoom-team-chat</td><td>Team Chat APIs - Channels, messages, bots</td></tr>
        <tr><td>zoom-apps-sdk</td><td>Build apps inside the Zoom client</td></tr>
        <tr><td>zoom-ui-toolkit</td><td>Pre-built UI components</td></tr>
      </table>

      <h2 id="chat">💬 Chat with the Skills</h2>
      <p>Try the interactive skill chat UI (hosted on Context7):</p>
      <p><a href="https://context7.com/tanchunsiong/agent-skills?tab=chat" target="_blank" rel="noopener">Open in a new tab</a> (recommended if embedding is blocked by your browser)</p>
      <div class="embed">
        <iframe src="https://context7.com/tanchunsiong/agent-skills?tab=chat" loading="lazy" referrerpolicy="no-referrer"></iframe>
      </div>

      <h3>How It Works</h3>
      <pre><code><span class="code-comment"># Ask your LLM, it loads the right skill:</span>
"Create a meeting via API"     → loads zoom-rest-api
"Embed Zoom in React"          → loads zoom-meeting-sdk
"Build a bot with transcripts" → loads zoom-rtms + zoom-meeting-sdk</code></pre>

      <h3>Quick Start (load skills)</h3>
      <pre><code>git clone https://github.com/tanchunsiong/agent-skills.git

<span class="code-comment"># Claude CLI (Claude Code):</span>
cp -r agent-skills/* ~/.claude/skills/

<span class="code-comment"># OpenCode:</span>
cp -r agent-skills/* ~/.config/opencode/skills/

<span class="code-comment"># Codex CLI:</span>
<span class="code-comment"># Codex doesn’t have a universal “skills folder” convention.</span>
<span class="code-comment"># Recommended: run the skills via OpenClaw (it can use Codex OAuth),</span>
<span class="code-comment"># or paste the relevant SKILL.md content into your Codex prompt.</span></code></pre>

      <h2 id="setup-steps">⚙️ Setup Steps</h2>

      <div class="step">
        <div class="step-num">1</div>
        <div class="step-content">
          <div class="step-title">Get your Render API Key</div>
          <p>Go to <a href="https://dashboard.render.com/u/settings/api-keys">Render Dashboard → Account Settings → API Keys</a></p>
        </div>
      </div>

      <div class="step">
        <div class="step-num">2</div>
        <div class="step-content">
          <div class="step-title">Add the API Key to your Agent</div>
          <pre><code><span class="code-comment"># Tell your agent:</span>
"Save this Render API key: rnd_YOUR_KEY_HERE"

<span class="code-comment"># Or add to .env:</span>
RENDER_API_KEY=rnd_YOUR_KEY_HERE</code></pre>
        </div>
      </div>

      <div class="step">
        <div class="step-num">3</div>
        <div class="step-content">
          <div class="step-title">Get your Owner ID</div>
          <pre><code>curl -H "Authorization: Bearer $RENDER_API_KEY" \\
  "https://api.render.com/v1/owners"</code></pre>
        </div>
      </div>

      <div class="step">
        <div class="step-num">4</div>
        <div class="step-content">
          <div class="step-title">Deploy!</div>
          <pre><code><span class="code-comment"># Just ask your agent:</span>
"Deploy my project to Render"</code></pre>
        </div>
      </div>

      <h2 id="quick-reference">📋 Quick Reference</h2>
      
      <div class="card">
        <h3>Node.js</h3>
        <pre><code>runtime: "node"
buildCommand: "npm install"
startCommand: "npm start"</code></pre>
      </div>

      <div class="card">
        <h3>Python</h3>
        <pre><code>runtime: "python"
buildCommand: "pip install -r requirements.txt"
startCommand: "python app.py"</code></pre>
      </div>

      <div class="card card-warning">
        <strong>⚠️ Free Tier:</strong> Sleeps after 15min inactivity. First request takes ~30s to wake.
      </div>

      <h2 id="useful-links">🔗 Useful Links</h2>
      <ul style="list-style: none; line-height: 2;">
        <li>🧪 <a href="https://github.com/tanchunsiong/agent-skills">Agent Skills (Beta)</a></li>
        <li>📹 <a href="https://developers.zoom.us">Zoom Developer Platform</a></li>
        <li>🚀 <a href="https://api-docs.render.com">Render API Reference</a></li>
        <li>📖 <a href="https://docs.render.com">Render Documentation</a></li>
        <li>🤖 <a href="https://docs.openclaw.ai">OpenClaw Documentation</a></li>
      </ul>

      <div class="closing">
        <div class="closing-quote">🤖 <em>"It's 2026 — of course your hackathon project needs an LLM."</em></div>
        <div class="closing-slop">
          (Yes, this webpage might be slop — but the <a href="https://github.com/tanchunsiong/agent-skills">agent skills</a> are not. We promise.)<br>
          <strong>Pro tip:</strong> Unlike this page, don't let your hackathon entry be sloppy. The judges aren't LLMs... yet.
        </div>
        <p style="margin-top: 16px;">
          We've done everything we can to make this smooth.<br>
          The skills are ready. The APIs are documented. The deploy button works.<br>
          Now build something amazing.
        </p>
        <p style="color: #4CAF50; font-weight: 600; margin-top: 16px;">
          🚀 Good luck at TreeHacks, and cheers to the Year of the LLM! 🎉
        </p>
      </div>

      <div class="card" style="text-align:center;">
        <div style="font-size:14px; color:#b4b4c4; margin-bottom:10px;">Mandatory cat tax</div>
        <img
          src="https://placekitten.com/640/360"
          alt="A cat"
          style="max-width:100%; height:auto; border-radius:12px; border:1px solid #2a2a35;"
          loading="lazy"
        />
      </div>

      <div class="footer">
        <p><strong>Created by Tan Chun Siong</strong></p>
        <p><a href="https://x.com/tanchunsiong">𝕏 @tanchunsiong</a> · <a href="https://linkedin.com/in/tanchunsiong">LinkedIn</a></p>
        <p style="margin-top: 12px;">Built with 💠 by Cortana | Zoom @ Stanford TreeHacks</p>
      </div>
    </main>
  </div>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/api' || req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      message: 'Zoom @ Stanford TreeHacks - OpenClaw Render Deployment Guide',
      agent_skills: 'https://github.com/tanchunsiong/agent-skills',
      tested_with: [
        'qwen/qwen3-coder-next',
        'z-ai/glm-5',
        'anthropic opus 4.5',
        'gpt 5.2',
        'moonshotai/minimax-m2.5'
      ],
      timestamp: new Date().toISOString()
    }));
  } else if (req.url === '/llm' || req.url === '/api/llm') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      guide: "Deploy to Render.com with OpenClaw",
      agent_skills_repo: "https://github.com/tanchunsiong/agent-skills",
      tested_with: [
        "qwen/qwen3-coder-next",
        "z-ai/glm-5",
        "anthropic opus 4.5",
        "gpt 5.2",
        "moonshotai/minimax-m2.5"
      ],
      render_api: {
        base_url: "https://api.render.com/v1",
        auth_header: "Authorization: Bearer <RENDER_API_KEY>",
        create_service: {
          method: "POST",
          endpoint: "/services",
          example_payload: {
            type: "web_service",
            name: "my-app",
            ownerId: "<from GET /owners>",
            repo: "https://github.com/user/repo",
            branch: "main",
            autoDeploy: "yes",
            serviceDetails: {
              runtime: "node",
              plan: "free",
              region: "oregon",
              envSpecificDetails: {
                buildCommand: "npm install",
                startCommand: "npm start"
              }
            }
          }
        }
      },
      runtimes: {
        node: { buildCommand: "npm install", startCommand: "npm start" },
        python: { buildCommand: "pip install -r requirements.txt", startCommand: "python app.py" }
      }
    }, null, 2));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }
});

server.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
