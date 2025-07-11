# Getting Started with FeedbackHub Frontend

This guide will help you get up and running with the FeedbackHub frontend application, a Vue 3 SSR (Server-Side Rendering) application built with TypeScript, Pinia, and Tailwind CSS.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Yarn** (v1.22 or higher) - [Installation guide](https://classic.yarnpkg.com/en/docs/install/)
- **Git** - [Download here](https://git-scm.com/)

### Verify Installation

```bash
node --version    # Should be v18+
yarn --version    # Should be v1.22+
git --version     # Any recent version
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd frontend-test
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Start Development Server

```bash
yarn dev
```

The application will be available at `http://localhost:3000`

## 🛠️ Development

### Available Scripts

| Command             | Description                            |
| ------------------- | -------------------------------------- |
| `yarn dev`          | Start development server with SSR      |
| `yarn dev:client`   | Start client-only development server   |
| `yarn build`        | Build for production (client + server) |
| `yarn build:client` | Build client bundle only               |
| `yarn build:server` | Build server bundle only               |
| `yarn serve`        | Start production server                |
| `yarn preview`      | Preview production build               |

### Development Modes

#### SSR Development (Recommended)

```bash
yarn dev
```

- Full SSR experience during development
- Hot Module Replacement (HMR)
- Server-side rendering with client hydration

#### Client-Only Development

```bash
yarn dev:client
```

- Standard Vite dev server
- Faster for UI-only development
- No SSR during development

### Code Quality Tools

```bash
# Linting and formatting
yarn lint:all          # Run all linting tools
yarn lint:all:check    # Check without fixing

# Individual tools
yarn lint              # ESLint
yarn format            # Prettier
yarn stylelint         # Stylelint

# Type checking
yarn type-check        # TypeScript type checking
```

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
yarn test

# Run tests in watch mode with UI
yarn test:ui

# Run tests once
yarn test:run

# Run tests with coverage
yarn test:coverage
```

### End-to-End Tests

```bash
# Run all E2E tests
yarn test:e2e

# Run E2E tests with UI
yarn test:e2e:ui

# Run E2E tests in headed mode (see browser)
yarn test:e2e:headed
```

### Test Structure

```
tests/
├── unit/              # Unit tests
│   ├── components/    # Component tests
│   ├── stores/        # Store tests
│   └── composables/   # Composable tests
├── e2e/               # End-to-end tests
└── utils/             # Test utilities
```

## 🏗️ Project Structure

```
frontend-test/
├── src/
│   ├── components/        # Vue components
│   │   ├── Cart.vue       # Shopping cart component
│   │   ├── Header.vue     # Navigation header
│   │   ├── HomePage.vue   # Main product listing
│   │   ├── ProductCard.vue # Individual product display
│   │   └── Wishlist.vue   # Wishlist component
│   ├── stores/            # Pinia stores
│   │   ├── cartStore.ts   # Shopping cart state
│   │   └── wishlistStore.ts # Wishlist state
│   ├── composables/       # Vue composables
│   │   ├── useCart.ts     # Cart functionality
│   │   └── useCurrency.ts # Currency formatting
│   ├── entry-client.ts    # Client entry point
│   ├── entry-server.ts    # Server entry point
│   ├── App.vue           # Root component
│   └── main.ts           # Application entry
├── server/
│   ├── dev-server.js     # Development server
│   └── index.js          # Production server
├── public/               # Static assets
├── tests/                # Test files
└── mock-products.json    # Mock product data
```

## 🎨 Styling

The project uses **Tailwind CSS** with **DaisyUI** components:

- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Component library built on Tailwind
- **FontAwesome**: Icon library

### CSS Structure

```
src/assets/css/
└── main.css              # Global styles and Tailwind imports
```

### Customization

- Modify `tailwind.config.ts` for theme customization
- Add custom styles in `src/assets/css/main.css`
- Use DaisyUI components for consistent UI

## 📦 State Management

The application uses **Pinia** for state management:

### Stores

- **Cart Store** (`stores/cartStore.ts`): Manages shopping cart state
- **Wishlist Store** (`stores/wishlistStore.ts`): Manages wishlist state

### Usage Example

```typescript
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();
cartStore.addToCart(product);
```

## 🔧 Configuration Files

| File                   | Purpose                    |
| ---------------------- | -------------------------- |
| `vite.config.ts`       | Vite build configuration   |
| `vitest.config.ts`     | Unit test configuration    |
| `playwright.config.ts` | E2E test configuration     |
| `tailwind.config.ts`   | Tailwind CSS configuration |
| `tsconfig.json`        | TypeScript configuration   |
| `eslint.config.js`     | ESLint configuration       |
| `commitlint.config.js` | Git commit message linting |

## 🐳 Docker Development

### Using Docker Compose

```bash
# Development environment
docker-compose --profile dev up

# Production environment
docker-compose up
```

### Manual Docker Build

```bash
# Development build
docker build -f Dockerfile.dev -t feedbackhub-frontend:dev .

# Production build
docker build -t feedbackhub-frontend:prod .
```

## 🚀 Deployment

### Production Build

```bash
# Build the application
yarn build

# Start production server
yarn serve
```

### Environment Variables

The application supports the following environment variables:

- `NODE_ENV`: Environment mode (`development`/`production`)
- `PORT`: Server port (default: 3000)

### Docker Deployment

```bash
# Build and run production container
docker build -t feedbackhub-frontend .
docker run -p 3000:3000 feedbackhub-frontend
```

## 🔍 Debugging

### Development Debugging

1. **Browser DevTools**: Use Vue DevTools extension
2. **Console Logging**: Check browser console for errors
3. **Network Tab**: Monitor API requests and responses

### Test Debugging

```bash
# Debug unit tests
yarn test --reporter=verbose

# Debug E2E tests
yarn test:e2e:headed
```

## 📚 Key Technologies

- **Vue 3**: Progressive JavaScript framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Pinia**: State management for Vue
- **Vue Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Component library
- **Vitest**: Unit testing framework
- **Playwright**: End-to-end testing
- **ESLint**: Code linting
- **Prettier**: Code formatting

## 🤝 Contributing

### Code Style

- Use **Composition API** for Vue components
- Follow **TypeScript** best practices
- Use **ESLint** and **Prettier** for code formatting
- Write **unit tests** for new features
- Add **E2E tests** for critical user flows

### Git Workflow

1. Create a feature branch
2. Make your changes
3. Run tests: `yarn test && yarn test:e2e`
4. Run linting: `yarn lint:all:check`
5. Commit with conventional commit messages
6. Submit a pull request

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

Examples:

- `feat(cart): add remove item functionality`
- `fix(ui): resolve responsive layout issues`
- `test(store): add cart store unit tests`

## 🆘 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

#### Node Modules Issues

```bash
# Clear yarn cache
yarn cache clean

# Remove node_modules and reinstall
rm -rf node_modules yarn.lock
yarn install
```

#### TypeScript Errors

```bash
# Run type checking
yarn type-check

# Check for missing types
yarn add -D @types/<package-name>
```

#### Test Failures

```bash
# Clear test cache
yarn test --clearCache

# Run tests with verbose output
yarn test --reporter=verbose
```

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the test documentation in `tests/README.md`
3. Check the main README.md for additional information
4. Create an issue in the project repository

---
