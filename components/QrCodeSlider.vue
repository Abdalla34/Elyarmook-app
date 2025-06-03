<template>
  <div class="qr-slider-wrapper">
    <div class="qr-code-section">
      <div class="qr-container-main">
        <Swiper
          :modules="[Pagination, Navigation]"
          :slides-per-view="1"
          :loop="true"
          :pagination="{ el: '.qr-pagination', clickable: true }"
          :navigation="{
            nextEl: '.qr-nav-next',
            prevEl: '.qr-nav-prev',
          }"
          class="qr-swiper"
        >
          <SwiperSlide
            v-for="(item, index) in offersCards"
            :key="index"
            class="qr-slide"
          >
            <div class="qr-slide-content">
              <!-- Left Section: Offer Details -->
              <div class="offer-section">
                <div class="offer-content">
                  <h1 class="offer-title">{{ item.sale }}</h1>
                  <p class="offer-description">{{ item.des }}</p>

                  <div class="offer-cta">
                    <button class="cta-button">
                      <span>Learn More</span>
                      <i class="arrow">→</i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Right Section: QR Code -->
              <div class="qr-section">
                <div class="qr-container">
                  <div class="qr-code-wrapper">
                    <img :src="item.qrImg" alt="QR Code" class="qr-image" />
                    <div class="qr-scan-animation"></div>
                  </div>
                  <div class="qr-text">
                    <h3 class="qr-title">Try The App</h3>
                    <p class="qr-subtitle">Scan To Download</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <!-- Navigation Arrows -->
        <div class="qr-nav-prev qr-nav-button">
          <span>‹</span>
        </div>
        <div class="qr-nav-next qr-nav-button">
          <span>›</span>
        </div>

        <!-- Pagination -->
        <div class="qr-pagination"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
let offersCards = ref([
  {
    sale: "20% oFF!",
    des: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,  Lorem ipsum dolo",
    img: "/GroupPhone.png",
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
/* Main Container - Figma Design Match */
.qr-slider-wrapper {
  width: 100%;
  padding: 0;
  background: linear-gradient(90deg, #f8d7da 0%, #fff3cd 100%);
  position: relative;
  overflow: hidden;
}

.qr-code-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  position: relative;
  z-index: 1;
}

.qr-container-main {
  position: relative;
  border-radius: 30px;
  overflow: hidden;
}

/* Swiper Styles */
.qr-swiper {
  width: 100%;
  height: 450px;
  border-radius: 30px;
}

.qr-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-slide-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 60px 80px;
  position: relative;
}

/* Left Section - Offer Details - Figma Match */
.offer-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-right: 60px;
  max-width: 300px;
}

.offer-content {
  width: 100%;
}

.offer-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: #2c3e50;
  margin: 0 0 20px 0;
  line-height: 1;
  letter-spacing: -0.02em;
  transition: all 0.3s ease;
}

.offer-title:hover {
  transform: translateY(-2px);
  color: #1a252f;
}

.offer-description {
  font-size: 1rem;
  color: #6c757d;
  line-height: 1.5;
  margin: 0;
  font-weight: 400;
  max-width: 250px;
  transition: color 0.3s ease;
}

.offer-description:hover {
  color: #5a6c7d;
}

.offer-cta {
  display: none; /* Hidden to match Figma design */
}

/* Center Section - Phone Mockup - Figma Match */
.phone-section {
  margin: 0 40px;
  position: relative;
}

.phone-mockup {
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
}

.app-screenshot {
  width: 90%;
  height: 100%;
  object-fit: cover;
  border-radius: 27px;
  transition: all 0.3s ease;
}

.phone-mockup:hover .app-screenshot {
  transform: scale(1.01);
}

/* Phone Dimension Labels - Figma Match */

/* Right Section - QR Code - Figma Match */
.qr-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-left: 60px;
  max-width: 300px;
}

.qr-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
  gap: 20px;
}

.qr-code-wrapper {
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.qr-code-wrapper:hover {
  transform: scale(1.05);
}

.qr-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.qr-code-wrapper:hover .qr-image {
  border-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.qr-scan-animation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  border: 2px solid transparent;
  border-radius: 8px;
  opacity: 0;
  transition: all 0.3s ease;
}

.qr-code-wrapper:hover .qr-scan-animation {
  opacity: 1;
  border-color: #8b5cf6;
  /* animation: scanPulse 2s infinite; */
}

.qr-text {
  color: #2c3e50;
  flex: 1;
}

.qr-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: #2c3e50;
  transition: all 0.3s ease;
}

