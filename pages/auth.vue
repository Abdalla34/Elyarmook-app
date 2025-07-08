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

            <form @submit.prevent="checkOtp">
              <div
                class="parent d-flex align-items-center justify-content-center"
              >
                <input
                  v-for="(input, index) in inputs"
                  type="text"
                  placeholder="-"
                  class="input-style-otp text-center"
                  maxlength="1"
                  :ref="(el) => (inputs[index] = el)"
                  @input="handleInput(index, $event)"
                  v-model="codeDigits[index]"
                />
              </div>
              <button-card
                text-button="continue"
                type="submit"
                class="mt-32px"
              />
            </form>

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

<script setup>

let inputs = ref(["", "", "", ""]);
let codeNum = ref("1234");
let codeDigits = ref(["", "", "", ""]);
let codeNoteTrue = ref(false);
let codeChecked = ref(false);

function checkOtp() {
  let code = codeDigits.value.join("");
  if (code === codeNum.value) {
    codeNoteTrue.value = false;
    navigateTo("/createaccount");
  } else {
    codeNoteTrue.value = true;
  }
}

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

const appConfig = useAppConfig();
const baseUrl = appConfig.baseURL;
const { data } = await useFetch(`${baseUrl}/auth/send-otp`, {
  method: "POST",
  headers: {
    Authorization: `Bearer`,
  },
  body: {
    phone: "01000000000",
  },
});
</script>

<style scoped>
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
  width: 126px;
  border-radius: 12px;
  padding: 28px 16px;
  border-width: 1px;
  border: none;
  border: 1px solid #f1f3f9;
  font-size: 20px;
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
