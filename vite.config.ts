import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

function androidWebViewCompatPlugin(): Plugin {
  let latestJsCode = '';
  let latestCssCode = '';

  return {
    name: 'android-webview-compat',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type === 'chunk' && file.fileName.endsWith('.js')) {
          const sanitized = file.code.replace(
            /\bimport\.meta\.url\b/g,
            '(typeof document!=="undefined"&&document.currentScript&&document.currentScript.src||window.location.href)'
          );
          file.code = `(function(){\nif(typeof window!=="undefined"){window.__ONGEUL_BOOTED__=true;}\n${sanitized}\n})();\n`;
          latestJsCode = file.code;
        } else if (
          file.type === 'asset' &&
          file.fileName.endsWith('.css') &&
          typeof file.source === 'string'
        ) {
          latestCssCode = file.source;
        }
      }
    },
    transformIndexHtml(html) {
      let scriptSrc = './assets/index.js';
      const moduleScriptRegex =
        /<script\b[^>]*?\btype=["']module["'][^>]*?\bsrc=["']([^"']+)["'][^>]*><\/script>|<script\b[^>]*?\bsrc=["']([^"']+)["'][^>]*?\btype=["']module["'][^>]*><\/script>/i;
      const match = html.match(moduleScriptRegex);
      if (match) {
        scriptSrc = match[1] || match[2] || './assets/index.js';
      }

      let out = html
        .replace(moduleScriptRegex, '')
        .replace(/\s+crossorigin(?:=["'][^"']*["'])?/gi, '');

      // Place the classic deferred bundle script right after <div id="root"></div> inside <body>
      if (out.includes('</body>')) {
        out = out.replace(
          '</body>',
          `    <script defer src="${scriptSrc}"></script>\n  </body>`
        );
      } else {
        out += `\n<script defer src="${scriptSrc}"></script>\n`;
      }
      return out;
    },
    writeBundle(options) {
      try {
        const outDir = options.dir || path.resolve('dist');
        const publicDir = path.resolve('public');
        const assetsDir = path.join(outDir, 'assets');
        fs.mkdirSync(assetsDir, {recursive: true});
        if (latestJsCode) {
          fs.writeFileSync(path.join(publicDir, 'apk-bundle.js'), latestJsCode, 'utf8');
          fs.writeFileSync(path.join(outDir, 'apk-bundle.js'), latestJsCode, 'utf8');
          fs.writeFileSync(path.join(assetsDir, 'index.js'), latestJsCode, 'utf8');
        }
        if (latestCssCode) {
          fs.writeFileSync(path.join(publicDir, 'apk-bundle.css'), latestCssCode, 'utf8');
          fs.writeFileSync(path.join(outDir, 'apk-bundle.css'), latestCssCode, 'utf8');
          fs.writeFileSync(path.join(assetsDir, 'index.css'), latestCssCode, 'utf8');
        }
      } catch (err) {
        console.error('Failed to sync apk-bundle files:', err);
      }
    },
    closeBundle() {
      try {
        const distDir = path.resolve('dist');
        const wwwDir = path.resolve('www');
        if (fs.existsSync(distDir)) {
          fs.cpSync(distDir, wwwDir, { recursive: true });
        }
      } catch (err) {
        console.error('Failed to mirror dist to www:', err);
      }
    },
  };
}

export default defineConfig(({command}) => {
  if (command === 'build') {
    process.env.NODE_ENV = 'production';
  }
  return {
    base: './',
    plugins: [react(), tailwindcss(), androidWebViewCompatPlugin()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    build: {
      target: 'es2020',
      minify: false,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/index.js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
