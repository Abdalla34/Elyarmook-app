<template>
  <div class="parent-swiper margin-bottom-section">
    <Swiper
      :modules="[Pagination, Autoplay, Navigation]"
      :slides-per-view="1"
      :loop="images.length > 1"
      :pagination="{ clickable: true }"
      :dir="currentDir"
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

let images = ref([]);
let res = await useApi().gethome();
images.value = res?.data?.sliders;

const { locale } = useI18n()

const currentDir = computed(() => {
  return locale.value === 'ar' ? 'rtl' : 'ltr'
})

// const time = 60 * 60 * 1000;
// async function cachedData() {
//   const cached = localStorage.getItem("homeData");
//   const currentTime = Date.now();
//   if (cached) {
//     const parseData = JSON.parse(cached);
//     if (currentTime - parseData.timestamp < time) {
//       images.value = parseData.sliders;
//       return;
//     }
//   }

//   let res = await useApi().gethome();
//   images.value = res?.data?.sliders;
//   localStorage.setItem(
//     "homeData",
//     JSON.stringify({ sliders: images.value, timestamp: currentTime })
//   );
// }
// onMounted(() => {
//   cachedData();
// });
</script>

<style scoped>
@import "@/assets/css/slidershome.css";
.mySwiper[dir="rtl"] :deep(.swiper-button-prev) {
  right: 68px;
  left: auto;
}

.mySwiper[dir="rtl"] :deep(.swiper-button-next) {
  left: 68px;
  right: auto;
}

/* ✅ عشان الأسهم تتعكس */
.mySwiper[dir="rtl"] :deep(.swiper-button-prev)::after {
  content: "→";
}

.mySwiper[dir="rtl"] :deep(.swiper-button-next)::after {
  content: "←";
}
</style>
