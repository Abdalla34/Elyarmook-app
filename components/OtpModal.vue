<template>
  <!-- Phone Number Modal -->
  <div v-if="props.showDialCode" class="modal-overlay">
    <div class="modal-content">
      <h3 class="mb-4">Enter your phone number</h3>
      <div class="phone-input-container mb-4">
        <VueTelInput
          v-model="props.phone"
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
          @update:modelValue="emit('update:phone', $event)"
        />
      </div>
      <button
        :disabled="!props.phone || props.phone.length < 8"
        class="btn btn btn-outline-warning w-100"
        @click="emit('sendOtp')"
      >
        Continue
      </button>
      <button
        class="btn btn-outline-danger mt-2 w-100"
        @click="emit('closeDialCode')"
      >
        Cancel
      </button>
    </div>
  </div>

  <!-- OTP Modal -->
  <div v-if="props.showOtpModal" class="modal-overlay">
    <div class="modal-content text-center">
      <h3 class="mb-2">Enter OTP Code</h3>
      <p class="p-color-fs mb-2">
        Please check your phone to see the verification code 📨
      </p>
      <div class="otp-wrapper">
        <v-otp-input
          v-model:value="props.codeOtp"
          :num-inputs="4"
          input-type="number"
          :should-auto-focus="true"
          :input-classes="'otp-input'"
          :placeholder="['*', '*', '*', '*']"
          separator=""
          @on-complete="emit('checkOtp', $event)"
          @update:value="emit('update:codeOtp', $event)"
        />
      </div>
      <div :class="props.codecorrect ? 'text-danger' : 'text-success'">
        {{ props.msgRes }}
      </div>
      <div class="text-center mt-3">
        <p v-if="!props.showResendOtp" class="p-color-fs text-capitalize">
          resend code after<span class="text-danger ps-2">
            {{ props.counter }} second
          </span>
        </p>
        <p
          v-else
          class="text-primary text-capitalize"
          style="cursor: pointer"
          @click="emit('resendOtp')"
        >
          resend code
        </p>
      </div>
      <button
        class="btn btn btn-outline-danger mt-2 w-100"
        @click="emit('closeOtpModal')"
      >
        Cancel
      </button>
    </div>
  </div>
  
</template>

<script setup>
import { ref } from "vue";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import VOtpInput from "vue3-otp-input";

const props = defineProps({
  showDialCode: Boolean,
  showOtpModal: Boolean,
  phone: String,
  codeOtp: String,
  counter: Number,
  showResendOtp: Boolean,
  codecorrect: Boolean,
  msgRes: String,
});

const emit = defineEmits([
  "update:phone",
  "update:codeOtp",
  "closeDialCode",
  "closeOtpModal",
  "sendOtp",
  "checkOtp",
  "resendOtp",
]);
</script>