<template>
  <div>
    <div class="offers margin-bottom-section">
      <div class="offers-page">
        <div class="container">
          <div class="row">
            <div
              class="col-lg-6 col-md-12 col-sm-12"
              v-for="item in offers.data.items"
              :key="item.id"
            >
              <div class="offer-card margin-bottom-24px" @click="toBox(item)">
                <div class="img-offer text-center">
                  <img
                    src="/offerImage.png"
                    alt=""
                    class="margin-bottom-24px"
                  />
                </div>

                <div
                  class="details-card d-flex justify-content-between margin-bottom-24px"
                >
                  <h1 class="item-name">{{ item.title }}</h1>
                  <span
                    class="offers-sale d-flex align-items-center justify-content-center"
                    >{{ item.discount_percentage_text }} OFF
                  </span>
                </div>

                <div
                  class="parent-price d-flex align-items-center justify-content-between"
                >
                  <div class="price-section d-flex align-items-end gap-3">
                    <p class="price">
                      {{ item.price_after_discount }}
                      <span class="sar">SAR</span>
                    </p>
                    <p class="end-date">
                      {{ item.price_before_discount }}
                      <span class="span">SAR</span>
                    </p>
                  </div>
                  <div class="date text-center">
                    <span class="end-date-span text-capitalize">end date</span>
                    <p class="">
                      {{ dayjs(item.expires_at).format("ddd, MMM D, YYYY") }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="ing-false text-center not-offer" v-if="isNotOffers">
              <icon-not-offers />
              <h1>There are no Offer</h1>
              <p>There are no Offer, Stay stand</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let dayjs = useDayjs();

let offers = await useApi().getOffers();

let router = useRouter();
function toBox(item) {
  router.push(`/offerSelected/${item.id}`);
}

let isNotOffers = ref(false);
onMounted(() => {
  if (offers.data.items.length === 0) {
    isNotOffers.value = true;
  } else {
    isNotOffers.value = false;
  }
});
</script>

<style scoped>
@import "@/assets/css/offers.css";

.not-offer h1 {
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 18px;
  color: #14142b;
}
.not-offer p {
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 12px;
  color: #14142b;
}
</style>
