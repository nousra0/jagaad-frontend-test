# 🛍️ Product Store - Vue.js SPA Application

A modern, full-featured e-commerce frontend application built with Vue 3, TypeScript, and Single Page Application (SPA) architecture. This project demonstrates best practices in modern web development with comprehensive testing, code quality tools, and deployment-ready configuration.

## ✨ Features & Implemented Requirements

### 🏠 **1. Home Page**

- **Product Display**: Shows 10 products per page with responsive grid layout
- **Product Information**: Each product displays image, title, description, price, and currency
- **Responsive Design**: Mobile-first approach with adaptive layouts (1-4 columns based on screen size)
- **Loading States**: Smooth loading animations and error handling

### 📄 **2. Pagination**

- **Client-Side Pagination**: Navigate through all products with intuitive controls
- **Smart Navigation**: Previous/Next buttons with page numbers and ellipsis for large datasets
- **Page Information**: Shows current range and total product count
- **Auto-Reset**: Automatically resets to first page when search or sort changes

### 🛒 **3. Client-Side Cart**

- **Add to Cart**: One-click product addition with visual feedback
- **Cart Counter**: Real-time item count display in header
- **Cart Total**: Dynamic total calculation with proper currency formatting
- **Cart Management**: Full cart drawer with item removal, quantity adjustment, and clear cart functionality
- **Persistent State**: Cart state maintained during navigation

### 💖 **4. Client-Side Wish List**

- **Add to Wishlist**: Heart icon toggle with smooth animations
- **Wishlist Counter**: Real-time count display in header
- **Wishlist Management**: Dedicated drawer with move-to-cart and remove functionality
- **Visual Feedback**: Animated heart icons with pulse effects

### 🔍 **5. Search Functionality**

- **Real-Time Search**: Instant filtering by product title and description
- **Search Results**: Dynamic result count and clear search option
- **Integration**: Seamlessly works with pagination and sorting
- **Empty States**: Helpful messages when no results found

### 🎨 **6. Animations & Transitions**

- **Smooth Transitions**: CSS transitions on all interactive elements
- **Hover Effects**: Product card hover animations with image zoom
- **Button Animations**: Scale and transform effects on interactions
- **Loading Animations**: Spinner and skeleton loading states
- **Heart Animations**: Pulse effects for wishlist interactions

### 🌐 **7. Single Page Application (SPA)**

- **Client-Side Rendering**: Fast, responsive user interface
- **Vue Router**: Client-side routing with history mode
- **Optimized Performance**: Efficient bundle splitting and lazy loading
- **Production Ready**: Optimized production build with static hosting

### 💰 **8. International Currency Support**

- **Intl API Integration**: Proper currency formatting using `Intl.NumberFormat`
- **Multi-Currency**: Support for different currency codes
- **Locale Support**: Configurable locale settings
- **Consistent Formatting**: Used throughout cart, wishlist, and product displays

### 📝 **9. Documentation**

- **Comprehensive README**: Detailed setup and usage instructions
- **Getting Started Guide**: Step-by-step development guide
- **API Documentation**: Component and store documentation
- **Deployment Guide**: Docker and production deployment instructions

### 🔧 **10. Code Quality & Standards**

- **ESLint**: Comprehensive linting rules for Vue, TypeScript, and JavaScript
- **Prettier**: Automatic code formatting
- **Stylelint**: CSS and Vue style linting
- **TypeScript**: Full type safety throughout the application
- **Conventional Commits**: Structured commit messages with commitlint

### 🪝 **11. Git Hooks & Automation**

- **Husky**: Git hooks for automated quality checks
- **Pre-commit**: Runs linting and formatting before commits
- **Commit-msg**: Validates conventional commit messages
- **Lint-staged**: Only processes changed files for efficiency

### 🐳 **12. Docker & Deployment**

- **Multi-stage Dockerfile**: Optimized production image
- **Development Dockerfile**: Separate development environment
- **Docker Compose**: Easy local development setup
- **Health Checks**: Container health monitoring
- **Security**: Non-root user and security best practices

### 🧪 **13. Testing Suite**

