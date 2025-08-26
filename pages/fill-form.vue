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
            <div class="inputs">
              <div class="input d-flex flex-column">
                <input
                  class="input-style"
                  type="text"
                  v-bind:placeholder="user.name"
                  v-model="name"
                />
              </div>
            </div>
            <div class="inputs">
              <div class="input d-flex flex-column">
                <input
                  class="input-style"
                  type="text"
                  v-bind:placeholder="user.phone"
                  v-model="phone"
                />
              </div>
            </div>
            <div class="inputs">
              <div class="input d-flex flex-column">
                <label for="" class="label">address</label>
                <input class="input-style" type="text" v-model="Address" />
              </div>
            </div>
            <div class="inputs">
              <div class="input d-flex flex-column">
                <label for="" class="label">Message</label>
                <textarea
                  class=" "
                  type="text"
                  placeholder="write your message"
                  v-model="message"
                />
              </div>
            </div>
          </div>

          <div
            @click="SendData"
            class="button-save border-radius-36px width-height width-100"
          >
            <button class="text-capitalize fw-bold">send</button>
          </div>
          <div
            v-if="messageRes"
            class="popup-msg position-absolute w-50 text-center top-50 start-50 translate-middle bg-light text-success fs-5"
          >
            <button
              type="button"
              class="btn-close position-absolute top-0 end-0"
              aria-label="Close"
              @click="messageRes = ''"
            ></button>
            <p class="mt-4">
              {{ messageRes }}
              <span><i class="fa-solid fa-check text-success"></i></span>
             
            </p>
          </div>
          <div class="over-lay" v-if="messageRes"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
let messageRes = ref("");
let message = ref("");
let Address = ref("");
let name = ref("");
let phone = ref(null);
const SendData = async () => {
  const form = {
    title: Address.value,
    message: message.value,
    name: name.value,
    phone: phone.value,
  };
  let res = await useApi().contactUs(form);
  if (res?.status) {
    messageRes.value = res?.message;
  }
  Address.value = "";
  message.value = "";
  name.value = user.name;
  phone.value = user.phone;
};
// let token = useCookie('token').value;
let user = useCookie("user").value;
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

@media (max-width: 768px) {
  .contact-us {
    padding: 100px 0px;
  }
}

.popup-msg {
  padding: 20px 20px;
  border-radius: 16px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
