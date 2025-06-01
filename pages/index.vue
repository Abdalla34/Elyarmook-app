<template>
  <div class="parent">
    <div class="container">
      <Header />
      <Views />
      <!-- start swiper -->
      <Swiper
        :modules="[Pagination, Autoplay, Navigation]"
        :slides-per-view="1"
        :loop="true"
        :pagination="{ clickable: true }"
        navigation
        class="mySwiper mt-4"
      >
        <SwiperSlide v-for="(item, index) in imagesSliders" :key="index">
          <div class="container">
            <div class="row d-flex align-items-center justify-content-center">
              <div class="col-10">
                <div
                  class="slide-content d-flex align-items-center gap justify-content-center"
                >
                  <div>
                    <h1 class="title">{{ item.title }}</h1>
                    <p class="parag">{{ item.des }}</p>
                    <button class="button text-capitalize pt-2 pb-2 ps-4 pe-4">
                      learn more
                    </button>
                  </div>
                  <img :src="item.img" alt="Slide Image" class="slide-img" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <!-- end swiper -->

      <!-- start div soon -->
      <div class="soon mt-5">
        <p class="soon-after text-danger text-uppercase">soon</p>
        <div class="row mt-4">
          <div
            class="col-lg-4 col-md-4 col-sm-12 mt-4 d-flex justify-content-center align-items-center flex-column"
            v-for="(img, index) in soonGifts"
            :key="index"
          >
            <img class="image-icons" :src="img.imageSoon" alt="" />
            <h1 class="title">{{ img.title }}</h1>
            <p class="parag color-parag">{{ img.des }}</p>
          </div>
        </div>
      </div>
      <!-- end div soon -->

      <!-- start to-card -->
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
                    <div class="detailes-card d-flex justify-content-between">
                      <h4 class="h1">{{ item.name }}</h4>
                      <p class="d-flex align-items-center gap-1 fw-bold fs-6">
                        {{ item.price }}
                        <span class="currency">{{ item.currency }}</span>
                      </p>
                    </div>
                    <button
                      class="button-card background-main border-radius-20px w-100 text-capitalize fs-12-fw p-1"
                    >
                      add to card
                    </button>
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
      <!-- end to-card -->
      <div
        class="qr-code box-diesign border-radius-20px mb-5 mt-5 position-relative"
      >
        <div class="container">
          <div class="row">
            <div class="col-12 position-relative">
              <Swiper
                :modules="[Pagination, Autoplay, Navigation]"
                :slides-per-view="1"
                :loop="true"
                :pagination="{ el: '.custom-pagination', clickable: true }"
                :navigation="{
                  nextEl: '.swiper-next-qr',
                  prevEl: '.swiper-prev-qr',
                }"
              >
                <SwiperSlide
                  v-for="(item, index) in offersCards"
                  :key="index"
                  class="slide-qr d-flex justify-content-center align-items-center gap-3"
                >
                  <div class="qr-sale fs-1 fw-bold">
                    <h1 class="title-sale">{{ item.sale }}</h1>
                    <p class="color-parag width-parg margin-left fs10px">
                      {{ item.des }}
                    </p>
                  </div>

                  <div class="qr-image">
                    <img :src="item.img" alt="" />
                  </div>

                  <div class="qr-code-img d-flex align-items-center">
                    <div>
                      <img :src="item.qrImg" alt="" />
                    </div>
                    <div>
                      <h6 class="text-capitalize fw-bold">try the app</h6>
                      <p class="color-parag fs10px">search to download</p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div class="swiper-prev-qr"></div>
              <div class="swiper-next-qr"></div>
              <div
                class="custom-pagination d-flex justify-content-center mt-3"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!-- end qr code -->
    </div>

    <Footer />
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
let soonGifts = ref([
  {
    imageSoon: "/car-fix.png",
    title: "services",
    des: "Lorem ipsum dolor sit amet ",
  },
  {
    imageSoon: "/Discount Gift.png",
    title: "offers",
    des: "Lorem ipsum dolor sit amet ",
  },
  {
    imageSoon: "/parts.png",
    title: "pare Parts",
    des: "Lorem ipsum dolor sit amet ",
  },
]);
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
let offersCards = ref([
  {
    sale: "20% oFF!",
    des: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,  Lorem ipsum dolo",
    img: "/Background.png",
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
/* public classes */
.box-diesign {
  max-width: 900px;
  margin: 0px auto;
  height: auto;
  padding: 30px 0px;
  background-color: var(--main-color);
}
.soon {
  position: relative;
}
.soon-after {
  position: absolute;
  right: 50px;
  top: -12px;
  font-weight: 600;
}
/* .load {
  position: absolute;
} */
/* end public classes */
/* start swiper slider header */
.mySwiper {
  width: 100%;
  height: 300px;
}
.slide-img {
  width: 250px;
  height: 250px;
  object-fit: contain;
  border-radius: 10px;
}
.gap {
  gap: 20px;
}
.button {
  background-color: var(--main-color, #007bff);
  font-size: 15px;
  border: none;
  border-radius: 20px;
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
/* end swiper slider header */
/* start to-card */
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
}
.currency {
  font-size: 10px;
  font-weight: 700;
}
.button-card {
  border: none;
}
.button-card:hover {
  opacity: 0.8;
}
/* end to-card */
/* start qr code */
.qr-code {
  background: linear-gradient(to right, #fae1e7, #fcee97);
  padding: 20px;
}
.width-parg {
  width: 200px;
}
.slide-qr {
  width: 100%;
  overflow: hidden;
}
.qr-code :deep(.swiper-pagination-bullet) {
  background: #585858;
  opacity: 0.5;
  border-radius: 4px;
}
.qr-code :deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  width: 20px;
}

.qr-image img {
  width: 200px;
  height: 500px;
  border-radius: 20px;
}
.swiper-prev-qr,
.swiper-next-qr {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 30px;
  height: 30px;
  background-color: #fff;
  color: #000;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
}
.swiper-prev-qr {
  left: 10px;
}
.swiper-next-qr {
  right: 10px;
}
.swiper-prev-qr::before {
  content: "←";
}
.swiper-next-qr::before {
  content: "→";
}
.title-sale {
  font-size: 30px;
  text-align: center;
}
/* end qr code */
/* start responsive */
@media (max-width: 576px) {
  .slide-content {
    flex-wrap: wrap;
  }
  .slide-img {
    width: 250px;
    height: 120px;
  }
  .button {
    font-size: 10px;
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
  .qr-image img {
    width: 200px;
    height: 300px;
    border-radius: 20px;
  }
  .slide-qr {
    width: 100%;
    overflow: hidden;
    flex-direction: column;
  }
  .swiper-prev-qr {
    left: -8px;
  }
  .swiper-next-qr {
    right: -8px;
  }
  .title-sale {
    font-size: 20px;
    text-align: center;
  }
}
@media (min-width: 577px) and (max-width: 768px) {
  .button {
    font-size: 10px;
  }
  .title {
    font-size: 15px;
  }
  .parag {
    font-size: 10px;
  }
  .slide-content {
    gap: 0px;
  }
  .slide-qr {
    width: 100%;
    overflow: hidden;
    flex-direction: column;
  }
  .qr-image img {
    width: 200px;
    height: 300px;
    border-radius: 20px;
  }
  .fs10px {
    font-size: 10px;
    margin-top: 10px;
  }
}
@media (min-width: 768px) and (max-width: 992px) {
  .swiper-prev-qr {
    left: -14px;
  }
  .swiper-next-qr {
    right: -14px;
  }
  .margin-left {
    margin-left: 10px;
  }
  .swiper-prev-qr,
  .swiper-next-qr {
    width: 25px;
    height: 25px;
  }
  .fs10px {
    font-size: 10px;
    margin-top: 10px;
  }
}
/* end  responsive */
</style>
