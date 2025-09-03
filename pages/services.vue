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

        <!-- Phone Number Modal -->
        <div v-if="showDialCode" class="modal-overlay">
          <div class="modal-content">
            <h3 class="mb-4">Enter your phone number</h3>
            <div class="phone-input-container mb-4">
              <VueTelInput
                v-model="phone"
                mode="international"
                autoDefaultCountry
                defaultCountry="EG"
                validCharactersOnly
                :inputOptions="{
                  showDialCode: true,
                  showFlags: true,
                  showDialCodeInSelection: true,
                }"
                class="phone-input"
              />
            </div>
            <button
              :disabled="!phone || phone.length < 8"
              class="btn btn btn-outline-warning w-100"
              @click="handleSendOtp"
            >
              Continue
            </button>
            <button
              class="btn btn-outline-danger mt-2 w-100"
              @click="showDialCode = false"
            >
              Cancel
            </button>
          </div>
        </div>

        <!-- OTP Modal -->
        <div v-if="showOtpModal" class="modal-overlay">
          <div class="modal-content text-center">
            <h3 class="mb-2">Enter OTP Code</h3>
            <p class="p-color-fs mb-2">
              Please check your phone to see the verification code 📨
            </p>
            <div class="otp-wrapper">
              <v-otp-input
                ref="otpInput"
                v-model:value="codeOtp"
                :num-inputs="4"
                input-type="number"
                :should-auto-focus="true"
                :input-classes="'otp-input'"
                :placeholder="['*', '*', '*', '*']"
                separator=""
                @on-complete="handleCheckOtp"
              />
            </div>
            <div :class="codecorrect ? 'text-danger' : 'text-success'">
              {{ msgRes }}
            </div>
            <div class="text-center mt-3">
              <p v-if="!showResendOtp" class="p-color-fs text-capitalize">
                resend code after<span class="text-danger ps-2">
                  {{ counter }} second
                </span>
              </p>
              <p
                v-else
                class="text-primary text-capitalize"
                style="cursor: pointer"
                @click="handleSendOtp"
              >
                resend code
              </p>
            </div>
            <button
              class="btn btn btn-outline-danger mt-2 w-100"
              @click="showOtpModal = false"
            >
              Cancel
            </button>
          </div>
        </div>
        <div class="isEmpty"></div>
        <div
          v-if="btnShooping"
          class="btn-shooping position-fixed left-50 bottom-0 width"
        >
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
// const guest = useCookie("guest", { maxAge: 365 * 24 * 60 * 60 });
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
  if (!token.value && !user.value) {
    localStorage.removeItem("cartGuest");
  }
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
  if (
    (res?.status && res?.data?.registered === false) ||
    res?.data?.registered === "false"
  ) {
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

async function handleCheckOtp(otpValue) {
  let otp = otpValue.value || codeOtp.value;
  let res = await useApi().checkOTP(phone.value, otp);
  if (res?.status) {
    msgRes.value = res?.message;
    codecorrect.value = false;
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
