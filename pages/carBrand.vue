<template>
  <div>
    <div>
      <div class="add-car">
        <div class="container">
          <div class="row">
            <div class="col-8 col-padding">

              <TitlePageCars  namePage="BMW" backPath="/myCars"/>

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
.add-car {
  margin-top: 70px;
}

.title-page {
  width: 90%;
  margin: auto;
}

.search-input {
  width: 90%;
  margin: auto;
  margin-bottom: 40px;
}

.search-input .search {
  width: 100%;
  border-radius: 36px;
  border: 2px solid #f1f3f9;
  padding: 20px;
  margin-top: 20px;
}

.search-input .search:focus {
  outline: none;
  border: 2px solid var(--main-color);
  box-shadow: 0px 1px 10px var(--main-color);
}

.inputs input {
  width: 100%;
  border-radius: 12px;
  cursor: pointer;
}

.input-brand {
  border-radius: 12px;
  border: 2px solid #f1f3f9;
  padding: 12px 16px;
  margin-bottom: 15px;
}

.input-brand:hover {
  background-color: #ebebeb;
}

.bmw-img {
  position: absolute;
  left: 20px;
  top: 50%;
}

.name-car {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0%;
  color: #6e7191;
}

.gap {
  gap: 199px;
}

@media (max-width: 768px) {
  .add-car {
    padding: 100px 0px;
  }
}
</style>
