<template>
  <Views />
  <div class="offer-selected">
    <div class="container">
      <div class="row">
        <div class="col-7 col-padding">
          <div class="offer-box margin-bottom-24px" v-if="selectedCard">
            <GoPageArrow title="offer Details" backPath="/offers" />

            <div class="img-offer-card position-relative margin-bottom-24px">
              <img :src="selectedCard.imgPrice" alt="Offer Image" />
              <span class="offers-sale position-absolute sale-offer">
                {{ selectedCard.sale }}
              </span>
            </div>

            <div class="d-flex align-items-center justify-content-between">
              <h1 class="item-name">{{ selectedCard.title }}</h1>
              <p class="price-value size-font color mb-0">
                {{ selectedCard.prices }}
                <span class="font-size-currency text-uppercase color">
                  {{ selectedCard.currency }}
                </span>
              </p>
            </div>

            <div class="date-end d-flex justify-content-between mt-3">
              <div>
                <span class="text-capitalize date color-gray">End date:</span>
                <span class="text-capitalize date-end">
                  {{ selectedCard.endDate }}
                </span>
              </div>
              <p class="text-line color-gray">80 {{ selectedCard.currency }}</p>
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
                  {{ selectedCard.details }}
                </p>
              </div>
            </div>
          </div>

          <!-- زرار الإضافة للكارت -->
          <div class="width-button">
            <ButtonCard textButton="add to cart" :isActive="activeIcon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let route = useRoute();

let idRoute = Number(route.params.id);

let selectedCard = ref(null);

onMounted(() => {
  let getStorage = localStorage.getItem("testsave");
  if (getStorage) {
    let offers = JSON.parse(getStorage);
    if (offers.id === idRoute) {
      selectedCard.value = offers;
    }
  }
});

// let route = useRoute();
// let idParams = route.params.id;
// let cardsOffer = ref([]);
// const { data } = await useFetch(`/apiOffers/${idParams}`);
// cardsOffer.value = data.value ? [data.value] : [];
</script>

<style scoped>
@import "/assets/css/singleoffer.css";
</style>
