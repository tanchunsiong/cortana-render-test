const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'ok',
    message: 'Cortana deployment test successful!',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
