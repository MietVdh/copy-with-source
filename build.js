const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';


const commonOptions = {
  entryPoints: {
    background: 'src/background/background.js',
    content: 'src/content/content.js'},
  bundle: true,
  minify: isProd,
  sourcemap: !isProd,

  define: {
    'process.env.NODE_ENV': isProd ? '"production"' : '"development"',
    'DEBUG': isProd ? 'false' : 'true',
  },
};

async function buildBrowser(browser, target) {
    await esbuild.build({
        ...commonOptions,
        target,
        outdir: `dist/${browser}`,
    });

    fs.copyFileSync(
        `manifests/${browser}.json`,
        `dist/${browser}/manifest.json`
    );

    fs.mkdirSync(`dist/${browser}/`, { recursive: true });
    fs.cpSync('./icons', `dist/${browser}/icons`, { recursive: true });
    fs.cpSync('./options', `dist/${browser}/options`, { recursive: true });

}


async function buildAll() {
    await buildBrowser("chrome", ["chrome100"]);
    await buildBrowser("firefox", ["firefox100"]);
}


buildAll().catch(err => {
    console.error(err);
    process.exit(1);
});
