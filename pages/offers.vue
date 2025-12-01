<template>
  <div>
    <div class="offers margin-bottom-section">
      <div class="offers-page">
        <div class="container">
          <div v-if="isSkeleton">
            <Skeletons-OffersSkeleton />
          </div>
          <div v-else class="row">
            <div
            data-aos="fade-up"
              class="col-lg-6 col-md-12 col-sm-12"
              v-for="item in offers"
              :key="item.id"
            >
              <div class="offer-card margin-bottom-24px" @click="toBox(item)">
                <div class="img-offer text-center">
                  <img :src="item.image" alt="" class="margin-bottom-24px" />
                </div>

                <div
                  class="details-card d-flex justify-content-between margin-bottom-24px"
                >
                  <h1 class="item-name text-start">{{ item.title }}</h1>
                  <span
                    class="offers-sale d-flex align-items-center justify-content-center"
                    >{{ item.discount_percentage_text }} {{ $t("OFF") }}
                  </span>
                </div>

                <div
                  class="parent-price d-flex align-items-center justify-content-between"
                >
                  <div class="price-section d-flex align-items-end gap-2">
                    <p class="price">
                      {{ item.price_after_discount }}
                      <span class="sar text-uppercase">{{ $t("sar") }}</span>
                    </p>
                    <p class="end-date">
                      {{ item.price_before_discount }}
                      <span class="sar text-uppercase">{{ $t("sar") }}</span>
                    </p>
                  </div>
                  <div class="date text-center">
                    <span class="end-date-span text-capitalize">{{
                      $t("end date")
                    }}</span>
                    <p class="">
                      {{ dayjs(item.expires_at).format("ddd, MMM D, YYYY") }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="ing-false text-center not-offer" v-if="isNotOffers">
              <PuplicIconNotOffer />
              <h1>{{ $t("There are no Offer") }}</h1>
              <p>{{ $t("There are no Offer, Stay stand") }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let dayjs = useDayjs();
const isSkeleton = ref(true);
let offers = ref([]);

const timeEndCach = 12 * 60 * 60 * 1000;
async function isCacheValid() {
  const cachData = localStorage.getItem("offers");
  const currentTime = Date.now();
  if (cachData) {
    const parseData = JSON.parse(cachData);

    if (currentTime - parseData.timestamp < timeEndCach) {
      offers.value = parseData.offers;
      isSkeleton.value = false;
    }
  }

  let res = await useApi().getOffers();
  offers.value = res?.data?.items || null;
  isSkeleton.value = false;
  isNotOffers.value = offers.value.length === 0;

  localStorage.setItem(
    "offers",
    JSON.stringify({
      offers: offers.value,
      timestamp: currentTime,
    })
  );
}

let router = useRouter();
const localePath = useLocalePath();
function toBox(item) {
  router.push(localePath(`/offerSelected/${item.id}`));
}

let isNotOffers = ref(false);
onMounted(() => {
  isCacheValid();
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
