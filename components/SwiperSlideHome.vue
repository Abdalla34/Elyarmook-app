<template>
  <div class="parent-swiper margin-bottom-section">
    <Swiper
      :modules="[Pagination, Autoplay, Navigation]"
      :slides-per-view="1"
      :loop="images.length > 1"
      :pagination="{ clickable: true }"
      navigation
      class="mySwiper p-2 mt-4"
    >
      <SwiperSlide v-for="item in images" :key="item.id">
        <div class="container">
          <div class="row d-flex align-items-center justify-content-center">
            <div class="col-10">
              <div
                class="slide-content d-flex align-items-center justify-content-center"
              >
                <img :src="item.image" alt="Slide Image" class="slide-img" />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const appConfig = useAppConfig();
const baseURL = appConfig.baseURL;
let images = ref([]);
let res = await $fetch(`${baseURL}/home`);
images.value = res?.data?.sliders;

// console.log(res?.data?.sliders);
</script>

<style scoped>
@import "@/assets/css/slidershome.css";
</style>
