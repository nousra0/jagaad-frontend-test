import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from '@/stores/cartStore';

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const mockProduct = {
    image: 'test-image.jpg',
    title: 'Test Product',
    description: 'A test product',
    price: '29.99',
    currency: 'USD',
  };

  const mockProduct2 = {
    image: 'test-image-2.jpg',
    title: 'Test Product 2',
    description: 'Another test product',
    price: '19.99',
    currency: 'USD',
  };

  describe('State', () => {
    it('should initialize with empty items array', () => {
      const cartStore = useCartStore();
      expect(cartStore.items).toEqual([]);
    });
  });

  describe('Getters', () => {
    it('should calculate cart count correctly', () => {
      const cartStore = useCartStore();
      cartStore.addToCart(mockProduct);
      cartStore.addToCart(mockProduct); // Should increase quantity
      cartStore.addToCart(mockProduct2);

      expect(cartStore.cartCount).toBe(3);
    });

    it('should calculate cart total correctly', () => {
      const cartStore = useCartStore();
      cartStore.addToCart(mockProduct); // 29.99
      cartStore.addToCart(mockProduct); // 29.99 * 2 = 59.98
      cartStore.addToCart(mockProduct2); // 19.99

      expect(cartStore.cartTotal).toBe(79.97);
    });

    it('should return true when cart is empty', () => {
      const cartStore = useCartStore();
      expect(cartStore.isCartEmpty).toBe(true);
    });

    it('should return false when cart has items', () => {
      const cartStore = useCartStore();
      cartStore.addToCart(mockProduct);
      expect(cartStore.isCartEmpty).toBe(false);
    });
  });

  describe('Actions', () => {
    describe('addToCart', () => {
      it('should add a new product to cart', () => {
        const cartStore = useCartStore();
        cartStore.addToCart(mockProduct);

        expect(cartStore.items).toHaveLength(1);
        expect(cartStore.items[0].product).toEqual(mockProduct);
        expect(cartStore.items[0].quantity).toBe(1);
      });

      it('should increase quantity when adding same product', () => {
        const cartStore = useCartStore();
        cartStore.addToCart(mockProduct);
        cartStore.addToCart(mockProduct);

        expect(cartStore.items).toHaveLength(1);
        expect(cartStore.items[0].quantity).toBe(2);
      });

      it('should handle multiple different products', () => {
        const cartStore = useCartStore();
        cartStore.addToCart(mockProduct);
        cartStore.addToCart(mockProduct2);

        expect(cartStore.items).toHaveLength(2);
        expect(cartStore.items[0].product).toEqual(mockProduct);
        expect(cartStore.items[1].product).toEqual(mockProduct2);
      });
    });

    describe('removeFromCart', () => {
      it('should remove a product from cart', () => {
        const cartStore = useCartStore();
        cartStore.addToCart(mockProduct);
        cartStore.addToCart(mockProduct2);

        cartStore.removeFromCart(mockProduct.title);

        expect(cartStore.items).toHaveLength(1);
        expect(cartStore.items[0].product).toEqual(mockProduct2);
      });

      it('should do nothing when removing non-existent product', () => {
        const cartStore = useCartStore();
        cartStore.addToCart(mockProduct);

        cartStore.removeFromCart('Non-existent Product');

        expect(cartStore.items).toHaveLength(1);
        expect(cartStore.items[0].product).toEqual(mockProduct);
      });
    });

    describe('updateQuantity', () => {
      it('should update quantity of existing product', () => {
        const cartStore = useCartStore();
        cartStore.addToCart(mockProduct);

        cartStore.updateQuantity(mockProduct.title, 3);

        expect(cartStore.items[0].quantity).toBe(3);
      });

      it('should remove product when quantity is 0', () => {
        const cartStore = useCartStore();
        cartStore.addToCart(mockProduct);
        cartStore.addToCart(mockProduct2);

        cartStore.updateQuantity(mockProduct.title, 0);

        expect(cartStore.items).toHaveLength(1);
        expect(cartStore.items[0].product).toEqual(mockProduct2);
      });

      it('should remove product when quantity is negative', () => {
        const cartStore = useCartStore();
        cartStore.addToCart(mockProduct);

        cartStore.updateQuantity(mockProduct.title, -1);

        expect(cartStore.items).toHaveLength(0);
      });

      it('should do nothing when updating non-existent product', () => {
        const cartStore = useCartStore();
        cartStore.addToCart(mockProduct);

        cartStore.updateQuantity('Non-existent Product', 5);

        expect(cartStore.items).toHaveLength(1);
        expect(cartStore.items[0].quantity).toBe(1);
      });
    });

    describe('clearCart', () => {
      it('should remove all items from cart', () => {
        const cartStore = useCartStore();
        cartStore.addToCart(mockProduct);
        cartStore.addToCart(mockProduct2);

        cartStore.clearCart();

        expect(cartStore.items).toHaveLength(0);
        expect(cartStore.isCartEmpty).toBe(true);
      });
    });
  });

  describe('Integration', () => {
    it('should handle complex cart operations', () => {
      const cartStore = useCartStore();

      // Add products
      cartStore.addToCart(mockProduct);
      cartStore.addToCart(mockProduct);
      cartStore.addToCart(mockProduct2);

      // Verify state
      expect(cartStore.cartCount).toBe(3);
      expect(cartStore.cartTotal).toBe(79.97);
      expect(cartStore.isCartEmpty).toBe(false);

      // Update quantities
      cartStore.updateQuantity(mockProduct.title, 1);
      cartStore.updateQuantity(mockProduct2.title, 2);

      // Verify updated state
      expect(cartStore.cartCount).toBe(3);
      expect(cartStore.cartTotal).toBe(69.97);

      // Remove one product
      cartStore.removeFromCart(mockProduct.title);

      // Verify final state
      expect(cartStore.cartCount).toBe(2);
      expect(cartStore.cartTotal).toBe(39.98);
      expect(cartStore.items).toHaveLength(1);
    });
  });
});
