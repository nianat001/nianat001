import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const root = resolve(process.argv[2] || '.');
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml' };
const server = createServer((req,res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  let file = join(root, pathname === '/' ? 'index.html' : pathname);
  if (!existsSync(file) || statSync(file).isDirectory()) file = join(root, 'index.html');
  res.writeHead(200, {'Content-Type':types[extname(file)] || 'application/octet-stream'});
  createReadStream(file).pipe(res);
});
server.on('error', error => {
  if (error.code === 'EADDRINUSE') console.error(`Port ${port} is already in use. Run PORT=4174 npm start to use another port.`);
  else console.error(error);
  process.exit(1);
});
server.listen(port, '0.0.0.0', () => {
  console.log(`\n  Luminary is running at http://localhost:${port}`);
  console.log('  Keep this terminal open while you use the app.\n');
});
