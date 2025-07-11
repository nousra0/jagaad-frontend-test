import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import HomePage from './components/HomePage.vue';
import './assets/css/main.css';

// FontAwesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

// Import FontAwesome CSS
import '@fortawesome/fontawesome-svg-core/styles.css';

// Add icons to the library
library.add(
  faHeart,
  faHeartRegular,
  faShoppingCart,
  faSearch,
  faTimes,
  faChevronLeft,
  faChevronRight,
  faXmark
);

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

// Register FontAwesome component globally
app.component('FontAwesomeIcon', FontAwesomeIcon);

// Use plugins
app.use(createPinia());
app.use(router);

// Wait for router to be ready before mounting
router.isReady().then(() => {
  app.mount('#app');
});
