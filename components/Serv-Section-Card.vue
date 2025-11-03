<template>
  <div class="services-section border-radius-20px margin-bottom-section">
    <div class="services-container container position-relative">
      <div class="services-grid">
        <!-- services -->
        <div class="service-box" @click="navigateTo($localePath('/services'))">
          <img class="img" src="/car-fix.png" alt="service.title" />
          <h3 class="service-title text-capitalize mb-2">
            {{ $t("services") }}
          </h3>
          <p class="p-color-fs text-capitalize">{{ $t("booking now") }}</p>
        </div>

        <!-- offers -->
        <div class="service-box" @click="navigateTo($localePath('/offers'))">
          <img class="img" src="/Discount Gift.png" alt="service.title" />
          <h3 class="service-title text-capitalize mb-2">{{ $t("offers") }}</h3>
          <p class="p-color-fs text-capitalize">{{ $t("Find now") }}</p>
        </div>

        <!-- spare Parts -->
        <div
          class="service-box"
          @click="navigateTo($localePath('/spare-parts'))"
        >
          <div class="services-header position-relative">
            <span
              class="soon-badge text-capitalize ps-3 pe-3 pt-1 pb-1 position-absolute border-radius-20px"
              >{{ $t("Soon") }}</span
            >
          </div>
          <img class="img" src="/parts.png" alt="service.title" />
          <h3 class="service-title text-capitalize mb-2">
            {{ $t("spare Parts") }}
          </h3>
          <p class="p-color-fs text-capitalize">{{ $t("Order Now") }}</p>
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
