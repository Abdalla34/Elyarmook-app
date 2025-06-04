<template>
  <div class="qr-slider-wrapper p-4 border-radius-20px box-diesign">
    <div class="container">
      <div class="up-box position-relative">
        <Swiper
          :modules="[Navigation, Pagination]"
          :navigation="{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }"
          :slides-per-view="1"
          :loop="true"
          class="swiper-hand d-flex align-items-center justify-content-center gap-5"
        >
          <SwiperSlide v-for="(item, index) in offersCards" :key="index">
            <div
              class="slide-content d-flex align-items-center justify-content-center gap-5 flex-wrap"
            >
              <div class="descount-offer">
                <h1 class="offer-title">{{ item.sale }}</h1>
                <p class="text-capitalize des-offer color-parag">
                  {{ item.des }}
                </p>
              </div>
              <div class="img-offer">
                <img :src="item.img" alt="" />
              </div>
              <div
                class="qr-code d-flex align-items-center gap-1 pt-1 pb-1 ps-4 pe-4"
              >
                <img src="/QR_code.png" alt="" />
                <div class="scan-text">
                  <h6 class="text-capitalize">try the app</h6>
                  <p class="text-capitalize color-parag">scan to download</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <div class="swiper-button-prev-custom"></div>
          <div class="swiper-button-next-custom"></div>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

let offersCards = ref([
  {
    sale: "20% oFF!",
    des: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,  Lorem ipsum dolo",
    img: "/GroupPhone.png",
  },
  {
    sale: "30% oFF!",
    des: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet",
    img: "/profile.jpg",
  },
]);
</script>

<style scoped>
.box-diesign {
  width: 90%;
  margin: 0 auto;
  height: auto;
  padding: 30px 0;
  background: linear-gradient(90deg, #f8d7da 0%, #fff3cd 100%);
  position: relative;
  overflow: hidden;
}

/* offer */
.offer-title {
  font-size: 40px;
  transition: all 0.4s ease;
}
.offer-title:hover {
  color: #000;
  transform: scale(1.1);
}
.des-offer {
  width: 300px;
}
/* صورة الموبايل */
.img-offer img {
  transition: all 0.4s ease;
  height: 350px;
  border-radius: 10px;
  object-fit: cover;
  width: 170px;
}
.img-offer img:hover {
  transform: scale(1.1);
}
/* qr section */
.qr-code {
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  position: relative;
}
.qr-code img {
  width: 70px;
  height: 70px;
  border: 3px solid transparent;
  border-radius: 10px;
  transition: all 0.4s ease;
  cursor: pointer;
}
.qr-code img:hover {
  transform: scale(1.1);
  border: 3px solid white;
}
.scan-text h6 {
  margin: 0;
  font-size: 14px;
  color: #000;
}
/* end */

.swiper-button-prev-custom,
.swiper-button-next-custom {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 35px;
  height: 35px;
  background-color: #eee;
  border-radius: 50%;
  font-size: 20px;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.swiper-button-prev-custom {
  left: 20px;
}
.swiper-button-next-custom {
  right: 20px;
}

.swiper-button-prev-custom::before {
  content: "←";
}
.swiper-button-next-custom::before {
  content: "→";
}

.swiper-button-next-custom:hover {
  animation: moveRight 0.4s infinite;
}

.swiper-button-prev-custom:hover {
  animation: moveLeft 0.4s infinite;
}

@keyframes moveRight {
  0% { transform: translateY(-50%) translateX(0); }
  50% { transform: translateY(-50%) translateX(5px); }
  100% { transform: translateY(-50%) translateX(0); }
}

@keyframes moveLeft {
  0% { transform: translateY(-50%) translateX(0); }
  50% { transform: translateY(-50%) translateX(-5px); }
  100% { transform: translateY(-50%) translateX(0); }
}

/* Responsive */
@media (max-width: 320px) {
  .swiper-button-prev-custom {
    left: 2px;
  }

  .swiper-button-next-custom {
    right: 2px;
  }
}

@media (max-width: 992px) {
  .slide-content {
    flex-direction: column;
    gap: 20px;
  }

  .descount-offer {
    text-align: center;
    width: 100%;
  }

  .offer-title {
    font-size: 25px;
  }

  .des-offer {
    width: 100%;
    padding: 0 15px;
  }

  .img-offer img {
    height: 250px;
    width: 120px;
  }

  .scan-text {
    text-align: center;
  }

  .swiper-button-prev-custom,
  .swiper-button-next-custom {
    top: 50%;
    bottom: 10px;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    font-size: 16px;
  }

  .swiper-button-prev-custom {
    left: 10px;
  }

  .swiper-button-next-custom {
    right: 10px;
  }
}
</style>
