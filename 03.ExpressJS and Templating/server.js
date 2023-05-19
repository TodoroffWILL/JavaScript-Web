const express = require('express');

const server = express();
// The callback after the server.get('/',()=>{}) is called "ACTION" which means: When you go there do this."
server.get('/', (req, res) => {
  // All this is equvalent to res.send();
  //   res.writeHead(200, {
  //     'content-type': 'application/json',
  //   });
  //   res.write('Hello from Express!');
  //   res.end();
  // Automatically recognizing the type of data send,write it and ending it.

  res.status(200).send({ name: 'Pesho' });
});

server.get('/cats', (req, res) => {
  res.status(200).send('Hello from Cats');
});

server.listen('5000', () => {
  console.log('Server is listening on port 5000!');
});
