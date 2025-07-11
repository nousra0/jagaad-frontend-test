import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

// Create a fresh pinia instance for each test
const pinia = createPinia()

// Global test setup
beforeEach(() => {
  setActivePinia(pinia)
})

// Configure Vue Test Utils
config.global.plugins = [pinia]

// Mock IntersectionObserver if needed
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver if needed
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} 