const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Regex to match Tailwind responsive prefixes and the classes following them
  content = content.replace(/(?:\b|['"`])(?:sm|md|lg|xl|2xl):[a-zA-Z0-9_\-\.\[\]%]+/g, '');
  // Clean up multiple spaces that might result from removal
  content = content.replace(/ +/g, ' ');
  fs.writeFileSync(filePath, content);
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

walk(path.join(__dirname, 'src', 'components'));
processFile(path.join(__dirname, 'src', 'App.jsx'));
console.log('Done!');
