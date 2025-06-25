<template>
  <div class="box-featrues-img-title">
    <div class="daimond-img d-flex align-items-center justify-content-center">
      <img :src="img" alt="" />
    </div>

    <div class="mt">
      <div class="d-flex align-items-center justify-content-between">
        <h1 class="item-name">{{ title }}</h1>
        <p class="price-value size-font mb-0">
          {{ price }}
          <span class="font-size-currency text-uppercase span"> sar </span>
        </p>
      </div>
      <p class="text-end sale">{{ oldprice }}</p>
      <div class="date-end d-flex justify-content-between mt-3">
        <div>
          <span class="text-capitalize date">{{ enddate }}:</span>
          <span class="text-capitalize date-end ms-2">{{ date }} </span>
        </div>
        <p class="text-line"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  price: Number,
  oldprice: Number,
  enddate: String,
  date: [Number, String],
  img: String,
});
</script>

<style scoped>
.daimond-img {
  background-color: #fffcea;
  padding: 68px;
  border-radius: 32px;
}

.mt {
  margin-top: 33px;
  margin-bottom: 130px;
}
</style>
