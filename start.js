const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('content-type', 'text/dianmic');
  res.end('Hola me llamo luis arturo contreras \n');
});

server.listen(port, hostname, () => {
  console.log(`EL SERVIDOR ESTA CORRIENDO EN  http://${hostname}:${port}/`);
});
