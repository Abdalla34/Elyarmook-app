<template>
  <div class="position-relative">
    <div class="otp text-center">
      <div class="img">
        <img src="/newLogo.png" />
        <h1>OTP Verification</h1>
        <p>Please check your phone to see the verification code 📨</p>

        <div class="input-otp">
          <div class="mt-60px">
            <h6 class="text-start h6">insert code</h6>

            <v-otp-input
              v-model:value="code"
              :num-inputs="4"
              input-classes="input-style-otp text-center"
              :should-auto-focus="true"
              :should-focus-order="true"
              input-type="number"
              @on-complete="handleCheckOTP"
              :is-disabled="loading"
              :placeholder="['-', '-', '-', '-']"
            />
            <ButtonCard
              :textButton="loading ? 'Verifying...' : 'Verify'"
              @click="handleCheckOTP"
              :disabled="loading || code.length !== 4"
            />

            <div class="code-true mt-3" v-if="codeNoteTrue">
              <p class="text-danger text-center text-uupercase">
                code not true
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useApi } from "@/composables/useApi";
import VOtpInput from "vue3-otp-input";
import { useCookie } from "#app";

let inputs = ref(["", "", "", ""]);
let codeNum = ref("1234");
let codeDigits = ref(["", "", "", ""]);
let codeNoteTrue = ref(false);
let codeChecked = ref(false);

const route = useRoute();
const router = useRouter();
const { checkOTP, loginOrRegister } = useApi();

const getQueryString = (val: any): string =>
  Array.isArray(val) ? val[0] : val || "";
const getQueryBool = (val: any): boolean => {
  if (Array.isArray(val)) val = val[0];
  return val === "true" || val === true;
};

const phone = ref(getQueryString(route.query.phone));
const registered = ref(getQueryBool(route.query.registered));
const code = ref("");
const loading = ref(false);

const handleCheckOTP = async (otpValue?: string) => {
  const otp = otpValue || code.value;
  if (!phone.value || !otp) return;
  loading.value = true;
  try {
    const res = await checkOTP(phone.value, otp);
    if (res && res.status && res.message === "Code Is Correct") {
      if (registered.value) {
        const loginRes = await loginOrRegister({ phone: phone.value, otp_code: otp, registered: registered.value });
        if (loginRes && loginRes.status && loginRes.data && loginRes.data.token && loginRes.data.user) {
          // Save token and user data for future usage
          const token = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });
          const user = useCookie("user", { maxAge: 365 * 24 * 60 * 60 });
          token.value = loginRes.data.token;
          user.value = JSON.stringify(loginRes.data.user);
        }
        router.push("/");
      } else {
        // Continue registration flow
      }
    } else {
      alert("Invalid code");
    }
  } catch (e) {
    alert("Failed to verify code");
  } finally {
    loading.value = false;
  }
};

function valideOtp() {
  let code = codeDigits.value.join("");
  codeNoteTrue.value = code !== codeNum.value;
}

function handleInput(index, event) {
  let value = event.target.value;
  if (value.length === 1 && index < inputs.value.length - 1) {
    inputs.value[index + 1].focus();
  }

  if (
    value === "" &&
    event.inputType === "deleteContentBackward" &&
    index > 0
  ) {
    inputs.value[index - 1].focus();
  }

  let filled = codeDigits.value.every((input) => input !== "");
  if (filled) {
    codeChecked.value = true;
    valideOtp();
  } else {
    codeChecked.value = false;
  }
}
</script>

<style>
.otp {
  background-color: #ffffff;
  box-shadow: 0px 0px 15px 0px #0000000d;
  width: fit-content;
  padding: 60px 40px;
  border-radius: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 40%);
}
.otp h1 {
  font-family: var(--font-main);
  font-weight: 700;
  font-style: Bold;
  font-size: 24px;
  text-align: center;
  color: #262338;
  margin-top: 28px;
  margin-bottom: 8px;
}
.otp p {
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 16px;

  color: #7e7e7e;
}
.input-style-otp {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 12px;
  border: 1px solid #f1f3f9;
  text-align: center;
  background: #fff;
}
.input-style-otp.is-complete {
  background-color: #e4e4e4;
}
.text-center {
  text-align: center;
}
.mt-60px {
  margin-top: 60px;
}
.h6 {
  margin-bottom: 8px;
  color: #40444c;
  font-size: 16px;
  font-weight: 500;
}
.parent {
  gap: 10px;
}

.mt-32px {
  margin-top: 32px;
}
</style>
