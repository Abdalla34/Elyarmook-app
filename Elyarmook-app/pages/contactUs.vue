<template>
  <div>
    <div>
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
                  contact us
                </h1>
              </div>

              <div class="bottom-80px">
                <div class="inputs">
                  <div class="input d-flex flex-column">
                    <label for="" class="label">full name</label>
                    <input
                      class="input-style"
                      type="text"
                      placeholder="+966 XX XXX XXXX"
                    />
                  </div>
                </div>
                <div class="inputs">
                  <div class="input d-flex flex-column">
                    <label for="" class="label">Phone Number</label>
                    <input
                      class="input-style"
                      type="text"
                      placeholder="+966 XX XXX XXXX"
                    />
                  </div>
                </div>
                <div class="inputs">
                  <div class="input d-flex flex-column">
                    <label for="" class="label">Subject</label>
                    <input
                      class="input-style"
                      type="text"
                      placeholder="+966 XX XXX XXXX"
                    />
                  </div>
                </div>
                <div class="inputs">
                  <div class="input d-flex flex-column">
                    <label for="" class="label">Message</label>
                    <textarea
                      class=" "
                      type="text"
                      placeholder="+966 XX XXX XXXX"
                    />
                  </div>
                </div>
              </div>

              <div
                class="button-save border-radius-36px width-height width-100"
              >
                <button class="text-capitalize fw-bold">send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let isSend = ref(false);
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
</style>
