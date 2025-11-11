<template>
  <div
    class="skele margin-bottom-section row d-flex align-items-center justify-content-center"
    v-if="skele"
  >
    <div class="col-md-10 col-sm-12">
      <SkeletonsSlidersHome />
      <!-- <img
        src="/placeholder.jpeg"
        alt="Slide Image"
        class="slide-img rounded-4"
      /> -->
    </div>

    <!-- <div
      class="custom-pagination-after d-flex justify-content-center gap-2 mt-3 col-12"
    >
      <span class="bullet active"></span>
      <span class="bullet"></span>
    </div> -->
  </div>

  <div v-else class="parent-swiper margin-bottom-section">
    <Swiper
      :modules="[Pagination, Autoplay, Navigation]"
      :slides-per-view="1"
      loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      :pagination="{ clickable: true, el: '.custom-pagination' }"
      :dir="currentDir"
      class="mySwiper p-2 mt-4"
    >
      <SwiperSlide v-for="item in images" :key="item.id">
        <div class="row d-flex align-items-center justify-content-center">
          <div class="col-md-10 col-sm-12">
            <div
              class="slide-content d-flex align-items-center justify-content-center"
            >
              <img
                :src="item.image"
                alt="Slide Image"
                class="slide-img rounded-4"
              />
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <div class="custom-pagination"></div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const skele = ref(true);

let images = ref([]);

const { locale } = useI18n();

const currentDir = computed(() => {
  return locale.value === "ar" ? "rtl" : "ltr";
});
const { gethome } = useApi();
const time = 7 * 24 * 60 * 60 * 1000;

async function cachedData() {
  const cached = localStorage.getItem("homeData");
  const currentTime = Date.now();

  if (cached) {
    try {
      const parseData = JSON.parse(cached);
      if (currentTime - parseData.timestamp < time) {
        images.value = parseData.sliders || [];
        skele.value = false;
      }
    } catch (err) {
      console.error("Error parsing cache");
    }
  }

  try {
    const res = await gethome();
    if (res?.data?.sliders) {
      images.value = res.data.sliders;
      localStorage.setItem(
        "homeData",
        JSON.stringify({ sliders: images.value, timestamp: currentTime })
      );
    }
  } catch (err) {
    console.error("Error fetching home data");
  } finally {
    skele.value = false;
  }
}

onMounted(() => {
  cachedData();
});
</script>

<style scoped>
@import "@/assets/css/slidershome.css";
/* .custom-pagination-after {
  display: flex;
  justify-content: center;
  gap: 8px;
} */

/* .custom-pagination-after .bullet.active {
  background: #585858;
  opacity: 1;
  border-radius: 4px;
  width: 10px;
  height: 8px;
  transition: all 0.3s;
}
.custom-pagination-after .bullet:not(.active) {
  background: #585858;
  opacity: 0.5;
  border-radius: 4px;
  width: 13px;
  height: 8px;
  transition: all 0.3s;;
} */
</style>
