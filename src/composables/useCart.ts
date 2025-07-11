import { ref, computed } from 'vue';

interface Product {
  image: string;
  title: string;
  description: string;
  price: string;
  currency: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export function useCart() {
  const cartItems = ref<CartItem[]>([]);

  // Add product to cart
  const addToCart = (product: Product) => {
    const existingItem = cartItems.value.find(
      item => item.product.title === product.title
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.value.push({
        product,
        quantity: 1,
      });
    }
  };

  // Remove product from cart
  const removeFromCart = (productTitle: string) => {
    const index = cartItems.value.findIndex(
      item => item.product.title === productTitle
    );
    if (index > -1) {
      cartItems.value.splice(index, 1);
    }
  };

  // Update quantity
  const updateQuantity = (productTitle: string, quantity: number) => {
    const item = cartItems.value.find(
      item => item.product.title === productTitle
    );
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productTitle);
      } else {
        item.quantity = quantity;
      }
    }
  };

  // Clear cart
  const clearCart = () => {
    cartItems.value = [];
  };

  // Computed properties
  const cartCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      const price = parseFloat(item.product.price);
      return total + price * item.quantity;
    }, 0);
  });

  const isCartEmpty = computed(() => cartItems.value.length === 0);

  return {
    cartItems,
    cartCount,
    cartTotal,
    isCartEmpty,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}
