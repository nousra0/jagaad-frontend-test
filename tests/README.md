# Testing Guide

This project includes comprehensive unit tests and E2E tests to ensure code quality and functionality.

## Testing Stack

- **Unit Tests**: Vitest + Vue Test Utils
- **E2E Tests**: Playwright
- **Coverage**: Vitest Coverage
- **Test Environment**: Happy DOM

## Project Structure

```
tests/
├── setup.ts                 # Global test setup
├── utils/
│   └── test-helpers.ts      # Common test utilities
├── unit/
│   ├── stores/
│   │   ├── cartStore.test.ts
│   │   └── wishlistStore.test.ts
│   ├── components/
│   │   └── ProductCard.test.ts
│   └── composables/
│       └── useCurrency.test.ts
└── e2e/
    ├── homepage.spec.ts
    ├── cart.spec.ts
    └── wishlist.spec.ts
```

## Running Tests

### Unit Tests

```bash
# Run all unit tests
yarn test

# Run tests in watch mode
yarn test:ui

# Run tests once
yarn test:run

# Run tests with coverage
yarn test:coverage
```

### E2E Tests

```bash
# Run all E2E tests
yarn test:e2e

# Run E2E tests with UI
yarn test:e2e:ui

# Run E2E tests in headed mode (see browser)
yarn test:e2e:headed
```

## Test Configuration

### Vitest Configuration (`vitest.config.ts`)

- Uses Happy DOM for DOM simulation
- Includes coverage reporting
- Configured for Vue 3 and TypeScript
- Global test setup with Pinia

### Playwright Configuration (`playwright.config.ts`)

- Tests multiple browsers (Chrome, Firefox, Safari)
- Mobile viewport testing
- Automatic dev server startup
- Parallel test execution

## Writing Tests

### Unit Tests

#### Store Tests

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from '@/stores/cartStore';

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should add product to cart', () => {
    const cartStore = useCartStore();
    const product = { title: 'Test', price: '10.00' /* ... */ };

    cartStore.addToCart(product);

    expect(cartStore.items).toHaveLength(1);
    expect(cartStore.cartCount).toBe(1);
  });
});
```

#### Component Tests

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import ProductCard from '@/components/ProductCard.vue';

describe('ProductCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render product information', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
    });

    expect(wrapper.find('.card-title').text()).toBe(mockProduct.title);
  });
});
```

#### Composable Tests

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { useCurrency } from '@/composables/useCurrency';

describe('useCurrency', () => {
  let currency: ReturnType<typeof useCurrency>;

  beforeEach(() => {
    currency = useCurrency();
  });

  it('should format currency correctly', () => {
    const result = currency.formatCurrency('29.99');
    expect(result).toMatch(/€\s*29\.99/);
  });
});
```

### E2E Tests

#### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should perform action', async ({ page }) => {
    // Arrange
    await expect(page.locator('.card')).toBeVisible();

    // Act
    await page.click('button:has-text("Add to Cart")');

    // Assert
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');
  });
});
```

#### Using Test Helpers

```typescript
import { test, expect } from '@playwright/test';
import { createTestHelpers, assertions } from '../utils/test-helpers';

test('should add product to cart', async ({ page }) => {
  const helpers = createTestHelpers(page);

  await helpers.waitForProducts();
  await helpers.addProductToCart();

  await assertions.cartCountEquals(page, 1);
});
```

## Test Data

### Mock Products

```typescript
export const mockProducts = [
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Test Product 1',
    description: 'A test product description',
    price: '29.99',
    currency: 'USD',
  },
  // ...
];
```

## Best Practices

### Unit Tests

1. **Test Structure**: Use AAA pattern (Arrange, Act, Assert)
2. **Test Isolation**: Each test should be independent
3. **Descriptive Names**: Test names should describe the behavior
4. **Mock External Dependencies**: Mock API calls and external services
5. **Test Edge Cases**: Include error conditions and boundary cases

### E2E Tests

1. **Page Object Pattern**: Use test helpers for common operations
2. **Data Attributes**: Use `data-testid` for reliable element selection
3. **Wait Strategies**: Use proper wait conditions instead of fixed timeouts
4. **Test Independence**: Each test should start with a clean state
5. **Cross-browser Testing**: Test on multiple browsers

### General Guidelines

1. **Keep Tests Fast**: Unit tests should run quickly
2. **Maintainable**: Tests should be easy to update when code changes
3. **Coverage**: Aim for high test coverage but focus on critical paths
4. **Readable**: Tests should be self-documenting
5. **Reliable**: Tests should be flake-free and deterministic

## Debugging Tests

### Unit Tests

```bash
# Run specific test file
yarn test cartStore.test.ts

# Run tests in debug mode
yarn test --reporter=verbose
```

### E2E Tests

```bash
# Run specific test
yarn test:e2e --grep "should add product to cart"

# Run with debug mode
yarn test:e2e --headed --debug

# Generate trace
yarn test:e2e --trace on
```

## Continuous Integration

Tests are configured to run in CI environments:

- Unit tests run on every commit
- E2E tests run on pull requests
- Coverage reports are generated
- Tests must pass before merging

## Coverage Reports

After running `yarn test:coverage`, you can find coverage reports in:

- HTML: `coverage/index.html`
- JSON: `coverage/coverage.json`
- Console: Terminal output

## Troubleshooting

### Common Issues

1. **Tests failing in CI but passing locally**
   - Check for environment-specific code
   - Ensure all dependencies are installed
   - Verify test data is consistent

2. **E2E tests timing out**
   - Increase timeout values
   - Check for slow network conditions
   - Verify selectors are correct

3. **Component tests failing**
   - Check for missing mocks
   - Verify Pinia setup
   - Ensure proper component mounting

### Getting Help

- Check the test logs for detailed error messages
- Use debug mode for step-by-step execution
- Review the test configuration files
- Consult the testing framework documentation
