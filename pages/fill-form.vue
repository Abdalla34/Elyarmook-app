<template>
  <div class="contact-us">
    <div class="container">
      <div class="row">
        <div class="col-8 col-padding">
          <div class="d-flex justify-content-between">
            <div
              class="icon-to-page d-flex justify-content-center align-items-center"
              @click="navigateTo('help')"
            >
              <i class="fa-solid fa-xmark"></i>
            </div>

            <h1 class="margin-bottom-24px text-capitalize title-pages">
              fill form
            </h1>
          </div>

          <div class="bottom-80px">
            <div class="input">
              <div class="input d-flex flex-column">
                <input
                  class="input-style"
                  type="text"
                  v-bind:placeholder="user.name"
                  v-model="name"
                />
              </div>
            </div>
            <div class="input">
              <div class="input d-flex flex-column">
                <input
                  class="input-style"
                  type="text"
                  v-bind:placeholder="user.phone"
                  v-model="phone"
                />
              </div>
            </div>
            <div class="input">
              <div class="input d-flex flex-column">
                <label for="" class="label">address</label>
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
                <label for="" class="label">Message</label>
                <textarea
                  class=""
                  type="text"
                  placeholder="write your message"
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
            <button class="text-capitalize fw-bold">send</button>
          </div>
          <div v-if="showModal" class="modal-overlay">
            <div class="modal-box">
              <p class="fs-5 mb-3">{{ modalMessage }}</p>
              <button class="btn btn-primary" @click="showModal = false">
                Close
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

const { value: address, errorMessage: addressError } = useField("address");
const { value: message, errorMessage: messageError } = useField("message");
const { value: name } = useField("name");
const { value: phone } = useField("phone");
const showModal = ref(false);
const modalMessage = ref("");
const modalTitle = ref("");
const isSuccess = ref(false);
const user = useCookie("user").value;

const onSubmit = handleSubmit(async (values) => {
  const form = {
    title: values.address,
    message: values.message,
    name: values.name || user.name,
    phone: values.phone || user.phone,
  };
  try {
    let res = await useApi().contactUs(form);
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
      modalMessage.value = res?.message || "An error occurred";
      modalTitle.value = "Error";
      isSuccess.value = false;
      showModal.value = true;
    }
  } catch (error) {
    modalMessage.value = error?.message || "An unexpected error occurred";
    showModal.value = true;
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

@media (max-width: 768px) {
  .contact-us {
    padding: 100px 0px;
  }
}
</style>
