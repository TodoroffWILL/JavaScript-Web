const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Server is called');

  console.log(req.method);
  console.log(req.headers.host);
  console.log(req.url);

  res.writeHead(201, {
    CustomHeader: 'somevalue',
    'Content-Type': 'text/html', // Значи оказание към браузъра,каква информация се изпраща !
  });
  res.write('<h1>Hello from NodeJS Server! Updated Version</h1>');
  res.end();
});

server.listen(5000);

console.log('Server is running on port 5000...');
