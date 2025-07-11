import { test, expect } from '@playwright/test';

test.describe('Wishlist Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for products to load
    await expect(page.locator('.card')).toBeVisible();
  });

  test('should add products to wishlist', async ({ page }) => {
    // Get first product's wishlist button
    const wishlistButton = page
      .locator('.card')
      .first()
      .locator('button.btn-circle');

    // Initially should be ghost style (not in wishlist)
    await expect(wishlistButton).toHaveClass(/btn-ghost/);

    // Click to add to wishlist
    await wishlistButton.click();

    // Should now be primary style (in wishlist)
    await expect(wishlistButton).toHaveClass(/btn-primary/);

    // Wishlist count should increase
    await expect(page.locator('[data-testid="wishlist-count"]')).toHaveText(
      '1'
    );
  });

  test('should remove products from wishlist', async ({ page }) => {
    // Add product to wishlist first
    const wishlistButton = page
      .locator('.card')
      .first()
      .locator('button.btn-circle');
    await wishlistButton.click();

    // Verify it's in wishlist
    await expect(wishlistButton).toHaveClass(/btn-primary/);
    await expect(page.locator('[data-testid="wishlist-count"]')).toHaveText(
      '1'
    );

    // Click again to remove from wishlist
    await wishlistButton.click();

    // Should be ghost style again (not in wishlist)
    await expect(wishlistButton).toHaveClass(/btn-ghost/);

    // Wishlist count should decrease
    await expect(page.locator('[data-testid="wishlist-count"]')).toHaveText(
      '0'
    );
  });

  test('should open wishlist sidebar', async ({ page }) => {
    // Add a product to wishlist first
    const wishlistButton = page
      .locator('.card')
      .first()
      .locator('button.btn-circle');
    await wishlistButton.click();

    // Click wishlist icon to open sidebar
    await page.click('[data-testid="wishlist-icon"]');

    // Wishlist sidebar should be visible
    await expect(
      page.locator('[data-testid="wishlist-sidebar"]')
    ).toBeVisible();

    // Should show added product
    await expect(page.locator('[data-testid="wishlist-item"]')).toBeVisible();
  });

  test('should not add duplicate products to wishlist', async ({ page }) => {
    // Add product to wishlist
    const wishlistButton = page
      .locator('.card')
      .first()
      .locator('button.btn-circle');
    await wishlistButton.click();

    // Wishlist count should be 1
    await expect(page.locator('[data-testid="wishlist-count"]')).toHaveText(
      '1'
    );

    // Try to add same product again
    await wishlistButton.click();

    // Wishlist count should still be 1 (no duplicates)
    await expect(page.locator('[data-testid="wishlist-count"]')).toHaveText(
      '1'
    );
  });

  test('should remove product from wishlist sidebar', async ({ page }) => {
    // Add product to wishlist
    const wishlistButton = page
      .locator('.card')
      .first()
      .locator('button.btn-circle');
    await wishlistButton.click();

    // Open wishlist
    await page.click('[data-testid="wishlist-icon"]');
    await expect(
      page.locator('[data-testid="wishlist-sidebar"]')
    ).toBeVisible();

    // Should have one item
    await expect(page.locator('[data-testid="wishlist-item"]')).toHaveCount(1);

    // Remove item from wishlist
    await page.click('[data-testid="remove-wishlist-item"]');

    // Should have no items
    await expect(page.locator('[data-testid="wishlist-item"]')).toHaveCount(0);

    // Wishlist should show empty state
    await expect(page.getByText('Your wishlist is empty')).toBeVisible();

    // Product button should be ghost style again
    await expect(wishlistButton).toHaveClass(/btn-ghost/);
  });

  test('should clear entire wishlist', async ({ page }) => {
    // Add multiple products to wishlist
    for (let i = 0; i < 3; i++) {
      const wishlistButton = page
        .locator('.card')
        .nth(i)
        .locator('button.btn-circle');
      await wishlistButton.click();
    }

    // Open wishlist
    await page.click('[data-testid="wishlist-icon"]');
    await expect(
      page.locator('[data-testid="wishlist-sidebar"]')
    ).toBeVisible();

    // Should have multiple items
    const itemCount = await page
      .locator('[data-testid="wishlist-item"]')
      .count();
    expect(itemCount).toBe(3);

    // Clear wishlist
    await page.click('[data-testid="clear-wishlist"]');

    // Should have no items
    await expect(page.locator('[data-testid="wishlist-item"]')).toHaveCount(0);

    // Wishlist should show empty state
    await expect(page.getByText('Your wishlist is empty')).toBeVisible();

    // All wishlist buttons should be ghost style
    for (let i = 0; i < 3; i++) {
      const wishlistButton = page
        .locator('.card')
        .nth(i)
        .locator('button.btn-circle');
      await expect(wishlistButton).toHaveClass(/btn-ghost/);
    }
  });

  test('should persist wishlist state across page navigation', async ({
    page,
  }) => {
    // Add product to wishlist
    const wishlistButton = page
      .locator('.card')
      .first()
      .locator('button.btn-circle');
    await wishlistButton.click();

    // Get wishlist count
    const wishlistCount = await page
      .locator('[data-testid="wishlist-count"]')
      .textContent();

    // Navigate to a different page (if available) or refresh
    await page.reload();

    // Wait for page to load
    await expect(page.locator('.card')).toBeVisible();

    // Wishlist count should persist
    await expect(page.locator('[data-testid="wishlist-count"]')).toHaveText(
      wishlistCount || '0'
    );

    // Product should still be in wishlist (button should be primary)
    const newWishlistButton = page
      .locator('.card')
      .first()
      .locator('button.btn-circle');
    await expect(newWishlistButton).toHaveClass(/btn-primary/);
  });

  test('should handle wishlist with many items', async ({ page }) => {
    // Add multiple products to wishlist
    for (let i = 0; i < 5; i++) {
      const wishlistButton = page
        .locator('.card')
        .nth(i)
        .locator('button.btn-circle');
      await wishlistButton.click();
    }

    // Open wishlist
    await page.click('[data-testid="wishlist-icon"]');
    await expect(
      page.locator('[data-testid="wishlist-sidebar"]')
    ).toBeVisible();

    // Should have 5 items
    await expect(page.locator('[data-testid="wishlist-item"]')).toHaveCount(5);

    // Wishlist should be scrollable if needed
    const wishlistSidebar = page.locator('[data-testid="wishlist-sidebar"]');
    await expect(wishlistSidebar).toBeVisible();
  });

  test('should show wishlist as empty when no items', async ({ page }) => {
    // Open wishlist without adding items
    await page.click('[data-testid="wishlist-icon"]');
    await expect(
      page.locator('[data-testid="wishlist-sidebar"]')
    ).toBeVisible();

    // Should show empty state
    await expect(page.getByText('Your wishlist is empty')).toBeVisible();
    await expect(page.locator('[data-testid="wishlist-item"]')).toHaveCount(0);
  });

  test('should close wishlist sidebar', async ({ page }) => {
    // Add product to wishlist
    const wishlistButton = page
      .locator('.card')
      .first()
      .locator('button.btn-circle');
    await wishlistButton.click();

    // Open wishlist
    await page.click('[data-testid="wishlist-icon"]');
    await expect(
      page.locator('[data-testid="wishlist-sidebar"]')
    ).toBeVisible();

    // Close wishlist
    await page.click('[data-testid="close-wishlist"]');

    // Wishlist should be hidden
    await expect(
      page.locator('[data-testid="wishlist-sidebar"]')
    ).not.toBeVisible();
  });

  test('should add to cart from wishlist', async ({ page }) => {
    // Add product to wishlist
    const wishlistButton = page
      .locator('.card')
      .first()
      .locator('button.btn-circle');
    await wishlistButton.click();

    // Open wishlist
    await page.click('[data-testid="wishlist-icon"]');
    await expect(
      page.locator('[data-testid="wishlist-sidebar"]')
    ).toBeVisible();

    // Add to cart from wishlist
    await page.click('[data-testid="add-to-cart-from-wishlist"]');

    // Product should be added to cart
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');

    // Product should remain in wishlist
    await expect(page.locator('[data-testid="wishlist-item"]')).toHaveCount(1);
  });

  test('should handle multiple wishlist operations', async ({ page }) => {
    // Add multiple products to wishlist
    for (let i = 0; i < 3; i++) {
      const wishlistButton = page
        .locator('.card')
        .nth(i)
        .locator('button.btn-circle');
      await wishlistButton.click();
    }

    // Verify wishlist count
    await expect(page.locator('[data-testid="wishlist-count"]')).toHaveText(
      '3'
    );

    // Remove one product
    const firstWishlistButton = page
      .locator('.card')
      .first()
      .locator('button.btn-circle');
    await firstWishlistButton.click();

    // Wishlist count should decrease
    await expect(page.locator('[data-testid="wishlist-count"]')).toHaveText(
      '2'
    );

    // Add a different product
    const fourthWishlistButton = page
      .locator('.card')
      .nth(3)
      .locator('button.btn-circle');
    await fourthWishlistButton.click();

    // Wishlist count should increase
    await expect(page.locator('[data-testid="wishlist-count"]')).toHaveText(
      '3'
    );
  });
});
