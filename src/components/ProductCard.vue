<script setup lang="ts">
  import { useCartStore } from '../stores/cartStore';
  import { useWishlistStore } from '../stores/wishlistStore';
  import { useCurrency } from '../composables/useCurrency';

  interface Product {
    image: string;
    title: string;
    description: string;
    price: string;
    currency: string;
  }

  const props = defineProps<{
    product: Product;
  }>();

  // Store instances
  const cartStore = useCartStore();
  const wishlistStore = useWishlistStore();

  // Currency formatting
  const { formatCurrencyWithCode } = useCurrency();

  const handleAddToCart = () => {
    cartStore.addToCart(props.product);
  };

  const handleWishlistToggle = () => {
    if (wishlistStore.isInWishlist(props.product.title)) {
      wishlistStore.removeFromWishlist(props.product.title);
    } else {
      wishlistStore.addToWishlist(props.product);
    }
  };
</script>

<template>
  <div
    class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
  >
    <figure class="px-4 pt-4 relative">
      <img
        :src="product.image"
        :alt="product.title"
        class="rounded-xl h-48 w-full object-cover"
      />
      <!-- Wishlist Button -->
      <button
        @click="handleWishlistToggle"
        class="absolute top-2 right-2 btn btn-circle btn-sm"
        :class="
          wishlistStore.isInWishlist(product.title)
            ? 'btn-primary'
            : 'btn-ghost bg-white/80 hover:bg-white'
        "
      >
        <i
          :class="
            wishlistStore.isInWishlist(product.title)
              ? 'fas fa-heart'
              : 'far fa-heart'
          "
          class="w-4 h-4"
        ></i>
      </button>
    </figure>
    <div class="card-body">
      <h2 class="card-title text-lg font-semibold text-gray-800 line-clamp-2">
        {{ product.title }}
      </h2>
      <p class="text-gray-600 text-sm line-clamp-3">
        {{ product.description }}
      </p>
      <div class="card-actions justify-between items-center mt-4">
        <div class="text-2xl font-bold text-primary">
          {{ formatCurrencyWithCode(product.price, product.currency) }}
        </div>
        <button @click="handleAddToCart" class="btn btn-primary btn-sm">
          Add to Cart
        </button>
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

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
