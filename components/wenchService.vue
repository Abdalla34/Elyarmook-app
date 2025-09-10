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
        <button @click="navigateTo('/orderwench')" class="btn-order w-100">Order Now</button>
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
.wench-service {
  margin-bottom: 80px;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px 0px #0000000a;
  border-radius: 36px;
  padding: 3rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.wench-service * {
  position: relative;
  z-index: 2;
}

.wench-service::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 36px;
  background-color: #ebebeb;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 1;
}

.wench-service:hover::after {
  opacity: 1;
}

.img-wench {
  max-width: 320px;
  width: 100%;
}

.btn-order {
  background: #fdd800;
  color: #000;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 18px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-order:hover {
  background: #e6c400;
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

.modal-container {
  background: white;
  border-radius: 24px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  scrollbar-width: thin;
}

.modal-container::-webkit-scrollbar {
  width: 8px;
}

.modal-header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.modal-body {
  padding: 1rem;
}

.img-modal {
  width: 100%;
  height: 190px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.note-box {
  background: #fff9e6;
  border: 1px solid #fdd800;
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem 0;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.step {
  background: transparent;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.modal-footer {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  border-top: 1px solid #eee;
}

@media (max-width: 768px) {
  .wench-service {
    padding: 1rem;
    margin: 1rem;
  }

  .img-wench {
    max-width: 100%;
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem !important;
  }

  .modal-container {
    width: 95%;
    margin: 1rem;
  }
  .img-modal {
    height: 130px;
  }
}
</style>
