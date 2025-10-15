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

            <div class="d-flex justify-content-center gap-4 mb-32px">
              <v-otp-input
                v-model:value="code"
                :num-inputs="4"
                input-classes="input-style-otp"
                :should-auto-focus="true"
                :should-focus-order="true"
                input-type="number"
                @on-complete="handleCheckOTP"
                :is-disabled="loading"
                :placeholder="['-', '-', '-', '-']"
              />
            </div>
            <div class="text-center mt-3 mb-3">
              <p v-if="!showResendOtp" class="p-color-fs text-capitalize ">
                resend code after<span class="text-danger ps-2">
                  {{ counter }} second
                </span>
              </p>
              <p
                v-else
                class="text-primary text-capitalize mb-2"
                style="cursor: pointer"
                @click="sendOtpFn"
              >
                resend code
              </p>
            </div>
            <ButtonCard
              :textButton="loading ? 'Verifying...' : 'Verify'"
              @click="handleCheckOTP"
              :disabled="loading || code.length !== 4"
            />

            <div class="code-true mt-3" v-if="codeNoteTrue">
              <p class="text-danger fs-4 text-center text-uppercase">
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
import VOtpInput from "vue3-otp-input";

const route = useRoute();
const router = useRouter();
const { checkOTP, loginOrRegister } = useApi();

onMounted(() => {
  startCountdown();
});

const getQueryString = (val) => (Array.isArray(val) ? val[0] : val || "");
const getQueryBool = (val) => {
  if (Array.isArray(val)) val = val[0];
  return val === "true" || val === true;
};

const phone = ref(getQueryString(route.query.phone));
const registered = ref(getQueryBool(route.query.registered));
const code = ref("");
const loading = ref(false);
let codeNoteTrue = ref(false);

let counter = ref(null);
let showResendOtp = ref(false);
let timer = ref(null);
function startCountdown() {
  counter.value = 30;
  timer = setInterval(() => {
    if (counter.value > 0) {
      counter.value -= 1;
    } else {
      clearInterval(timer);
      showResendOtp.value = true;
    }
  }, 1000);
}
async function sendOtpFn() {
  await useApi().sendOTP(phone.value);
  if (phone.value) {
    showResendOtp.value = false;
    startCountdown();
  }
}

const cartCount = useState("cartCount", () => 0)

const handleCheckOTP = async (otpValue) => {
  const otp = otpValue || code.value;
  if (!phone.value || !otp) return;

  loading.value = true;
  try {
    const res = await checkOTP(phone.value, otp);
    if (res && res.status && res.message === "Code Is Correct") {
      if (registered.value) {
        const loginRes = await loginOrRegister({
          phone: phone.value,
          otp_code: otp,
          registered: registered.value,
        });

        if (
          loginRes &&
          loginRes.status &&
          loginRes.data &&
          loginRes.data.token &&
          loginRes.data.user
        ) {
          const token = useCookie("token");
          const user = useCookie("user", { maxAge: 365 * 24 * 60 * 60 });

          token.value = loginRes.data.token;
          user.value = JSON.stringify(loginRes.data.user);


          cartCount.value = 0;
          await useApi().getToken(loginRes.data.token)
          let resCart = await useApi().getMyCart()

          if (resCart?.status) {
            // Calculate total cart length including quantities
            const services = resCart.data?.services || [];
            const offers = resCart.data?.offers || [];
            const spareParts = resCart.data?.spare_parts || [];

            // Sum up quantities for services and spare parts
            const servicesCount = services.reduce((total, item) => total + (item.qty || 1), 0);
            const sparePartsCount = spareParts.reduce((total, item) => total + (item.qty || 1), 0);
            // Offers typically don't have quantities, so count each as 1
            const offersCount = offers.reduce((total, item) => total + (item.qty || 1), 0);
            
            const totalCartLength = servicesCount + sparePartsCount + offersCount;
            
            cartCount.value = totalCartLength;
          }          
        }

        router.push("/services");
      } else {
        router.push({
          path: "/register",
          query: {
            phone: phone.value,
            registered: registered.value,
            otp_code: otp,
          },
        });
      }
    } else {
      codeNoteTrue.value = true;
    }
  } catch (e) {
    codeNoteTrue.value = true;
  } finally {
    loading.value = false;
  }
};
</script>

<style>
.otp {
  background-color: #ffffff;
  box-shadow: 10px 10px 25px 10px #0000000d;
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

.otp-input-container {
  margin-bottom: 32px;
}

.input-style-otp {
  width: 120px;
  height: 80px;
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

@media (max-width: 768px) {
  .otp {
    width: 90%;
    padding: 40px 20px;
    border-radius: 20px;
    transform: translate(-50%, 20%);
  }
  .input-style-otp {
    width: 60px;
    height: 60px;
    margin: 0 5px;
    font-size: 18px;
  }
}
</style>
