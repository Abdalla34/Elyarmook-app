<template>
  <div>
    <div>
      <div class="contact-us margin-280px">
        <div class="container">
          <div class="row">
            <div class="col-8 col-padding">
              <div class="d-flex justify-content-between">
                <div
                  class="icon d-flex justify-content-center align-items-center" @click="navigateTo('help')"
                >
                  <i class="fa-solid fa-xmark"></i>
                </div>

                <h1 class="margin-bottom-24px text-capitalize title-pages">
                  contact us
                </h1>
              </div>

              <div class="bottom-80px">
                <div class="inputs margin-0">
                  <div class="input d-flex flex-column">
                    <label for="" class="label">full name</label>
                    <input type="text" placeholder="+966 XX XXX XXXX" />
                  </div>
                </div>
                <div class="inputs margin-0">
                  <div class="input d-flex flex-column">
                    <label for="" class="label">phone number</label>
                    <input type="text" placeholder="+966 XX XXX XXXX" />
                  </div>
                </div>
                <div class="inputs margin-0">
                  <div class="input d-flex flex-column">
                    <label for="" class="label">subject</label>
                    <input type="text" placeholder="+966 XX XXX XXXX" />
                  </div>
                </div>
                <div class="inputs margin-0">
                  <div class="input d-flex flex-column">
                    <label for="" class="label">message</label>
                    <textarea
                      placeholder="Type your message..."
                      rows="5"
                    ></textarea>
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

<style scoped>
.contact-us {
  padding: 60px 0px;
}

.bottom-80px {
  margin-bottom: 80px;
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

h1 {
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0%;
  text-align: center;
}

textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
}

textarea:hover {
  border-width: 2px;
  border-style: solid;
  border-color: var(--main-color);
  box-shadow: 1px 0px 20px var(--main-color);
}

textarea:focus {
  outline: none;
}

input {
  transition: all 0.3s ease;
  margin-bottom: 10px;
  border-width: 2px;
  border-style: solid;
}

.margin-0 {
  margin: 0px 0px 10px 0px;
}

.margin-0:hover input {
  border-width: 2px;
  border-style: solid;
  border-color: var(--main-color);
  box-shadow: 1px 0px 20px var(--main-color);
}

.width-100 {
  width: 100%;
}

@media (max-width: 768px) {
  .contact-us {
    padding: 100px 0px;
  }
}
</style>
