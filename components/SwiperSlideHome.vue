<template>
  <div class="parent-swiper">
    <Swiper
      :modules="[Pagination, Autoplay, Navigation]"
      :slides-per-view="1"
      :loop="true"
      :pagination="{ clickable: true }"
      navigation
      class="mySwiper border-radius-20px mb-5 p-2 mt-4"
    >
      <SwiperSlide v-for="(item, index) in imagesSliders" :key="index">
        <div class="container">
          <div class="row d-flex align-items-center justify-content-center">
            <div class="col-10">
              <div
                class="slide-content d-flex align-items-center gap justify-content-center"
              >
                <div>
                  <h1 class="title-sec-main">{{ item.title }}</h1>
                  <p class="parag color-parag">{{ item.des }}</p>
                  <div class="width-button">
                    <button class="button ps-4 pe-3 pt-2 pb-2">learn More</button>
                  </div>

                  <!-- <button class="button text-capitalize pt-2 pb-2 ps-4 pe-4">
                      learn more
                    </button> -->
                </div>
                <img :src="item.img" alt="Slide Image" class="slide-img" />
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
</script>
<style scoped>
.mySwiper {
  width: 100%;
  height: 300px;
  background-color: white;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04);
}
.slide-img {
  width: 320px;
  height: 270px;
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
/* .title {
  font-size: 36px;
  font-weight: 600;
} */
.parag {
  font-size: 16px;
  font-weight: 400;
}
.width-button {
  width: 150px;
}

@media (max-width: 576px) {
  .slide-content {
    gap: 0px;
    flex-wrap: wrap;
  }
  .slide-img {
    width: 250px;
    height: 120px;
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
}
@media (min-width: 577px) and (max-width: 768px) {
  .slide-content {
    /* flex-wrap: wrap; */
    position: relative;
    top: 50%;
    transform: translateY(50%);
  }
  .slide-img {
    width: 250px;
    height: 120px;
  }
  .title {
    font-size: 15px;
  }
  .parag {
    font-size: 10px;
  }
  .image-icons {
    width: 120px;
  }
}
</style>
