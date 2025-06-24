<template>
  <div class="app-wrapper">
    <!-- Global Mobile Menu - Available on all pages -->
    <MobileMenu />
    <Header v-if="showLayout" />
    <Views v-if="showLayout && showVeiws" />
    <!-- Page Content -->
    <NuxtPage />
    <Footer class="margin-top" v-if="showLayout" />
  </div>
</template>

<script setup>
// Global app configuration
useHead({
  title: "Yarmook - Car Services",
  meta: [
    {
      name: "description",
      content: "Professional car maintenance and repair services",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
});

import { useRoute } from "vue-router";

const route = useRoute();

const noLayoutPages = ["/contactUs", "/carBrand", "/car-series"];

const showLayout = computed(() => !noLayoutPages.includes(route.path));

const pageVeiws = ["/orderDetails", "/confirmOrder"];
const showVeiws = computed(() => !pageVeiws.includes(route.path));
</script>

<style>
/* Global app styles */
.app-wrapper {
  min-height: 100vh;
  position: relative;
}

/* Ensure mobile menu is always on top */
.mobile-menu-wrapper {
  position: relative;
  z-index: 1000;
}

/* Prevent body scroll when menu is open */
body.menu-open {
  overflow: hidden;
}

/* Global smooth transitions */
* {
  transition: color 0.3s ease, background-color 0.3s ease;
}

/* Enhanced focus states for accessibility */
button:focus,
a:focus,
input:focus {
  outline: 2px solid var(--main-color);
  outline-offset: 2px;
}

/* Smooth scrolling for all anchor links */
html {
  scroll-behavior: smooth;
}

.margin-top {
  margin-top: 25px;
}
</style>
