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

            <div class="slider-wrapper position-relative">
              <div class="swiper-button-prev-custom">←</div>
              <div class="swiper-button-next-custom">→</div>

              <!-- <div class="mini-box">
                <Swiper
                  :modules="[Navigation]"
                  :slides-per-view="1"
                  :loop="sliders.length > 1"
                  :navigation="{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                  }"
                  class="swper-card"
                >
                  <SwiperSlide v-for="item in sliders" :key="item.id">
                    <div
                      class="preview-slide d-flex align-items-center text-center flex-column"
                    >
                      <div class="img-card border-radius-36px">
                        <img
                          :src="item.image"
                          alt="imageSlider"
                          class="img-offer"
                        />
                      </div>

                      <div class="width-button-component">
                        <ButtonCard
                          textButton="add to card"
                          :isActive="activeIcon"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div> -->
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
import "swiper/css/navigation";

// let sliders = ref([]);
// // let type = ref("wench");
// let responseSlider = await useApi().getSliders("wench");
// sliders.value = responseSlider?.data;
// console.log("slider get", responseSlider);
// let activeIcon = ref(true);

</script>

<style scoped>

</style>
