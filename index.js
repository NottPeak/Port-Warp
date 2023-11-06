const http = require('http');
const httpProxy = require('http-proxy');

const shortener = 3000;
const fetcher = 4000;
const shadow = 8000;
const proxy = httpProxy.createProxyServer();

const server = http.createServer((req, res) => {
  const { url } = req;
  let targetPort;

  if (url.endsWith('/v1/shortener')) {
    targetPort = fetcher;
  } else if (url.endsWith('/v1/fetcher')) {
    targetPort = shortener;
  } else {
    targetPort = shadow;
  }

  proxy.web(req, res, { target: `http://localhost:${targetPort}` });
});

const proxyPort = 8080; 
server.listen(proxyPort, () => {
  console.log(`Reverse proxy server is listening on port ${proxyPort}`);
});
