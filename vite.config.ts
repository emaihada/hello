import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

function androidWebViewCompatPlugin(): Plugin {
  return {
    name: 'android-webview-compat',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type === 'chunk' && file.fileName.endsWith('.js')) {
          file.code = `(function(){\n${file.code}\n})();\n`;
        }
      }
    },
    transformIndexHtml(html) {
      return html
        .replace(
          /<script\b[^>]*?\btype=["']module["'][^>]*?\bsrc=["']([^"']+)["'][^>]*><\/script>/gi,
          '<script defer src="$1"></script>'
        )
        .replace(
          /<script\b[^>]*?\bsrc=["']([^"']+)["'][^>]*?\btype=["']module["'][^>]*><\/script>/gi,
          '<script defer src="$1"></script>'
        )
        .replace(/\s+crossorigin(?:=["'][^"']*["'])?/gi, '');
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), androidWebViewCompatPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || __dirname, '.'),
      },
    },
    build: {
      target: 'es2020',
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
