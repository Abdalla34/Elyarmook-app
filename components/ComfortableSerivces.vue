<template>
  <div>
    <div class="wench-service cursor-pointer" @click="conditionToken">
      <div class="wench-service-content">
        <div
          class="wench-content d-flex flex-column flex-md-row justify-content-between align-items-center gap-4"
        >
          <div class="img-wench text-center text-md-start">
            <img
              src="/wenchcar.jpg"
              alt="wench car"
              class="img-fluid rounded shadow-sm"
            />
          </div>

          <div class="order-now text-center text-md-start">
            <h1 class="mb-3 fw-bold fs-4 fs-md-3">
              {{ $t("Comfortable Service") }}
            </h1>
            <button class="btn-order">{{ $t("Order Now") }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showServiceModal" class="modal-overlay">
      <div class="modal-container">
        <div
          class="modal-header d-flex justify-content-between align-items-center"
        >
          <h3 class="text-capitalize title">{{ $t("About Service") }}</h3>
          <i
            class="fa-solid fa-xmark cursor-pointer"
            @click="showServiceModal = false"
          ></i>
        </div>

        <div class="modal-body text-center text-md-start">
          <img
            class="img-modal rounded shadow-sm"
            src="/comfortableimg.jpeg"
            alt="Service"
          />

          <div class="service-info mt-4">
            <h4 class="title text-capitalize">
              {{ $t("A comfortable service - that makes you comfortable") }}
            </h4>
            <p class="service-description p-color-fs">
              {{
                $t(
                  "We repair your car while you are there, without any industrial trips"
                )
              }}.
            </p>
            <p class="text-capitalize p-color-fs text-danger fw-bold mt-2">
              # {{ $t("We receive it.. we fix it.. we return it") }}.
            </p>

            <div class="note-box mt-3 p-3 bg-light rounded">
              <h5 class="text-capitalize text-danger mb-1">
                {{ $t("Important Note") }}:
              </h5>
              <p class="text-capitalize text-danger mb-0">
                {{ $t("Service comfortable availability in Riyadh only") }}.
              </p>
            </div>

            <div class="steps-container mt-4">
              <h5 class="text-capitalize label">{{ $t("How it works") }}:</h5>
              <div class="steps text-capitalize text-start">
                <div class="step">{{ $t("1. Request service") }}</div>
                <div class="step">{{ $t("2. Share location") }}</div>
                <div class="step">{{ $t("3. Wait for arrival") }}</div>
                <div class="step">{{ $t("4. Get assistance") }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer mt-4 d-flex flex-column gap-2">
          <button type="button" class="btn btn-light w-100">
            {{ $t("Dont show next time") }}
          </button>
          <button
            @click="navigateTo($localePath('/comfortable-service'))"
            class="btn-order w-100"
          >
            {{ $t("Order Now") }}
          </button>
        </div>
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
      @otp-success="handleOtpSuccess"
    />
  </div>
</template>

<script setup>
const token = useCookie("token");
const showComponentOtp = ref(false);

const showServiceModal = ref(false);
const showOtpModal = ref(false);
const showDialCode = ref(false);

// Show service modal after successful registration
function handleOtpSuccess() {
  showComponentOtp.value = false;
  showDialCode.value = false;
  showOtpModal.value = false;
  showServiceModal.value = true;
}

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
@import "@/assets/css/wenchcss.css";
@media (max-width: 768px) {
  .wench-content {
    flex-direction: column;
    text-align: center;
  }

  .order-now h1 {
    font-size: 1.3rem;
  }

  .modal-container {
    max-width: 95%;
    padding: 15px;
  }
  .wench-service {
    margin-bottom: 40px;
  }
}
</style>
