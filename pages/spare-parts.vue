<template>
  <div class="services-parent">
    <div class="container cards-wrapper margin-bottom-section">
      <div class="row">
        <div
          class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
          v-for="sparepart in spareParts"
          :key="sparepart.id"
        >
          <div class="service-card text-center margin-bottom-24px position-relative">
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
                :currency="sparepart.has_price ? sparepart.price_text + ' sar' : ''"
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

            <div v-if="!sparepart.has_price" class="text-danger price-value mt-5">
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
// import { add } from "date-fns";

const { getSpareParts } = useApi();

// Cart composable
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

const { data: sparePartsData } = await useAsyncData("spare_parts", () =>
  getSpareParts()
);

const spareParts = computed(() => sparePartsData.value?.data?.items || []);

function BtnShooping() {
  showDialCode.value = true;
}

onMounted(() => {
  initCartFromLocalStorage();
});
</script>

<style scoped>
@import "@/assets/css/services.css";

.additems {
  background-color: #e8f5e8;
  border: 1px solid #4caf50;
  color: #4caf50;
  padding: 8px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
}

.btn-shooping {
  width: 100%;
  padding: 16px;
  background: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style>
