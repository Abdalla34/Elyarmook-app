<template>
  <div class="parent-create">
    <div class="create-acc text-center">
      <div class="logo">
        <img src="/newLogo.png" />
        <h1 class="text-capitalize">create an account</h1>
        <p>Kindly fill in your details below to create an account</p>
      </div>

      <div class="phone-number d-flex flex-column">
        <label class="label" for="phone-number">Phone Number</label>
        <input
          v-model="phone"
          class="input-phone"
          placeholder="+966 XX XXX XXXX"
        />
      </div>

      <div class="btn-continue w-100">
        <ButtonCard
          :textButton="loading ? 'Loading...' : 'continue'"
          @click="handleContinue"
          :disabled="loading"
        />
      </div>

      <div class="position-relative or-divider">
        <span
          class="position-absolute top-50 start-50 translate-middle span-position text-capitalize"
          >or</span
        >
      </div>

      <div class="parent-boxes d-flex justify-content-between gap-2">
        <div
          class="visit-box box-soon d-flex align-items-center justify-content-center gap-2"
        >
          <div class="icon">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2.5V5.5"
                stroke="#040505"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 2.5V5.5"
                stroke="#040505"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.5 9.58984H20.5"
                stroke="#040505"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.2091 16.2683L15.6691 19.8083C15.5291 19.9483 15.3991 20.2083 15.3691 20.3983L15.1791 21.7483C15.1091 22.2383 15.4491 22.5783 15.9391 22.5083L17.2891 22.3183C17.4791 22.2883 17.7491 22.1583 17.8791 22.0183L21.4191 18.4783C22.0291 17.8683 22.3191 17.1583 21.4191 16.2583C20.5291 15.3683 19.8191 15.6583 19.2091 16.2683Z"
                stroke="#040505"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.6992 16.7773C18.9992 17.8573 19.8392 18.6973 20.9192 18.9973"
                stroke="#040505"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 22.5H8C4.5 22.5 3 20.5 3 17.5V9C3 6 4.5 4 8 4H16C19.5 4 21 6 21 9V12.5"
                stroke="#040505"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.9945 14.1992H12.0035"
                stroke="#040505"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.29529 14.1992H8.30427"
                stroke="#040505"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.29529 17.1992H8.30427"
                stroke="#040505"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1>Fast Scheduling Order</h1>
          </div>
          <span class="position-absolute text-capitalize">soon</span>
        </div>

        <div
          @click="navigateTo('/')"
          class="visit-box d-flex align-items-center justify-content-center gap-2"
        >
          <div class="icon"><ProfileIcon /></div>
          <div>
            <h1>Enter as a visitor</h1>
          </div>
        </div>
      </div>

      <div>
        <p class="using">By using this website means your acceptance of</p>
        <p class="policy">Policy and Terms of use</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import VueTelInput from "vue-tel-input";

const loading = ref(false);
const { sendOTP } = useApi();
const router = useRouter();
let phone = ref('')

interface SendOTPResponse {
  status: boolean;
  data: {
    registered: boolean;
  };
  message: string;
}

const handleContinue = async () => {
  if (!phone.value) return;
  loading.value = true;
  try {
    const res = await sendOTP(phone.value);
    if (res && res.data && typeof res.data.registered !== "undefined") {
      router.push({
        path: "/auth",
        query: {
          phone: phone.value,
          registered: res.data.registered.toString(),
        },
      });
    } else {
      alert("Unexpected response from server");
    }
  } catch (e) {
    alert("Failed to send OTP");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* @import "vue-tel-input/vue-tel-input.css"; */
@import "@/assets/css/createacc.css";
</style>
