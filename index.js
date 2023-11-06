const http = require('http');
const httpProxy = require('http-proxy');

// Define the ports for your projects
const project1Port = 3000;
const project2Port = 4000;
const project3Port = 5000;

// Create a proxy server
const proxy = httpProxy.createProxyServer();

// Create an HTTP server to listen on a specific port
const server = http.createServer((req, res) => {
  // Determine the project based on the URL ending
  const { url } = req;
  let targetPort;

  if (url.endsWith('/project1')) {
    targetPort = project1Port;
  } else if (url.endsWith('/project2')) {
    targetPort = project2Port;
  } else if (url.endsWith('/project3')) {
    targetPort = project3Port;
  } else {
    // Default to a 404 response for URLs that don't match any project
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  // Forward the request to the appropriate project
  proxy.web(req, res, { target: `http://localhost:${targetPort}` });
});

// Listen on the port you want to expose your projects on
const proxyPort = 80; // You can use any port you prefer
server.listen(proxyPort, () => {
  console.log(`Reverse proxy server is listening on port ${proxyPort}`);
});
