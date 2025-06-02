<template>
  <div class="parent">
    <div class="container">
      <Header />
      <Views />
      <!-- start swiper -->
      <Swiper
        :modules="[Pagination, Autoplay, Navigation]"
        :slides-per-view="1"
        :loop="true"
        :pagination="{ clickable: true }"
        navigation
        class="mySwiper mt-4"
      >
        <SwiperSlide v-for="(item, index) in imagesSliders" :key="index">
          <div class="container">
            <div class="row d-flex align-items-center justify-content-center">
              <div class="col-10">
                <div
                  class="slide-content d-flex align-items-center gap justify-content-center"
                >
                  <div>
                    <h1 class="title">{{ item.title }}</h1>
                    <p class="parag">{{ item.des }}</p>
                    <button class="button text-capitalize pt-2 pb-2 ps-4 pe-4">
                      learn more
                    </button>
                  </div>
                  <img :src="item.img" alt="Slide Image" class="slide-img" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <!-- end swiper -->

      <!-- start services section -->
      <div class="services-section">
        <div class="services-container">
          <div class="services-header">
            <span class="soon-badge">SOON</span>
          </div>
          <div class="services-grid">
            <div
              class="service-card"
              v-for="(service, index) in soonGifts"
              :key="index"
            >
              <div class="service-icon-wrapper">
                <div class="service-icon">
                  <img :src="service.imageSoon" :alt="service.title" />
                </div>
              </div>
              <div class="service-content">
                <h3 class="service-title">{{ service.title }}</h3>
                <p class="service-description">{{ service.des }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end services section -->

      <!-- start to-card -->
      <div class="to-card box-diesign border-radius-20px mb-5 mt-5">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="text-title text-center mb-4">
                <h1 class="h1">lorem</h1>
                <p class="color-parag">
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, Lorem
                  ipsum dolo
                </p>
              </div>
              <div
                class="swiper-wrapper-custom d-flex align-items-center justify-content-center gap-2 position-relative"
              >
                <div
                  class="swiper-button-prev-custom d-flex justify-content-center align-items-center"
                ></div>
                <Swiper
                  :modules="[Navigation]"
                  :slides-per-view="1"
                  :loop="true"
                  :navigation="{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                  }"
                  class="swper-card"
                >
                  <SwiperSlide
                    v-for="(item, index) in previews"
                    :key="index"
                    class="bg-white p-3 border-radius-20px"
                  >
                    <img
                      class="img-card background-main border-radius-20px mb-2"
                      :src="item.image"
                      alt=""
                    />
                    <div class="detailes-card d-flex justify-content-between">
                      <h4 class="h1">{{ item.name }}</h4>
                      <p class="d-flex align-items-center gap-1 fw-bold fs-6">
                        {{ item.price }}
                        <span class="currency">{{ item.currency }}</span>
                      </p>
                    </div>
                    <button
                      class="button-card background-main border-radius-20px w-100 text-capitalize fs-12-fw p-1"
                    >
                      add to card
                    </button>
                  </SwiperSlide>
                </Swiper>
                <div
                  class="swiper-button-next-custom d-flex justify-content-center align-items-center"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end to-card -->
      <div
        class="qr-code box-diesign border-radius-20px mb-5 mt-5 position-relative"
      >
        <div class="container">
          <div class="row">
            <div class="col-12 position-relative">
              <Swiper
                :modules="[Pagination, Autoplay, Navigation]"
                :slides-per-view="1"
                :loop="true"
                :pagination="{ el: '.custom-pagination', clickable: true }"
                :navigation="{
                  nextEl: '.swiper-next-qr',
                  prevEl: '.swiper-prev-qr',
                }"
              >
                <SwiperSlide
                  v-for="(item, index) in offersCards"
                  :key="index"
                  class="slide-qr"
                >
                  <div class="qr-slide-container">
                    <!-- Left Section: Offer Details -->
                    <div class="offer-section">
                      <h1 class="offer-title">{{ item.sale }}</h1>
                      <p class="offer-description">{{ item.des }}</p>
                    </div>

                    <!-- Center Section: Phone Mockup -->
                    <div class="phone-section">
                      <div class="phone-mockup">
                        <div class="phone-frame">
                          <div class="phone-screen">
                            <div class="phone-notch"></div>
                            <div class="phone-content">
                              <img :src="item.img" alt="App Preview" class="app-screenshot" />
                            </div>
                            <div class="phone-home-bar"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Right Section: QR Code -->
                    <div class="qr-section">
                      <div class="qr-container">
                        <img :src="item.qrImg" alt="QR Code" class="qr-image" />
                        <div class="qr-text">
                          <h3 class="qr-title">Try The App</h3>
                          <p class="qr-subtitle">Scan To Download</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div class="swiper-prev-qr"></div>
              <div class="swiper-next-qr"></div>
              <div
                class="custom-pagination d-flex justify-content-center mt-3"
              ></div>
            </div>
          </div>
        </div>
      </div>
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

