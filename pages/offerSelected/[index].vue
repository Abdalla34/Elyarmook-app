<template>
  <div class="offer-selected">
    <div class="container">
      <div class="row">
        <div class="col-7 col-padding">
          <div
            class="offer-box margin-bottom-24px"
            v-for="(item, index) in slectedCard"
            :key="index"
          >
            <h1 class="margin-bottom-24px">offer Details</h1>
            <div class="img-offer-card position-relative margin-bottom-24px">
              <img :src="item.imgPrice" alt="Offer Image" />
              <span class="offers-sale position-absolute sale-offer">
                {{ item.sale }}
              </span>
            </div>
            <div class="d-flex">
              <h1 class="item-name">{{ item.title }}</h1>
              <p class="price-value size-font color">
                {{ item.prices }}
                <span class="font-size-currency text-uppercase color">
                  {{ item.currency }}
                </span>
              </p>
            </div>
            <div class="date-end d-flex justify-content-between">
              <div>
                <span class="text-capitalize date color-gray">end date : </span>
                <span class="text-capitalize date-end">
                  {{ item.endDate }}
                </span>
              </div>
              <p class="text-line color-gray">80 sar</p>
            </div>
          </div>

          <div
            class="learn-more-box margin-bottom-24px d-flex justify-content-between"
          >
            <div class="img-taby d-flex align-items-center gap-2 flex-wrap">
              <img src="/tabby-new 1.png" alt="Tabby Logo" class="tabby-img" />
              <p class="tabby-text mb-0">
                4 Interest-free payments of
                <span class="sar-currency fw-bold">22.41 SAR</span> With Tabby
              </p>
            </div>
            <div class="button-more">learn more</div>
          </div>

          <div class="offer-features margin-bottom-24px">
            <h1 class="margin-bottom-24px features-size">offer features</h1>
            <div class="d-flex gap-1">
              <span>1.</span>
              <p class="pragaraph">
                Lorem ipsum dolor sit amet,lorem ispum dolor sit amet, lorem
                ispum door sit amet lorem ipsum dolor sit amet lorem ispum dolor
              </p>
            </div>
            <div class="d-flex gap-1">
              <span>2.</span>
              <p class="pragaraph">
                sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                Lorem ipsum dolor sit amet
              </p>
            </div>
            <div class="d-flex gap-1">
              <span>3.</span>
              <p class="pragaraph">
                sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                Lorem ipsum dolor sit amet sit amet Lorem ipsum dolor sit amet
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit ame
              </p>
            </div>
            <div class="d-flex gap-1">
              <span>4.</span>
              <p class="pragaraph">
                Lorem ipsum dolor sit amet,lorem ispum dolor sit amet, lorem
                ispum door sit amet lorem ipsum dolor sit amet lorem ispum dolor
              </p>
            </div>
            <div class="d-flex gap-1">
              <span>5.</span>
              <p class="pragaraph">
                sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                Lorem ipsum dolor sit amet
              </p>
            </div>
          </div>

          <div class="conditions margin-bottom-24px">
            <h1 class="margin-bottom-24px features-size text-capitalize">
              terms and conditiions
            </h1>
            <div class="d-flex gap-1">
              <span>1.</span>
              <p class="pragaraph">
                sit amet, lorem ispum door sit amet lorem ipsum dolor sit amet
                lorem ispum dolor sit amet
              </p>
            </div>
          </div>

          <div class="width-button">
            <ButtonCard textButton="add to card" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let slectedCard = ref([
  {
    imgPrice: "/img-price2.png",
    title: "Periodic Maintenance",
    prices: "50",
    currency: "SAR",
    sale: "30% OFF",
    endDate: "Dec 3, 2024",
  },
]);
</script>
<style scoped>
.img-offer-card img {
  width: 100%;
  border-radius: 36px;
}

.size-font {
  font-size: 35px;
}

.tabby-img {
  width: 90px;
  height: auto;
  object-fit: contain;
}

.tabby-text {
  font-size: 16px;
  color: #333;
  line-height: 1.2;
  white-space: nowrap;
}

.offers-sale {
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  vertical-align: middle;
  background-color: #c71f45;
  color: white;
  padding: 1px 13px;
  border-radius: 20px;
  transition: all 0.3s ease;
  right: 19px;
  bottom: 22px;
}

.width-button {
  width: 40%;
  margin: auto;
}

.color {
  color: #c71f45;
}

.font-size-currency {
  font-size: 15px;
}

.features-size {
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0%;
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

.pragaraph {
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0%;
  color: #3D3D3D;
  /* margin-bottom: 12px; */
}

.text-line {
  text-decoration: line-through;
  color: #7e7e7e;
}

.color-gray {
  color: #7e7e7e;
}
</style>
