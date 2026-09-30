const fs = require('fs');
const path = require('path');

function fixHref(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixHref(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('to="') || content.includes("to={")) {
        content = content.replace(/\bto=/g, 'href=');
        fs.writeFileSync(fullPath, content);
      }
    }
  });
}

fixHref(path.join(__dirname, 'src'));
console.log("Replaced 'to=' with 'href='.");
