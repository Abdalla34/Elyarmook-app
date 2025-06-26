<template>
  <div class="box-featrues-img-title">
    <div class="daimond-img d-flex align-items-center justify-content-center">
      <img :src="img" alt="" />
    </div>

    <div class="mt">
      <div class="title-sale d-flex align-items-center justify-content-between">
        <div class="name-product">
          {{ title }}
        </div>
        <div class="sale-price d-flex justify-content-end align-items-center">
          <p class="price">{{ price }} <span class="span">SAR</span></p>
          <p class="oldprice">{{ oldDes }} <span>SAR</span></p>
        </div>
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
  img: String,
  oldDes: [Number, String],
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
}

.price {
  font-family: Poppins;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: -2%;
  text-align: center;
  color: #c71f45;
}

.oldprice {
  text-align: end;
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  text-align: center;
  text-decoration: line-through;
  color: #7e7e7e;
}

span{
  font-size: 15px;
}

@media (min-width: 768px) {
  .sale-price {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .title-sale {
    flex-direction: column;
  }

  .sale-price {
    margin-top: 40px;
    gap: 50px;
  }
}
</style>