.qr-container:hover .qr-title {
  color: #1a252f;
}

.qr-subtitle {
  font-size: 0.9rem;
  color: #6c757d;
  margin: 0;
  font-weight: 400;
  transition: color 0.3s ease;
}

.qr-container:hover .qr-subtitle {
  color: #5a6c7d;
}

/* Navigation Buttons - Figma Match */
.qr-nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  color: #2c3e50;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.qr-nav-button:hover {
  background: #fff;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  border-color: rgba(0, 0, 0, 0.2);
}

.qr-nav-prev {
  left: 40px;
}

.qr-nav-next {
  right: 40px;
}

/* Pagination - Hidden to match Figma */
.qr-pagination {
  display: none;
}

/* Mobile Devices (≤576px) - Figma Match */
@media (max-width: 576px) {
  .qr-slider-wrapper {
    padding: 0;
  }

  .qr-code-section {
    padding: 0 20px;
  }

  .qr-swiper {
    height: auto;
    min-height: 500px;
  }

  .qr-slide-content {
    flex-direction: column;
    padding: 40px 20px;
    gap: 30px;
    text-align: center;
  }

  .offer-section {
    padding-right: 0;
    align-items: center;
    order: 1;
    max-width: 100%;
  }

  .offer-content {
    max-width: 100%;
  }

  .offer-title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 15px;
  }

  .offer-description {
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 0;
    max-width: 100%;
  }

  .phone-section {
    margin: 0;
    order: 2;
  }

  .phone-frame {
    width: 180px;
    height: 370px;
    border-width: 3px;
  }

  .phone-mockup::before {
    font-size: 0.65rem;
    padding: 3px 8px;
    bottom: -25px;
  }

  .phone-mockup:hover::before {
    bottom: -20px;
  }

  .qr-section {
    padding-left: 0;
    align-items: center;
    order: 3;
    max-width: 100%;
  }

  .qr-container {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .qr-image {
    width: 70px;
    height: 70px;
  }

  .qr-title {
    font-size: 1.1rem;
  }

  .qr-subtitle {
    font-size: 0.85rem;
  }

  .qr-nav-button {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }

  .qr-nav-prev {
    left: 20px;
  }

  .qr-nav-next {
    right: 20px;
  }
}

/* Tablet Devices (577px - 768px) - Figma Match */
@media (min-width: 577px) and (max-width: 768px) {
  .qr-slider-wrapper {
    padding: 0;
  }

  .qr-code-section {
    padding: 0 30px;
  }

  .qr-swiper {
    height: 400px;
  }

  .qr-slide-content {
    flex-direction: column;
    padding: 50px 30px;
    gap: 35px;
    text-align: center;
  }

  .offer-section {
    padding-right: 0;
    align-items: center;
    order: 1;
    max-width: 100%;
  }

  .offer-title {
    font-size: 3rem;
    text-align: center;
  }

  .offer-description {
    font-size: 1rem;
    text-align: center;
    max-width: 100%;
  }

  .phone-section {
    margin: 0;
    order: 2;
  }

  .phone-frame {
    width: 200px;
    height: 410px;
  }

  .qr-section {
    padding-left: 0;
    align-items: center;
    order: 3;
    max-width: 100%;
  }

  .qr-container {
    flex-direction: row;
    gap: 18px;
  }

  .qr-image {
    width: 75px;
    height: 75px;
  }

  .qr-nav-button {
    width: 38px;
    height: 38px;
    font-size: 17px;
  }

  .qr-nav-prev {
    left: 25px;
  }

  .qr-nav-next {
    right: 25px;
  }
}

/* Large Tablet/Small Desktop (769px - 991px) - Figma Match */
@media (min-width: 769px) and (max-width: 991px) {
  .qr-slide-content {
    padding: 60px 50px;
  }

  .offer-section {
    padding-right: 40px;
  }

  .phone-section {
    margin: 0 30px;
  }

  .qr-section {
    padding-left: 40px;
  }

  .offer-title {
    font-size: 3.2rem;
  }

  .phone-frame {
    width: 210px;
    height: 430px;
  }
}

/* Extra Large Screens (≥1200px) - Figma Match */
@media (min-width: 1200px) {
  .qr-code-section {
    max-width: 1400px;
    padding: 0 60px;
  }

  .qr-slide-content {
    padding: 80px 100px;
  }

  .offer-title {
    font-size: 4rem;
  }

  .phone-frame {
    width: 250px;
    height: 500px;
  }

  .qr-image {
    width: 90px;
    height: 90px;
  }
}
</style>
