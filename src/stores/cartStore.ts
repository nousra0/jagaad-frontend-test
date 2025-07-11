import { defineStore } from 'pinia'

interface Product {
  image: string
  title: string
  description: string
  price: string
  currency: string
}

interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),

  getters: {
    cartCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    
    cartTotal: (state) => state.items.reduce((total, item) => {
      const price = parseFloat(item.product.price)
      return total + (price * item.quantity)
    }, 0),
    
    isCartEmpty: (state) => state.items.length === 0
  },

  actions: {
    addToCart(product: Product) {
      const existingItem = this.items.find(item => item.product.title === product.title)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          product,
          quantity: 1
        })
      }
    },

    removeFromCart(productTitle: string) {
      const index = this.items.findIndex(item => item.product.title === productTitle)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },

    updateQuantity(productTitle: string, quantity: number) {
      const item = this.items.find(item => item.product.title === productTitle)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productTitle)
        } else {
          item.quantity = quantity
        }
      }
    },

    clearCart() {
      this.items.length = 0
    }
  }
}) 