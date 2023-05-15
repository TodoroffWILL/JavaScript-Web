const http = require('http');
const { homeTemplate, catTemplate } = require('./views/home/index');
const siteCss = require('./content/styles/site');
const addBreadHtml = require('./views/addBreed');

const cats = [
  {
    id: 1,
    name: 'Navcho',
    breed: 'Persian',
    description: 'Lovely little puff',
  },
  {
    id: 2,
    name: 'Mishi',
    breed: 'Angorska',
    description: 'Fluffly cat',
  },
  {
    id: 3,
    name: 'Piggy',
    breed: 'Angora',
    description: 'Very fat cat',
  },
];

const server = http.createServer(async (req, res) => {
  const pattern = /{{catName}}|{{imageUrl}}|{{breed}}|{{description}}/gm;
  const homeHtml = homeTemplate.replace(
    '{{cats}}',
    cats.map((cat) => catTemplate.replace(pattern, cat.name,cat.breed,cat.description))
  );

  if (req.url == '/') {
    res.writeHead(200, {
      'content-type': 'text/html', // Define what file you are sending to the browser
    });
    res.write(homeHtml);
  } else if (req.url == '/styles/site.css') {
    res.writeHead(200, {
      'content-type': 'text/css', // Define what file you are sending to the browser
    });
    res.write(siteCss);
  } else if (req.url == '/cats/add-breed') {
    res.writeHead(200, {
      'content-type': 'text/html', // Define what file you are sending to the browser
    });
    res.write(addBreadHtml);
  }

  res.end();
});

server.listen(5000, () =>
  console.log('This server is running on port 5000...')
);
