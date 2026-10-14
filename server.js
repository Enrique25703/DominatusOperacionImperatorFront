const http = require('http');
const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const port = Number(process.env.PORT) || 4173;
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

async function readPhaseFiles() {
  const sectorsDirectory = path.join(projectRoot, 'sectors');
  const entries = await fs.promises.readdir(sectorsDirectory, { withFileTypes: true });
  const candidates = entries
    .filter(entry => entry.isFile() && entry.name.toLowerCase().endsWith('.json') && entry.name !== 'index.json')
    .map(entry => entry.name);
  const visibleFiles = await Promise.all(candidates.map(async file => {
    const phase = JSON.parse(await fs.promises.readFile(path.join(sectorsDirectory, file), 'utf8'));
    return phase.visible === false ? null : file;
  }));
  return visibleFiles
    .filter(Boolean)
    .sort((left, right) => left.localeCompare(right, 'es', { numeric: true }));
}

const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);

  if (pathname === '/sectors/index.json') {
    readPhaseFiles()
      .then(files => {
        response.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store, max-age=0'
        });
        response.end(JSON.stringify({ fases: files }, null, 2));
      })
      .catch(() => {
        response.writeHead(500).end('No se pudo leer la carpeta sectors');
      });
    return;
  }

  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = path.resolve(projectRoot, relativePath);

  if (filePath !== projectRoot && !filePath.startsWith(`${projectRoot}${path.sep}`)) {
    response.writeHead(403).end('Acceso denegado');
    return;
  }

  fs.readFile(filePath, (error, contents) => {
    if (error) {
      response.writeHead(error.code === 'ENOENT' ? 404 : 500).end('Recurso no disponible');
      return;
    }

    response.writeHead(200, {
      'Content-Type': contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store, max-age=0'
    });
    response.end(contents);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Dominatus disponible en http://localhost:${port}`);
});
