<template>
  <div class="offer-selected">
    <div class="container">
      <div class="row offer-details">
        <div class="col-12 col-lg-7 col-padding">
          <div class="offer-box margin-bottom-24px" v-if="offerId?.data?.offer">
            <GoPageArrow title="offer Details" backPath="/offers" />

            <!-- Image Section -->
            <div class="img-offer-card position-relative margin-bottom-24px">
              <img :src="offerId?.data?.offer.image" alt="Offer Image" />
              <span class="offers-sale position-absolute sale-offer">
                {{ Math.trunc(offerId.data.offer.discount_percentage) }}% OFF
              </span>
            </div>

            <!-- Title & Price -->
            <div
              class="d-flex align-items-start justify-content-between flex-wrap"
            >
              <h1 class="item-name">{{ offerId.data.offer.title }}</h1>
              <p class="price-value size-font color mb-0">
                {{ offerId.data.offer.price_after_discount }}
                <span class="font-size-currency text-uppercase color">sar</span>
              </p>
            </div>

            <!-- End Date -->
            <div class="date-end d-flex justify-content-between mt-3 flex-wrap">
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

            <!-- Tabby Box -->
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

            <!-- Features -->
            <div class="offer-features margin-bottom-24px">
              <h1 class="margin-bottom-24px features-size">offer features</h1>
              <div
                v-for="(step, index) in steps"
                :key="index"
                class="d-flex gap-1 flex-wrap"
              >
                <span>{{ index + 1 }}</span> :
                <p class="pragaraph">{{ step.replace(/^\d+\.\s*/, "") }}</p>
              </div>
            </div>
          </div>

          <!-- Cart section -->
          <OtpModal
            :showDialCode="showDialCode"
            :showOtpModal="showOtpModal"
            @close-dial-code="showDialCode = false"
            @close-otp-modal="showOtpModal = false"
            @open-otp-modal="showOtpModal = true"
            @otp-success="handleOtpSuccess"
          />

          <div class="cart-section margin-bottom-24px">
            <div
              v-if="isOfferInCart"
              class="mb-3"
              @click="handleRemoveFromCart"
            >
              <button
                class="btn btn-outline-danger btn-sm d-flex gap-2 align-items-center w-100 justify-content-center"
              >
                delete <Trash />
              </button>
            </div>

            <div class="div-button">
              <ButtonCard
                v-if="!isOfferInCart"
                :textButton="
                  loadingAddToCart[offerId?.data?.offer?.id]
                    ? 'loading...'
                    : 'add to cart'
                "
                @click="handleAddToCart"
              />
              <button
                v-if="isOfferInCart"
                class="additems text-capitalize label w-100"
                disabled
              >
                <PuplicIconBtnCartAdded />
                added to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="row">
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
            @close-dial-code="showDialCode = false"
            @close-otp-modal="showOtpModal = false"
            @open-otp-modal="showOtpModal = true"
            @otp-success="handleOtpSuccess"
          />

        
          <div class="cart-section margin-bottom-24px">
            <div
              v-if="isOfferInCart"
              class="mb-3"
              @click="handleRemoveFromCart"
            >
              <button
                class="btn btn-outline-danger btn-sm d-flex gap-2 align-items-center w-100 justify-content-center"
              >
                delete <Trash />
              </button>
            </div>

            <div class="div-button">
              <ButtonCard
                v-if="!isOfferInCart"
                :textButton="
                  loadingAddToCart[offerId?.data?.offer?.id]
                    ? 'loading...'
                    : 'add to cart'
                "
                @click="handleAddToCart"
              />
           
              <button
                v-if="isOfferInCart"
                class="additems text-capitalize label w-100"
                disabled
              >
                <PuplicIconBtnCartAdded />
                added to cart
              </button>
            </div>
          </div>
        </div>
      </div> -->
      <div v-if="btnShooping" class="btn-shooping position-fixed bottom-0">
        <ButtonCard @click="BtnShooping" textButton="continue shopping" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAddToCart } from "@/composables/AddToCart";
import Trash from "@/components/trash.vue";
import PuplicIconBtnCartAdded from "@/components/Puplic-Icon/BtnCartAdded.vue";

// Cart composable
const {
  loadingAddToCart,
  inCart,
  btnShooping,
  handleAdd,
  removeFromlocal,
  initCartFromLocalStorage,
} = useAddToCart();

// Modal state
let showOtpModal = ref(false);
let showDialCode = ref(false);

// Route and data
let route = useRoute();
let idParams = route.params.id;
const dayjs = useDayjs();
let offerId = ref(null);

// Get offer data
offerId.value = await useApi().getOfferSingle(idParams);

let extract = (textstep) => {
  if (!textstep) return [];
  return textstep.match(/(\d+\.\s?.+?)(?=\d+\.\s?|$)/gs) || [];
};

let steps = computed(() => {
  return extract(offerId.value?.data?.offer.description);
});

// Check if current offer is in cart
const isOfferInCart = computed(() => {
  const offer = offerId.value?.data?.offer;
  return offer && (offer.in_cart || inCart.value[offer.id]);
});

const handleAddToCart = async () => {
  const offer = offerId.value?.data?.offer;
  if (!offer) return;

  await handleAdd(offer, "offer");
};

const handleRemoveFromCart = () => {
  const offer = offerId.value?.data?.offer;
  if (!offer) return;

  removeFromlocal(offer);
};

function BtnShooping() {
  showDialCode.value = true;
}

onMounted(() => {
  initCartFromLocalStorage();
});
function handleOtpSuccess() {
  navigateTo("/order-update-details");
}
</script>

<style scoped>
@import "@/assets/css/services.css";
@import "@/assets/css/singleoffer.css";

</style>
