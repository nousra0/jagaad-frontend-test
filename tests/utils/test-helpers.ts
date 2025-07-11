import { Page, expect } from '@playwright/test'

export interface Product {
  image: string
  title: string
  description: string
  price: string
  currency: string
}

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for products to load on the homepage
   */
  async waitForProducts() {
    await expect(this.page.locator('.card')).toBeVisible()
  }

  /**
   * Add a product to cart by index
   */
  async addProductToCart(index: number = 0) {
    await this.page.locator('.card').nth(index).locator('button:has-text("Add to Cart")').click()
  }

  /**
   * Add a product to wishlist by index
   */
  async addProductToWishlist(index: number = 0) {
    await this.page.locator('.card').nth(index).locator('button.btn-circle').click()
  }

  /**
   * Open cart sidebar
   */
  async openCart() {
    await this.page.click('[data-testid="cart-icon"]')
    await expect(this.page.locator('[data-testid="cart-sidebar"]')).toBeVisible()
  }

  /**
   * Open wishlist sidebar
   */
  async openWishlist() {
    await this.page.click('[data-testid="wishlist-icon"]')
    await expect(this.page.locator('[data-testid="wishlist-sidebar"]')).toBeVisible()
  }

  /**
   * Close cart sidebar
   */
  async closeCart() {
    await this.page.click('[data-testid="close-cart"]')
    await expect(this.page.locator('[data-testid="cart-sidebar"]')).not.toBeVisible()
  }

  /**
   * Close wishlist sidebar
   */
  async closeWishlist() {
    await this.page.click('[data-testid="close-wishlist"]')
    await expect(this.page.locator('[data-testid="wishlist-sidebar"]')).not.toBeVisible()
  }

  /**
   * Search for products
   */
  async searchProducts(query: string) {
    await this.page.fill('input[placeholder="Search products..."]', query)
    await this.page.waitForTimeout(500) // Wait for search to complete
  }

  /**
   * Clear search
   */
  async clearSearch() {
    await this.page.click('button[aria-label="Clear search"]')
  }

  /**
   * Sort products by option
   */
  async sortProducts(option: 'default' | 'price-high-low' | 'price-low-high' | 'alphabetical') {
    await this.page.selectOption('select', option)
    await this.page.waitForTimeout(500)
  }

  /**
   * Get cart count
   */
  async getCartCount(): Promise<number> {
    const countText = await this.page.locator('[data-testid="cart-count"]').textContent()
    return parseInt(countText || '0')
  }

  /**
   * Get wishlist count
   */
  async getWishlistCount(): Promise<number> {
    const countText = await this.page.locator('[data-testid="wishlist-count"]').textContent()
    return parseInt(countText || '0')
  }

  /**
   * Get product titles
   */
  async getProductTitles(): Promise<string[]> {
    return await this.page.locator('.card-title').allTextContents()
  }

  /**
   * Get product count
   */
  async getProductCount(): Promise<number> {
    return await this.page.locator('.card').count()
  }

  /**
   * Check if product is in wishlist by index
   */
  async isProductInWishlist(index: number = 0): Promise<boolean> {
    const wishlistButton = this.page.locator('.card').nth(index).locator('button.btn-circle')
    const classes = await wishlistButton.getAttribute('class')
    return classes?.includes('btn-primary') || false
  }

  /**
   * Navigate to homepage
   */
  async goToHomepage() {
    await this.page.goto('/')
    await this.waitForProducts()
  }

  /**
   * Refresh page and wait for products
   */
  async refreshAndWaitForProducts() {
    await this.page.reload()
    await this.waitForProducts()
  }

  /**
   * Set mobile viewport
   */
  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 })
  }

  /**
   * Set desktop viewport
   */
  async setDesktopViewport() {
    await this.page.setViewportSize({ width: 1280, height: 720 })
  }

  /**
   * Wait for loading to complete
   */
  async waitForLoadingComplete() {
    // Wait for loading spinner to disappear
    await this.page.waitForSelector('.loading-spinner', { state: 'hidden', timeout: 10000 })
  }

  /**
   * Get cart total
   */
  async getCartTotal(): Promise<number> {
    const totalText = await this.page.locator('[data-testid="cart-total"]').textContent()
    return parseFloat(totalText?.replace(/[^0-9.]/g, '') || '0')
  }

  /**
   * Remove product from cart by index
   */
  async removeProductFromCart(index: number = 0) {
    await this.openCart()
    await this.page.locator('[data-testid="remove-item"]').nth(index).click()
  }

  /**
   * Remove product from wishlist by index
   */
  async removeProductFromWishlist(index: number = 0) {
    await this.openWishlist()
    await this.page.locator('[data-testid="remove-wishlist-item"]').nth(index).click()
  }

  /**
   * Clear cart
   */
  async clearCart() {
    await this.openCart()
    await this.page.click('[data-testid="clear-cart"]')
  }

  /**
   * Clear wishlist
   */
  async clearWishlist() {
    await this.openWishlist()
    await this.page.click('[data-testid="clear-wishlist"]')
  }

  /**
   * Update product quantity in cart
   */
  async updateCartQuantity(index: number, newQuantity: number) {
    await this.openCart()
    const quantityInput = this.page.locator('[data-testid="quantity-input"]').nth(index)
    await quantityInput.fill(newQuantity.toString())
    await quantityInput.press('Enter')
  }

  /**
   * Add to cart from wishlist
   */
  async addToCartFromWishlist(index: number = 0) {
    await this.openWishlist()
    await this.page.locator('[data-testid="add-to-cart-from-wishlist"]').nth(index).click()
  }
}

/**
 * Create test helpers instance
 */
export function createTestHelpers(page: Page): TestHelpers {
  return new TestHelpers(page)
}

/**
 * Mock product data for testing
 */
export const mockProducts: Product[] = [
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Test Product 1',
    description: 'A test product description',
    price: '29.99',
    currency: 'USD'
  },
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Test Product 2',
    description: 'Another test product description',
    price: '19.99',
    currency: 'USD'
  },
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Test Product 3',
    description: 'Yet another test product description',
    price: '39.99',
    currency: 'USD'
  }
]

/**
 * Common test assertions
 */
export const assertions = {
  /**
   * Assert cart count equals expected value
   */
  async cartCountEquals(page: Page, expected: number) {
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText(expected.toString())
  },

  /**
   * Assert wishlist count equals expected value
   */
  async wishlistCountEquals(page: Page, expected: number) {
    await expect(page.locator('[data-testid="wishlist-count"]')).toHaveText(expected.toString())
  },

  /**
   * Assert product is in wishlist
   */
  async productInWishlist(page: Page, index: number = 0) {
    const wishlistButton = page.locator('.card').nth(index).locator('button.btn-circle')
    await expect(wishlistButton).toHaveClass(/btn-primary/)
  },

  /**
   * Assert product is not in wishlist
   */
  async productNotInWishlist(page: Page, index: number = 0) {
    const wishlistButton = page.locator('.card').nth(index).locator('button.btn-circle')
    await expect(wishlistButton).toHaveClass(/btn-ghost/)
  },

  /**
   * Assert cart is empty
   */
  async cartIsEmpty(page: Page) {
    await expect(page.getByText('Your cart is empty')).toBeVisible()
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(0)
  },

  /**
   * Assert wishlist is empty
   */
  async wishlistIsEmpty(page: Page) {
    await expect(page.getByText('Your wishlist is empty')).toBeVisible()
    await expect(page.locator('[data-testid="wishlist-item"]')).toHaveCount(0)
  }
} 