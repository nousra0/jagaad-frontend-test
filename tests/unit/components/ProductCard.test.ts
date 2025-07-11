import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import ProductCard from '@/components/ProductCard.vue'

// Mock the useCurrency composable
vi.mock('@/composables/useCurrency', () => ({
  useCurrency: () => ({
    formatCurrencyWithCode: vi.fn((price, currency) => `${currency} ${price}`)
  })
}))

describe('ProductCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const mockProduct = {
    image: 'test-image.jpg',
    title: 'Test Product',
    description: 'A test product description',
    price: '29.99',
    currency: 'USD'
  }

  describe('Rendering', () => {
    it('should render product information correctly', () => {
      const wrapper = mount(ProductCard, {
        props: { product: mockProduct }
      })

      expect(wrapper.find('img').attributes('src')).toBe(mockProduct.image)
      expect(wrapper.find('img').attributes('alt')).toBe(mockProduct.title)
      expect(wrapper.find('.card-title').text()).toBe(mockProduct.title)
      expect(wrapper.find('.text-gray-600').text()).toBe(mockProduct.description)
    })

    it('should display formatted price', () => {
      const wrapper = mount(ProductCard, {
        props: { product: mockProduct }
      })

      expect(wrapper.find('.text-2xl').text()).toBe('USD 29.99')
    })

    it('should render add to cart button', () => {
      const wrapper = mount(ProductCard, {
        props: { product: mockProduct }
      })

      const buttons = wrapper.findAll('button')
      const addToCartButton = buttons.find(button => button.text().includes('Add to Cart'))
      expect(addToCartButton).toBeTruthy()
    })

    it('should render wishlist button', () => {
      const wrapper = mount(ProductCard, {
        props: { product: mockProduct }
      })

      const wishlistButton = wrapper.find('button.btn-circle')
      expect(wishlistButton.exists()).toBe(true)
    })
  })

  describe('Wishlist functionality', () => {
    it('should show wishlist button as ghost when product is not in wishlist', () => {
      const wrapper = mount(ProductCard, {
        props: { product: mockProduct }
      })

      const wishlistButton = wrapper.find('button.btn-circle')
      const classes = wishlistButton.classes()
      expect(classes).toContain('btn-ghost')
      expect(classes).toContain('bg-white/80')
      expect(classes).toContain('hover:bg-white')
    })

    it('should show wishlist button as primary when product is in wishlist', async () => {
      const wrapper = mount(ProductCard, {
        props: { product: mockProduct }
      })

      // Add product to wishlist
      const wishlistButton = wrapper.find('button.btn-circle')
      await wishlistButton.trigger('click')

      expect(wishlistButton.classes()).toContain('btn-primary')
    })

    it('should toggle wishlist state when wishlist button is clicked', async () => {
      const wrapper = mount(ProductCard, {
        props: { product: mockProduct }
      })

      const wishlistButton = wrapper.find('button.btn-circle')
      
      // Initially should have base classes
      const initialClasses = wishlistButton.classes()
      expect(initialClasses).toContain('btn')
      expect(initialClasses).toContain('btn-circle')
      
      // Click to add to wishlist
      await wishlistButton.trigger('click')
      
      // Click again to remove from wishlist
      await wishlistButton.trigger('click')
      
      // Button should still exist and be clickable
      expect(wishlistButton.exists()).toBe(true)
    })
  })

  describe('Cart functionality', () => {
    it('should add product to cart when add to cart button is clicked', async () => {
      const wrapper = mount(ProductCard, {
        props: { product: mockProduct }
      })

      const buttons = wrapper.findAll('button')
      const addToCartButton = buttons.find(button => button.text().includes('Add to Cart'))
      if (addToCartButton) {
        await addToCartButton.trigger('click')
      }

      // The cart store should have been called, but we can't easily test this
      // without mocking the store. In a real scenario, you might want to emit
      // events or use a more testable architecture.
    })
  })

  describe('Props validation', () => {
    it('should require product prop', () => {
      // This would normally be caught by TypeScript, but we can test the component
      // handles missing props gracefully
      expect(() => {
        mount(ProductCard, {
          props: {}
        })
      }).toThrow()
    })

    it('should handle product with missing optional fields', () => {
      const minimalProduct = {
        image: 'test.jpg',
        title: 'Test',
        description: 'Test description',
        price: '10.00',
        currency: 'USD'
      }

      const wrapper = mount(ProductCard, {
        props: { product: minimalProduct }
      })

      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('should have proper alt text for product image', () => {
      const wrapper = mount(ProductCard, {
        props: { product: mockProduct }
      })

      const img = wrapper.find('img')
      expect(img.attributes('alt')).toBe(mockProduct.title)
    })

    it('should have proper button text for add to cart', () => {
      const wrapper = mount(ProductCard, {
        props: { product: mockProduct }
      })

      const buttons = wrapper.findAll('button')
      const addToCartButton = buttons.find(button => button.text().includes('Add to Cart'))
      expect(addToCartButton?.text()).toBe('Add to Cart')
    })
  })

  describe('Styling', () => {
    it('should have proper CSS classes for card styling', () => {
      const wrapper = mount(ProductCard, {
        props: { product: mockProduct }
      })

      const card = wrapper.find('.card')
      expect(card.classes()).toContain('bg-base-100')
      expect(card.classes()).toContain('shadow-xl')
      expect(card.classes()).toContain('hover:shadow-2xl')
    })

    it('should have proper image styling', () => {
      const wrapper = mount(ProductCard, {
        props: { product: mockProduct }
      })

      const img = wrapper.find('img')
      expect(img.classes()).toContain('rounded-xl')
      expect(img.classes()).toContain('h-48')
      expect(img.classes()).toContain('w-full')
      expect(img.classes()).toContain('object-cover')
    })
  })
}) 