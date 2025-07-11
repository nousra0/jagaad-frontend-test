<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useCartStore } from '../stores/cartStore';
  import { useWishlistStore } from '../stores/wishlistStore';
  import ProductCard from './ProductCard.vue';
  import productsData from '../../mock-products.json';

  interface Product {
    image: string;
    title: string;
    description: string;
    price: string;
    currency: string;
  }

  // Store instances
  const cartStore = useCartStore();
  const wishlistStore = useWishlistStore();

  // Reactive data
  const products = ref<Product[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  // Search functionality
  const searchQuery = ref('');
  const sortOption = ref('default'); // 'default', 'price-high-low', 'price-low-high', 'alphabetical'

  // Pagination
  const currentPage = ref(1);
  const itemsPerPage = 10;

  // Computed properties for search and pagination
  const filteredProducts = computed(() => {
    let filtered = products.value;

    // Apply search filter
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim();
      filtered = filtered.filter(
        product =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortOption.value) {
      case 'price-high-low':
        filtered = [...filtered].sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
        break;
      case 'price-low-high':
        filtered = [...filtered].sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
        break;
      case 'alphabetical':
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // No sorting, keep original order
        break;
    }

    return filtered;
  });

  const totalPages = computed(() =>
    Math.ceil(filteredProducts.value.length / itemsPerPage)
  );
  const paginatedProducts = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.value.slice(startIndex, endIndex);
  });

  // Pagination display logic
  const paginationRange = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const delta = 1; // how many pages to show before/after current
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined = undefined;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l !== undefined) {
        if ((i as number) - l === 2) {
          rangeWithDots.push(l + 1);
        } else if ((i as number) - l > 2) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i as number;
    }
    return rangeWithDots;
  });

  // Precompute pagination buttons for template
  const paginationButtons = computed(() => {
    return paginationRange.value.map(page => {
      if (page === '...') {
        return { type: 'ellipsis', value: '...' };
      } else {
        return { type: 'page', value: page as number };
      }
    });
  });

  // Search methods
  const clearSearch = () => {
    searchQuery.value = '';
    currentPage.value = 1; // Reset to first page when clearing search
  };

  // Sort methods
  const handleSortChange = () => {
    currentPage.value = 1; // Reset to first page when sorting changes
  };

  // Pagination methods
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const goToPreviousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  // Load products function
  const loadProducts = async () => {
    try {
      loading.value = true;
      error.value = null;

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use mock data directly
      products.value = productsData.data || [];
    } catch (err) {
      error.value = 'Failed to load products';
      console.error('Error loading products:', err);
    } finally {
      loading.value = false;
    }
  };

  // Add to cart function
  const addToCart = (product: Product) => {
    cartStore.addToCart(product);
  };

  // Add to wishlist function
  const addToWishlist = (product: Product) => {
    wishlistStore.addToWishlist(product);
  };

  // Load products on component mount
  onMounted(() => {
    loadProducts();
  });
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Search Bar -->
    <div class="mb-6">
      <div class="flex justify-end">
        <div class="flex flex-col sm:flex-row gap-4 max-w-6xl">
          <!-- Search Input -->
          <div class="relative flex-1 min-w-96">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <i class="fas fa-search h-5 w-5 text-gray-400"></i>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="input input-bordered w-full pl-5 pr-5"
              @input="currentPage = 1"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <i
                class="fas fa-times h-5 w-5 text-gray-400 hover:text-gray-600"
              ></i>
            </button>
          </div>

          <!-- Sort Select -->
          <div class="sm:w-48">
            <select
              v-model="sortOption"
              @change="handleSortChange"
              class="select select-bordered w-full"
            >
              <option value="default">Sort by</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Search Results Info -->
      <div v-if="searchQuery" class="mt-2 text-sm text-gray-600">
        Found {{ filteredProducts.length }} product{{
          filteredProducts.length !== 1 ? 's' : ''
        }}
        for "{{ searchQuery }}"
        <button @click="clearSearch" class="ml-2 text-primary hover:underline">
          Clear search
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="loading loading-spinner loading-lg"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <div class="text-red-500 mb-4">Error loading products</div>
      <button @click="loadProducts" class="btn btn-primary">Try Again</button>
    </div>

    <!-- Products Grid -->
    <div v-else-if="products.length > 0">
      <!-- No Search Results -->
      <div
        v-if="searchQuery && filteredProducts.length === 0"
        class="text-center py-12"
      >
        <i class="fas fa-search w-16 h-16 mx-auto text-gray-400 mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          No products found
        </h3>
        <p class="text-gray-600 mb-4">
          No products match your search for "{{ searchQuery }}"
        </p>
        <button @click="clearSearch" class="btn btn-primary">
          Clear search
        </button>
      </div>

      <!-- Products Grid -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
      >
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.title"
          :product="product"
          @add-to-cart="addToCart"
          @add-to-wishlist="addToWishlist"
        />
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center space-x-2">
        <!-- Previous Page Button -->
        <button
          @click="goToPreviousPage"
          :disabled="currentPage === 1"
          class="btn btn-primary"
          :class="{ 'btn-disabled': currentPage === 1 }"
        >
          <i class="fas fa-chevron-left w-4 h-4"></i>
        </button>

        <!-- Page Numbers with Ellipsis -->
        <div class="join">
          <template v-for="btn in paginationButtons">
            <button
              v-if="btn.type === 'page'"
              :key="'page-' + btn.value"
              @click="goToPage(Number(btn.value))"
              class="join-item btn btn-primary"
              :class="btn.value === currentPage ? 'btn-active' : 'btn-outline'"
            >
              {{ btn.value }}
            </button>
            <button
              v-else
              :key="'ellipsis-' + btn.value"
              disabled
              class="join-item btn btn-primary btn-disabled cursor-default"
            >
              ...
            </button>
          </template>
        </div>

        <!-- Next Page Button -->
        <button
          @click="goToNextPage"
          :disabled="currentPage === totalPages"
          class="btn btn-primary"
          :class="{ 'btn-disabled': currentPage === totalPages }"
        >
          <i class="fas fa-chevron-right w-4 h-4"></i>
        </button>
      </div>

      <!-- Page Info -->
      <div class="text-center mt-4 text-sm text-gray-600">
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
        {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }} of
        {{ filteredProducts.length }} products
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-gray-500">No products available</div>
    </div>
  </main>
</template>

<style scoped>
  /* Additional styles can be added here if needed */
</style>
