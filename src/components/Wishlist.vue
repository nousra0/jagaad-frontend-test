<script setup lang="ts">
  import { useWishlistStore } from '../stores/wishlistStore';
  import { useCartStore } from '../stores/cartStore';
  import { useCurrency } from '../composables/useCurrency';

  const wishlistStore = useWishlistStore();
  const cartStore = useCartStore();

  // Currency formatting
  const { formatCurrencyWithCode } = useCurrency();

  const moveToCart = (product: any) => {
    cartStore.addToCart(product);
    wishlistStore.removeFromWishlist(product.title);
  };
</script>

<template>
  <div class="drawer drawer-end">
    <input id="wishlist-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
    </div>
    <div class="drawer-side">
      <label
        for="wishlist-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div class="min-h-full p-4 w-80 bg-base-200 text-base-content">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Wishlist</h2>
          <label for="wishlist-drawer" class="btn btn-sm btn-circle btn-ghost">
            <i class="fas fa-times w-4 h-4"></i>
          </label>
        </div>

        <!-- Empty Wishlist -->
        <div v-if="wishlistStore.isWishlistEmpty" class="text-center py-8">
          <i class="fas fa-heart w-16 h-16 mx-auto text-gray-400 mb-4"></i>
          <p class="text-gray-500">Your wishlist is empty</p>
        </div>

        <!-- Wishlist Items -->
        <div v-else class="space-y-4">
          <div
            v-for="product in wishlistStore.items"
            :key="product.title"
            class="card bg-base-100 shadow-sm"
          >
            <div class="card-body p-4">
              <div class="flex items-start space-x-3">
                <img
                  :src="product.image"
                  :alt="product.title"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-sm line-clamp-2">
                    {{ product.title }}
                  </h3>
                  <p class="text-primary font-bold text-sm">
                    {{
                      formatCurrencyWithCode(product.price, product.currency)
                    }}
                  </p>
                </div>
                <button
                  @click="wishlistStore.removeFromWishlist(product.title)"
                  class="btn btn-ghost btn-xs text-error"
                >
                  <i class="fas fa-times w-3 h-3"></i>
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
            <button
              @click="wishlistStore.clearWishlist()"
              class="btn btn-outline btn-error w-full"
            >
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