let imagesSliders = ref([
  {
    img: "/character.png",
    title: "Offer",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    img: "/Yarmook Logo.png",
    title: "Offer",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    img: "/profile.jpg",
    title: "Offer",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit.",
  },
]);
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
let previews = ref([
  {
    image: "/preview1.png",
    name: "Periodic maintenance",
    price: "50",
    currency: "SAR",
  },
  {
    image: "/Discount Gift.png",
    name: "Periodic maintenance",
    price: "50",
    currency: "SAR",
  },
]);
let offersCards = ref([
  {
    sale: "20% oFF!",
    des: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,  Lorem ipsum dolo",
    img: "/Background.png",
    qrImg: "/QR_code.png",
  },
  {
    sale: "30% oFF!",
    des: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet",
    img: "/profile.jpg",
    qrImg: "/QR_code.png",
  },
]);
</script>

<style scoped>
/* public classes */
.box-diesign {
  max-width: 900px;
  margin: 0px auto;
  height: auto;
  padding: 30px 0px;
  background-color: var(--main-color);
}
/* Services Section*/
.services-section {
  padding: 100px 0 120px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f1f3f4 100%);
  position: relative;
  overflow: hidden;
}
/* .services-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(255, 230, 84, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.05) 0%, transparent 50%);
  pointer-events: none;
} */
.services-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 1;
}
.services-header {
  position: relative;
  margin-bottom: 80px;
  height: 40px;
}
.soon-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #ff4757, #ff3742);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow:
    0 8px 25px rgba(255, 71, 87, 0.4),
    0 4px 12px rgba(255, 71, 87, 0.3);
  transform: rotate(-2deg);
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.soon-badge:hover {
  transform: rotate(0deg) scale(1.05);
  box-shadow:
    0 12px 35px rgba(255, 71, 87, 0.5),
    0 6px 18px rgba(255, 71, 87, 0.4);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  align-items: stretch;
}

.service-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0;
  background: white;
  border-radius: 25px;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.08),
    0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.service-card:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow:
    0 25px 60px rgba(0, 0, 0, 0.15),
    0 10px 30px rgba(0, 0, 0, 0.1);
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #f39c12);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.service-card:hover::before {
  opacity: 1;
}

.service-icon-wrapper {
  width: 100%;
  padding: 50px 30px 30px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 25px 25px 0 0;
  position: relative;
}

.service-icon {
  position: relative;
  display: inline-block;
}

.service-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(255, 230, 84, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.4s ease;
}

.service-card:hover .service-icon::before {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.2);
}

.service-icon img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 2;
}

.service-card:hover .service-icon img {
  transform: scale(1.15) rotate(8deg);
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.2));
}

.service-content {
  padding: 30px 30px 40px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.service-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #2c3e50;
  margin: 0 0 20px 0;
  text-transform: capitalize;
  letter-spacing: -0.03em;
  line-height: 1.2;
  transition: color 0.3s ease;
}

.service-card:hover .service-title {
  color: #1a252f;
}

.service-description {
  font-size: 1rem;
  color: #6c757d;
  line-height: 1.7;
  margin: 0;
  max-width: 280px;
  transition: color 0.3s ease;
}

.service-card:hover .service-description {
  color: #5a6c7d;
}
/* end public classes */
/* start swiper slider header */
.mySwiper {
  width: 100%;
  height: 300px;
}
.slide-img {
  width: 250px;
  height: 250px;
  object-fit: contain;
  border-radius: 10px;
  transition: all 0.4s ease;
  cursor: pointer;
}

