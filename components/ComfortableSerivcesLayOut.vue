<template>
  <div>
    <div class="wench-service cursor-pointer" @click="conditionToken">
      <div class="wench-service-content">
        <div
          class="wench-content d-flex justify-content-between align-items-center gap-2"
        >
          <div data-aos="filp-left" class="img-wench text-center text-md-start">
            <img
              src="/Carcomfortable.png"
              alt="Carcomfortable"
              class="image-width"
            />
          </div>

          <div data-aos="fade-up" class="order-now text-center text-md-start">
            <h1 class="mb-3 fw-bold">
              {{ $t("Comfortable Service") }}
            </h1>
            <button class="btn-order orderbtn-text">
              {{ $t("Order Now") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showServiceModal"
      class="modal-overlay"
      @click.self="showServiceModal = false"
    >
      <div data-aos="zoom-in" class="modal-container">
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
            <h4 class="title text-capitalize text-start">
              {{ $t("A comfortable service - that makes you comfortable") }}
            </h4>
            <p class="service-description p-color-fs text-start mt-1">
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
              <h5 class="text-capitalize text-danger mb-1 text-start">
                {{ $t("Important Note") }}:
              </h5>
              <p class="text-capitalize text-danger text-start mb-0">
                {{ $t("Service comfortable availability in Riyadh only") }}.
              </p>
            </div>

            <div class="steps-container mt-4">
              <h5 class="text-capitalize label text-start">
                {{ $t("How it works") }}:
              </h5>
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
          <button @click="navigaToteComfrotable" class="btn-order w-100">
            <span v-if="!isLoadingBtn">{{ $t("Order Now") }}</span>
            <span
              v-else
              class="spinner-border spinner-border-sm text-success"
            ></span>
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
const localePath = useLocalePath();
function conditionToken() {
  if (!token.value) {
    showComponentOtp.value = true;
    showDialCode.value = true;
  } else {
    showServiceModal.value = true;
  }
}
const isLoadingBtn = ref(false);
function navigaToteComfrotable() {
  isLoadingBtn.value = true;
  navigateTo(localePath("/comfortable-service"));
}
</script>

<style scoped>
@import "@/assets/css/services.css";
@import "@/assets/css/wenchcss.css";
.image-width {
  max-width: 100%;
  height: 200px;
}

@media (max-width: 768px) {
  .wench-content {
    text-align: center;
  }

  .order-now h1 {
    font-size: 1.3rem;
  }
  .order-now {
    width: 100%;
  }

  .modal-container {
    max-width: 95%;
    padding: 15px;
  }
  .wench-service {
    margin-bottom: 40px;
  }
  .order-now h1 {
    font-size: 13px !important;
  }
  .orderbtn-text {
    font-size: 10px !important;
  }
  .image-width {
    height: 100%;
  }
}

.modal-container {
  position: relative;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 1rem;
}

.img-modal {
  position: sticky;
  top: 0;
  z-index: 2;
  background: #fff;
}

.modal-footer {
  position: sticky;
  bottom: 0;
  background: #fff;
  z-index: 2;
  padding: 1rem;
}

@media (max-width: 576px) {
  .modal-overlay {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .modal-container {
    width: 100%;
    max-width: 100%;
    border-radius: 16px 16px 0 0;
    animation: slideUp 0.3s ease-out;
    max-height: 80vh;
    bottom: -14px;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
}
.cursor-pointer {
  cursor: pointer;
}
</style>
