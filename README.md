# Vue SSR Application

This is a Vue.js application with Server-Side Rendering (SSR) support.

## Features

- Vue 3 with Composition API
- Server-Side Rendering (SSR)
- Vue Router for client-side routing
- Pinia for state management
- Tailwind CSS for styling
- TypeScript support

## Development

### Development Mode (with SSR)

```bash
yarn dev
```

This starts the development server with SSR enabled at `http://localhost:3000`

### Client-Only Development

```bash
yarn dev:client
```

This starts the standard Vite dev server for client-only development.

## Building for Production

### Build both client and server

```bash
yarn build
```

### Build client only

```bash
yarn build:client
```

### Build server only

```bash
yarn build:server
```

## Production Server

After building, start the production server:

```bash
yarn serve
```

## Project Structure

```
├── src/
│   ├── entry-client.ts    # Client entry point for hydration
│   ├── entry-server.ts    # Server entry point for SSR
│   ├── App.vue           # Root component
│   ├── components/       # Vue components
│   ├── stores/          # Pinia stores
│   └── assets/          # Static assets
├── server/
│   ├── index.js         # Production server
│   └── dev-server.js    # Development server
├── index.html           # HTML template
└── vite.config.ts       # Vite configuration
```

## How SSR Works

1. **Server Entry Point** (`src/entry-server.ts`): Renders the Vue app to HTML on the server
2. **Client Entry Point** (`src/entry-client.ts`): Hydrates the server-rendered HTML on the client
3. **Development Server** (`server/dev-server.js`): Handles SSR during development with HMR
4. **Production Server** (`server/index.js`): Serves the built SSR application

The application uses Vue Router with memory history on the server and web history on the client for proper SSR support.