.slide-img:hover {
  transform: scale(1.1) rotate(3deg);
  filter: brightness(1.1) drop-shadow(0 8px 16px rgba(255, 230, 84, 0.3));
}
.gap {
  gap: 20px;
}
.button {
  background-color: var(--main-color, #007bff);
  font-size: 15px;
  border: none;
  border-radius: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.button:hover {
  background-color: var(--secound-color);
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 230, 84, 0.4);
  color: #040505;
  font-weight: 600;
}

.button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.button:hover::before {
  left: 100%;
}
.mySwiper :deep(.swiper-button-prev),
.mySwiper :deep(.swiper-button-next) {
  width: 40px;
  height: 10px;
  margin: 10px 0px 0px 0px;
  color: #585858;
}
.mySwiper :deep(.swiper-button-prev)::after {
  font-size: 20px;
  font-weight: bold;
}
.mySwiper :deep(.swiper-button-next)::after {
  font-size: 20px;
  font-weight: bold;
}
.mySwiper :deep(.swiper-pagination-bullet) {
  background: #585858;
  opacity: 0.5;
  border-radius: 4px;
}
.mySwiper :deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  width: 20px;
}
/* end swiper slider header */
/* start to-card */
.swper-card {
  position: relative;
  max-width: 200px;
}
.swiper-wrapper-custom {
  margin: 0 auto;
  max-width: 400px;
}
.swiper-button-prev-custom,
.swiper-button-next-custom {
  width: 35px;
  height: 35px;
  background-color: #eee;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.swiper-button-prev-custom:hover,
.swiper-button-next-custom:hover {
  background-color: var(--main-color);
  transform: scale(1.15);
  box-shadow: 0 6px 20px rgba(255, 230, 84, 0.4);
}

.swiper-button-prev-custom::after,
.swiper-button-next-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.swiper-button-prev-custom:hover::after,
.swiper-button-next-custom:hover::after {
  width: 60px;
  height: 60px;
}
.swiper-button-prev-custom::before {
  content: "←";
}
.swiper-button-next-custom::before {
  content: "→";
}
.text-title {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.img-card {
  display: block;
  margin: 0 auto;
  max-width: 150px;
  height: auto;
  transition: all 0.3s ease;
  cursor: pointer;
}

.img-card:hover {
  transform: scale(1.05);
  filter: brightness(1.1) drop-shadow(0 4px 12px rgba(255, 230, 84, 0.3));
}

.currency {
  font-size: 10px;
  font-weight: 700;
}

.button-card {
  border: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.button-card:hover {
  background-color: var(--secound-color) !important;
  transform: scale(1.02) translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 230, 84, 0.4);
  color: #040505;
  font-weight: 600;
}

.button-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.4s ease;
}

.button-card:hover::before {
  left: 100%;
}

/* Product card hover effects */
.swiper-slide {
  transition: all 0.3s ease;
  cursor: pointer;
}

.swiper-slide:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(255, 230, 84, 0.2);
}
/* end to-card */
/* start qr code - Figma Design Match */
.qr-code {
  background: linear-gradient(90deg, #F8D7DA 0%, #FFF3CD 100%);
  padding: 60px 40px;
  position: relative;
  overflow: hidden;
  border-radius: 30px;
}

.slide-qr {
  width: 100%;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.qr-slide-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  position: relative;
  padding: 0 60px;
}

/* Left Section - Offer Details */
.offer-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-right: 40px;
}

.offer-title {
  font-size: 4rem;
  font-weight: 900;
  color: #2c3e50;
  margin: 0 0 20px 0;
  line-height: 0.9;
  letter-spacing: -0.02em;
}

.offer-description {
  font-size: 1.1rem;
  color: #6c757d;
  line-height: 1.5;
  margin: 0;
  font-weight: 400;
  max-width: 280px;
}

/* Center Section - Phone Mockup */
.phone-section {
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 40px;
}

.phone-mockup {
  position: relative;
  transition: all 0.3s ease;
}

.phone-mockup:hover {
  transform: scale(1.05);
}

.phone-frame {
  width: 220px;
  height: 440px;
  background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
  border-radius: 35px;
  padding: 10px;
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.1);
  position: relative;
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 25px;
  overflow: hidden;
  position: relative;
}

.phone-notch {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 8px;
  background: #333;
  border-radius: 4px;
  z-index: 10;
}

.phone-content {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.app-screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 25px;
}

.phone-home-bar {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 5px;
  background: #666;
  border-radius: 3px;
  z-index: 10;
}

/* Right Section - QR Code */
.qr-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-left: 40px;
}

.qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.qr-image {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.qr-image:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.qr-text {
  color: #2c3e50;
}

.qr-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.qr-subtitle {
  font-size: 0.9rem;
  color: #6c757d;
  margin: 0;
  font-weight: 400;
}

/* Pagination Dots */
.qr-code :deep(.swiper-pagination-bullet) {
  background: rgba(44, 62, 80, 0.3);
  opacity: 1;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  transition: all 0.3s ease;
  margin: 0 4px;
}

.qr-code :deep(.swiper-pagination-bullet-active) {
  background: #2c3e50;
  opacity: 1;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
/* Navigation Arrows */
.swiper-prev-qr,
.swiper-next-qr {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #2c3e50;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.swiper-prev-qr:hover,
.swiper-next-qr:hover {
  background-color: #fff;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  color: #2c3e50;
}

.swiper-prev-qr {
  left: 20px;
}

.swiper-next-qr {
  right: 20px;
}

.swiper-prev-qr::before {
  content: "←";
  font-weight: bold;
}

.swiper-next-qr::before {
  content: "→";
  font-weight: bold;
}
/* end qr code */

/* start responsive */
@media (max-width: 576px) {
  .slide-content {
    flex-wrap: wrap;
  }
  .slide-img {
    width: 250px;
    height: 120px;
  }
  .button {
    font-size: 10px;
  }
  .title {
    font-size: 15px;
  }
  .parag {
    font-size: 12px;
  }
  .image-icons {
    width: 120px;
  }

  /* Services Section Mobile Responsive */
  .services-section {
    padding: 80px 0 100px;
  }

  .services-container {
    padding: 0 20px;
  }

  .services-header {
    margin-bottom: 60px;
    height: 30px;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .service-card {
    margin: 0 10px;
    border-radius: 20px;
  }

  .service-icon-wrapper {
    padding: 40px 20px 25px;
    border-radius: 20px 20px 0 0;
  }

  .service-icon img {
    width: 70px;
    height: 70px;
  }

  .service-content {
    padding: 25px 20px 35px;
  }

  .service-title {
    font-size: 1.4rem;
    margin-bottom: 15px;
  }

  .service-description {
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .soon-badge {
    right: 10px;
    font-size: 0.65rem;
    padding: 10px 18px;
    border-radius: 20px;
    letter-spacing: 0.8px;
  }

  /* QR Code Mobile Responsive */
  .qr-slide-container {
    flex-direction: column;
    padding: 20px;
    gap: 30px;
    text-align: center;
  }

  .offer-section {
    align-items: center;
    padding-right: 0;
    order: 1;
  }

  .phone-section {
    margin: 0;
    order: 2;
  }

  .qr-section {
    align-items: center;
    padding-left: 0;
    order: 3;
  }

  .phone-frame {
    width: 180px;
    height: 360px;
  }

  .offer-title {
    font-size: 2.5rem;
    text-align: center;
  }

  .offer-description {
    text-align: center;
    max-width: 100%;
  }

  .qr-image {
    width: 80px;
    height: 80px;
  }

  .swiper-prev-qr {
    left: 10px;
    width: 35px;
    height: 35px;
  }
  .swiper-next-qr {
    right: 10px;
    width: 35px;
    height: 35px;
  }
}
@media (min-width: 577px) and (max-width: 768px) {
  .button {
    font-size: 10px;
  }
  .title {
    font-size: 15px;
  }
  .parag {
    font-size: 10px;
  }
  .slide-content {
    gap: 0px;
  }

  /* Services Section Tablet Responsive */
  .services-section {
    padding: 90px 0 110px;
  }

  .services-container {
    padding: 0 30px;
  }

  .services-header {
    margin-bottom: 70px;
    height: 35px;
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 45px;
  }

  .service-card:nth-child(3) {
    grid-column: 1 / -1;
    max-width: 450px;
    margin: 0 auto;
  }

  .service-card {
    border-radius: 22px;
  }

  .service-icon-wrapper {
    padding: 45px 25px 28px;
    border-radius: 22px 22px 0 0;
  }

  .service-icon img {
    width: 80px;
    height: 80px;
  }

  .service-content {
    padding: 28px 25px 38px;
  }

  .service-title {
    font-size: 1.5rem;
    margin-bottom: 18px;
  }

  .service-description {
    font-size: 0.98rem;
    line-height: 1.65;
  }

  .soon-badge {
    right: 20px;
    font-size: 0.7rem;
    padding: 11px 20px;
    border-radius: 22px;
    letter-spacing: 0.9px;
  }

  /* QR Code Tablet Responsive */
  .qr-slide-container {
    flex-direction: column;
    padding: 30px;
    gap: 35px;
    text-align: center;
  }

  .offer-section {
    align-items: center;
    padding-right: 0;
    order: 1;
  }

  .phone-section {
    margin: 0;
    order: 2;
  }

  .qr-section {
    align-items: center;
    padding-left: 0;
    order: 3;
  }

  .phone-frame {
    width: 200px;
    height: 400px;
  }

  .offer-title {
    font-size: 3rem;
    text-align: center;
  }

  .offer-description {
    text-align: center;
    max-width: 100%;
  }

  .qr-image {
    width: 90px;
    height: 90px;
  }

  .fs10px {
    font-size: 10px;
    margin-top: 10px;
  }
}
@media (min-width: 768px) and (max-width: 992px) {
  .swiper-prev-qr {
    left: -14px;
  }
  .swiper-next-qr {
    right: -14px;
  }
  .margin-left {
    margin-left: 10px;
  }
  .swiper-prev-qr,
  .swiper-next-qr {
    width: 25px;
    height: 25px;
  }
  .fs10px {
    font-size: 10px;
    margin-top: 10px;
  }
}
/* end  responsive */
</style>
