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
        />
        <span v-if="errors.phone" class="text-danger">{{ errors.phone }}</span>
      </div>

      <div class="btn-continue w-100 enter">
        <ButtonCard
          :textButton="loading ? 'Loading...' : 'continue'"
          @click="onSubmit"
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
          @click="navigateTo('/services')"
          class="visit-box box-soon d-flex align-items-center justify-content-center gap-2"
        >
          <div class="icon">
            <PuplicIconFastOrder />
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

<script setup>
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const loading = ref(false);
const { sendOTP } = useApi();
const router = useRouter();
const schema = yup.object({
  phone: yup
    .string()
    .required("")
    .min(7, "Phone number must be at least 7 digits")
    .matches(
      /^\+\d{10,15}$/,
      "Phone number must be in the format +XXXXXXXXXXX"
    ),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: phone } = useField("phone");

watch(phone, (newVal) => {
  phone.value = newVal.replace(/\s+/g, "");
});

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    const res = await sendOTP(values.phone);
    if (res && res.data && typeof res.data.registered !== "undefined") {
      router.push({
        path: "/auth",
        query: {
          phone: values.phone,
          registered: res.data.registered.toString(),
        },
      });
    } else {
      // alert("Unexpected response from server");
      console.log("Unexpected response from server");
    }
  } catch (e) {
    alert("Failed to send OTP");
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
@import "@/assets/css/createacc.css";
</style>
