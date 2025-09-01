<template>
  <div class="services-parent">
    <div class="container cards-wrapper margin-bottom-section">
      <div class="row">
        <div
          class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
          v-for="service in services"
          :key="service.id"
        >
          <div class="service-card text-center margin-bottom-24px">
            <div class="service-icon-wrapper">
              <div class="service-icon">
                <img class="img" :src="service.image" :alt="service.title" />
              </div>
            </div>

            <div class="service-content">
              <TitleServices
                :title="service.title"
                :currency="service.price"
                :sar="'sar'"
              />
            </div>
            <div  v-if="inCart[service.id]"  class="text-danger" @click="removeFromlocal(service)">
              delete this item
            </div>
            <div class="div-button">
              <ButtonCard
                v-if="!inCart[service.id]"
                :textButton="
                  loadingAddToCart[service.id] ? 'loading...' : 'add to cart'
                "
                @click="handleAdd(service)"
              />
              <button
                v-if="inCart[service.id]"
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
            <button class="btn btn-primary w-100" @click="handleSendOtp">
              Continue
            </button>
            <button
              class="btn btn-secondary mt-2 w-100"
              @click="showDialCode = false"
            >
              Cancel
            </button>
          </div>
        </div>

        <!-- OTP Modal -->
        <div v-if="showOtpModal" class="modal-overlay">
          <div class="modal-content">
            <h3 class="mb-4">Enter OTP Code</h3>
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
            <button
              class="btn btn-secondary mt-2 w-100"
              @click="showOtpModal = false"
            >
              Cancel
            </button>
          </div>
        </div>
        <div class="isEmpty"></div>
        <div
          v-if="btnShooping"
          class="btn-shooping position-fixed left-0 bottom-0 width"
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
const guest = useCookie("guest", { maxAge: 365 * 24 * 60 * 60 });
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
        inCart.value[service.id] = true;
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

let showOtpModal = ref(false);
let showDialCode = ref(false);
let phone = ref(null);
function BtnShooping() {
  showDialCode.value = true;
}
async function handleSendOtp() {
  let res = await useApi().sendOTP(phone.value);
  if (res?.status) {
    showOtpModal.value = true;
    showDialCode.value = false;
  }
}

let codeOtp = ref("");
let codecorrect = ref(null);
let msgRes = ref("");
async function handleCheckOtp(otpValue) {
  let otp = otpValue.value || codeOtp.value;
  let res = await useApi().checkOTP(phone.value, otp);
  if (res?.status) {
    console.log("check code is correct now you can reigster");
    msgRes.value = res?.message;
    codecorrect.value = false;
    let responseRigsetr = await useApi().loginOrRegister({
      phone: phone.value,
      otp_code: otp,
    });
    if (responseRigsetr?.status) {
      guest.value = true;
      token.value = responseRigsetr?.data?.token;
      user.value = JSON.stringify(responseRigsetr?.data?.user);
      navigateTo("/order-update-details");
    }
    console.log(responseRigsetr);
  } else {
    codecorrect.value = true;
    msgRes.value = res?.message;
    console.log(res?.message);
  }
}

function removeFromlocal(service) {
  let getLocal = localStorage.getItem("cartGuest");
  let cart = getLocal ? JSON.parse(getLocal) : [];
  cart = cart.filter((item) => item.id !== service.id);
  localStorage.setItem("cartGuest", JSON.stringify(cart));
  allCartGuest.value = cart;
  inCart.value[service.id] = false;
  return cart;
}

// interface Service {
//   id: number;
//   title: string;
//   image: string;
//   price: number;
//   in_cart: boolean;
// }

// interface CartItem extends Service {}

// interface LoginResponse {
//   status: boolean;
//   data?: {
//     token: string;
//     user?: any;
//     registered?: boolean;
//   };
//   message?: string;
// }

// interface OTPResponse {
//   status?: boolean;
//   message?: string;
//   data?: {
//     registered?: boolean;
//   };
// }

// const token = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });
// const guest = useCookie("guest", { maxAge: 365 * 24 * 60 * 60 });
// const user = useCookie("user", { maxAge: 365 * 24 * 60 * 60 });
// let addedCart = ref(false);

// const { getServices, addToCart } = useApi();
// let loadingAddToCart = ref<Record<number, boolean>>({});
// const { data: servicesData }: any = await useAsyncData("services", () =>
//   getServices()
// );

// const services = computed(() => servicesData.value?.data?.items || []);
// let activeIcon = ref(true);
// let allCartGuest = ref<CartItem[]>([]);
// let inputRigsGuest = ref(false);
// let phoneNum = ref("");
// let code = ref("");
// let showOtpModal = ref(false);
// let router = useRouter();
// const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);

