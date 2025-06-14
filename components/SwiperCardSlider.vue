<template>
  <div class="parent-slider-card margin-bottom-section">
    <div class="to-card box-diesign">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="text-title text-center">
              <h1 class="text-capitalize font-title">lorem</h1>
              <p class="font-p">
                Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, Lorem
                ipsum dolo
              </p>
            </div>

            <!-- غلاف السلايدر + الأسهم -->
            <div class="slider-wrapper position-relative">
              <div class="swiper-button-prev-custom">←</div>
              <div class="swiper-button-next-custom">→</div>

              <div class="mini-box">
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
                  <SwiperSlide v-for="(item, index) in previews" :key="index">
                    <div
                      class="preview-slide d-flex align-items-center text-center flex-column"
                    >
                      <div class="img-card">
                        <img
                          :src="item.image"
                          :alt="item.name"
                          class="img-offer"
                        />
                      </div>
                      <TitleServices
                        :title="item.name"
                        :currency="item.price"
                        :sar="item.currency"
                      />
                      <div class="width-button-component">
                        <ButtonCard textButton="add to card" />
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
// import "swiper/css/pagination";
import "swiper/css/navigation";
let previews = ref([
  {
    image: "/FrameCrad.png",
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
</script>

<style scoped>
/* Main Container */
.box-diesign {
  width: 90%;
  margin: 0px auto;
  height: auto;
  padding: 40px 20px;
  background-color: #ffec7f;
  border-radius: 60px;
}

.preview-slide {
  margin-top: -35px;
}

/* Swiper Container */
.swper-card {
  position: relative;
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
}

.text-title {
  margin-bottom: 30px;
}

/* Mini Box Container */
.mini-box {
  background-color: #fff9d4;
  border-radius: 40px;
  padding: 8px 28px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

/* Image Card */
.img-card {
  margin-bottom: 25px;
  position: relative;
}

.img-offer {
  border-radius: 25px;
  object-fit: cover;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.img-offer:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
  box-shadow: 0 15px 35px rgba(255, 230, 84, 0.4);
}

.width-button-component {
  width: 100%;
  margin-top: 28px;
}

.slider-wrapper {
  position: relative;
  width: fit-content;
  margin: auto;
  max-width: 100%;
}

/* Navigation Buttons */
.swiper-button-prev-custom,
.swiper-button-next-custom {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 230, 84, 0.3);
  user-select: none;
}

.swiper-button-prev-custom {
  left: -60px;
}

.swiper-button-next-custom {
  right: -60px;
}

.swiper-button-prev-custom:hover,
.swiper-button-next-custom:hover {
  background: #fff;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 230, 84, 0.6);
}

/* Responsive Design */

/* Mobile Devices (≤576px) */
@media (max-width: 576px) {
  .box-diesign {
    width: 95%;
    padding: 30px 15px;
    border-radius: 40px;
  }

  .mini-box {
    padding: 20px 15px;
    border-radius: 30px;
  }

  .preview-slide {
    padding: 15px;
  }

  .img-offer {
    width: 180px;
    height: 200px;
    border-radius: 20px;
  }

  .img-offer:hover {
    transform: scale(1.02) rotate(1deg);
  }

  .swiper-button-prev-custom,
  .swiper-button-next-custom {
    width: 34px;
    height: 30px;
    font-size: 12px;
  }

  .swper-card {
    max-width: 220px;
  }
  .swiper-button-prev-custom {
    left: -38px;
  }
  .swiper-button-next-custom {
    right: -38px;
  }
  
}

/* Tablet Devices (577px - 768px) */
@media (min-width: 577px) and (max-width: 768px) {
  .box-diesign {
    width: 92%;
    padding: 35px 20px;
    border-radius: 50px;
  }

  .mini-box {
    padding: 25px 20px;
    border-radius: 35px;
  }

  .img-offer {
    width: 200px;
    height: 220px;
  }

  .swiper-button-prev-custom {
    left: -50px;
  }

  .swiper-button-next-custom {
    right: -50px;
  }

  .swper-card {
    max-width: 250px;
  }
}

/* Large Tablet/Small Desktop (769px - 991px) */
@media (min-width: 769px) and (max-width: 991px) {
  .box-diesign {
    width: 88%;
    padding: 38px 25px;
  }

  .img-offer {
    width: 210px;
    height: 230px;
  }

  .swiper-button-prev-custom {
    left: -55px;
  }

  .swiper-button-next-custom {
    right: -55px;
  }

  .swper-card {
    max-width: 260px;
  }
}

/* Large Desktop (≥992px) */
@media (min-width: 992px) {
  .box-diesign {
    width: 85%;
    padding: 40px 30px;
  }

  .img-offer {
    width: 240px;
    height: 260px;
  }

  .swper-card {
    max-width: 300px;
  }
}

/* Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.preview-slide {
  animation: slideIn 0.6s ease-out;
}
</style>
