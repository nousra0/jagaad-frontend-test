import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useWishlistStore } from '@/stores/wishlistStore';

describe('Wishlist Store', () => {
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
      const wishlistStore = useWishlistStore();
      expect(wishlistStore.items).toEqual([]);
    });
  });

  describe('Getters', () => {
    it('should calculate wishlist count correctly', () => {
      const wishlistStore = useWishlistStore();
      wishlistStore.addToWishlist(mockProduct);
      wishlistStore.addToWishlist(mockProduct2);

      expect(wishlistStore.wishlistCount).toBe(2);
    });

    it('should return true when wishlist is empty', () => {
      const wishlistStore = useWishlistStore();
      expect(wishlistStore.isWishlistEmpty).toBe(true);
    });

    it('should return false when wishlist has items', () => {
      const wishlistStore = useWishlistStore();
      wishlistStore.addToWishlist(mockProduct);
      expect(wishlistStore.isWishlistEmpty).toBe(false);
    });
  });

  describe('Actions', () => {
    describe('addToWishlist', () => {
      it('should add a new product to wishlist', () => {
        const wishlistStore = useWishlistStore();
        wishlistStore.addToWishlist(mockProduct);

        expect(wishlistStore.items).toHaveLength(1);
        expect(wishlistStore.items[0]).toEqual(mockProduct);
      });

      it('should not add duplicate products', () => {
        const wishlistStore = useWishlistStore();
        wishlistStore.addToWishlist(mockProduct);
        wishlistStore.addToWishlist(mockProduct);

        expect(wishlistStore.items).toHaveLength(1);
        expect(wishlistStore.items[0]).toEqual(mockProduct);
      });

      it('should handle multiple different products', () => {
        const wishlistStore = useWishlistStore();
        wishlistStore.addToWishlist(mockProduct);
        wishlistStore.addToWishlist(mockProduct2);

        expect(wishlistStore.items).toHaveLength(2);
        expect(wishlistStore.items[0]).toEqual(mockProduct);
        expect(wishlistStore.items[1]).toEqual(mockProduct2);
      });
    });

    describe('removeFromWishlist', () => {
      it('should remove a product from wishlist', () => {
        const wishlistStore = useWishlistStore();
        wishlistStore.addToWishlist(mockProduct);
        wishlistStore.addToWishlist(mockProduct2);

        wishlistStore.removeFromWishlist(mockProduct.title);

        expect(wishlistStore.items).toHaveLength(1);
        expect(wishlistStore.items[0]).toEqual(mockProduct2);
      });

      it('should do nothing when removing non-existent product', () => {
        const wishlistStore = useWishlistStore();
        wishlistStore.addToWishlist(mockProduct);

        wishlistStore.removeFromWishlist('Non-existent Product');

        expect(wishlistStore.items).toHaveLength(1);
        expect(wishlistStore.items[0]).toEqual(mockProduct);
      });
    });

    describe('isInWishlist', () => {
      it('should return true for product in wishlist', () => {
        const wishlistStore = useWishlistStore();
        wishlistStore.addToWishlist(mockProduct);

        expect(wishlistStore.isInWishlist(mockProduct.title)).toBe(true);
      });

      it('should return false for product not in wishlist', () => {
        const wishlistStore = useWishlistStore();
        wishlistStore.addToWishlist(mockProduct);

        expect(wishlistStore.isInWishlist('Non-existent Product')).toBe(false);
      });

      it('should return false for empty wishlist', () => {
        const wishlistStore = useWishlistStore();

        expect(wishlistStore.isInWishlist(mockProduct.title)).toBe(false);
      });
    });

    describe('clearWishlist', () => {
      it('should remove all items from wishlist', () => {
        const wishlistStore = useWishlistStore();
        wishlistStore.addToWishlist(mockProduct);
        wishlistStore.addToWishlist(mockProduct2);

        wishlistStore.clearWishlist();

        expect(wishlistStore.items).toHaveLength(0);
        expect(wishlistStore.isWishlistEmpty).toBe(true);
      });
    });
  });

  describe('Integration', () => {
    it('should handle complex wishlist operations', () => {
      const wishlistStore = useWishlistStore();

      // Add products
      wishlistStore.addToWishlist(mockProduct);
      wishlistStore.addToWishlist(mockProduct2);

      // Verify state
      expect(wishlistStore.wishlistCount).toBe(2);
      expect(wishlistStore.isWishlistEmpty).toBe(false);
      expect(wishlistStore.isInWishlist(mockProduct.title)).toBe(true);
      expect(wishlistStore.isInWishlist(mockProduct2.title)).toBe(true);

      // Try to add duplicate
      wishlistStore.addToWishlist(mockProduct);
      expect(wishlistStore.wishlistCount).toBe(2);

      // Remove one product
      wishlistStore.removeFromWishlist(mockProduct.title);

      // Verify final state
      expect(wishlistStore.wishlistCount).toBe(1);
      expect(wishlistStore.isInWishlist(mockProduct.title)).toBe(false);
      expect(wishlistStore.isInWishlist(mockProduct2.title)).toBe(true);
      expect(wishlistStore.items[0]).toEqual(mockProduct2);
    });
  });
});
