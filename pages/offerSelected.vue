<template>
  <div class="offer-selected">
    <Header />
    <Views />
    <div class="container">
      <div class="row">
        <div class="col-7">
          <div
            class="offer-box"
            v-for="(item, index) in salesCard"
            :key="index"
          >
            <h1 class="margin-bottom-24px">offer Details</h1>
            <div class="img-offer-card position-relative">
              <img :src="item.imgCard" alt="Offer Image" />
              <span class="offers-sale position-absolute sale-offer"
                >30% off</span
              >
            </div>
            <div>
              <h1 class="item-name">{{ item.title }}</h1>
              <p class="price-value">
                {{ item.price }} <span class="">{{ item.currency }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let salesCard = ref([
  {
    imgCard: "img-price2.png",
    title: "Periodic maintenance",
    price: "50",
    currency: "sar",
  },
]);
</script>

<style scoped>
.row {
  display: flex;
  justify-content: center;
}

.offer-box {
  padding-left: 60px;
}

h1 {
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  letter-spacing: 0%;
  margin-bottom: 24px;
}

.img-offer-card img {
  border-radius: 40px;
  width: 100%;
}

.sale-offer {
  right: 4%;
  bottom: 8%;
}
</style>
