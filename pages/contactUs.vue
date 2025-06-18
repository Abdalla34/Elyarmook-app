<template>
  <div>
    <div>
      <div class="contact-us">
        <div class="container">
          <div class="row">
            <div class="col-8 col-padding">
              <div class="d-flex justify-content-between">
                <div
                  class="icon d-flex justify-content-center align-items-center"
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
.icon {
  border-width: 2px;
  border-style: solid;
  border-color: #7e7e7e;
  border-radius: 50%;
  padding: 8px;
  height: 25px;
  width: 25px;
  cursor: pointer;
  transition: all ease 0.3s;
}
.icon:hover {
  border-color: var(--main-color);
  height: 30px;
  width: 30px;
  background-color: var(--main-color);
  color: white;
  font-size: 24px;
}

.input-style,
textarea {
  border-radius: 12px;
  border: 2px solid #f1f3f9;
  padding: 12px 16px;
  margin-bottom: 15px;
}

.input-style:focus,
textarea:focus {
  outline: none;
  border: 2px solid var(--main-color);
  box-shadow: 0px 1px 10px var(--main-color);
}
.input-style:hover,
textarea:hover {
  outline: none;
  border: 2px solid var(--main-color);
  box-shadow: 0px 1px 20px var(--main-color);
}

.input-style::placeholder,
textarea::placeholder {
  color: #96a0b6;
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0%;
}

textarea {
  height: 140px;
  resize: none;
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
