const http = require('http');
const PORT = process.env.PORT || 3000;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zoom @ Stanford TreeHacks - Deploy to Render with OpenClaw</title>
  <meta name="description" content="Guide for humans and LLMs: Deploy Node.js/Python projects to Render using OpenClaw AI agent. Includes beta agent skills for hackathon prototypes.">
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
    h3 { color: #9c27b0; }
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
    .llm-note {
      background: #1a2e1a;
      border-left: 4px solid #4CAF50;
      padding: 15px;
      margin: 15px 0;
      border-radius: 0 8px 8px 0;
    }
    .skills-box {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border: 2px solid #9c27b0;
      padding: 20px;
      border-radius: 12px;
      margin: 20px 0;
    }
    a { color: #2D8CFF; }
    .logo { font-size: 2em; margin-right: 10px; }
    .header { display: flex; align-items: center; margin-bottom: 20px; }
    .tag {
      display: inline-block;
      background: #9c27b0;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.8em;
      margin-left: 10px;
    }
  </style>
</head>
<body>
  <!-- 
  ===========================================
  FOR LLMs READING THIS PAGE:
  ===========================================
  This is a guide for deploying to Render.com using OpenClaw.
  
  KEY INFORMATION:
  - Render API endpoint: https://api.render.com/v1/services
  - Auth header: Authorization: Bearer <RENDER_API_KEY>
  - Required fields for web_service: name, ownerId, repo, branch, serviceDetails
  - serviceDetails must include: runtime, plan, envSpecificDetails
  - envSpecificDetails must include: buildCommand, startCommand
  
  AGENT SKILLS REPO: https://github.com/tanchunsiong/agent-skills
  - Contains beta skills for Zoom API, Render deployment, and more
  - Clone and add to your agent's skills directory
  
  EXAMPLE DEPLOY PAYLOAD:
  {
    "type": "web_service",
    "name": "my-service",
    "ownerId": "<your-owner-id>",
    "repo": "https://github.com/user/repo",
    "branch": "main",
    "autoDeploy": "yes",
    "serviceDetails": {
      "runtime": "node",
      "plan": "free",
      "region": "oregon",
      "envSpecificDetails": {
        "buildCommand": "npm install",
        "startCommand": "npm start"
      }
    }
  }
  ===========================================
  -->

  <div class="header">
    <span class="logo">🚀</span>
    <h1>Deploy to Render with OpenClaw</h1>
  </div>
  
  <div class="llm-note">
    <strong>🤖 For LLMs:</strong> This page is designed to be read by both humans and AI agents. Structured data and API details are included in HTML comments and clearly formatted sections below. See the page source for machine-readable deployment payloads.
  </div>

  <p>Welcome, Zoom @ Stanford TreeHacks participants! This guide shows you how to use <strong>OpenClaw</strong> (your AI agent) to deploy Node.js or Python projects to <strong>Render.com</strong>.</p>

  <div class="llm-note" style="background: #1a1a2e; border-left-color: #2D8CFF;">
    <strong>ℹ️ This page runs on:</strong> Render <strong>Web Service</strong> (Node.js runtime, free tier)<br>
    <strong>Port:</strong> Uses <code>process.env.PORT</code> (Render auto-assigns, typically 10000)<br>
    <strong>Region:</strong> Oregon (us-west)
  </div>

  <div class="skills-box">
    <h3>🧪 Zoom Developer Agent Skills <span class="tag">NEW</span></h3>
    <p>We've published specialized skills to help your LLM build Zoom integrations faster:</p>
    <p><a href="https://github.com/tanchunsiong/agent-skills" target="_blank" style="font-size: 1.2em; font-weight: bold;">
      📦 github.com/tanchunsiong/agent-skills
    </a></p>
    
    <h4 style="color: #4CAF50; margin-top: 20px;">Available Skills:</h4>
    <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
      <tr style="border-bottom: 1px solid #333;">
        <td style="padding: 8px;"><strong>zoom-general</strong></td>
        <td style="padding: 8px;">Hub skill - Core concepts, authentication, OAuth flows, use case routing</td>
      </tr>
      <tr style="border-bottom: 1px solid #333;">
        <td style="padding: 8px;"><strong>zoom-rest-api</strong></td>
        <td style="padding: 8px;">600+ REST API endpoints - Meetings, users, webinars, recordings, reports</td>
      </tr>
      <tr style="border-bottom: 1px solid #333;">
        <td style="padding: 8px;"><strong>zoom-meeting-sdk</strong></td>
        <td style="padding: 8px;">Embed Zoom meetings in web apps (React, Vue, vanilla JS)</td>
      </tr>
      <tr style="border-bottom: 1px solid #333;">
        <td style="padding: 8px;"><strong>zoom-video-sdk</strong></td>
        <td style="padding: 8px;">Build custom video experiences with full UI control</td>
      </tr>
      <tr style="border-bottom: 1px solid #333;">
        <td style="padding: 8px;"><strong>zoom-webhooks</strong></td>
        <td style="padding: 8px;">Real-time event notifications (meeting started, participant joined, etc.)</td>
      </tr>
      <tr style="border-bottom: 1px solid #333;">
        <td style="padding: 8px;"><strong>zoom-websockets</strong></td>
        <td style="padding: 8px;">Real-time WebSocket connections for live event streaming</td>
      </tr>
      <tr style="border-bottom: 1px solid #333;">
        <td style="padding: 8px;"><strong>zoom-rtms</strong></td>
        <td style="padding: 8px;">Real-Time Media Streams - Access live audio, video, and transcripts</td>
      </tr>
      <tr style="border-bottom: 1px solid #333;">
        <td style="padding: 8px;"><strong>zoom-team-chat</strong></td>
        <td style="padding: 8px;">Team Chat APIs - Channels, messages, bots</td>
      </tr>
      <tr style="border-bottom: 1px solid #333;">
        <td style="padding: 8px;"><strong>zoom-apps-sdk</strong></td>
        <td style="padding: 8px;">Build Zoom Apps that run inside the Zoom client</td>
      </tr>
      <tr>
        <td style="padding: 8px;"><strong>zoom-ui-toolkit</strong></td>
        <td style="padding: 8px;">Pre-built UI components for Zoom integrations</td>
      </tr>
    </table>

    <h4 style="color: #4CAF50; margin-top: 20px;">How It Works:</h4>
    <p>Ask your LLM a question, and it automatically loads the right skill:</p>
    <pre style="margin: 10px 0;"><code>"How do I create a meeting via API?" → loads zoom-rest-api
"Embed Zoom in my React app" → loads zoom-meeting-sdk  
"Build a meeting bot with transcription" → loads zoom-rtms + zoom-meeting-sdk</code></pre>

    <h4 style="color: #4CAF50; margin-top: 20px;">Quick Start:</h4>
    <pre style="margin: 10px 0;"><code># Clone and add to your agent
git clone https://github.com/tanchunsiong/agent-skills.git
cp -r agent-skills/* ~/.claude/skills/   # For Claude Code
cp -r agent-skills/* ~/.config/opencode/skills/  # For OpenCode</code></pre>
    <p>Or point your LLM directly to the GitHub repo to read SKILL.md files.</p>
  </div>

  <h2>Prerequisites</h2>
  <ul>
    <li>OpenClaw installed and running (or any LLM agent with tool access)</li>
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
    <strong>Add the API Key to your Agent</strong>
    <p><strong>For humans:</strong> Tell your OpenClaw agent:</p>
    <pre><code>"Save this Render API key to my .env file: rnd_YOUR_API_KEY_HERE"</code></pre>
    <p><strong>For LLMs:</strong> Store in environment or config:</p>
    <pre><code>RENDER_API_KEY=rnd_YOUR_API_KEY_HERE</code></pre>
  </div>

  <div class="step">
    <span class="step-num">3</span>
    <strong>Get your Render Owner ID</strong>
    <p>Query the Render API:</p>
    <pre><code>curl -H "Authorization: Bearer $RENDER_API_KEY" \\
  "https://api.render.com/v1/owners"</code></pre>
    <p>Response includes your owner ID (starts with <code>tea-</code> for teams or <code>usr-</code> for personal).</p>
  </div>

  <div class="step">
    <span class="step-num">4</span>
    <strong>Deploy your project!</strong>
    <p><strong>For humans:</strong> Simply ask your agent:</p>
    <pre><code>"Deploy my project at ~/myapp to Render"</code></pre>
    <p><strong>For LLMs:</strong> POST to the Render API:</p>
    <pre><code>curl -X POST "https://api.render.com/v1/services" \\
  -H "Authorization: Bearer $RENDER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "web_service",
    "name": "my-hackathon-app",
    "ownerId": "YOUR_OWNER_ID",
    "repo": "https://github.com/you/your-repo",
    "branch": "main",
    "autoDeploy": "yes",
    "serviceDetails": {
      "runtime": "node",
      "plan": "free",
      "region": "oregon",
      "envSpecificDetails": {
        "buildCommand": "npm install",
        "startCommand": "npm start"
      }
    }
  }'</code></pre>
  </div>

  <h2>Quick Reference</h2>
  
  <h3>Node.js Deployment</h3>
  <pre><code>runtime: "node"
buildCommand: "npm install"
startCommand: "npm start"</code></pre>

  <h3>Python Deployment</h3>
  <pre><code>runtime: "python"
buildCommand: "pip install -r requirements.txt"
startCommand: "python app.py"</code></pre>

  <h3>Check Deploy Status</h3>
  <pre><code>GET https://api.render.com/v1/services/{serviceId}/deploys?limit=1
# Status values: created, build_in_progress, update_in_progress, live, failed</code></pre>

  <div class="warning">
    <strong>⚠️ Important:</strong> Render's free tier sleeps after 15 minutes of inactivity. First request after sleeping takes ~30 seconds to wake up.
  </div>

  <h2>Useful Links</h2>
  <ul>
    <li><a href="https://github.com/tanchunsiong/agent-skills" target="_blank">🧪 Agent Skills (Beta)</a> - Skills for your LLM</li>
    <li><a href="https://developers.zoom.us" target="_blank">Zoom Developer Platform</a></li>
    <li><a href="https://api-docs.render.com" target="_blank">Render API Reference</a></li>
    <li><a href="https://docs.render.com" target="_blank">Render Documentation</a></li>
    <li><a href="https://docs.openclaw.ai" target="_blank">OpenClaw Documentation</a></li>
  </ul>

  <div style="background: linear-gradient(135deg, #1a2e1a 0%, #16213e 100%); border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center;">
    <p style="font-size: 1.3em; margin-bottom: 15px;">🤖 <em>"It's 2026 — of course your hackathon project needs an LLM."</em></p>
    <p style="color: #999; font-size: 0.9em; margin-bottom: 15px;">
      (Yes, this webpage might be slop — but the <a href="https://github.com/tanchunsiong/agent-skills">agent skills</a> are not. We promise.)<br>
      <span style="color: #ff9800;">Pro tip: Unlike this page, don't let your hackathon entry be sloppy. The judges aren't LLMs... yet.</span>
    </p>
    <p style="color: #ccc; margin-bottom: 15px;">
      We've done everything we can to make this as smooth as possible.<br>
      The skills are ready. The APIs are documented. The deploy button works.<br>
      Now it's your turn to build something amazing.
    </p>
    <p style="font-size: 1.1em; color: #4CAF50;">
      🚀 Good luck at TreeHacks, and cheers to the Year of the LLM! 🎉
    </p>
  </div>

  <hr style="border-color: #333; margin: 40px 0;">
  <p style="color: #888; font-size: 0.95em;">
    <strong>Created by Tan Chun Siong</strong><br>
    <a href="https://x.com/tanchunsiong" target="_blank">𝕏 @tanchunsiong</a> · 
    <a href="https://linkedin.com/in/tanchunsiong" target="_blank">LinkedIn</a>
  </p>
  <p style="color: #666; font-size: 0.9em;">
    Built with 💠 by Cortana | Zoom @ Stanford TreeHacks
  </p>

  <!--
  STRUCTURED DATA FOR LLMs:
  {
    "page_type": "hackathon_guide",
    "topics": ["render_deployment", "zoom_api", "agent_skills"],
    "agent_skills_repo": "https://github.com/tanchunsiong/agent-skills",
    "render_api_base": "https://api.render.com/v1",
    "key_endpoints": {
      "list_owners": "GET /owners",
      "create_service": "POST /services",
      "list_services": "GET /services",
      "get_deploys": "GET /services/{id}/deploys",
      "trigger_deploy": "POST /services/{id}/deploys",
      "delete_service": "DELETE /services/{id}"
    },
    "supported_runtimes": ["node", "python", "go", "rust", "ruby", "elixir", "docker"],
    "free_tier_limitations": {
      "sleep_after_minutes": 15,
      "wake_time_seconds": 30
    }
  }
  -->
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/api' || req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      message: 'Zoom @ Stanford TreeHacks - OpenClaw Render Deployment Guide',
      agent_skills: 'https://github.com/tanchunsiong/agent-skills',
      timestamp: new Date().toISOString()
    }));
  } else if (req.url === '/llm' || req.url === '/api/llm') {
    // Machine-readable endpoint for LLMs
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      guide: "Deploy to Render.com with OpenClaw",
      agent_skills_repo: "https://github.com/tanchunsiong/agent-skills",
      render_api: {
        base_url: "https://api.render.com/v1",
        auth_header: "Authorization: Bearer <RENDER_API_KEY>",
        create_service: {
          method: "POST",
          endpoint: "/services",
          required_fields: ["type", "name", "ownerId", "repo", "branch", "serviceDetails"],
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
        },
        check_status: {
          method: "GET",
          endpoint: "/services/{serviceId}/deploys?limit=1",
          status_values: ["created", "build_in_progress", "update_in_progress", "live", "failed"]
        }
      },
      runtimes: {
        node: { buildCommand: "npm install", startCommand: "npm start" },
        python: { buildCommand: "pip install -r requirements.txt", startCommand: "python app.py" }
      },
      tips: [
        "Free tier sleeps after 15min inactivity",
        "First request after sleep takes ~30s",
        "Use autoDeploy: yes for automatic deploys on git push"
      ]
    }, null, 2));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }
});

server.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
