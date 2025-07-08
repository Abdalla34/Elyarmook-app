<template>
  <div>
    <ProfileDetails />
    <div class="profile-information">
      <div class="container">
        <div class="row">
          <div class="col-8 col-padding">
            <div
              class="profiel-img d-flex justify-content-between align-items-center margin-bottom-24px"
            >
              <h1 class="margin-bottom-24px text-capitalize personal mb-0">
                personal information
              </h1>
              <div
                v-if="data?.value"
                class="box-img position-relative text-center"
              >
                <img
                  v-if="data.registered === true"
                  @click="ChangeProfile"
                  src="/Ellipse 2.png"
                  alt=""
                  class="img-profile"
                />
                <div
                  class="change-profile position-absolute"
                  :class="{ 'd-block': profileImg }"
                >
                  <h6 class="h6 text-capitalize">profile picture</h6>
                  <div
                    class="change box-design d-flex gap-2 justify-content-center align-items-center"
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 17.5V11.5L7.5 13.5"
                        stroke="#040505"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.5 11.5L11.5 13.5"
                        stroke="#040505"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M22.5 10.5V15.5C22.5 20.5 20.5 22.5 15.5 22.5H9.5C4.5 22.5 2.5 20.5 2.5 15.5V9.5C2.5 4.5 4.5 2.5 9.5 2.5H14.5"
                        stroke="#040505"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M22.5 10.5H18.5C15.5 10.5 14.5 9.5 14.5 6.5V2.5L22.5 10.5Z"
                        stroke="#040505"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p class="mb-0 text-capitalize paragraph-change font-p">
                      change
                    </p>
                  </div>
                  <div
                    class="delete box-design d-flex gap-2 justify-content-center align-items-center"
                  >
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 6.48047C17.67 6.15047 14.32 5.98047 10.98 5.98047C9 5.98047 7.02 6.08047 5.04 6.28047L3 6.48047"
                        stroke="#EB5757"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.5 5.47L8.72 4.16C8.88 3.21 9 2.5 10.69 2.5H13.31C15 2.5 15.13 3.25 15.28 4.17L15.5 5.47"
                        stroke="#EB5757"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.8504 9.64062L18.2004 19.7106C18.0904 21.2806 18.0004 22.5006 15.2104 22.5006H8.79039C6.00039 22.5006 5.91039 21.2806 5.80039 19.7106L5.15039 9.64062"
                        stroke="#EB5757"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.3301 17H13.6601"
                        stroke="#EB5757"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.5 13H14.5"
                        stroke="#EB5757"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <p class="mb-0 text-capitalize font-p color-delete">
                      delete
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="data?.value" class="col-8 col-padding margin-bottom-24px">
            <div v-if="data.registered === true" class="inputs">
              <div class="row-inputs">
                <div class="input d-flex flex-column">
                  <label class="label">first name</label>
                  <input type="text" placeholder="your name" />
                </div>

                <div class="input d-flex flex-column">
                  <label class="label">last name</label>
                  <input type="text" placeholder="your name" />
                </div>
              </div>

              <div class="row-inputs">
                <div class="input d-flex flex-column">
                  <label class="label">phone Number</label>
                  <input type="text" placeholder="your phone" />
                </div>
                <div class="input d-flex flex-column">
                  <label class="label">email addrees</label>
                  <input type="text" placeholder="your email" />
                </div>
              </div>

              <div class="row-inputs">
                <div class="input d-flex flex-column">
                  <label class="label" for="">area</label>
                  <input type="text" placeholder="central region" />
                </div>
                <div class="input d-flex flex-column">
                  <label class="label" for="">city</label>
                  <input type="text" placeholder="central region" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="data?.value"
          class="button-save border-radius-36px width-height"
        >
          <button v-if="data.registered === true" class="text-capitalize">
            save
          </button>
        </div>

        <div
          v-if="data?.value"
          class="button-delete border-radius-36px width-height d-flex justify-content-center margin-bottom-90px"
        >
          <button
            v-if="data.registered === true"
            class="text-capitalize color-but d-flex align-items-center gap-3"
          >
            <Trash />
            <span>delete my account</span>
          </button>
        </div>
      </div>
    </div>
    <div class="otp text-center">
      <div class="img">
        <img src="/newLogo.png" alt="" />
        <h1>OTP Verification</h1>
        <p>Please check your phone to see the verification code 📨</p>

        <div class="input-otp">
          <div class="mt-60px">
            <h6 class="text-start h6">insert code</h6>
            <div class="parent d-flex align-item-center justify-content-center">
              <input
                type="text"
                class="input-style-otp"
                v-for="(input, index) in inputs"
                :key="index"
                maxlength="1"
                :ref="(el) => (inputs[index] = el)"
                @input="handle(index, $event)"
              />

              <!-- <input
                maxlength="1"
                class="input-style-otp"
                type="text"
                placeholder="-"
                v-for="(input, index) in 4"
                :key="index"
                :ref="(el) => (inputs[index] = el)"
                @input="handleInput(index, $event)"
              /> -->
            </div>
            <div class="code-true mt-3" v-if="codeNotTrue">
              <p class="text-danger text-center text-uupercase">
                code not true
              </p>
            </div>
          </div>
        </div>
        <div @click="test">tesssssssssst</div>
      </div>
    </div>
  </div>
</template>

<script setup>
let inputs = ref(["", "", "", ""]);

let codeNotTrue = ref(false);
const codeNum = ref("1234");

function checkOtp() {
  let code = inputs.value.map((input) => input.value).join("");
  if (code === codeNum.value) {
    codeNotTrue.value = false;
    navigateTo("/");
  } else {
    codeNotTrue.value = true;
  }
}

function handle(index, event) {
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
  let filled = inputs.value.every((input) => input.value !== "");
  if (filled) {
    checkOtp();
  }
}

const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;
const { data } = await useFetch(`${baseUrl}/auth/send-otp`, {
  method: "POST",
  headers: {
    Authorization: `Bearer`,
  },
  body: {
    phone: "01000000000",
  },
});

function test() {
  if (data.value?.data?.registered !== undefined) {
    console.log(data.value.data.registered);
  } else {
    console.log("no get data from api");
  }
}

let profileImg = ref(false);
function ChangeProfile() {
  profileImg.value = !profileImg.value;
}
// test
// test
// test
// test
// test
// test

  console.log('hello world')

</script>

<style>
@import "@/assets/css/profileInformation.css";
.otp {
  background-color: #ffffff;
  box-shadow: 0px 0px 15px 0px #0000000d;
  width: 50%;
  padding: 60px 40px;
  border-radius: 50px;
  position: relative;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -25%);
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
}
.mt-60px {
  margin-top: 60px;
}
.h6 {
  margin-left: 20px;
  margin-bottom: 8px;
  color: #40444c;
  font-size: 16px;
  font-weight: 500;
}
.parent {
  gap: 10px;
}
</style>
