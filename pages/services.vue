<template>
  <div class="services-parent">
    <div class="container cards-wrapper margin-bottom-section">
      <div class="row">
        <div
          class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
          v-for="(service, index) in imagesServices"
          :key="index"
        >
          <div class="service-card text-center margin-bottom-24px">
            <div class="service-icon-wrapper">
              <div class="service-icon">
                <img class="img" :src="service.img" :alt="service.title" />
              </div>
            </div>

            <div class="service-content">
              <TitleServices
                :title="service.title"
                :currency="service.currency"
                :sar="service.sar"
              />
            </div>
            <div class="div-button">
              <ButtonCard textButton="add to card" isActive="activeIcon" />
            </div>
          </div>
        </div>
        <div class="isEmpty"></div>
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
    img: "/fix-serv.png",
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
    img: "/fix-serv-2.png",
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

let activeIcon = ref(true);
</script>

<style scoped>
@import "@/assets/css/services.css";
</style>
