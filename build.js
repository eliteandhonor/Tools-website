/* eslint-env node */
/* global require, process */
const {execSync}=require('child_process');
const fs=require('fs');
const path=require('path');
try{
  execSync('npx tailwindcss -m -o style.min.css');
  execSync('npx esbuild mini.js --bundle --minify --sourcemap --outfile=app.min.js');
  execSync('npx workbox-cli injectManifest');
  const workboxSrc=path.join('node_modules','workbox-sw','build','workbox-sw.js');
  const workboxDir=path.join('vendor','workbox');
  fs.mkdirSync(workboxDir,{recursive:true});
  fs.copyFileSync(workboxSrc,path.join(workboxDir,'workbox-sw.js'));
  console.log('Build complete');
}catch(e){console.error(e.message);process.exit(1);}
