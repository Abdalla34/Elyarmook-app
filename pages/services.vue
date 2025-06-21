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
              <ButtonCard textButton="add to card" />
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
</script>

<style scoped>
.services-parent {
  background-color: #ffffff;
}

.service-content {
  margin-bottom: -50px;
}

.service-card {
  width: 100%;
  padding: 30px 20px;
  background-color: #f9f9f9;
  transition: all 0.4s ease;
  border-radius: 40px;
  box-shadow: 0 10px 40px #0a0d121a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 470px;
}

.service-card:hover {
  transform: translateY(-1px) scale(1.0);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15), 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: #ebebeb;
}

.img {
  width: 160px;
  height: 160px;
  object-fit: contain;
  margin-top: 10px;
}

.div-button {
  width: 100%;
}

/* Responsive */
@media (max-width: 992px) {
  .cards-wrapper {
    padding: 30px 40px;
  }
}

@media (max-width: 576px) {
  .cards-wrapper {
    padding: 20px 20px;
  }

  .img {
    width: 80px;
    height: 80px;
  }

  .service-card {
    padding: 20px 15px;
    border-radius: 20px;
  }
}
</style>
