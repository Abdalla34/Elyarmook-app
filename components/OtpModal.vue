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
            <h3 class="mb-0 label" id="phoneModalLabel">
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
                <div class="input-group">
                  <!-- الكود الدولي ثابت -->
                  <span class="input-group-text">+966</span>

                  <!-- المستخدم يكتب من بعد رقم 5 -->
                  <input
                    type="tel"
                    v-model="phone"
                    @input="formatSaudiNumber"
                    class="form-control ltr-otp"
                    maxlength="9"
                    placeholder="5xxxxxxxx"
                    :class="{ 'is-invalid': phoneError }"
                  />
                </div>

                <div v-if="phoneError" class="invalid-feedback d-block">
                  {{ phoneError }}
                </div>
              </div>
              <ButtonCard
                type="submit"
                :textButton="$t('continue')"
                :disabled="!isValidPhone || isSendingOtp"
                v-if="!isSendingOtp"
                :class="{ 'not-allowed': !isValidPhone || isSendingOtp }"
              />
              <button
                style="background-color: var(--main-color)"
                class="btn border-radius-36px w-100 mb-2"
                v-else
              >
                <span
                  class="spinner-border spinner-border-sm text-success"
                ></span>
              </button>
              <button
                class="btn btn-outline-danger w-100"
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
          <div class="modal-header d-flex justify-content-between">
            <h3 class="mb-0 label" id="otpModalLabel">
              {{ $t("Enter OTP Code") }}
            </h3>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="$emit('close-otp-modal')"
            ></button>
          </div>
          <div class="modal-body">
            <img src="/newLogo.png" />
            <h1 class="label">{{ $t("OTP Verification") }}</h1>
            <p class="p-color-fs mb-2">
              {{ $t("Please check your phone to see the verification code") }}
            </p>
            <div class="otp-wrapper d-flex justify-content-center mt-3 mb-0">
              <v-otp-input
                :class="$i18n.locale === 'ar' ? 'rtl-otp' : 'ltr-otp'"
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
            <div class="text-center mt-1">
              <p v-if="!showResendOtp" class="p-color-fs text-capitalize">
                {{ $t("resend code after")
                }}<span class="text-danger ps-2">
                  {{ counter }} {{ $t("second") }}
                </span>
              </p>
              <p
                v-else
                class="text-primary text-capitalize"
                style="cursor: pointer"
                @click="handleSendOtp"
              >
                {{ $t("resend code") }}
              </p>
            </div>
            <button
              class="btn btn-outline-danger mt-2 w-100"
              @click="$emit('close-otp-modal')"
            >
              {{ $t("Cancel") }}
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
const isSendingOtp = ref(false);
const { checkOTP, sendOTP, loginOrRegister, addToCartMulti } = useApi();

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
    let res = await checkOTP(phone.value, otp);
    if (res?.status) {
      // props.showOtpModal = false;
      emit("close-otp-modal");
      codecorrect.value = false;
      let responseRigsetr = await loginOrRegister({
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

          let resMultiCart = await addToCartMulti({ items }, token.value);

          if (resMultiCart?.status) {
            localStorage.removeItem("cartGuest");
            allCartGuest.value = [];
          }
        }
        isLoadingOtp.value = false;
        emit("otp-success");
      }
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
  return phoneVal && phoneVal.length === 9 && phoneVal.startsWith("5");
});
async function handleSendOtp(event) {
  event?.preventDefault();
  if (!isValidPhone.value) return;

  isSendingOtp.value = true;

  try {
    const phoneToSend = phone.value || lastPhone.value;
    let res = await sendOTP(`+966${phoneToSend}`);
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
    phoneError.value = $t("Failed to send OTP. Please try again.");
  } finally {
    isSendingOtp.value = false;
  }
}

function formatSaudiNumber(event) {
  let value = event.target.value.replace(/\D/g, ""); // يشيل أي حاجة غير أرقام

  // لو أول رقم مش 5 نحطه غصب عنه
  if (!value.startsWith("5")) {
    value = "5" + value.replace(/^5*/, "");
  }

  // خليه مايزدش عن 9 أرقام بعد الـ5
  if (value.length > 9) {
    value = value.slice(0, 9);
  }

  phone.value = value;

  // التحقق من الطول
  if (value.length < 9) {
    phoneError.value = $t("phone invalid length min");
  } else if (value.length > 9) {
    phoneError.value = $t("phone invalid length max");
  } else {
    phoneError.value = "";
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

.not-allowed {
  cursor: not-allowed !important;
  opacity: 0.6; 
}

.ltr-otp {
  direction: ltr !important;
}

.rtl-otp {
  direction: rtl !important;
}

.rtl-otp .v-otp-input__input {
  direction: rtl !important;
  text-align: center !important;
}

input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  margin: 0;
}
</style>
