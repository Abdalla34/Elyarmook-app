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
            <div class="div-button">
              <ButtonCard
                v-if="!isServiceInLocalCart(service.id) && !service.in_cart"
                :textButton="
                  loadingAddToCart[service.id] ? 'Loading...' : 'add to cart'
                "
                :isActive="activeIcon"
                @click="handleAdd(service)"
              />
              <div class="div-button">
                <button
                  v-if="isServiceInLocalCart(service.id) || service.in_cart"
                  class="additems text-capitalize label"
                  disabled
                >
                  <PuplicIconBtnCartAdded />
                  added to cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          @click="inputRigsGuest = true"
          class="isadded-continue position-fixed left-0 bottom-0"
        >
          <ButtonCard textButton="continue shopping" />
        </div>
        <!-- Phone Number Modal -->
        <div v-if="inputRigsGuest" class="modal-overlay">
          <div class="modal-content">
            <h3 class="mb-4">Enter your phone number</h3>
            <div class="phone-input-container mb-4">
              <VueTelInput
                v-model="phoneNum"
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
              class="btn btn-primary w-100"
              @click="handleContinueShopping"
            >
              Continue
            </button>
            <button
              class="btn btn-secondary mt-2 w-100"
              @click="inputRigsGuest = false"
            >
              Cancel
            </button>
          </div>
        </div>

        <!-- OTP Modal -->
        <div v-if="showOtpModal" class="modal-overlay">
          <div class="modal-content">
            <h3 class="mb-4">Enter OTP Code</h3>
            <div class="d-flex justify-content-center gap-4 mb-4">
              <v-otp-input
                ref="otpInput"
                v-model:value="code"
                :input-classes="'input-style-otp'"
                :num-inputs="4"
                separator=""
                :should-auto-focus="true"
                :placeholder="['*', '*', '*', '*']"
                input-type="number"
                @on-complete="handleCheckOTP"
              />
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import VOtpInput from "vue3-otp-input";

interface Service {
  id: number;
  title: string;
  image: string;
  price: number;
  in_cart: boolean;
}

interface CartItem extends Service {}

interface LoginResponse {
  status: boolean;
  data?: {
    token: string;
    user?: any;
    registered?: boolean;
  };
  message?: string;
}

interface OTPResponse {
  status?: boolean;
  message?: string;
  data?: {
    registered?: boolean;
  };
}

const token = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });
const guest = useCookie("guest", { maxAge: 365 * 24 * 60 * 60 });
const user = useCookie("user", { maxAge: 365 * 24 * 60 * 60 });
let addedCart = ref(false);

const { getServices, addToCart } = useApi();
let loadingAddToCart = ref<Record<number, boolean>>({});
const { data: servicesData }: any = await useAsyncData("services", () =>
  getServices()
);

const services = computed(() => servicesData.value?.data?.items || []);
let activeIcon = ref(true);
let allCartGuest = ref<CartItem[]>([]);
let inputRigsGuest = ref(false);
let phoneNum = ref("");
let code = ref("");
let showOtpModal = ref(false);
let router = useRouter();
const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);

async function handleAdd(service: Service) {
  if (!token.value) {
    // Get current cart from localStorage
    let currentCart: CartItem[] = [];
    try {
      const storedCart = localStorage.getItem("serviceToAdd");
      currentCart = storedCart ? JSON.parse(storedCart) : [];
    } catch {
      currentCart = [];
    }
    // Prevent duplicates
    if (!currentCart.some((item: CartItem) => item.id === service.id)) {
      currentCart.push(service);
    }
    localStorage.setItem("serviceToAdd", JSON.stringify(currentCart));
    allCartGuest.value = currentCart;
    addedCart.value = true;
  }

  if (token.value) {
    loadingAddToCart.value[service.id] = true;
    try {
      const res: any = await addToCart("service", service.id, 1);
      if (res.success) {
        service.in_cart = true;
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        console.log("User is not authenticated");
      }
    } finally {
      loadingAddToCart.value[service.id] = false;
    }
  }
}

async function handleContinueShopping() {
  const phone = phoneNum.value;
  if (!phone) return;

  try {
    const res = (await useApi().sendOTP(phone)) as OTPResponse;
    if (res?.status) {
      // Hide phone input modal and show OTP modal
      inputRigsGuest.value = false;
      showOtpModal.value = true;
    } else {
      console.error("Failed to send OTP");
    }
  } catch (err) {
    console.error("Failed to send OTP:", err);
  }
}

function isServiceInLocalCart(serviceId: number) {
  try {
    const storedCart = localStorage.getItem("serviceToAdd");
    const items: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
    return items.some((item: CartItem) => item.id === serviceId);
  } catch {
    return false;
  }
}

const handleCheckOTP = async (otpValue: string) => {
  const otp = otpValue || code.value;
  if (!phoneNum.value || !otp) return;

  try {
    // Step 1: Verify OTP code
    const otpRes = (await useApi().checkOTP(
      phoneNum.value,
      otp
    )) as OTPResponse;

    if (!otpRes?.message?.includes("Code Is Correct")) {
      console.error("Invalid OTP code");
      return;
    }

    // Step 2: Login or register the user
    const loginRes = (await useApi().loginOrRegister({
      phone: phoneNum.value,
      otp_code: otp,
      registered: false,
    })) as LoginResponse;

    if (!loginRes?.status || !loginRes?.data?.token) {
      console.error("Login/Register failed");
      return;
    }

    // Step 3: Set tokens and user data

    token.value = loginRes.data.token;
    guest.value = "true"; // Mark as guest user

    if (loginRes.data.user) {
      user.value = JSON.stringify(loginRes.data.user);
    }

    // Close the OTP modal
    showOtpModal.value = false;

    // Step 4: Transfer cart items from localStorage to server
    const storedCart = localStorage.getItem("serviceToAdd");
    if (storedCart) {
      const cartItems: CartItem[] = JSON.parse(storedCart);
      for (const item of cartItems) {
        await addToCart("service", item.id, 1);
      }
      localStorage.removeItem("serviceToAdd"); // Clear local cart after transfer
    }

    // Step 5: Redirect to order-update-details page to complete registration
    router.push({
      path: "/order-update-details",
      query: {
        phone: phoneNum.value,
      },
    });
  } catch (error) {
    console.error("Error during authentication:", error);
  }
};
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

.input-style-otp {
  width: 40px !important;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  font-size: 1.2rem;
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
</style>
