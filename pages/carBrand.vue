<template>
  <div>
    <div>
      <div class="add-car">
        <div class="container">
          <div class="row">
            <div class="col-8 col-padding">
              <TitlePageCars namePage="BMW" backPath="/myCars" />

              <!-- <div class="title-page d-flex align-items-center gap">
                <div
                  class="icon-to-page d-flex justify-content-center align-items-center"
                  @click="navigateTo('/myCars')"
                >
                  <i class="fa-solid fa-xmark"></i>
                </div>
                <div class="d-flex gap-2 align-items-center">
                <img src="public/BMW.png" alt="">
                  <h1 class="title-pages">BMW</h1>
                </div>
              </div> -->

              <div class="search-input">
                <input class="search" type="text" placeholder="search" />
              </div>

              <div class="inputs" @click="navigateTo('/car-series')">
                <div
                  class="label-car position-relative"
                  v-for="item in carBrands"
                  :key="item.id"
                >
                  <div>
                    <label class="pb-2" for="">{{ item.label }}</label>
                    <input class="input-brand" type="text" />
                  </div>

                  <div class="position-absolute bmw-img d-flex gap-2">
                    <img class="h-100" :src="item.imgLogo" alt="" />
                    <h1 class="name-car">{{ item.carModel }}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let carBrands = ref([
  {
    id: 1,
    label: "A",
    carModel: "Audi",
    imgLogo: "BMW.png",
  },
  {
    id: 2,
    label: "B",
    carModel: "BYD",
    imgLogo: "BMW.png",
  },
  {
    id: 2,
    label: "c",
    carModel: "chery",
    imgLogo: "BMW.png",
  },
]);
</script>

<style scoped>
@import "../assets/css/carbrand.css";
</style>
