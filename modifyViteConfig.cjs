const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'vite.config.ts');

fs.readFile(filePath, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let result = data.replace(
    /import react from '@vitejs\/plugin-react';/g,
    "import react from '@vitejs/plugin-react';\nimport svgr from 'vite-plugin-svgr';"
  );
  result = result.replace(
    /plugins: \[react\(\)\],/g,
    'plugins: [react(), svgr()],'
  );

  fs.writeFile(filePath, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
  console.log('Svgr plugin added to vite.config.ts');
});
