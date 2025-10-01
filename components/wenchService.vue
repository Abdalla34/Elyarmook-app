<template>
  <div>
    <div class="wench-service cursor-pointer" @click="conditionToken">
      <div class="wench-service-content">
        <div
          class="wench-content d-flex flex-column flex-md-row justify-content-between align-items-center gap-4"
        >
          <div class="img-wench">
            <img src="/wenchcar.jpg" alt="" class="img-fluid" />
          </div>
          <div class="order-now text-end">
            <h1 class="text-center text-md-start mb-4">comfortable service</h1>
            <button class="btn-order">order now</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Service Modal -->
    <div v-if="showServiceModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="text-capitalize title">About Service</h3>
          <i
            class="fa-solid fa-xmark cursor-pointer"
            style="cursor: pointer"
            @click="showServiceModal = false"
          ></i>
        </div>

        <div class="modal-body">
          <img class="img-modal" src="/comfortableimg.jpeg" alt="Service" />

          <div class="service-info mt-4">
            <h4 class="text-capitalize title">
              a comfortable service - that makes your comfortable
            </h4>
            <p class="service-description p-color-fs">
              We repair your car while you are there, without any industrial
              trips.
            </p>
            <p class="text-capitalize p-color-fs text-danger fw-bold mt-2">
              #.we receive it.. we fix it.. we return it.
            </p>
            <div class="note-box">
              <h5 class="text-capitalize p-color-fs text-danger">
                Important Note:
              </h5>
              <p class="text-capitalize p-color-fs text-danger">
                Service comfortable availability in rayidh only.
              </p>
            </div>

            <div class="steps-container mt-4">
              <h5 class="text-capitalize label">How it works:</h5>
              <div class="steps text-capitalize text-start">
                <div class="step">1. Request service</div>
                <div class="step">2. Share location</div>
                <div class="step">3. Wait for arrival</div>
                <div class="step">4. Get assistance</div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <label class="dont-show">
            <button type="button" class="btn btn-light w-100">
              Don't show next time
            </button>
          </label>
          <button @click="navigateTo('/comfortable-service')" class="btn-order w-100">Order Now</button>
        </div>
      </div>
    </div>

    <div class="otp-modal" v-if="showComponentOtp">
      <OtpModal
        :showDialCode="showDialCode"
        :showOtpModal="showOtpModal"
        @close-dial-code="showDialCode = false"
        @close-otp-modal="showOtpModal = false"
        @open-otp-modal="showOtpModal = true"
      />
    </div>
</template>

<script setup>
const token = useCookie("token");
const showComponentOtp = ref(false);

const showServiceModal = ref(false);
const showOtpModal = ref(false);
const showDialCode = ref(false);

function conditionToken() {
  if (!token.value) {
    showComponentOtp.value = true;
    showDialCode.value = true;
  } else {
    showServiceModal.value = true;
  }
}
</script>

<style scoped>
@import "@/assets/css/services.css";
@import "@/assets/css/wenchcss.css"
</style>