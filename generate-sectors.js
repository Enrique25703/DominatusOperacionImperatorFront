const fs = require('fs');
const path = require('path');

const sectorsDirectory = path.join(__dirname, 'sectors');
const indexPath = path.join(sectorsDirectory, 'index.json');

fs.mkdirSync(sectorsDirectory, { recursive: true });

const phaseFiles = fs.readdirSync(sectorsDirectory, { withFileTypes: true })
  .filter(entry => entry.isFile() && entry.name.toLowerCase().endsWith('.json') && entry.name !== 'index.json')
  .map(entry => entry.name)
  .filter(file => {
    const phase = JSON.parse(fs.readFileSync(path.join(sectorsDirectory, file), 'utf8'));
    return phase.visible !== false;
  })
  .sort((left, right) => left.localeCompare(right, 'es', { numeric: true }));

fs.writeFileSync(indexPath, `${JSON.stringify({ fases: phaseFiles }, null, 2)}\n`, 'utf8');
console.log(`Índice de sectores actualizado: ${phaseFiles.length} fase(s).`);
