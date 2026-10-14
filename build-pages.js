const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const outputDirectory = path.join(projectRoot, 'dist');
const marker = path.join(outputDirectory, '.dominatus-pages-build');
const sectorsDirectory = path.join(projectRoot, 'sectors');

const phaseFiles = fs.readdirSync(sectorsDirectory, { withFileTypes: true })
  .filter(entry => entry.isFile() && entry.name.toLowerCase().endsWith('.json') && entry.name !== 'index.json')
  .map(entry => entry.name)
  .filter(file => {
    const phase = JSON.parse(fs.readFileSync(path.join(sectorsDirectory, file), 'utf8'));
    return phase.visible !== false;
  })
  .sort((left, right) => left.localeCompare(right, 'es', { numeric: true }));

if (phaseFiles.length === 0) {
  throw new Error('No hay fases visibles para publicar.');
}

if (fs.existsSync(outputDirectory)) {
  if (!fs.statSync(outputDirectory).isDirectory() || !fs.existsSync(marker)) {
    throw new Error('La carpeta dist ya existe y no pertenece al generador de Pages.');
  }
  fs.rmSync(outputDirectory, { recursive: true });
}

fs.mkdirSync(path.join(outputDirectory, 'sectors'), { recursive: true });
fs.mkdirSync(path.join(outputDirectory, 'data'), { recursive: true });
fs.writeFileSync(marker, 'Carpeta generada por build-pages.js\n');
fs.copyFileSync(path.join(projectRoot, 'index.html'), path.join(outputDirectory, 'index.html'));
fs.cpSync(path.join(projectRoot, 'assets'), path.join(outputDirectory, 'assets'), { recursive: true });
fs.copyFileSync(path.join(projectRoot, 'data', 'alianzas.json'), path.join(outputDirectory, 'data', 'alianzas.json'));
for (const file of phaseFiles) {
  fs.copyFileSync(path.join(sectorsDirectory, file), path.join(outputDirectory, 'sectors', file));
}
fs.writeFileSync(
  path.join(outputDirectory, 'sectors', 'index.json'),
  `${JSON.stringify({ fases: phaseFiles }, null, 2)}\n`,
  'utf8'
);

console.log(`Web preparada en dist con ${phaseFiles.length} fase(s) visible(s).`);
