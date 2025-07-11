<script setup lang="ts">
import { useWishlistStore } from '../stores/wishlistStore'
import { useCartStore } from '../stores/cartStore'
import { useCurrency } from '../composables/useCurrency'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

// Currency formatting
const { formatCurrencyWithCode } = useCurrency()

const moveToCart = (product: any) => {
  cartStore.addToCart(product)
  wishlistStore.removeFromWishlist(product.title)
}
</script>

<template>
  <div class="drawer drawer-end">
    <input id="wishlist-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
    </div> 
    <div class="drawer-side">
      <label for="wishlist-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="min-h-full p-4 w-80 bg-base-200 text-base-content">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Wishlist</h2>
          <label for="wishlist-drawer" class="btn btn-sm btn-circle btn-ghost">✕</label>
        </div>

        <!-- Empty Wishlist -->
        <div v-if="wishlistStore.isWishlistEmpty" class="text-center py-8">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <p class="text-gray-500">Your wishlist is empty</p>
        </div>

        <!-- Wishlist Items -->
        <div v-else class="space-y-4">
          <div v-for="product in wishlistStore.items" :key="product.title" class="card bg-base-100 shadow-sm">
            <div class="card-body p-4">
              <div class="flex items-start space-x-3">
                <img 
                  :src="product.image" 
                  :alt="product.title"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-sm line-clamp-2">{{ product.title }}</h3>
                  <p class="text-primary font-bold text-sm">
                    {{ formatCurrencyWithCode(product.price, product.currency) }}
                  </p>
                </div>
                <button 
                  @click="wishlistStore.removeFromWishlist(product.title)"
                  class="btn btn-ghost btn-xs text-error"
                >
                  ✕
                </button>
              </div>
              
              <div class="flex justify-between items-center mt-3">
                <button 
                  @click="moveToCart(product)"
                  class="btn btn-primary btn-sm"
                >
                  Move to Cart
                </button>
                <button 
                  @click="wishlistStore.removeFromWishlist(product.title)"
                  class="btn btn-outline btn-error btn-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          <!-- Wishlist Actions -->
          <div class="space-y-2">
            <button @click="wishlistStore.clearWishlist()" class="btn btn-outline btn-error w-full">
              Clear Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 