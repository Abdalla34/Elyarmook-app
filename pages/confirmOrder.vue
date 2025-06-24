<template>
  <div class="margin-top">
    <div class="container">
      <div class="row">
        <!-- الجزء اليسار -->
        <div class="col-lg-5 col-md-7">
          <h4 class="mb-4 fw-bold">Order Details</h4>

          <div
            class="card border-radius-36px mb-3 d-flex flex-row align-items-center"
            v-for="item in ordersGet"
            :key="item.id"
          >
            <img :src="item.imgItem" alt="Brakes" width="60" />
            <div class="ms-3 flex-grow-1">
              <h6 class="fw-bold">{{ item.nameOrder }}</h6>
              <p class="font-p parag mb-0">
                {{ item.detailsOrder }}
              </p>
            </div>
            <p class="price">
              {{ item.price }}
              <span class="p-color-fs span">{{ item.currency }}</span>
            </p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="mb-4">
            <h6 class="fw-bold">Order Details</h6>
            <div class=" "></div>
          </div>

          <!-- تفاصيل السعر -->
          <div class="mb-4">
            <h6 class="fw-bold">Cost Details</h6>
            <div class=""></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let ordersGet = ref([
  {
    imgItem: "Car Brake Icon.png",
    nameOrder: "Brakes Services",
    detailsOrder: "Lorem ipsum dolor sit amet,Lorem ",
    price: "70",
    currency: "SAR",
  },
  {
    imgItem: "Car Brake Icon.png",
    nameOrder: "Brakes Services",
    detailsOrder: "Lorem ipsum dolor sit amet,Lorem ",
    price: "70",
    currency: "SAR",
  },
  {
    imgItem: "Car Brake Icon.png",
    nameOrder: "Brakes Services",
    detailsOrder: "Lorem ipsum dolor sit amet,Lorem ",
    price: "70",
    currency: "SAR",
  },
]);
</script>

<style scoped>
.margin-top {
  margin-top: 40px;
  margin-bottom: 208px;
}

.card {
  padding: 36px 28px;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  box-shadow: 0px 1px 2px 0px #0a0d120f;

  box-shadow: 0px 1px 3px 0px #0a0d121a;
}

.parag {
  width: 189px;
  color: #4e4b66;
}
.price {
  font-size: 30px;
}

@media (max-width: 768px) {
  .price {
    font-size: 16px;
  }
  .span {
    font-size: 12px;
  }
}
</style>
