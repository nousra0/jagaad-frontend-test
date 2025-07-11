/* eslint-env node */
/* global process, console */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  // For Vercel deployment, the built files are in the root directory
  const resolve = p => {
    if (process.env.VERCEL) {
      // Remove 'dist/' prefix for Vercel deployment
      return path.resolve(__dirname, '../', p.replace(/^dist[\\/]/, ''));
    }
    return path.resolve(__dirname, p);
  };

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : '';

  const manifest = isProd
    ? JSON.parse(
        fs.readFileSync(resolve('dist/client/.vite/ssr-manifest.json'), 'utf-8')
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
        render = (await import(resolve('dist/server/entry-server.js'))).render;
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

let handler;
if (process.env.VERCEL) {
  // Vercel will import this file and expect a default export
  const serverPromise = createServer();
  const vercelApp = serverPromise.then(({ app }) => app);
  handler = async function (req, res) {
    const app = await vercelApp;
    app(req, res);
  };
}
export default handler;
