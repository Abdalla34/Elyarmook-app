<template>
  <div class="parent-create">
    <div class="create-acc text-center">
      <div class="logo">
        <img src="/newLogo.png" />
        <h1 class="text-capitalize">{{ $t("Continue with phone") }}</h1>
        <p>
          {{ $t("Kindly fill in your details below to create an account") }}
        </p>
      </div>

      <div class="phone-number d-flex flex-column">
        <label class="label" for="phone-number text-uppercasr">{{
          $t("phone Number")
        }}</label>
        <input
          class="input ltr-opt"
          type="text"
          placeholder="+966 xx xxx xxxx"
          v-model="phone"
          id="phone-number"
        />
        <span v-if="errors.phone" class="text-danger mt-2">{{
          errors.phone
        }}</span>
      </div>

      <div class="btn-continue w-100 enter">
        <ButtonCard
          :textButton="loading ? $t('Loading...') : $t('continue')"
          @click="onSubmit"
          :disabled="loading"
        />
      </div>

      <div class="position-relative or-divider">
        <span
          class="position-absolute top-50 start-50 translate-middle span-position text-capitalize"
          >{{ $t("or") }}</span
        >
      </div>

      <div
        class="parent-boxes d-flex flex-column flex-md-row justify-content-between gap-3"
      >
        <div
          @click="navigateTo(localePath('/services'))"
          class="visit-box box-soon d-flex align-items-center justify-content-center gap-2"
        >
          <div class="icon">
            <PuplicIconFastOrder />
          </div>
          <div class="box-text">
            <h1>{{ $t("Fast Scheduling Order") }}</h1>
          </div>
          <span class="position-absolute text-capitalize">{{
            $t("Soon")
          }}</span>
        </div>

        <div
          @click="navigateTo(localePath('/'))"
          class="visit-box d-flex align-items-center justify-content-center gap-2"
        >
          <div class="icon"><ProfileIcon /></div>
          <div class="box-text">
            <h1>{{ $t("Enter as a visitor") }}</h1>
          </div>
        </div>
      </div>

      <div>
        <p class="using">
          {{ $t("By using this website means your acceptance of") }}
        </p>
        <p class="policy">{{ $t("Policy and Terms of use") }}</p>
      </div>
    </div>
    <LoadingSpinner :isLoadingOtp="isLodaing" />
  </div>
</template>

<script setup>
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
const isLodaing = ref(false);

const loading = ref(false);
const { sendOTP } = useApi();
const router = useRouter();
const schema = yup.object({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\+?\d{7,15}$/,
      "Phone number must be 7–15 digits and not contain letters"
    ),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: phone } = useField("phone");

watch(phone, (newVal) => {
  phone.value = newVal.replace(/\s+/g, "");
});

const localePath = useLocalePath();

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  isLodaing.value = true;
  try {
    const res = await sendOTP(values.phone);
    if (res && res.data && typeof res.data.registered !== "undefined") {
      await navigateTo({
        path: localePath("/auth"),
        query: {
          phone: values.phone,
          registered: res.data.registered.toString(),
        },
      });
    } else {
      console.log("Unexpected response from server");
    }
  } catch (e) {
    alert("Failed to send OTP");
  } finally {
    loading.value = false;
    isLodaing.value = false;
  }
});
</script>

<style scoped>
@import "@/assets/css/createacc.css";
.input {
  border-radius: 12px;
  padding: 12px 16px;
  border: 1px solid #f1f3f9;
  appearance: none;
}
.parent-boxes {
  width: 100%;
  margin: 2rem 0;
}

.visit-box {
  flex: 1;
  min-width: 200px;
  padding: 1rem;
  border-radius: 12px;
  background: #f8f9fa;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.visit-box:hover {
  background: #e9ecef;
}

.box-text h1 {
  font-size: 1rem;
  margin: 0;
  white-space: nowrap;
}

.ltr-opt {
  direction: ltr !important;
}

@media (max-width: 768px) {
  .visit-box {
    width: 100%;
    min-height: 80px;
  }

  .box-text h1 {
    font-size: 0.9rem;
  }

  .icon {
    transform: scale(0.9);
  }
}

@media (max-width: 480px) {
  .parent-boxes {
    gap: 1rem !important;
  }

  .visit-box {
    padding: 0.75rem;
  }

  .box-text h1 {
    font-size: 0.8rem;
  }
}
</style>
