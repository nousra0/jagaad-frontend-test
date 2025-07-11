import { defineStore } from 'pinia';

interface Product {
  image: string;
  title: string;
  description: string;
  price: string;
  currency: string;
}

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [] as Product[],
  }),

  getters: {
    wishlistCount: state => state.items.length,

    isWishlistEmpty: state => state.items.length === 0,
  },

  actions: {
    addToWishlist(product: Product) {
      const existingItem = this.items.find(
        item => item.title === product.title
      );

      if (!existingItem) {
        this.items.push(product);
      }
    },

    removeFromWishlist(productTitle: string) {
      const index = this.items.findIndex(item => item.title === productTitle);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    },

    isInWishlist(productTitle: string) {
      return this.items.some(item => item.title === productTitle);
    },

    clearWishlist() {
      this.items.length = 0;
    },
  },
});
