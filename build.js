const {execSync}=require('child_process');
try{
  execSync('npx tailwindcss -m -o style.min.css');
  execSync('npx esbuild mini.js --bundle --minify --sourcemap --outfile=app.min.js');
  execSync('npx workbox-cli injectManifest');
  console.log('Build complete');
}catch(e){console.error(e.message);process.exit(1);}
