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
              textButton="add to cart"
              :isActive="activeIcon"
              @click="handleAddToCart"
            />
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
// let router = useRouter();
let extract = (textstep) => {
  if (!textstep) return [];
  return textstep.match(/(\d+\.\s?.+?)(?=\d+\.\s?|$)/gs) || [];
};

let steps = computed(() => {
  return extract(offerId.value?.data?.offer.description);
});

let activeIcon = ref(true);
let route = useRoute();
let idParams = route.params.id;
const dayjs = useDayjs();
let offerId = ref(null);
offerId.value = await useApi().getOfferSingle(idParams);
let pageEmpty = ref(false);
onMounted(() => {
  if (offerId?.data?.offer.length === 0) {
    pageEmpty.value = true;
  } else {
    pageEmpty.value = false;
  }
});
const { addToCart } = useAddToCart();

const token = useCookie("token").value;

const handleAddToCart = async () => {
  if (!token) {
    return navigateTo("/createaccount");
  }

  try {
    const res = await addToCart("offer", Number(idParams), 1);
    console.log("Added to cart:", res);
  } catch (err) {
    console.error("Add to cart failed:", err);
  }
};
</script>

<style scoped>
@import "/assets/css/singleoffer.css";
</style>
