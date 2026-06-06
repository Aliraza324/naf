const fs = require('fs');
const path = require('path');
const code = fs.readFileSync('src/data/productGroups.js', 'utf8');
const regex = /import\s+.*?\s+from\s+['"](.*?)['"]/g;
let m;
while ((m = regex.exec(code)) !== null) {
  const imp = m[1];
  if (imp.startsWith('../assets/images/')) {
    const file = path.basename(imp);
    const full = path.join('src/assets/images', file);
    if (!fs.existsSync(full)) {
      console.log('Missing: ' + imp);
      // Let's see if we can find it with another extension
      const name = path.parse(file).name;
      const allFiles = fs.readdirSync('src/assets/images');
      const found = allFiles.find(f => path.parse(f).name === name);
      if (found) {
        console.log('  -> Found actual file: ' + found);
      }
    }
  }
}
