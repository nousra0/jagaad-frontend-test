<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <router-view />

    <!-- Cart Component -->
    <Cart />

    <!-- Wishlist Component -->
    <Wishlist />
  </div>
</template>

<script setup lang="ts">
  import Header from './components/Header.vue';
  import Cart from './components/Cart.vue';
  import Wishlist from './components/Wishlist.vue';
</script>

<style>
  /* Global styles can be added here */
</style>
