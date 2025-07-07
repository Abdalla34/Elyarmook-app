<template>
  <Views />
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
@import "/assets/css/singleoffer.css";
</style>
