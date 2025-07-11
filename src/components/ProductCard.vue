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
    class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
  >
    <figure class="px-4 pt-4 relative overflow-hidden">
      <img
        :src="product.image"
        :alt="product.title"
        class="rounded-xl h-48 w-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <!-- Wishlist Button -->
      <button
        @click="handleWishlistToggle"
        class="absolute top-5 right-5 btn btn-circle p-0 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 bg-white/80 hover:bg-white w-8 h-8"
      >
        <i
          :class="
            wishlistStore.isInWishlist(product.title)
              ? 'fas fa-heart animate-pulse text-secondary'
              : 'far fa-heart'
          "
          class="w-8 h-8 text-xl flex items-center justify-center transition-all duration-300"
          :style="{
            transform: wishlistStore.isInWishlist(product.title)
              ? 'scale(1.1)'
              : 'scale(1)',
          }"
        ></i>
      </button>
    </figure>
    <div class="card-body">
      <h2
        class="card-title text-lg font-semibold text-gray-800 line-clamp-2 transition-colors duration-300 hover:text-primary"
      >
        {{ product.title }}
      </h2>
      <p class="text-gray-600 text-sm line-clamp-3">
        {{ product.description }}
      </p>
      <div class="card-actions justify-between items-center mt-4">
        <div
          class="text-xl font-bold text-gray-500 transition-all duration-300 hover:text-primary"
        >
          {{ formatCurrencyWithCode(product.price, product.currency) }}
        </div>
        <button
          @click="handleAddToCart"
          class="btn btn-primary btn-sm text-white transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg"
        >
          <span class="transition-all duration-300">Add to Cart</span>
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

  /* Custom animations */
  @keyframes heart-beat {
    0% {
      transform: scale(1);
    }

    14% {
      transform: scale(1.3);
    }

    28% {
      transform: scale(1);
    }

    42% {
      transform: scale(1.3);
    }

    70% {
      transform: scale(1);
    }
  }

  .animate-pulse {
    animation: heart-beat 2s infinite;
  }

  /* Smooth transitions for all interactive elements */

  .card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card:hover {
    transform: translateY(-4px);
  }

  /* Image zoom effect */

  figure img {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  figure:hover img {
    transform: scale(1.05);
  }

  /* Button animations */

  button {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  button:hover {
    transform: translateY(-1px);
  }

  button:active {
    transform: translateY(0);
  }
</style>
