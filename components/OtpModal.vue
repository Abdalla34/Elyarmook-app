<template>
  <!-- Phone Number Modal -->
  <div v-if="props.showDialCode">
    <div class="modal-backdrop fade show"></div>
    <div
      class="modal fade show"
      tabindex="-1"
      aria-labelledby="phoneModalLabel"
      aria-modal="true"
      role="dialog"
      style="display: block"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      @mousedown.self="$emit('close-dial-code')"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div
            class="modal-header d-flex align-items-center justify-content-between"
          >
            <h3 class="mb-0" id="phoneModalLabel">
              {{ $t("Enter your phone number") }}
            </h3>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="$emit('close-dial-code')"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSendOtp">
              <div class="phone-input-container mb-4">
                <VueTelInput
                  v-model="phone"
                  mode="international"
                  autoDefaultCountry
                  defaultCountry="SA"
                  validCharactersOnly
                  :inputOptions="{
                    showDialCode: true,
                    showFlags: true,
                    showDialCodeInSelection: true,
                  }"
                  :class="{ 'is-invalid': phoneError }"
                  class="phone-input"
                />
                <div v-if="phoneError" class="invalid-feedback d-block">
                  {{ phoneError }}
                </div>
              </div>
              <button
                type="submit"
                :disabled="!isValidPhone"
                class="btn btn-outline-warning w-100"
              >
                {{ $t("continue") }}
              </button>
              <button
                class="btn btn-outline-danger mt-2 w-100"
                @click="$emit('close-dial-code')"
              >
                {{ $t("Cancel") }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- OTP Modal -->
  <div v-if="props.showOtpModal">
    <div class="modal-backdrop fade show"></div>
    <div
      class="modal fade show"
      tabindex="-1"
      aria-labelledby="otpModalLabel"
      aria-modal="true"
      role="dialog"
      style="display: block"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      @mousedown.self="$emit('close-otp-modal')"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center">
          <div class="modal-header">
            <h3 class="mb-0" id="otpModalLabel">{{ $t("Enter OTP Code") }}</h3>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="$emit('close-otp-modal')"
            ></button>
          </div>
          <div class="modal-body">
            <p class="p-color-fs mb-2">
              {{
                $t(" Please check your phone to see the verification code 📨")
              }}
            </p>
            <div class="otp-wrapper">
              <v-otp-input
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
              class="btn btn-outline-danger mt-2 w-100"
              @click="$emit('close-otp-modal')"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <LoadingSpinner :is-loading-otp="isLoadingOtp" />
</template>

<script setup>
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import VOtpInput from "vue3-otp-input";

const props = defineProps({
  showDialCode: Boolean,
  showOtpModal: Boolean,
});

let phone = ref(null);
let phoneError = ref("");
let codeOtp = ref("");
let showResendOtp = ref(false);
let codecorrect = ref(null);
let msgRes = ref("");
let isLoadingOtp = ref(false);
let token = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });
const user = useCookie("user", { maxAge: 365 * 24 * 60 * 60 });
let allCartGuest = ref([]);

async function handleCheckOtp(otpValue) {
  try {
    let otp = otpValue.value || codeOtp.value;
    isLoadingOtp.value = true;
    let res = await useApi().checkOTP(phone.value, otp);
    if (res?.status) {
      // props.showOtpModal = false;
      emit("close-otp-modal");
      codecorrect.value = false;
      let responseRigsetr = await useApi().loginOrRegister({
        phone: phone.value,
        otp_code: otp,
      });
      if (responseRigsetr?.status && responseRigsetr?.data?.token) {
        token.value = responseRigsetr?.data?.token;
        user.value = JSON.stringify(responseRigsetr?.data?.user);
        const storedCart = JSON.parse(localStorage.getItem("cartGuest")) || [];
        allCartGuest.value = storedCart;

        if (allCartGuest.value?.length) {
          const items = allCartGuest.value.map((item) => ({
            type: item.type,
            item_id: item.id,
            qty: 1,
          }));

          let resMultiCart = await useApi().addToCartMulti(
            { items },
            token.value
          );

          if (resMultiCart?.status) {
            localStorage.removeItem("cartGuest");
            allCartGuest.value = [];
          }
        }
        isLoadingOtp.value = false;
        emit("otp-success");
      }

      console.log(responseRigsetr);
    } else {
      codecorrect.value = true;
      msgRes.value = res?.message;
    }
  } catch (error) {
    codecorrect.value = true;
  } finally {
    isLoadingOtp.value = false;
  }
}

let lastPhone = ref(null);

let counter = ref(null);
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

const isValidPhone = computed(() => {
  const phoneVal = phone.value;
  return (
    phoneVal &&
    phoneVal.length >= 8 &&
    phoneVal.length <= 11 &&
    !phoneError.value
  );
});

async function handleSendOtp(event) {
  event?.preventDefault();
  if (!isValidPhone.value) return;

  try {
    const phoneToSend = phone.value || lastPhone.value;
    let res = await useApi().sendOTP(phoneToSend);
    if (res?.status) {
      lastPhone.value = phoneToSend;
      emit("open-otp-modal");
      emit("close-dial-code");
      showResendOtp.value = false;
      counter.value = 30;
      startCountdown();
    }
  } catch (error) {
    console.error("Failed to send OTP:", error);
    phoneError.value = "Failed to send OTP. Please try again.";
  }
}

watch(phone, (newVal) => {
  if (newVal) {
    const cleanNumber = newVal.replace(/\s+/g, "");
    // Check phone length
    if (cleanNumber.length > 11) {
      phoneError.value = $t("phone invalid length max");
      phone.value = cleanNumber.slice(0, 11);
    } else if (cleanNumber.length < 8) {
      phoneError.value = $t("phone invalid length min");
    } else {
      phoneError.value = "";
    }
    phone.value = cleanNumber;
  }
});

// emit
const emit = defineEmits([
  "close-dial-code",
  "close-otp-modal",
  "open-otp-modal",
]);
</script>
<style scoped>
.otp-input {
  width: 70px !important;
  height: 70px;
  text-align: center;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 0 5px;
}
.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875em;
  margin-top: 0.25rem;
}
.btn-close {
  margin-left: 0px !important;
}
</style>
