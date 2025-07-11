import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITEST;

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort
) {
  const resolve = p => path.resolve(__dirname, p);

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : '';

  const manifest = isProd
    ? JSON.parse(
        fs.readFileSync(resolve('dist/client/ssr-manifest.json'), 'utf-8')
      )
    : {};

  const app = express();

  // Add compression middleware
  app.use(compression());

  // Serve static files
  app.use(
    '/assets',
    serveStatic(resolve('dist/client/assets'), {
      maxAge: '1y',
      immutable: true,
    })
  );

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProd) {
        // In development, use Vite's dev server
        const vite = await import('vite');
        const devServer = await vite.createServer({
          root,
          server: { middlewareMode: true },
          appType: 'custom',
        });
        template = fs.readFileSync(resolve('index.html'), 'utf-8');
        template = await devServer.transformIndexHtml(url, template);
        render = (await devServer.ssrLoadModule('/src/entry-server.ts')).render;
      } else {
        // In production, use built files
        template = indexProd;
        render = (await import('./dist/server/entry-server.js')).render;
      }

      const [appHtml, preloadLinks] = await render(url, manifest);

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      console.error(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(3000, () => {
      console.log('Server running at http://localhost:3000');
    })
  );
}