// async function handleAdd(service: Service) {
//   if (!token.value) {
//     // Get current cart from localStorage
//     let currentCart: CartItem[] = [];
//     try {
//       const storedCart = localStorage.getItem("serviceToAdd");
//       currentCart = storedCart ? JSON.parse(storedCart) : [];
//     } catch {
//       currentCart = [];
//     }
//     // Prevent duplicates
//     if (!currentCart.some((item: CartItem) => item.id === service.id)) {
//       currentCart.push(service);
//     }
//     localStorage.setItem("serviceToAdd", JSON.stringify(currentCart));
//     allCartGuest.value = currentCart;
//     addedCart.value = true;
//   }

//   if (token.value) {
//     loadingAddToCart.value[service.id] = true;
//     try {
//       const res: any = await addToCart("service", service.id, 1);
//       if (res.success) {
//         service.in_cart = true;
//       }
//     } catch (err: any) {
//       if (err?.response?.status === 401) {
//         console.log("User is not authenticated");
//       }
//     } finally {
//       loadingAddToCart.value[service.id] = false;
//     }
//   }
// }

// async function handleContinueShopping() {
//   const phone = phoneNum.value;
//   if (!phone) return;

//   try {
//     const res = (await useApi().sendOTP(phone)) as OTPResponse;
//     if (res?.status) {
//       // Hide phone input modal and show OTP modal
//       inputRigsGuest.value = false;
//       showOtpModal.value = true;
//     } else {
//       console.error("Failed to send OTP");
//     }
//   } catch (err) {
//     console.error("Failed to send OTP:", err);
//   }
// }

// function isServiceInLocalCart(serviceId: number) {
//   try {
//     const storedCart = localStorage.getItem("serviceToAdd");
//     const items: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
//     return items.some((item: CartItem) => item.id === serviceId);
//   } catch {
//     return false;
//   }
// }

// const handleCheckOTP = async (otpValue: string) => {
//   const otp = otpValue || code.value;
//   if (!phoneNum.value || !otp) return;

//   try {
//     // Step 1: Verify OTP code
//     const otpRes = (await useApi().checkOTP(
//       phoneNum.value,
//       otp
//     )) as OTPResponse;

//     if (!otpRes?.message?.includes("Code Is Correct")) {
//       console.error("Invalid OTP code");
//       return;
//     }

//     // Step 2: Login or register the user
//     const loginRes = (await useApi().loginOrRegister({
//       phone: phoneNum.value,
//       otp_code: otp,
//       registered: false,
//     })) as LoginResponse;

//     if (!loginRes?.status || !loginRes?.data?.token) {
//       console.error("Login/Register failed");
//       return;
//     }

//     // Step 3: Set tokens and user data

//     token.value = loginRes.data.token;
//     guest.value = "true"; // Mark as guest user

//     if (loginRes.data.user) {
//       user.value = JSON.stringify(loginRes.data.user);
//     }

//     // Close the OTP modal
//     showOtpModal.value = false;

//     // Step 4: Transfer cart items from localStorage to server
//     const storedCart = localStorage.getItem("serviceToAdd");
//     if (storedCart) {
//       const cartItems: CartItem[] = JSON.parse(storedCart);
//       for (const item of cartItems) {
//         await addToCart("service", item.id, 1);
//       }
//       localStorage.removeItem("serviceToAdd"); // Clear local cart after transfer
//     }

//     // Step 5: Redirect to order-update-details page to complete registration
//     router.push({
//       path: "/order-update-details",
//       query: {
//         phone: phoneNum.value,
//       },
//     });
//   } catch (error) {
//     console.error("Error during authentication:", error);
//   }
// };
</script>

<style scoped>
@import "@/assets/css/services.css";
.cart-feedback {
  margin-bottom: 16px;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
}
.cart-feedback.success {
  background: #e6ffed;
  color: #1a7f37;
  border: 1px solid #b7ebc6;
}
.cart-feedback.error {
  background: #fff1f0;
  color: #cf1322;
  border: 1px solid #ffa39e;
}
.isadded-continue {
  width: fit-content;
  z-index: 1;
}
.continue-shopping {
  border: none;
  border-radius: 20px;
}
.width {
  width: fit-content;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-content h3 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
}

.phone-input-container {
  width: 100%;
}

.phone-input {
  width: 100% !important;
}
/* Phone input styling */
:deep(.vue-tel-input) {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
}

:deep(.vue-tel-input:focus-within) {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

:deep(.vti__input) {
  background: transparent;
  border: none;
  padding: 0 8px;
  width: 100%;
  outline: none;
}

:deep(.vti__dropdown) {
  padding: 0 8px;
  background: transparent;
  border: none;
}

:deep(.vti__dropdown-list) {
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 4px;
}

.otp-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

:deep(.otp-input) {
  width: 50px !important;
  height: 50px !important;
  padding: 8px;
  font-size: 1.2rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin: 0 8px;
  text-align: center;
  background: white;
}

:deep(.otp-input:focus) {
  outline: none;
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

@media (max-width: 480px) {
  :deep(.otp-input) {
    width: 40px !important;
    height: 40px !important;
    font-size: 1rem;
    margin: 0 4px;
  }
}
</style>
