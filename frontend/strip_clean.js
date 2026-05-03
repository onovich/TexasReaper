const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/ (?:sm|md|lg|xl|2xl):[a-zA-Z0-9_\-\.\[\]%]+/g, '');
  content = content.replace(/'(?:sm|md|lg|xl|2xl):[a-zA-Z0-9_\-\.\[\]%]+ /g, "'");
  content = content.replace(/"(?:sm|md|lg|xl|2xl):[a-zA-Z0-9_\-\.\[\]%]+ /g, '"');
  content = content.replace(/`(?:sm|md|lg|xl|2xl):[a-zA-Z0-9_\-\.\[\]%]+ /g, '`');
  fs.writeFileSync(filePath, content);
}
const files = [
  'src/App.jsx',
  'src/components/GameCard.jsx',
  'src/components/GameHeader.jsx',
  'src/components/screens/PlayingScreen.jsx',
  'src/components/screens/StartScreen.jsx',
  'src/components/screens/GameOverScreen.jsx',
  'src/components/screens/LevelUpScreen.jsx'
];
files.forEach(f => processFile(f));
