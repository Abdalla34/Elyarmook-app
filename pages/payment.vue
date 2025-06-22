<template>
  <div class="order-details">
    <div class="container">
      <div class="row">
        <div class="col-8 col-padding">
          <h1 data-v-8bcd5751 class="text-capitalize text title-pages">
            chose payment method
          </h1>

          <div class="methods">
            <div
              class="box-method border-radius-36px p-color-fs text-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">
                Pay with debit or credit card
              </div>
            </div>

            <div
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">pay whith stc</div>
              <div class="icon-pay">
                <img src="/ImageStc.png" alt="" />
              </div>
            </div>

            <div
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">apple pay</div>
              <div class="icon-pay">
                <img src="/paymentimg.png" alt="" />
              </div>
            </div>

            <div
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">apple pay</div>
              <div class="icon-pay">
                <img src="/paymentimg.png" alt="" />
              </div>
            </div>

            <div
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">apple pay</div>
              <div class="icon-pay">
                <img src="/paymentimg.png" alt="" />
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-center">
            <button
              class="continue text-capitalize label button border-radius-36px"
            >
              continue
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.methods {
  margin-bottom: 88px;
}

.text {
  margin-bottom: 38px;
}

.box-method {
  padding: 20px 0px;
  border: 1px solid #a0a3bd;
  background-color: #ffffff;
  cursor: pointer;
  overflow: hidden;
}

.name {
  color: #14142b;
  z-index: 1;
  position: relative;
}

.icon-pay {
  position: relative;
  z-index: 1;
}

.continue {
  background-color: var(--main-color);
  border: none;
  width: 50%;
  margin: auto;
  margin-bottom: 40px;
  padding: 20px 0px;
}

.continue:hover {
  box-shadow: 0px 0px 20px var(--main-color);
}

@media (max-width: 576px) {
  .continue {
    width: 100%;
  }
}
</style>
