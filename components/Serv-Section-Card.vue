<template>
  <div class="services-section border-radius-20px margin-bottom-section">
    <div class="services-container container position-relative">
      <div class="services-grid">
        <!-- الخدمات -->
        <div class="service-box" @click="navigateTo('/services')">
          <img class="img" src="/car-fix.png" alt="service.title" />
          <h3 class="service-title text-capitalize mb-2">services</h3>
          <p class="p-color-fs text-capitalize">booking now</p>
        </div>

        <!-- العروض -->
        <div class="service-box" @click="navigateTo('/offers')">
          <img class="img" src="/Discount Gift.png" alt="service.title" />
          <h3 class="service-title text-capitalize mb-2">offers</h3>
          <p class="p-color-fs text-capitalize">Find now</p>
        </div>

        <!-- قطع الغيار -->
        <div class="service-box" @click="navigateTo('/spare-parts')">
          <div class="services-header position-relative">
            <span
              class="soon-badge text-capitalize ps-3 pe-3 pt-1 pb-1 position-absolute border-radius-20px"
              >Soon</span
            >
          </div>
          <img class="img" src="/parts.png" alt="service.title" />
          <h3 class="service-title text-capitalize mb-2">spare Part</h3>
          <p class="p-color-fs text-capitalize">order now</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
</script>

<style scoped>
@import "@/assets/css/sectionCard.css";
</style>
