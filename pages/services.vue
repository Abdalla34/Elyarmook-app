<template>
  <div>
    <Header />
    <Views />
    <div class="container pt-5">
      <div class="row mt-5">
        <div
          class="col-lg-4 col-md-6 col-sm-12 text-center mb-4"
          v-for="(item, index) in imagesServices"
          :key="index"
        >
          <div class="up-box border-radius-20px service-card">
            <img :src="item.img" class="img" alt="car-fix" />
            <TitleServices
              :title="item.title"
              :currency="item.currency"
              :sar="item.sar"
            />
            <div class="width-button-component">
              <ButtonCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
let imagesServices = ref([
  {
    img: "/car-fix.png",
    title: "Periodic maintenance",
    currency: "50",
    sar: "SAR",
  },
  {
    img: "/car-fix.png",
    title: "Periodic maintenance",
    currency: "60",
    sar: "SAR",
  },
  {
    img: "/car-fix.png",
    title: "Periodic maintenance",
    currency: "70",
    sar: "SAR",
  },
  {
    img: "/car-fix.png",
    title: "Periodic maintenance",
    currency: "50",
    sar: "SAR",
  },
  {
    img: "/car-fix.png",
    title: "Periodic maintenance",
    currency: "60",
    sar: "SAR",
  },
  {
    img: "/car-fix.png",
    title: "Periodic maintenance",
    currency: "70",
    sar: "SAR",
  },
]);
</script>
<style scoped>
.up-box {
  /* height: 250px; */
  background-color: #b8bbc01a;
  width: 100%;
}

.width-button-component {
  width: 60%;
  margin: 0 auto;
}
img {
  width: 150px;
  margin: 0px auto;
}
</style>
