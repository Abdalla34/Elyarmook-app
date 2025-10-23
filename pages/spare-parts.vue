<template>
  <div class="services-parent">
    <div class="container cards-wrapper margin-bottom-section">
      <div class="row">
        <div
          class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
          v-for="sparepart in spareParts"
          :key="sparepart.id"
        >
          <div
            class="service-card text-center margin-bottom-24px position-relative"
          >
            <div class="service-icon-wrapper">
              <div class="service-icon">
                <img
                  class="img"
                  :src="sparepart.image"
                  :alt="sparepart.title"
                />
              </div>
            </div>
            <!-- component services title -->
            <div class="service-content d-flex flex-column align-items-center">
              <TitleServices
                :title="sparepart.title"
                :currency="
                  sparepart.has_price ? sparepart.price_text + $t('sar') : ''
                "
              />

              <div
                v-if="inCart[sparepart.id]"
                class="mt-2 mb-3"
                @click="removeFromlocal(sparepart)"
              >
                <button
                  class="btn btn-outline-danger btn-sm d-flex gap-2 align-items-center"
                >
                  {{ $("delete") }} <Trash />
                </button>
              </div>
            </div>

            <div
              v-if="!sparepart.has_price"
              class="text-danger price-value mt-5"
            >
              {{ $t("The price will be determined soon") }}
            </div>

            <!-- btn add to cart -->
            <div class="div-button mt-3">
              <ButtonCard
                v-if="!sparepart.in_cart && !inCart[sparepart.id]"
                :textButton="
                  loadingAddToCart[sparepart.id]
                    ? $t('loading...')
                    : $t('add to cart')
                "
                @click="handleAdd(sparepart, 'spare_part')"
              />
              <!-- if includes cart -->
              <button
                v-if="sparepart.in_cart || inCart[sparepart.id]"
                class="additems text-capitalize label"
                disabled
              >
                <PuplicIconBtnCartAdded />
                {{ $t("added to cart") }}
              </button>
            </div>
          </div>
        </div>
        <!-- component otp modal -->
        <OtpModal
          :showDialCode="showDialCode"
          :showOtpModal="showOtpModal"
          @close-dial-code="showDialCode = false"
          @close-otp-modal="showOtpModal = false"
          @open-otp-modal="showOtpModal = true"
          @otp-success="handleOtpSuccess"
        />
        <!-- show if cart empty -->
        <div class="isEmpty"></div>
        <div v-if="btnShooping" class="btn-shooping position-fixed bottom-0">
          <ButtonCard
            @click="BtnShooping"
            :textButton="$t('continue shopping')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const spareParts = ref([]);

const {
  loadingAddToCart,
  inCart,
  allCartGuest,
  btnShooping,
  handleAdd,
  removeFromlocal,
  initCartFromLocalStorage,
} = useAddToCart();
const {getSpareParts} = useApi()
// Modal state
let showOtpModal = ref(false);
let showDialCode = ref(false);

const endTimeCache = 60 * 60 * 1000; // 1 ساعة

async function isCach() {
  const getCache = localStorage.getItem("sparePartsCache");
  const currentTime = Date.now();

  if (getCache) {
    const parsedData = JSON.parse(getCache);

    if (currentTime - parsedData.timestamp < endTimeCache) {
      spareParts.value = parsedData.spareParts;
    }
  }

  const responseSpare = await getSpareParts();
  spareParts.value = responseSpare?.data?.items || [];

  localStorage.setItem(
    "sparePartsCache",
    JSON.stringify({
      spareParts: spareParts.value,
      timestamp: currentTime,
    })
  );
}

onMounted(async () => {
  await isCach();
  initCartFromLocalStorage();
});

function BtnShooping() {
  showDialCode.value = true;
}

function handleOtpSuccess() {
  navigateTo("/order-update-details");
}
</script>

<style scoped>
@import "@/assets/css/services.css";
</style>
