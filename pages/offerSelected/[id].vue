<template>
  <div class="offer-selected">
    <div class="container">
      <div class="row">
        <div class="col-7 col-padding">
          <div class="offer-box margin-bottom-24px" v-if="offerId?.data?.offer">
            <GoPageArrow title="offer Details" backPath="/offers" />

            <div class="img-offer-card position-relative margin-bottom-24px">
              <img :src="offerId?.data?.offer.image" alt="Offer Image" />
              <span class="offers-sale position-absolute sale-offer">
                {{ Math.trunc(offerId.data.offer.discount_percentage) }}% OFF
              </span>
            </div>

            <div class="d-flex align-items-center justify-content-between">
              <h1 class="item-name">{{ offerId.data.offer.title }}</h1>
              <p class="price-value size-font color mb-0">
                {{ offerId.data.offer.price_after_discount }}
                <span class="font-size-currency text-uppercase color">
                  sar
                </span>
              </p>
            </div>

            <div class="date-end d-flex justify-content-between mt-3">
              <div>
                <span class="text-capitalize date color-gray">End date: </span>
                <span class="text-capitalize date-end">
                  {{
                    dayjs(offerId.data.offer.expires_at).format(
                      "ddd, MMM D ,YYYY"
                    )
                  }}
                </span>
              </div>
              <p class="text-line color-gray">
                {{ Math.trunc(offerId.data.offer.price_before_discount) }} SAR
              </p>
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
              <div
                v-for="(step, index) in steps"
                :key="index"
                class="d-flex gap-1"
              >
                <span>{{ index + 1 }}</span>
                :
                <p class="pragaraph">{{ step.replace(/^\d+\.\s*/, "") }}</p>
              </div>
            </div>
          </div>

          <!-- زرار الإضافة للكارت -->
          <div class="width-button" v-if="offerId?.data?.offer">
            <ButtonCard
              v-if="!itemAdded.includes(offerId.data.offer.id)"
              textButton="add to cart"
              :isActive="activeIcon"
              @click="handleAddToCart"
            />
          </div>
          <div class="width-button" v-if="offerId?.data?.offer">
            <button
              v-if="itemAdded.includes(offerId.data.offer.id)"
              class="additems text-capitalize label"
              disabled
            >
              <svg
                width="20"
                height="79"
                viewBox="0 0 80 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M40 78.3318C18.4344 78.3318 0.953125 60.7972 0.953125 39.1659C0.953125 17.5346 18.4344 0 40 0C61.5656 0 79.0469 17.5346 79.0469 39.1659C79.0469 60.7972 61.5656 78.3318 40 78.3318ZM36.107 54.8323L63.7132 27.1381L58.1919 21.6L36.107 43.7562L25.0607 32.6761L19.5394 38.2142L36.107 54.8323Z"
                  fill="#67A93E"
                />
              </svg>
              added to cart
            </button>
          </div>

          <div class="no-offer" v-if="pageEmpty">
            <img src="/Car Brake Icon.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let extract = (textstep) => {
  if (!textstep) return [];
  return textstep.match(/(\d+\.\s?.+?)(?=\d+\.\s?|$)/gs) || [];
};

let steps = computed(() => {
  return extract(offerId.value?.data?.offer.description);
});

let itemAdded = ref([]);
let activeIcon = ref(true);
let route = useRoute();
let idParams = route.params.id;
const dayjs = useDayjs();
let offerId = ref(null);
offerId.value = await useApi().getOfferSingle(idParams);
console.log(offerId);
let pageEmpty = ref(false);

onMounted(() => {
  if (offerId?.data?.offer.length === 0) {
    pageEmpty.value = true;
  } else {
    pageEmpty.value = false;
  }
  itemAdded.value = JSON.parse(localStorage.getItem("offerAdd")) || [];
});

const { addToCart } = useApi();
const token = useCookie("token").value;
const handleAddToCart = async () => {
  if (!token) {
    return navigateTo("/createaccount");
  }
  try {
    const res = await addToCart("offer", Number(idParams), 1);
    if (res && res.status === true) {
      if (!itemAdded.value.includes(offerId.value.data.offer.id)) {
        itemAdded.value.push(offerId.value.data.offer.id);
        localStorage.setItem("offerAdd", JSON.stringify(itemAdded.value));
      }
    }
    console.log("Added to cart:", res);
  } catch (err) {
    console.error("Add to cart failed:", err);
  }
};
</script>

<style scoped>
@import "/assets/css/singleoffer.css";
</style>
