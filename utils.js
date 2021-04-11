const fs = require('fs');
const path = require('path');

const serverDir = 'server';
const finalDir = 'src';
const distDir = 'dist';
const htmlfile = 'index.html';



fs.copyFileSync(path.resolve(__dirname, distDir, htmlfile), path.resolve(__dirname, finalDir, htmlfile));


const dir = fs.readdirSync(path.resolve(__dirname, serverDir));

dir.forEach(f => {
    fs.copyFileSync(path.resolve(__dirname, serverDir, f), path.resolve(__dirname, finalDir, f));
})