<template>
  <div class="app-wrapper">
    <!-- Global Mobile Menu - Available on all pages -->
    <MobileMenu />
    <Header v-if="showLayout" />
    <!-- <Views v-if="showLayout && showVeiws" /> -->
    <Views v-if="showLayout && showViews" />
    <!-- Page Content -->
    <NuxtPage />
    <Footer class="margin-top" v-if="showLayout" />
  </div>
</template>

<script setup>
const { locale } = useI18n();

// Set HTML dir attribute based on locale
const direction = computed(() => (locale.value === "ar" ? "rtl" : "ltr"));

// Global app configuration
useHead({
  htmlAttrs: {
    dir: direction,
    lang: locale,
  },
  title: "Yarmook - Car Services",
  meta: [
    {
      name: "description",
      content: "Professional car maintenance and repair services",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  script: [
    {
      src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBJfohIso1D_UllVzMFdpckDQVC5SkuEjk&libraries=places",
      async: true,
      defer: true,
    },
  ],
});

// Client-side fallback for hydration
onMounted(() => {
  document.documentElement.setAttribute("dir", direction.value);
  document.documentElement.setAttribute("lang", locale.value);

  // Watch for locale changes
  watch([direction, locale], ([newDir, newLocale]) => {
    document.documentElement.setAttribute("dir", newDir);
    document.documentElement.setAttribute("lang", newLocale);
  });
});

const { initCartFromLocalStorage } = useAddToCart();

import { useRoute } from "vue-router";
const token = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });

const route = useRoute();

const noLayoutPages = [
  "/contactUs",
  "/car-series",
  "/ordersteps/[id]",
  "/auth",
  "/createaccount",
];

const showLayout = computed(() => !noLayoutPages.includes(route.path));

const showViews = computed(() => {
  const path = ["/cart", "/order-details"];
  return !path.includes(route.path);
});

const cartCount = useState("cartCount", () => 0);

if (token.value) {
  cartCount.value = 0;
  let res = await useApi().getMyCart();

  if (res?.status) {
    // Calculate total cart length including quantities
    const services = res.data?.services || [];
    const offers = res.data?.offers || [];
    const spareParts = res.data?.spare_parts || [];

    // Sum up quantities for services and spare parts
    const servicesCount = services.reduce(
      (total, item) => total + (item.qty || 1),
      0
    );
    const sparePartsCount = spareParts.reduce(
      (total, item) => total + (item.qty || 1),
      0
    );
    // Offers typically don't have quantities, so count each as 1
    const offersCount = offers.reduce(
      (total, item) => total + (item.qty || 1),
      0
    );

    const totalCartLength = servicesCount + sparePartsCount + offersCount;

    cartCount.value = totalCartLength;
  }
}

onMounted(async () => {
  if (!token.value) {
    initCartFromLocalStorage();
  }
});
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
  margin-top: 50px;
}
</style>
