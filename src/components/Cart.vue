<script setup lang="ts">
  import { useCartStore } from '../stores/cartStore';
  import { useCurrency } from '../composables/useCurrency';

  const cartStore = useCartStore();

  // Currency formatting
  const { formatCurrencyWithCode } = useCurrency();

  const handleQuantityChange = (productTitle: string, event: Event) => {
    const target = event.target as any;
    cartStore.updateQuantity(productTitle, parseInt(target.value));
  };
</script>

<template>
  <div class="drawer drawer-end">
    <input id="cart-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
    </div>
    <div class="drawer-side">
      <label
        for="cart-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div class="min-h-full p-4 w-80 bg-base-200 text-base-content">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Shopping Cart</h2>
          <label for="cart-drawer" class="btn btn-sm btn-circle btn-ghost">
            <i class="fas fa-times w-4 h-4"></i>
          </label>
        </div>

        <!-- Empty Cart -->
        <div v-if="cartStore.isCartEmpty" class="text-center py-8">
          <i
            class="fas fa-shopping-cart w-16 h-16 mx-auto text-gray-400 mb-4 text-3xl"
          ></i>
          <p class="text-gray-500">Your cart is empty</p>
        </div>

        <!-- Cart Items -->
        <div v-else class="space-y-4">
          <div
            v-for="item in cartStore.items"
            :key="item.product.title"
            class="card bg-base-100 shadow-sm"
          >
            <div class="card-body p-4">
              <div class="flex items-start space-x-3">
                <img
                  :src="item.product.image"
                  :alt="item.product.title"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-sm line-clamp-2">
                    {{ item.product.title }}
                  </h3>
                  <p class="text-primary font-bold text-sm">
                    {{
                      formatCurrencyWithCode(
                        item.product.price,
                        item.product.currency
                      )
                    }}
                  </p>
                </div>
                <button
                  @click="cartStore.removeFromCart(item.product.title)"
                  class="btn btn-ghost btn-xs text-error"
                >
                  <i class="fas fa-times w-3 h-3"></i>
                </button>
              </div>

              <div class="flex justify-between items-center mt-3">
                <div class="flex items-center space-x-2">
                  <label class="text-sm text-gray-600">Qty:</label>
                  <select
                    :value="item.quantity"
                    @change="handleQuantityChange(item.product.title, $event)"
                    class="select select-bordered select-sm w-16"
                  >
                    <option v-for="qty in 10" :key="qty" :value="qty">
                      {{ qty }}
                    </option>
                  </select>
                </div>
                <div class="text-sm font-semibold">
                  {{
                    formatCurrencyWithCode(
                      (
                        parseFloat(item.product.price) * item.quantity
                      ).toString(),
                      item.product.currency
                    )
                  }}
                </div>
              </div>
            </div>
          </div>

          <!-- Cart Total -->
          <div class="card bg-base-100 shadow-sm">
            <div class="card-body p-4">
              <div class="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span class="text-primary">{{
                  formatCurrencyWithCode(cartStore.cartTotal.toString(), 'EUR')
                }}</span>
              </div>
            </div>
          </div>

          <!-- Cart Actions -->
          <div class="space-y-2">
            <button class="btn btn-primary w-full">Checkout</button>
            <button
              @click="cartStore.clearCart()"
              class="btn btn-outline btn-error w-full"
            >
              Clear Cart
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
