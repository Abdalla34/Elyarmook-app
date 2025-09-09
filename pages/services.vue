<template>
  <div class="services-parent">
    <div class="container cards-wrapper margin-bottom-section">
      <div class="row">
        <div
          class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
          v-for="service in services"
          :key="service.id"
        >
          <div
            class="service-card text-center margin-bottom-24px position-relative"
          >
            <div class="service-icon-wrapper">
              <div class="service-icon">
                <img class="img" :src="service.image" :alt="service.title" />
              </div>
            </div>

            <!-- services title -->
            <div class="service-content d-flex flex-column align-items-center">
              <TitleServices
                :title="service.title"
                :currency="service.price"
                :sar="'sar'"
              />

              <div
                v-if="inCart[service.id]"
                class="mt-2 mb-3"
                @click="removeFromlocal(service)"
              >
                <button
                  class="btn btn-outline-danger btn-sm d-flex gap-2 align-items-center"
                >
                  delete <Trash />
                </button>
              </div>
            </div>
            <!-- btn add to cart -->
            <div class="div-button mt-3">
              <ButtonCard
                v-if="!service.in_cart && !inCart[service.id]"
                :textButton="
                  loadingAddToCart[service.id] ? 'loading...' : 'add to cart'
                "
                @click="handleAdd(service, 'service')"
              />
              <!-- if includes cart -->
              <button
                v-if="service.in_cart || inCart[service.id]"
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
        <!-- <div v-if="btnShooping" class="btn-shooping position-fixed bottom-0">
          <ButtonCard @click="BtnShooping" textButton="continue shooping" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
let services = ref([]);
let showOtpModal = ref(false);
let showDialCode = ref(false);

const {
  loadingAddToCart,
  inCart,
  allCartGuest,
  btnShooping,
  handleAdd,
  removeFromlocal,
  initCartFromLocalStorage,
} = useAddToCart();

try {
  let res = await useApi().getServices();
  services.value = res.data?.items || [];
} catch (error) {
  console.error("Error fetching services:", error);
}

onMounted(() => {
  initCartFromLocalStorage();
});

function BtnShooping() {
  showDialCode.value = true;
}
</script>

<style scoped>
@import "@/assets/css/services.css";
</style>
