<template>
  <div class="offer-selected">
    <div class="container">
      <div class="row">
        <div class="col-7 col-padding">
          <div
            class="offer-box margin-bottom-24px"
            v-for="item in selectedCard"
            :key="item.id"
          >
            <GoPageArrow title="offer Details" backPath="/offers" />

            <div class="img-offer-card position-relative margin-bottom-24px">
              <img :src="item.imgPrice" alt="Offer Image" />
              <span class="offers-sale position-absolute sale-offer">
                {{ item.sale }}
              </span>
            </div>

            <div class="d-flex align-items-center justify-content-between">
              <h1 class="item-name">{{ item.title }}</h1>
              <p class="price-value size-font color mb-0">
                {{ item.prices }}
                <span class="font-size-currency text-uppercase color">
                  {{ item.currency }}
                </span>
              </p>
            </div>

            <div class="date-end d-flex justify-content-between mt-3">
              <div>
                <span class="text-capitalize date color-gray">End date:</span>
                <span class="text-capitalize date-end">
                  {{ item.endDate }}
                </span>
              </div>
              <p class="text-line color-gray">80 {{ item.currency }}</p>
            </div>

            <div
              class="learn-more-box margin-bottom-24px d-flex justify-content-between align-item-center"
            >
              <div class="img-taby d-flex align-items-center gap-2 flex-wrap">
                <img
                  src="/tabby-new 1.png"
                  alt="Tabby Logo"
                  class="tabby-img"
                />
                <p class="tabby-text mb-0">
                  4 Interest-free payments of
                  <span class="sar-currency fw-bold">22.41 SAR</span> With Tabby
                </p>
              </div>
              <div class="button-more p-color-fs text-capitalize">
                learn more
              </div>
            </div>

            <div class="offer-features margin-bottom-24px">
              <h1 class="margin-bottom-24px features-size">offer features</h1>
              <div class="d-flex gap-1">
                <span>1.</span>
                <p class="pragaraph">
                  {{ item.details }}
                </p>
              </div>
            </div>
          </div>

          <!-- زرار الإضافة للكارت -->
          <div class="width-button">
            <ButtonCard textButton="add to cart" isActive="activeIcon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let selectedCard = ref([
  {
    imgPrice: "/img-price2.png",
    title: "Periodic maintenance",
    prices: "60",
    currency: "SAR",
    sale: "20% OFF",
    endDate: "Jan 1, 2024",
    details:
      "orem ipsum dolor sit amet,Lorem ipsum dolor sit amet,  Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor",
  },
]);
let activeIcon = ref(true);

// let route = useRoute();
// let idParams = route.params.id;
// let cardsOffer = ref([]);
// const { data } = await useFetch(`/apiOffers/${idParams}`);
// cardsOffer.value = data.value ? [data.value] : [];
</script>

<style scoped>
.img-offer-card img {
  width: 100%;
  border-radius: 36px;
}

.learn-more-box {
  margin: 29px 0px 40px 0px;
  background: linear-gradient(90deg, #ffebeb 0%, #eff8ff 100%);
  padding: 16px 12px;
  border-radius: 20px;
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
  color: #3d3d3d;
  /* margin-bottom: 12px; */
}

.text-line {
  text-decoration: line-through;
  color: #7e7e7e;
}

.color-gray {
  color: #7e7e7e;
}

.button-more {
  text-decoration: underline;
  cursor: pointer;
}

.icon-width {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon-width:hover .fa-solid {
  color: var(--color-black);
  transform: translateX(-4px) scale(2);
  animation: slideLeft 0.3s ease infinite;
}

.fa-solid {
  cursor: pointer;
  font-size: 16px;
  color: #7e7e7e;
  transition: all 0.3s ease;
}

.icon-width:hover .fa-solid {
  color: var(--color-black);
  transform: translateX(-4px) scale(2);
}

@keyframes slideLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-4px);
  }
}
</style>
