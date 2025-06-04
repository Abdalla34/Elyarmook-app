<template>
  <div class="parent">
    <Header />
    <Views />
    <div class="container">

      <!-- start swiper home -->
      <SwiperSlideHome />
      <!-- end swiper home -->

      <!-- start services section -->
      <div class="services-section border-radius-20px">
        <div class="services-container container position-relative">
          <div class="services-header">
            <span
              class="soon-badge text-capitalize ps-3 pe-3 pt-1 pb-1 position-absolute border-radius-20px"
              >Soon</span
            >
          </div>
          <div class="row">
            <div
              class="col-lg-4 col-md-4 col-sm-12"
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
                  <h3 class="service-title">{{ service.title }}</h3>
                  <p class="color-parag">{{ service.des }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end services section -->

      <!-- start to-card -->
      <swiper-card-slider />
      <!-- end to-card -->

      <!-- start qr code -->
      <qr-code-slider />
      <!-- end qr code -->
    </div>
    <Footer />
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
/* Services Section*/
.services-section {
  padding: 50px 0;
  /* background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f1f3f4 100%); */
  position: relative;
  overflow: hidden;
}
/* .services-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 20% 80%,
      rgba(255, 230, 84, 0.05) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 107, 107, 0.05) 0%,
      transparent 50%
    );
  pointer-events: none;
} */
.services-container {
  margin: 0 auto;
  padding: 0 40px;
}
.services-header {
  position: relative;
  margin-bottom: 40px;
  height: 30px;
}
.soon-badge {
  top: 45px;
  position: relative;
  z-index: 10;
  right: 0;
  background: #F9CBCB;
  font-size: 0.75rem;
  letter-spacing: 1px;
  transition: all 0.3s ease; 
  color: #EB5757;
}
.soon-badge:hover {
  transform: rotate(0deg) scale(1.05);
  box-shadow: 0 12px 35px rgba(255, 71, 87, 0.5),
    0 6px 18px rgba(255, 71, 87, 0.4);
}
.services-card {
  width: 100%;
}

/* start responsive */
@media (max-width: 576px) {
  /* Services Section Mobile Responsive */
  .services-container {
    padding: 0 20px;
  }
  .service-icon-wrapper {
    padding: 15px 10px;
  }

  .service-icon img {
    width: 70px;
    height: 70px;
  }

  /* QR Code Mobile Responsive */
  
}
@media (min-width: 577px) and (max-width: 768px) {
  /* Services Section Tablet Responsive */
  .services-section {
    margin-top: 50px;
  }

  .services-container {
    padding: 0 30px;
  }

  .services-header {
    margin-bottom: 60px;
    height: 25px;
  }
}

/* end  responsive */
</style>