- **Unit Tests**: Comprehensive component and store testing with Vitest
- **E2E Tests**: Full user journey testing with Playwright
- **Test Coverage**: Coverage reporting and analysis
- **Test Utilities**: Helper functions and test setup

### 🎨 **14. Styling & UI**

- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Component library for consistent design
- **Responsive Design**: Mobile-first responsive layouts
- **Custom Theme**: Branded color scheme and styling

### 📋 **15. Project Management**

- **CHANGELOG**: Detailed version history with semantic versioning
- **Package Management**: Yarn with lockfile for dependency consistency
- **Scripts**: Comprehensive npm scripts for all development tasks
- **Type Checking**: TypeScript compilation and type checking

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd frontend-test

# Install dependencies
yarn install

# Start development server
yarn dev
```

The application will be available at `http://localhost:3000`

## 🛠️ Development

### Available Scripts

```bash
# Development
yarn dev              # Start development server

# Building
yarn build            # Build for production

# Testing
yarn test             # Run unit tests
yarn test:ui          # Run tests with UI
yarn test:e2e         # Run E2E tests
yarn test:coverage    # Run tests with coverage

# Code Quality
yarn lint             # Run ESLint
yarn format           # Run Prettier
yarn stylelint        # Run Stylelint
yarn type-check       # Run TypeScript type checking

# Production
yarn serve            # Start production server
```

### Project Structure

```
├── src/
│   ├── components/           # Vue components
│   │   ├── HomePage.vue     # Main product listing page
│   │   ├── ProductCard.vue  # Individual product component
│   │   ├── Header.vue       # Application header
│   │   ├── Cart.vue         # Shopping cart drawer
│   │   └── Wishlist.vue     # Wishlist drawer
│   ├── stores/              # Pinia state management
│   │   ├── cartStore.ts     # Shopping cart state
│   │   └── wishlistStore.ts # Wishlist state
│   ├── composables/         # Reusable composables
│   │   └── useCurrency.ts   # Currency formatting utilities
│   ├── main.ts              # Application entry point
│   └── App.vue              # Root component
├── tests/                   # Test files
│   ├── unit/               # Unit tests
│   ├── e2e/                # End-to-end tests
│   └── setup.ts            # Test configuration
├── Dockerfile              # Production Docker image
├── docker-compose.yml      # Docker development setup
└── package.json            # Dependencies and scripts
```

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
yarn test

# Run with UI
yarn test:ui

# Run with coverage
yarn test:coverage
```

### E2E Tests

```bash
# Run E2E tests
yarn test:e2e

# Run with UI
yarn test:e2e:ui

# Run in headed mode
yarn test:e2e:headed
```

## 🐳 Docker

### Development

```bash
# Start development environment
docker-compose --profile dev up
```

### Production

```bash
# Build and run production container
docker build -t product-store .
docker run -p 3000:3000 product-store
```

## 📦 Deployment

### Production Build

```bash
# Build the application
yarn build

# Start production server
yarn serve
```

### Vercel Deployment

This application is deployed on **Vercel** for optimal performance and scalability:

- **Automatic Deployments**: Connected to Git repository for automatic deployments on push
- **Static Hosting**: Optimized for static hosting platforms like Vercel, Netlify, or GitHub Pages
- **Global CDN**: Content delivery network for fast loading worldwide
- **Preview Deployments**: Automatic preview deployments for pull requests
- **Environment Variables**: Secure environment variable management through Vercel dashboard

### Environment Variables

- `NODE_ENV`: Environment mode (`development`/`production`)
- `PORT`: Server port (default: 3000)

## 🔧 Configuration

### Key Configuration Files

- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `eslint.config.js` - ESLint rules
- `commitlint.config.js` - Git commit message rules
- `vitest.config.ts` - Unit test configuration
- `playwright.config.ts` - E2E test configuration

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

## 📚 Technologies Used

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Pinia** - State management for Vue
- **Vue Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Stylelint** - CSS linting
- **Husky** - Git hooks
- **Commitlint** - Commit message validation

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

1. Check the troubleshooting section in `GETTING_STARTED.md`
2. Review the test documentation in `tests/README.md`
3. Create an issue in the project repository

---
