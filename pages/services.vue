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
        <LoadingSpinner :is-loading-otp="isLoadingOtp" />
        <div class="isEmpty"></div>
        <div v-if="btnShooping" class="btn-shooping position-fixed bottom-0">
          <ButtonCard @click="BtnShooping" textButton="continue shooping" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { tr } from "date-fns/locale";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import VOtpInput from "vue3-otp-input";

let services = ref([]);
let token = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });
const user = useCookie("user", { maxAge: 365 * 24 * 60 * 60 });
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
let phone = ref(null);
let lastPhone = ref(null);
let codeOtp = ref("");
let codecorrect = ref(null);
let msgRes = ref("");

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

let counter = ref(null);
let showResendOtp = ref(false);
let timer = ref(null);
function startCountdown() {
  timer = setInterval(() => {
    if (counter.value > 0) {
      counter.value -= 1;
    } else {
      clearInterval(timer);
      showResendOtp.value = true;
    }
  }, 1000);
}

async function handleSendOtp() {
  let phoneToSend = phone.value || lastPhone.value;
  let res = await useApi().sendOTP(phoneToSend);
  if (res?.status) {
    lastPhone.value = phoneToSend;
    showOtpModal.value = true;
    showDialCode.value = false;
    showResendOtp.value = false;
    counter.value = 30;
    startCountdown();
  }
}

watch(phone, (newVal) => {
  phone.value = newVal.replace(/\s+/g, "");
});

let isLoadingOtp = ref(false);
async function handleCheckOtp(otpValue) {
  let otp = otpValue.value || codeOtp.value;
  let res = await useApi().checkOTP(phone.value, otp);
  if (res?.status) {
    showOtpModal.value = false;
    codecorrect.value = false;
    isLoadingOtp.value = true;
    let responseRigsetr = await useApi().loginOrRegister({
      phone: phone.value,
      otp_code: otp,
    });
    if (responseRigsetr?.status && responseRigsetr?.data?.token) {
      token.value = responseRigsetr?.data?.token;
      user.value = JSON.stringify(responseRigsetr?.data?.user);

      if (allCartGuest.value?.length) {
        const items = allCartGuest.value.map((item) => ({
          type: "service",
          item_id: item.id,
          qty: 1,
        }));

        let resMultiCart = await useApi().addToCartMulti(items, token.value);

        if (resMultiCart?.status) {
          localStorage.removeItem("cartGuest");
          allCartGuest.value = [];
        }
      }
      navigateTo("/order-update-details");
    }

    console.log(responseRigsetr);
  } else {
    codecorrect.value = true;
    msgRes.value = res?.message;
  }
}

function BtnShooping() {
  showDialCode.value = true;
}
</script>

<style scoped>
@import "@/assets/css/services.css";
</style>
