<script setup lang="ts">
  import { useCartStore } from '../stores/cartStore';
  import { useWishlistStore } from '../stores/wishlistStore';
  import { useCurrency } from '../composables/useCurrency';

  const cartStore = useCartStore();
  const wishlistStore = useWishlistStore();

  // Currency formatting
  const { formatCurrency } = useCurrency();
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
            <i class="fas fa-heart w-6 h-6"></i>
            <span class="ml-2">Wishlist</span>
            <span
              v-if="wishlistStore.wishlistCount > 0"
              class="badge badge-secondary badge-sm absolute -top-2 -right-2"
            >
              {{ wishlistStore.wishlistCount }}
            </span>
          </label>

          <!-- Cart Button -->
          <label for="cart-drawer" class="btn btn-ghost relative">
            <i class="fas fa-shopping-cart w-6 h-6"></i>
            <span class="ml-2">Cart</span>
            <span
              v-if="cartStore.cartCount > 0"
              class="badge badge-primary badge-sm absolute -top-2 -right-2"
            >
              {{ cartStore.cartCount }}
            </span>
          </label>

          <!-- Cart Summary -->
          <div
            v-if="cartStore.cartCount > 0"
            class="flex flex-col items-end text-sm"
          >
            <span class="font-semibold text-gray-900"
              >{{ cartStore.cartCount }} items</span
            >
            <span class="text-primary font-bold">{{
              formatCurrency(cartStore.cartTotal)
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
  /* Additional styles can be added here if needed */
</style>
