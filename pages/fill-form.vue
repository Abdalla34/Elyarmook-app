<template>
  <div class="contact-us">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-padding">
          <div class="d-flex justify-content-between">
            <div
              class="icon-to-page d-flex justify-content-center align-items-center"
              @click="navigateTo($localePath('help'))"
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
   <h1 class="margin-bottom-24px text-center text-capitalize title-pages">
              {{ $t("Fill a Form") }}
            </h1>
          <div class="bottom-80px">
            <div class="input">
              <div class="input d-flex flex-column">
                <input
                  class="input-style"
                  type="text"
                  :placeholder="user ? user.name : $t('full name')"
                  v-model="name"
                />
              </div>
            </div>
            <div class="input">
              <div class="input d-flex flex-column">
                <input
                  class="input-style"
                  type="text"
                  :placeholder="user ? user.phone : $t('phone')"
                  v-model="phone"
                />
              </div>
            </div>
            <div class="input">
              <div class="input d-flex flex-column">
                <label for="" class="label">{{ $t("address") }}</label>
                <input
                  class="input-style"
                  type="text"
                  v-model="address"
                  :class="{ 'is-invalid': addressError }"
                />
                <span v-if="addressError" class="text-danger">{{
                  addressError
                }}</span>
              </div>
            </div>
            <div class="input">
              <div class="input d-flex flex-column">
                <label for="" class="label">{{ $t("Message") }}</label>
                <textarea
                  class=""
                  type="text"
                  :placeholder="$t('write your message')"
                  v-model="message"
                  :class="{ 'is-invalid': messageError }"
                />
                <span v-if="messageError" class="text-danger">{{
                  messageError
                }}</span>
              </div>
            </div>
          </div>

          <div
            @click="onSubmit"
            class="button-save border-radius-36px width-height width-100"
          >
            <button v-if="!loadingBtn" class="text-capitalize fw-bold text-black">
              {{ $t("send") }}
            </button>
            <div v-else>
              <span
                class="spinner-border spinner-border-sm text-success"
                role="status"
              ></span>
            </div>
          </div>

          <div v-if="showModal" class="modal-overlay">
            <div class="modal-box">
              <p class="fs-5 mb-3">{{ modalMessage }}</p>
              <button class="btn btn-primary" @click="showModal = false">
                {{ $t("Close") }}
              </button>
            </div>
          </div>
          <div v-if="showModal" class="modal-backdrop fade show"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
  address: yup.string().required("Address is required"),
  message: yup.string().required("Message is required"),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});
const { contactUs } = useApi();
const { value: address, errorMessage: addressError } = useField("address");
const { value: message, errorMessage: messageError } = useField("message");
const { value: name } = useField("name");
const { value: phone } = useField("phone");
const showModal = ref(false);
const modalMessage = ref("");
const modalTitle = ref("");
const isSuccess = ref(false);
const user = useCookie("user").value;
const loadingBtn = ref(false);
const onSubmit = handleSubmit(async (values) => {
  const form = {
    title: values.address,
    message: values.message,
    name: values.name || user.name,
    phone: values.phone || user.phone,
  };
  try {
    loadingBtn.value = true;
    let res = await contactUs(form);
    if (res?.status) {
      modalMessage.value = res?.message;
      modalTitle.value = "Success";
      isSuccess.value = true;
      showModal.value = true;
      // Reset form after successful submission
      values.address = "";
      values.message = "";
      values.name = user.name;
      values.phone = user.phone;
    } else {
      modalMessage.value = res?.message;
      modalTitle.value = "Error";
      isSuccess.value = false;
      showModal.value = true;
    }
    console.log("Form submitted successfully:", form);
  } catch (error) {
    modalMessage.value = error?.message;
    showModal.value = true;
    console.log("Form submitted successfully:", form);
  } finally {
    loadingBtn.value = false;
  }
});
</script>

<style scoped>
.contact-us {
  margin-top: 70px;
}

.inputs {
  margin-bottom: 10px;
}

.width-100 {
  width: 100%;
  margin-top: 60px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* خلفية شفافة */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-box {
  background: #fff;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

@media (max-width: 576px) {
  .contact-us {
    padding: 0px;
  }
  .width-100 {
    margin-top: 10px;
  }
}
</style>
