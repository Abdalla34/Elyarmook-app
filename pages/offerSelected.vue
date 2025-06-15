<template>
  <div class="offer-selected">
    <div class="container">
      <div class="row">
        <div class="col-7 col-padding">
          <div
            class="offer-box margin-bottom-24px"
            v-for="(item, index) in salesCard"
            :key="index"
          >
            <h1 class="margin-bottom-24px">offer Details</h1>
            <div class="img-offer-card position-relative margin-bottom-24px">
              <img :src="item.imgCard" alt="Offer Image" />
              <span class="offers-sale position-absolute sale-offer"
                >30% off</span
              >
            </div>
            <div class="d-flex">
              <h1 class="item-name">{{ item.title }}</h1>
              <p class="price-value size-font color">
                {{ item.price }}
                <span class="font-size-currency text-uppercase color">{{
                  item.currency
                }}</span>
              </p>
            </div>
            <div class="date-end d-flex justify-content-between">
              <div>
                <span class="text-capitalize date">end date : </span>
                <span class="text-capitalize date-end">dec,3,2024</span>
              </div>
              <p class="text-line">80 sar</p>
            </div>
          </div>

          <div
            class="learn-more-box margin-bottom-24px d-flex justify-content-between"
          >
            <div class="img-taby d-flex align-items-center">
              <img src="/tabby-new 1.png" alt="" class="tabby-img" />
              <p class="tabby-text">
                4 Interest-free payments of
                <span class="sar-currency">22.41 SAR</span> With Tabby
              </p>
            </div>
            <div class="button-more">learn more</div>
          </div>

          <div class="offer-features margin-bottom-24px">
            <h1 class="margin-bottom-24px features-size">offer features</h1>
            <div class="d-flex gap-1">
              <p>1.</p>
              <p class="pragaraph">
                Lorem ipsum dolor sit amet,lorem ispum dolor sit amet, lorem
                ispum door sit amet lorem ipsum dolor sit amet lorem ispum dolor
              </p>
            </div>

            <div class="d-flex gap-1">
              <p>2.</p>
              <p class="pragaraph">
                sit amet, lorem ispum door sit amet lorem ipsum dolor sit amet
                lorem ispum dolor sit amet
              </p>
            </div>

            <div class="d-flex gap-1">
              <p>3.</p>
              <p class="pragaraph">
                sit amet, lorem ispum door sit amet lorem ipsum dolor sit amet
                lorem ispum dolor sit amet lorem ispum door
              </p>
            </div>

            <div class="d-flex gap-1">
              <p>4.</p>
              <p class="pragaraph">
                sit amet, lorem ispum door sit amet lorem ipsum dolor sit amet
                lorem ispum dolor sit amet lorem ispum door sit amet lorem ipsum
                dolor sit amet lorem ispum dolor sit amet dolor sit amet
              </p>
            </div>

            <div class="d-flex gap-1">
              <p>5.</p>
              <p class="pragaraph">
                sit amet, lorem ispum door sit amet lorem ipsum dolor sit amet
                lorem ispum dolor sit
              </p>
            </div>
          </div>

          <div class="conditions margin-bottom-24px">
            <h1 class="margin-bottom-24px features-size text-capitalize">
              terms and conditiions
            </h1>
            <div class="d-flex gap-1">
              <p>1.</p>
              <p class="pragaraph">
                Lorem ipsum dolor sit amet,lorem ispum dolor sit amet, lorem
                ispum door sit amet lorem ipsum dolor sit amet lorem ispum dolor
              </p>
            </div>
            <div class="d-flex gap-1">
              <p>2.</p>
              <p class="pragaraph">
                sit amet, lorem ispum door sit amet lorem ipsum dolor sit amet
                lorem ispum dolor sit amet
              </p>
            </div>
            <div class="d-flex gap-1">
              <p>3.</p>
              <p class="pragaraph">
                sit amet, lorem ispum door sit amet lorem ipsum dolor sit amet
                lorem ispum dolor sit amet
              </p>
            </div>
          </div>
          <div class="width-button ">
            <ButtonCard textButton="add to card" />
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

.col-padding {
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

.size-font {
  font-size: 32px;
}

.font-size-currency {
  font-size: 18px;
}

.color {
  color: #c71f45;
}

.text-line {
  text-decoration: line-through;
  color: #7e7e7e;
}

.date {
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0%;
  color: #7e7e7e;
}

.date-end {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
}

.learn-more-box {
  background: linear-gradient(90deg, #ffebeb 0%, #eff8ff 100%);
  padding: 23px 20px;
  border-radius: 20px;
}

.img-taby {
  display: flex;
  align-items: center;
  gap: 16px;
}

.tabby-img {
  width: 80px;
  height: auto;
  object-fit: contain;
  display: block;
}

.tabby-text {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
}

.sar-currency {
  font-family: var(--font-main);
  font-size: 16px;
  font-weight: 600;
}

.button-more {
  color: #7e7e7e;
  transition: all 0.3s ease;
}

.button-more:hover {
  cursor: pointer;
  transform: scale(1.03);
}

.features-size {
  font-size: 18px;
}

.pragaraph {
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0%;
}

.width-button {
  width: 40%;
  margin: auto;
  margin-bottom: 50px;
}
</style>
