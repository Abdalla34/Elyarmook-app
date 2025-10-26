<template>
  <div class="qr-slider-wrapper p-4 box-diesign">
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
                <h1 class="font-title">{{ item.sale }}</h1>
                <p class="font-p width-p">
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
                  <h6 class="text-capitalize">{{ $t("try the app") }}</h6>
                  <p class="text-capitalize font-14px">
                    {{ $t("scan to download") }}
                  </p>
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
@import "@/assets/css/sliderQr.css";
</style>
