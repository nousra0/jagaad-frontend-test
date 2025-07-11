import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import HomePage from './components/HomePage.vue';
import './assets/css/main.css';

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: '/',
    },
  ],
});

// Create app
const app = createApp(App);

// Use plugins
app.use(createPinia());
app.use(router);

// Wait for router to be ready before mounting
router.isReady().then(() => {
  app.mount('#app');
});
