<template>
  <div class="offer-selected">
    <div class="container">
      <!-- Skeleton -->
      <div class="row" v-if="isSkeleton">
        <div class="col-12 col-lg-7 col-padding">
          <Skeletons-OffersDetails />
        </div>
      </div>

      <!-- Offer details -->
      <div v-else-if="offerId?.data?.offer" class="row offer-details">
        <div class="col-12 col-lg-7 col-padding">
          <div class="offer-box margin-bottom-24px">
            <GoPageArrow :title="$t('offer Details')" backPath="/offers" />

            <!-- Image Section -->
            <div class="img-offer-card position-relative margin-bottom-24px">
              <img :src="offerId.data.offer.image" alt="Offer Image" />
              <span class="offers-sale position-absolute sale-offer">
                {{ Math.trunc(offerId.data.offer.discount_percentage) }}%
                {{ $t("OFF") }}
              </span>
            </div>

            <!-- Title & Price -->
            <div
              class="d-flex align-items-start justify-content-between flex-wrap"
            >
              <h1 class="item-name">{{ offerId.data.offer.title }}</h1>
              <p class="price-value size-font color mb-0">
                {{ offerId.data.offer.price_after_discount }}
                <span class="font-size-currency text-uppercase color">
                  {{ $t("sar") }}
                </span>
              </p>
            </div>

            <!-- End Date -->
            <div class="date-end d-flex justify-content-between mt-3 flex-wrap">
              <div>
                <span class="text-capitalize date color-gray">
                  {{ $t("end date") }}:
                </span>
                <span class="text-capitalize date-end">
                  {{
                    dayjs(offerId.data.offer.expires_at).format(
                      "ddd, MMM D ,YYYY"
                    )
                  }}
                </span>
              </div>
              <p class="text-line color-gray text-capitalize">
                {{ offerId.data.offer.price_before_discount }} {{ $t("sar") }}
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
                  {{ $t("4 Interest-free payments of") }}
                  <span class="sar-currency fw-bold text-uppercase">
                    22.41 {{ $t("sar") }}
                  </span>
                  {{ $t("With Tabby") }}
                </p>
              </div>
              <div class="button-more p-color-fs text-capitalize text-nowrap">
                {{ $t("learn more") }}
              </div>
            </div>

            <!-- Features -->
            <div class="offer-features margin-bottom-24px">
              <h1 class="margin-bottom-24px features-size">
                {{ $t("offer features") }}
              </h1>
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
                {{ $t("delete") }} <Trash />
              </button>
            </div>

            <div class="div-button">
              <ButtonCard
                v-if="!isOfferInCart"
                :textButton="
                  loadingAddToCart[offerId?.data?.offer?.id]
                    ? $t('loading...')
                    : $t('add to cart')
                "
                @click="handleAddToCart"
              />
              <button
                v-if="isOfferInCart"
                class="additems text-capitalize label w-100"
                disabled
              >
                <PuplicIconBtnCartAdded />
                {{ $t("added to cart") }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Continue shopping -->
      <div v-if="btnShooping" class="btn-shooping position-fixed bottom-0">
        <ButtonCard
          @click="BtnShooping"
          :textButton="$t('continue shopping')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAddToCart } from "@/composables/AddToCart";
import Trash from "@/components/trash.vue";
import PuplicIconBtnCartAdded from "@/components/Puplic-Icon/BtnCartAdded.vue";

const {
  loadingAddToCart,
  inCart,
  btnShooping,
  handleAdd,
  removeFromlocal,
  initCartFromLocalStorage,
} = useAddToCart();

const showOtpModal = ref(false);
const showDialCode = ref(false);
const route = useRoute();
const idParams = route.params.id;
const dayjs = useDayjs();

const offerId = ref(null);
const isSkeleton = ref(true);
const timeEndCach = 12 * 60 * 60 * 1000;

async function isCacheValid() {
  const currentTime = Date.now();
  const cacheKey = `offer_${idParams}`;
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    const parsed = JSON.parse(cachedData);
    if (currentTime - parsed.timestamp < timeEndCach) {
      offerId.value = parsed.offerId;
      isSkeleton.value = false;
      return;
    }
  }

  // Fetch from API
  const res = await useApi().getOfferSingle(idParams);
  offerId.value = res; // خليها زي ما بترجع بالظبط من الـ API
  isSkeleton.value = false;

  localStorage.setItem(
    "offerId",
    JSON.stringify({
      offerId: res,
      timestamp: currentTime,
    })
  );
}

const extract = (text) =>
  text ? text.match(/(\d+\.\s?.+?)(?=\d+\.\s?|$)/gs) || [] : [];

const steps = computed(() => {
  return extract(offerId.value?.data?.offer?.description);
});

// Check if offer is in cart
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

function handleOtpSuccess() {
  navigateTo("/order-update-details");
}

onMounted(() => {
  offerId.value = null;
  isSkeleton.value = true;
  isCacheValid();
  initCartFromLocalStorage();
});

// onMounted(() => {
//   isCacheValid();
//   initCartFromLocalStorage();
// });
</script>

<style scoped>
@import "@/assets/css/services.css";
@import "@/assets/css/singleoffer.css";
</style>
