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
      <div
        class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-6"
      >
        <!-- Title -->
        <div
          class="flex items-center justify-center sm:justify-start mb-4 sm:mb-0"
        >
          <h1 class="text-3xl font-bold text-gray-900">Product Store</h1>
        </div>

        <!-- Navigation Buttons and Cart Summary -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0">
          <!-- Wishlist and Cart Buttons Row -->
          <div class="flex items-center justify-center sm:justify-end gap-4">
            <!-- Wishlist Button -->
            <label
              for="wishlist-drawer"
              class="btn btn-ghost relative hover:border hover:border-primary hover:text-primary hover:bg-white transition-colors duration-200"
            >
              <i class="fas fa-heart w-3 h-3"></i>
              <span class="ml-2">Wishlist</span>
              <span
                v-if="wishlistStore.wishlistCount > 0"
                class="badge badge-secondary badge-sm absolute -top-2 -right-2"
              >
                {{ wishlistStore.wishlistCount }}
              </span>
            </label>

            <!-- Cart Button -->
            <label
              for="cart-drawer"
              class="btn btn-ghost mr-5 relative hover:border hover:border-primary hover:text-primary hover:bg-white transition-colors duration-200"
            >
              <i class="fas fa-shopping-cart w-3 h-3"></i>
              <span class="ml-2">Cart</span>
              <span
                v-if="cartStore.cartCount > 0"
                class="badge badge-primary badge-sm absolute -top-2 -right-2"
              >
                {{ cartStore.cartCount }}
              </span>
            </label>
          </div>

          <!-- Cart Summary -->
          <div
            v-if="cartStore.cartCount > 0"
            class="flex flex-col items-center sm:items-end text-sm"
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
