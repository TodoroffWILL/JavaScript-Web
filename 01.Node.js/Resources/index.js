const http = require('http');
const fs = require('fs/promises');

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

const replaceData = (html, data) =>
  Object.keys(data).reduce((result, key) => {
    result = result.replace(`{{${key}}}`, data[key]);
    return result;
  }, html);
const server = http.createServer(async (req, res) => {
  if (req.url == '/') {
    const homeHtml = await fs.readFile('./views/home/index.html', 'utf-8');
    const catHtml = await fs.readFile('./views/cat.html', 'utf-8');

    const catsHtml = cats.map((cat) => replaceData(catHtml, cat));
    const homeResult = replaceData(homeHtml, { cats: catsHtml });

    res.writeHead(200, {
      'content-type': 'text/html', // Define what file you are sending to the browser
    });
    res.write(homeResult);
  } else if (req.url == '/styles/site.css') {
    const css = await fs.readFile('./content/styles/site.css', 'utf-8');
    res.writeHead(200, {
      'content-type': 'text/css', // Define what file you are sending to the browser
    });
    res.write(css);
  } else if (req.url == '/cats/add-breed') {
    const addBreedHtml = await fs.readFile('./views/addBreed.html', 'utf-8');
    res.writeHead(200, {
      'content-type': 'text/html', // Define what file you are sending to the browser
    });
    res.write(addBreedHtml);
  } else if (req.url == '/cats/add-cat') {
    const addCatHtml = await fs.readFile('./views/addCat.html', 'utf-8');
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(addCatHtml);
  }

  res.end();
});

server.listen(5000, () =>
  console.log('This server is running on port 5000...')
);
