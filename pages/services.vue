<template>
  <div class="services-parent">
    <div class="container cards-wrapper margin-bottom-section">
      <div v-if="isSkeleton">
        <Skeletons-Skeleton-Services-SparePart-Card />
      </div>
      <div v-else class="row">
        <div
          class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
          v-for="service in services"
          :key="service.id"
        >
          <div
            data-aos="fade-up"
            class="service-card text-center margin-bottom-24px position-relative"
          >
            <div class="service-icon-wrapper">
              <div class="service-icon">
                <img
                  class="img mb-2"
                  :src="service.image"
                  :alt="service.title"
                />
              </div>
            </div>

            <!-- services title -->
            <div class="service-content d-flex flex-column align-items-center">
              <TitleServices
                :title="service.title"
                :currency="service.price"
                :sar="$t('sar')"
              />

              <div
                v-if="inCart[service.id] && !token"
                class="mt-2 mb-3"
                @click="removeFromlocal(service)"
              >
                <button
                  class="btn btn-outline-danger btn-sm d-flex gap-2 align-items-center mb-4"
                >
                  {{ $t("delete") }} <Trash />
                </button>
              </div>
            </div>
            <!-- btn add to cart -->
            <div class="div-button mt-3">
              <ButtonCard
                class="testImport"
                v-if="!service.in_cart && !inCart[service.id]"
                :textButton="
                  loadingAddToCart[service.id]
                    ? $t('loading...')
                    : $t('add to cart')
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
                {{ $t("added to cart") }}
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
        <div
          v-if="btnShooping && !token"
          class="btn-shooping position-fixed bottom-0"
        >
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
let services = ref([]);
let showOtpModal = ref(false);
let showDialCode = ref(false);
const token = useCookie("token");
const timeEndCach = 2 * 24 * 60 * 60 * 1000;
const isSkeleton = ref(true);

async function isCacheValid() {
  const cachData = localStorage.getItem("servicesCache");
  const currentTime = Date.now();
  if (cachData) {
    const parseData = JSON.parse(cachData);

    if (currentTime - parseData.timestamp < timeEndCach) {
      services.value = parseData.services;
      isSkeleton.value = false;
    }
  }

  let res = await useApi().getServices();
  services.value = res?.data?.items || [];
  isSkeleton.value = false;

  localStorage.setItem(
    "servicesCache",
    JSON.stringify({
      services: services.value,
      timestamp: currentTime,
    })
  );
}

const {
  loadingAddToCart,
  inCart,
  allCartGuest,
  btnShooping,
  handleAdd,
  removeFromlocal,
  initCartFromLocalStorage,
} = useAddToCart();

onMounted(() => {
  isCacheValid();
  initCartFromLocalStorage();
});

function BtnShooping() {
  showDialCode.value = true;
}
const router = useRouter();
async function handleOtpSuccess() {
  const getCartId = await useApi().getMyCart();
  if (getCartId?.data?.id) {
    navigateTo(useLocalePath(`/order-update-details?id=${getCartId.data.id}`));
  }
}
</script>

<style scoped>
@import "@/assets/css/services.css";
@media (max-width: 576px) {
  .testImport {
    padding: 0px !important;
  }
}
</style>
