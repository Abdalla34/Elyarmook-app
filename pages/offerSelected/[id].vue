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
                {{ offerId.data.offer.price_before_discount }} SAR
              </p>
            </div>

            <div
              class="learn-more-box margin-bottom-24px d-flex flex-column flex-md-row justify-content-between align-items-center gap-2"
            >
              <div
                class="img-taby d-flex align-items-center gap-2 flex-wrap w-100"
              >
                <img
                  src="/tabby-new 1.png"
                  alt="Tabby Logo"
                  class="tabby-img"
                />
                <p class="tabby-text mb-0 text-break flex-grow-1">
                  4 Interest-free payments of
                  <span class="sar-currency fw-bold">22.41 SAR</span> With Tabby
                </p>
              </div>
              <div class="button-more p-color-fs text-capitalize text-nowrap">
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
          <OtpModal
            :showDialCode="showDialCode"
            :showOtpModal="showOtpModal"
            :phone="phone"
            :codeOtp="codeOtp"
            :counter="counter"
            :showResendOtp="showResendOtp"
            :codecorrect="codecorrect"
            :msgRes="msgRes"
            @update:phone="phone = $event"
            @update:codeOtp="codeOtp = $event"
            @closeDialCode="showDialCode = false"
            @closeOtpModal="showOtpModal = false"
            @sendOtp="handleSendOtp"
            @checkOtp="handleCheckOtp"
            @resendOtp="handleSendOtp"
          />

          <div class="div-button mt-3">
            <ButtonCard
              v-if="!inCart"
              textButton="add to cart"
              @click="handleAddToCart"
            />
            <!-- if includes cart -->
            <button
              v-if="inCart"
              class="additems text-capitalize label"
              disabled
            >
              <PuplicIconBtnCartAdded />
              added to cart
            </button>
          </div>
          <div class="no-offer" v-if="pageEmpty">
            <img src="/Car Brake Icon.png" alt="" />
          </div>
        </div>
      </div>
      <div v-if="btnShooping" class="btn-shooping position-fixed bottom-0">
        <ButtonCard @click="BtnShooping" textButton="continue shooping" />
      </div>
    </div>
  </div>
</template>

<script setup>
onMounted(async () => {
  const storedCart = JSON.parse(localStorage.getItem("cartGuest")) || [];
  guest.value = storedCart;
  storedCart.forEach((item) => {
    inCart.value[item.id] = true;
    btnShooping.value = true;
  });
});
let showOtpModal = ref(false);
let showDialCode = ref(false);
let phone = ref(null);
// let lastPhone = ref(null);
let codeOtp = ref("");
let codecorrect = ref(null);
let msgRes = ref("");

let extract = (textstep) => {
  if (!textstep) return [];
  return textstep.match(/(\d+\.\s?.+?)(?=\d+\.\s?|$)/gs) || [];
};

let steps = computed(() => {
  return extract(offerId.value?.data?.offer.description);
});
let btnShooping = ref(false);
let route = useRoute();
let idParams = route.params.id;
const dayjs = useDayjs();
let offerId = ref(null);
offerId.value = await useApi().getOfferSingle(idParams);
let pageEmpty = ref(false);
const token = useCookie("token");
let guest = ref([]);
let inCart = ref({});

const handleAddToCart = async () => {
  const offer = offerId.value?.data?.offer;
  if (!offer) return;

  if (!token?.value) {
    try {
      let storage = localStorage.getItem("cartGuest");
      let currentCart = storage ? JSON.parse(storage) : [];
      if (!currentCart.some((item) => item.id === offer.id)) {
        currentCart.push(offer);
        console.log("Added to guest cart:", currentCart);
      }
      guest.value = currentCart;
      localStorage.setItem("cartGuest", JSON.stringify(currentCart));
      inCart.value = true;
      btnShooping.value = true;
    } catch (err) {
      console.error("Error parsing localStorage:", err);
    }
    return;
  }

  try {
    const res = await useApi().addToCart("offer", Number(idParams), 1);
    console.log("Added to user cart:", res);
    inCart.value = true;
  } catch (err) {
    if (err?.response?.status === 401) {
      console.log("User is not authenticated");
    }
  }
};

// function removeFromlocal(id) {
//   let getLocal = localStorage.getItem("cartGuest");
//   let cart = JSON.parse(getLocal) || [];
//   cart = cart.filter((item) => item.id !== id);
//   localStorage.setItem("cartGuest", JSON.stringify(cart));
//   allCartGuest.value = cart;
//   inCart.value = false;
//   btnShooping.value = false;
// }
</script>

<style scoped>
@import "/assets/css/singleoffer.css";
.tabby-text {
  width: 100%;
  word-wrap: break-word;
  white-space: normal;
}
</style>
