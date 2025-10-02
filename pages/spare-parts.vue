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

            <div class="service-content d-flex flex-column align-items-center">
              <TitleServices
                :title="sparepart.title"
                :currency="
                  sparepart.has_price ? sparepart.price_text + ' sar' : ''
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
                  delete <Trash />
                </button>
              </div>
            </div>

            <div
              v-if="!sparepart.has_price"
              class="text-danger price-value mt-5"
            >
              سوف يتم تحديد السعر قريبا
            </div>

            <!-- btn add to cart -->
            <div class="div-button mt-3">
              <ButtonCard
                v-if="!sparepart.in_cart && !inCart[sparepart.id]"
                :textButton="
                  loadingAddToCart[sparepart.id] ? 'loading...' : 'add to cart'
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
                added to cart
              </button>
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
        <div class="isEmpty"></div>
        <div v-if="btnShooping" class="btn-shooping position-fixed bottom-0">
          <ButtonCard @click="BtnShooping" textButton="continue shopping" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ca } from "date-fns/locale";

const { getSpareParts } = useApi();
const {
  loadingAddToCart,
  inCart,
  allCartGuest,
  btnShooping,
  handleAdd,
  removeFromlocal,
  initCartFromLocalStorage,
} = useAddToCart();

// Modal state
let showOtpModal = ref(false);
let showDialCode = ref(false);

const spareParts = ref([]);
const fetchSparePart = async () => {
  const cached = localStorage.getItem("sparParts");
  const parsed = JSON.parse(cached);
  const dateNow = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  if (cached) {
    spareParts.value = JSON.parse(cached);
    const parsed = JSON.parse(cached);
    const dateNow = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (parsed && dateNow - parsed.timeEnd < oneDay) {
      spareParts.value = parsed.data;
      return;
    }
  }
  const responseSpare = await useApi().getSpareParts();
  spareParts.value = responseSpare?.data?.items;

  localStorage.setItem(
    "sparParts",
    JSON.stringify({ timeEnd: Date.now(), data: spareParts.value })
  );
};

onMounted(() => {
  fetchSparePart();
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
