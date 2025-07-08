<template>
  <div class="services-section border-radius-20px margin-bottom-section">
    <div class="services-container container position-relative">
      <div class="services-header position-relative">
        <span
          class="soon-badge text-capitalize ps-3 pe-3 pt-1 pb-1 position-absolute border-radius-20px"
          >Soon</span
        >
      </div>
      <div class="row">
        <div
          class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
          v-for="(service, index) in soonGifts"
          :key="index"
        >
          <div class="service-card text-center mb-3">
            <div class="service-icon-wrapper">
              <div class="service-icon">
                <img
                  class="img"
                  :src="service.imageSoon"
                  :alt="service.title"
                />
              </div>
            </div>
            <div class="service-content">
              <h3 class="service-title text-capitalize">{{ service.title }}</h3>
              <p class="p-color-fs">{{ service.des }}</p>
            </div>
          </div>
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
let soonGifts = ref([
  {
    imageSoon: "/car-fix.png",
    title: "services",
    des: "Lorem ipsum dolor sit amet ",
  },
  {
    imageSoon: "/Discount Gift.png",
    title: "offers",
    des: "Lorem ipsum dolor sit amet ",
  },
  {
    imageSoon: "/parts.png",
    title: "pare Parts",
    des: "Lorem ipsum dolor sit amet ",
  },
]);
</script>

<style scoped>
.services-container {
  margin: 0 auto;
  padding: 0 40px;
}
.services-header {
  position: relative;
}
.soon-badge {
  top: -20px;
  z-index: 10;
  right: 8px;
  background: #f9cbcb;
  font-size: 0.75rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  color: #eb5757;
  border-radius: 20px;
}

.service-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 442px;
  width: 397px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.4s;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.8);
  background-color: #ffffff;
  border-radius: 64px;
}

.service-card:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15), 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: #ebebeb
}


.img {
  width: 160px;
  height: 160px;
}

.service-title {
  font-family: var(--font-main);
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: -2%;
  color: #4e4b66;
}

@media (max-width: 576px) {
  /* Services Section Mobile Responsive */
  .services-container {
    padding: 0 20px;
  }
}


</style>
