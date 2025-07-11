<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
import { useWishlistStore } from '../stores/wishlistStore'
import { useCurrency } from '../composables/useCurrency'

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

// Currency formatting
const { formatCurrency } = useCurrency()
</script>

<template>
  <header class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <div class="flex items-center">
          <h1 class="text-3xl font-bold text-gray-900">Product Store</h1>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Wishlist Button -->
          <label for="wishlist-drawer" class="btn btn-ghost relative">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span class="ml-2">Wishlist</span>
            <span v-if="wishlistStore.wishlistCount > 0" class="badge badge-secondary badge-sm absolute -top-2 -right-2">
              {{ wishlistStore.wishlistCount }}
            </span>
          </label>

          <!-- Cart Button -->
          <label for="cart-drawer" class="btn btn-ghost relative">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
            </svg>
            <span class="ml-2">Cart</span>
            <span v-if="cartStore.cartCount > 0" class="badge badge-primary badge-sm absolute -top-2 -right-2">
              {{ cartStore.cartCount }}
            </span>
          </label>
          
          <!-- Cart Summary -->
          <div v-if="cartStore.cartCount > 0" class="flex flex-col items-end text-sm">
            <span class="font-semibold text-gray-900">{{ cartStore.cartCount }} items</span>
            <span class="text-primary font-bold">{{ formatCurrency(cartStore.cartTotal) }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Additional styles can be added here if needed */
</style> 