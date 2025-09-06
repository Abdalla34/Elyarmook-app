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

              <!-- delete button under price -->
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
                @click="handleAdd(service)"
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
          <ButtonCard @click="BtnShooping" textButton="continue shooping" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let services = ref([]);
let token = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });
let loadingAddToCart = ref({});

try {
  let res = await useApi().getServices();
  services.value = res.data?.items || [];
} catch (error) {
  console.error("Error fetching services:", error);
}
const inCart = ref({});
let allCartGuest = ref([]);
let btnShooping = ref(false);
let showOtpModal = ref(false);
let showDialCode = ref(false);

onMounted(async () => {
  const storedCart = JSON.parse(localStorage.getItem("cartGuest")) || [];
  allCartGuest.value = storedCart;
  storedCart.forEach((item) => {
    inCart.value[item.id] = true;
    btnShooping.value = true;
  });
});

async function handleAdd(service) {
  if (!token.value) {
    let currentCart = [];
    try {
      const storedCart = localStorage.getItem("cartGuest");
      currentCart = storedCart ? JSON.parse(storedCart) : [];
    } catch {
      currentCart = [];
    }
    if (!currentCart.some((item) => item.id === service.id)) {
      currentCart.push(service);
      inCart.value[service.id] = true;
      btnShooping.value = true;
    }
    localStorage.setItem("cartGuest", JSON.stringify(currentCart));
    allCartGuest.value = currentCart;
  }

  if (token.value) {
    loadingAddToCart.value[service.id] = true;
    try {
      const res = await useApi().addToCart("service", service.id, 1);
      if (res.status) {
        service.in_cart = true;
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        console.log("User is not authenticated");
      }
    } finally {
      loadingAddToCart.value[service.id] = false;
    }
  }
}

function removeFromlocal(service) {
  let getLocal = localStorage.getItem("cartGuest");
  let cart = JSON.parse(getLocal) || [];
  cart = cart.filter((item) => item.id !== service.id);
  localStorage.setItem("cartGuest", JSON.stringify(cart));
  allCartGuest.value = cart;
  inCart.value[service.id] = false;
  btnShooping.value = false;
}

function BtnShooping() {
  showDialCode.value = true;
}
</script>

<style scoped>
@import "@/assets/css/services.css";
</style>
