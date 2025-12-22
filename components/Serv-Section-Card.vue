<template>
  <div class="services-section border-radius-20px margin-bottom-section">
    <div class="services-container container position-relative">
      <div class="services-grid">
        <!-- services -->
        <div
          data-aos="fade-right"
          class="service-box"
          @click="navigateTo(localePath('/services'))"
        >
          <h3 class="service-title text-capitalize mb-2">
            {{ $t("services") }}
          </h3>
          <p class="p-color-fs text-capitalize">{{ $t("booking now") }}</p>
          <img class="img" src="/servicesbackground.png" alt="service.title" />
        </div>

        <!-- offers -->
        <div
          data-aos="fade-up"
          class="service-box"
          @click="navigateTo(localePath('/offers'))"
        >
          <h3 class="service-title text-capitalize mb-2">{{ $t("offers") }}</h3>
          <p class="p-color-fs text-capitalize">{{ $t("Find now") }}</p>
          <img class="img" src="/Discount Gift.png" alt="service.title" />
        </div>

        <!-- spare Parts -->
        <div
          data-aos="fade-left"
          class="service-box"
          @click="navigateTo(localePath('/spare-parts'))"
        >
          <div class="services-header position-relative">
            <span
              class="soon-badge text-capitalize ps-3 pe-3 pt-1 pb-1 position-absolute border-radius-20px"
              >{{ $t("Soon") }}</span
            >
          </div>
          <h3 class="service-title text-capitalize mb-2">
            {{ $t("spare-parts") }}
          </h3>
          <p class="p-color-fs text-capitalize">{{ $t("Order Now") }}</p>
          <img class="img" src="/sparebackground.png" alt="service.title" />
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
const localePath = useLocalePath();
</script>

<style scoped>
@import "@/assets/css/sectionCard.css";
</style>
