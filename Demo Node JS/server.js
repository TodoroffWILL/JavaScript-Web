const http = require('http');
const {
  getProducts,
  getProduct,
  createProduct,
} = require('./controllers/productController');

const server = http.createServer((request, res) => {
  if (request.url == '/api/products' && request.method == 'GET') {
    getProducts(request, res);
  } else if (
    request.url.match(/\/api\/products\/([0-9]+)/) &&
    request.method == 'GET'
  ) {
    const id = request.url.split('/')[3];
    getProduct(request, res, id);
  } else if (request.url === '/api/products' && request.method === 'POST') {
    createProduct(request, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  }
});

const port = process.env.PORT || 5001;

server.listen(port, () => `Server running on port ${port}`);
