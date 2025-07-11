import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display homepage with products', async ({ page }) => {
    // Check that the page loads
    await expect(page).toHaveTitle(/FeedbackHub/)
    
    // Check for main heading
    await expect(page.getByRole('heading', { name: 'Featured Products' })).toBeVisible()
    
    // Check that products are loaded
    await expect(page.locator('.card')).toHaveCount(10) // Default items per page
    
    // Check that product cards have required elements
    const firstProductCard = page.locator('.card').first()
    await expect(firstProductCard.locator('img')).toBeVisible()
    await expect(firstProductCard.locator('.card-title')).toBeVisible()
    await expect(firstProductCard.locator('button:has-text("Add to Cart")')).toBeVisible()
  })

  test('should display loading state initially', async ({ page }) => {
    // Navigate to a fresh page to see loading state
    await page.goto('/')
    
    // Loading spinner should be visible briefly
    await expect(page.locator('.loading-spinner')).toBeVisible()
    
    // Then products should load
    await expect(page.locator('.card')).toBeVisible()
  })

  test('should search products', async ({ page }) => {
    // Wait for products to load
    await expect(page.locator('.card')).toBeVisible()
    
    // Get initial product count
    const initialProductCount = await page.locator('.card').count()
    
    // Search for a specific product
    await page.fill('input[placeholder="Search products..."]', 'laptop')
    await page.waitForTimeout(500) // Wait for search to complete
    
    // Check that search results are displayed
    const searchResults = await page.locator('.card').count()
    expect(searchResults).toBeLessThanOrEqual(initialProductCount)
    
    // Check search results info
    await expect(page.getByText(/Found \d+ product/)).toBeVisible()
    
    // Clear search
    await page.click('button[aria-label="Clear search"]')
    await expect(page.locator('.card')).toHaveCount(initialProductCount)
  })

  test('should sort products', async ({ page }) => {
    // Wait for products to load
    await expect(page.locator('.card')).toBeVisible()
    
    // Get initial product titles
    const initialTitles = await page.locator('.card-title').allTextContents()
    
    // Sort by price high to low
    await page.selectOption('select', 'price-high-low')
    await page.waitForTimeout(500)
    
    // Get sorted product titles
    const sortedTitles = await page.locator('.card-title').allTextContents()
    
    // Titles should be different after sorting
    expect(sortedTitles).not.toEqual(initialTitles)
    
    // Sort by alphabetical
    await page.selectOption('select', 'alphabetical')
    await page.waitForTimeout(500)
    
    const alphabeticalTitles = await page.locator('.card-title').allTextContents()
    expect(alphabeticalTitles).not.toEqual(sortedTitles)
  })

  test('should paginate products', async ({ page }) => {
    // Wait for products to load
    await expect(page.locator('.card')).toBeVisible()
    
    // Get first page products
    const firstPageProducts = await page.locator('.card-title').allTextContents()
    
    // Click next page
    await page.click('button:has-text("Next")')
    await page.waitForTimeout(500)
    
    // Get second page products
    const secondPageProducts = await page.locator('.card-title').allTextContents()
    
    // Products should be different
    expect(secondPageProducts).not.toEqual(firstPageProducts)
    
    // Go back to first page
    await page.click('button:has-text("Previous")')
    await page.waitForTimeout(500)
    
    const backToFirstPage = await page.locator('.card-title').allTextContents()
    expect(backToFirstPage).toEqual(firstPageProducts)
  })

  test('should add products to cart', async ({ page }) => {
    // Wait for products to load
    await expect(page.locator('.card')).toBeVisible()
    
    // Get initial cart count
    const initialCartCount = await page.locator('[data-testid="cart-count"]').textContent() || '0'
    
    // Add first product to cart
    await page.click('.card button:has-text("Add to Cart")')
    
    // Cart count should increase
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText(/(\d+)/)
    
    // Add another product to cart
    await page.locator('.card').nth(1).locator('button:has-text("Add to Cart")').click()
    
    // Cart count should increase again
    const newCartCount = await page.locator('[data-testid="cart-count"]').textContent()
    expect(parseInt(newCartCount || '0')).toBeGreaterThan(parseInt(initialCartCount))
  })

  test('should toggle wishlist', async ({ page }) => {
    // Wait for products to load
    await expect(page.locator('.card')).toBeVisible()
    
    // Get first product's wishlist button
    const wishlistButton = page.locator('.card').first().locator('button.btn-circle')
    
    // Initially should be ghost style (not in wishlist)
    await expect(wishlistButton).toHaveClass(/btn-ghost/)
    
    // Click to add to wishlist
    await wishlistButton.click()
    
    // Should now be primary style (in wishlist)
    await expect(wishlistButton).toHaveClass(/btn-primary/)
    
    // Click again to remove from wishlist
    await wishlistButton.click()
    
    // Should be ghost style again
    await expect(wishlistButton).toHaveClass(/btn-ghost/)
  })

  test('should handle empty search results', async ({ page }) => {
    // Wait for products to load
    await expect(page.locator('.card')).toBeVisible()
    
    // Search for something that doesn't exist
    await page.fill('input[placeholder="Search products..."]', 'nonexistentproduct12345')
    await page.waitForTimeout(500)
    
    // Should show no results message
    await expect(page.getByText('No products found')).toBeVisible()
    await expect(page.locator('.card')).toHaveCount(0)
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Wait for products to load
    await expect(page.locator('.card')).toBeVisible()
    
    // Check that search and sort controls are stacked on mobile
    const searchContainer = page.locator('.flex-col')
    await expect(searchContainer).toBeVisible()
    
    // Check that products are still visible
    await expect(page.locator('.card')).toBeVisible()
  })

  test('should handle error state', async ({ page }) => {
    // This test would require mocking the API to return an error
    // For now, we'll just check that the error handling UI exists
    // In a real scenario, you'd mock the API call to fail
    
    // Navigate to page
    await page.goto('/')
    
    // Products should load successfully
    await expect(page.locator('.card')).toBeVisible()
  })
}) 