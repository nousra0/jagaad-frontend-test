import { test, expect } from '@playwright/test';

test.describe('Cart Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for products to load
    await expect(page.locator('.card')).toBeVisible();
  });

  test('should add products to cart', async ({ page }) => {
    // Get initial cart count
    const initialCartCount =
      (await page.locator('[data-testid="cart-count"]').textContent()) || '0';

    // Add first product to cart
    await page.click('.card button:has-text("Add to Cart")');

    // Cart count should increase by 1
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText(
      /(\d+)/
    );
    const newCartCount = await page
      .locator('[data-testid="cart-count"]')
      .textContent();
    expect(parseInt(newCartCount || '0')).toBe(parseInt(initialCartCount) + 1);

    // Add same product again (should increase quantity)
    await page.click('.card button:has-text("Add to Cart")');

    // Cart count should increase by 2 total
    const finalCartCount = await page
      .locator('[data-testid="cart-count"]')
      .textContent();
    expect(parseInt(finalCartCount || '0')).toBe(
      parseInt(initialCartCount) + 2
    );
  });

  test('should open cart sidebar', async ({ page }) => {
    // Add a product to cart first
    await page.click('.card button:has-text("Add to Cart")');

    // Click cart icon to open sidebar
    await page.click('[data-testid="cart-icon"]');

    // Cart sidebar should be visible
    await expect(page.locator('[data-testid="cart-sidebar"]')).toBeVisible();

    // Should show added product
    await expect(page.locator('[data-testid="cart-item"]')).toBeVisible();
  });

  test('should update product quantity in cart', async ({ page }) => {
    // Add product to cart
    await page.click('.card button:has-text("Add to Cart")');

    // Open cart
    await page.click('[data-testid="cart-icon"]');
    await expect(page.locator('[data-testid="cart-sidebar"]')).toBeVisible();

    // Get initial quantity
    const initialQuantity = await page
      .locator('[data-testid="quantity-input"]')
      .inputValue();

    // Increase quantity
    await page.click('[data-testid="quantity-increase"]');

    // Quantity should increase
    const newQuantity = await page
      .locator('[data-testid="quantity-input"]')
      .inputValue();
    expect(parseInt(newQuantity)).toBe(parseInt(initialQuantity) + 1);

    // Decrease quantity
    await page.click('[data-testid="quantity-decrease"]');

    // Quantity should decrease back
    const finalQuantity = await page
      .locator('[data-testid="quantity-input"]')
      .inputValue();
    expect(parseInt(finalQuantity)).toBe(parseInt(initialQuantity));
  });

  test('should remove product from cart', async ({ page }) => {
    // Add product to cart
    await page.click('.card button:has-text("Add to Cart")');

    // Open cart
    await page.click('[data-testid="cart-icon"]');
    await expect(page.locator('[data-testid="cart-sidebar"]')).toBeVisible();

    // Should have one item
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(1);

    // Remove item
    await page.click('[data-testid="remove-item"]');

    // Should have no items
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(0);

    // Cart should show empty state
    await expect(page.getByText('Your cart is empty')).toBeVisible();
  });

  test('should calculate cart total correctly', async ({ page }) => {
    // Add first product to cart
    await page.click('.card button:has-text("Add to Cart")');

    // Open cart
    await page.click('[data-testid="cart-icon"]');
    await expect(page.locator('[data-testid="cart-sidebar"]')).toBeVisible();

    // Get first product price
    const firstProductPrice = await page
      .locator('[data-testid="cart-item-price"]')
      .textContent();
    const firstPrice = parseFloat(
      firstProductPrice?.replace(/[^0-9.]/g, '') || '0'
    );

    // Add second product to cart
    await page.click('[data-testid="close-cart"]'); // Close cart
    await page
      .locator('.card')
      .nth(1)
      .locator('button:has-text("Add to Cart")')
      .click();

    // Open cart again
    await page.click('[data-testid="cart-icon"]');

    // Get second product price
    const secondProductPrice = await page
      .locator('[data-testid="cart-item-price"]')
      .nth(1)
      .textContent();
    const secondPrice = parseFloat(
      secondProductPrice?.replace(/[^0-9.]/g, '') || '0'
    );

    // Get cart total
    const cartTotal = await page
      .locator('[data-testid="cart-total"]')
      .textContent();
    const total = parseFloat(cartTotal?.replace(/[^0-9.]/g, '') || '0');

    // Total should be sum of both products
    expect(total).toBe(firstPrice + secondPrice);
  });

  test('should clear entire cart', async ({ page }) => {
    // Add multiple products to cart
    await page.click('.card button:has-text("Add to Cart")');
    await page
      .locator('.card')
      .nth(1)
      .locator('button:has-text("Add to Cart")')
      .click();
    await page
      .locator('.card')
      .nth(2)
      .locator('button:has-text("Add to Cart")')
      .click();

    // Open cart
    await page.click('[data-testid="cart-icon"]');
    await expect(page.locator('[data-testid="cart-sidebar"]')).toBeVisible();

    // Should have multiple items
    const itemCount = await page.locator('[data-testid="cart-item"]').count();
    expect(itemCount).toBeGreaterThan(1);

    // Clear cart
    await page.click('[data-testid="clear-cart"]');

    // Should have no items
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(0);

    // Cart should show empty state
    await expect(page.getByText('Your cart is empty')).toBeVisible();
  });

  test('should persist cart state across page navigation', async ({ page }) => {
    // Add product to cart
    await page.click('.card button:has-text("Add to Cart")');

    // Get cart count
    const cartCount = await page
      .locator('[data-testid="cart-count"]')
      .textContent();

    // Navigate to a different page (if available) or refresh
    await page.reload();

    // Wait for page to load
    await expect(page.locator('.card')).toBeVisible();

    // Cart count should persist
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText(
      cartCount || '0'
    );
  });

  test('should handle cart with many items', async ({ page }) => {
    // Add multiple products to cart
    for (let i = 0; i < 5; i++) {
      await page
        .locator('.card')
        .nth(i)
        .locator('button:has-text("Add to Cart")')
        .click();
    }

    // Open cart
    await page.click('[data-testid="cart-icon"]');
    await expect(page.locator('[data-testid="cart-sidebar"]')).toBeVisible();

    // Should have 5 items
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(5);

    // Cart should be scrollable if needed
    const cartSidebar = page.locator('[data-testid="cart-sidebar"]');
    await expect(cartSidebar).toBeVisible();
  });

  test('should show cart as empty when no items', async ({ page }) => {
    // Open cart without adding items
    await page.click('[data-testid="cart-icon"]');
    await expect(page.locator('[data-testid="cart-sidebar"]')).toBeVisible();

    // Should show empty state
    await expect(page.getByText('Your cart is empty')).toBeVisible();
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(0);
  });

  test('should close cart sidebar', async ({ page }) => {
    // Add product to cart
    await page.click('.card button:has-text("Add to Cart")');

    // Open cart
    await page.click('[data-testid="cart-icon"]');
    await expect(page.locator('[data-testid="cart-sidebar"]')).toBeVisible();

    // Close cart
    await page.click('[data-testid="close-cart"]');

    // Cart should be hidden
    await expect(
      page.locator('[data-testid="cart-sidebar"]')
    ).not.toBeVisible();
  });
});
