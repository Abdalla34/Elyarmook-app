<template>
  <div class="parent-slider-card">
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
                  <TitleServices
                    :title="item.name"
                    :currency="item.price"
                    :sar="item.currency"
                  />
                  <ButtonCard textButton="add to card" />
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
</script>
<style scoped>
.box-diesign {
  max-width: 900px;
  margin: 0px auto;
  height: auto;
  padding: 30px 0px;
  background-color: var(--main-color);
}
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
}

.swiper-button-prev-custom:hover,
.swiper-button-next-custom:hover {
  background-color: var(--secound-color);
  transform: scale(1.15);
  box-shadow: 0 6px 20px rgba(255, 230, 84, 0.4);
}

.swiper-button-prev-custom::after,
.swiper-button-next-custom::after {
  content: "";
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
</style>
