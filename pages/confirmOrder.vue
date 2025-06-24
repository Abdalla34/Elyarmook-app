<template>
  <div class="margin-top">
    <div class="container">
      <div v-if="test">
        <Veiws />
      </div>
      <div class="row">
        <!-- الجزء اليسار -->
        <div class="col-lg-5 col-md-7">
          <h4 class="mb-4 fw-bold">Order Details</h4>

          <div
            class="card border-radius-36px mb-3 d-flex flex-row align-items-center"
            v-for="item in ordersGet"
            :key="item.id"
          >
            <img :src="item.imgItem" alt="Brakes" width="60" />
            <div class="ms-3 flex-grow-1">
              <h6 class="fw-bold">{{ item.nameOrder }}</h6>
              <p class="font-p parag mb-0 text-start">
                {{ item.detailsOrder }}
              </p>
            </div>
            <p class="price">
              {{ item.price }}
              <span class="p-color-fs span">{{ item.currency }}</span>
            </p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="">
            <h6 class="fw-bold">Order Details</h6>
            <div class="box-design">
              <div
                class="branch d-flex justify-content-between align-items-center"
              >
                <h4 class="label">branch</h4>
                <p class="text-capitalize">raiyah</p>
              </div>

              <div
                class="model d-flex justify-content-between align-items-center"
              >
                <h4 class="label">car model</h4>
                <p class="text-capitalize">50 SAR</p>
              </div>

              <div
                class="reservation-date d-flex justify-content-between align-items-center"
              >
                <h4 class="label">Reservation Date</h4>
                <p class="text-capitalize">Sun, Dec 1, 2024</p>
              </div>

              <div
                class="reservation-time d-flex justify-content-between align-items-center"
              >
                <h4 class="label">Reservation time</h4>
                <p class="text-capitalize">10:00 AM</p>
              </div>
            </div>
          </div>

          <!-- تفاصيل السعر -->
          <div class="">
            <h6 class="fw-bold">Cost Details</h6>
            <div class="box-design">
              <div
                class="total-order d-flex justify-content-between align-items-center"
              >
                <h4 class="label">Total Order</h4>
                <p class="text-capitalize">300315382500003</p>
              </div>

              <div
                class="vat d-flex justify-content-between align-items-center"
              >
                <h4 class="label">vat</h4>
                <p class="text-capitalize">50 SAR</p>
              </div>

              <div
                class="final-amount d-flex justify-content-between align-items-center"
              >
                <h4 class="label">Final Amount</h4>
                <p class="text-capitalize">10 SAR</p>
              </div>
            </div>

            <div class="input-code position-relative">
              <input
                type="text"
                class="w-100 input-with-apply text-capitalize"
                placeholder="promocode"
              />
              <button class="apply-btn position-absolute">
                <span class="text-capitalize me-2 spanbutton">apply</span>
                <iconsOrder-applyCode />
              </button>
            </div>

            <div
              class="total-amount d-flex align-items-center justify-content-between"
            >
              <h1 class="amount text-capitalize">total</h1>
              <p>60sar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let ordersGet = ref([
  {
    imgItem: "Car Brake Icon.png",
    nameOrder: "Brakes Services",
    detailsOrder: "Lorem ipsum dolor sit amet,Lorem ",
    price: "70",
    currency: "SAR",
  },
  {
    imgItem: "Car Brake Icon.png",
    nameOrder: "Brakes Services",
    detailsOrder: "Lorem ipsum dolor sit amet,Lorem ",
    price: "70",
    currency: "SAR",
  },
  {
    imgItem: "Car Brake Icon.png",
    nameOrder: "Brakes Services",
    detailsOrder: "Lorem ipsum dolor sit amet,Lorem ",
    price: "70",
    currency: "SAR",
  },
]);
</script>

<style scoped>
.margin-top {
  margin-top: 40px;
  margin-bottom: 208px;
}

.card {
  padding: 36px 28px;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  box-shadow: 0px 1px 2px 0px #0a0d120f;

  box-shadow: 0px 1px 3px 0px #0a0d121a;
}

.parag {
  width: 189px;
  color: #4e4b66;
}
.price {
  font-size: 30px;
}

.box-design {
  background-color: #f7f9f9;
  padding: 20px;
  border-radius: 12px;
  margin-top: 24px;
  margin-bottom: 52px;
}

h4 {
  color: #667379;
  font-size: 18px;
  font-weight: 400;
  font-family: var(--font-main);
}
p {
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  text-align: right;
  vertical-align: middle;
  color: #1b2124;
}

.input-code {
  position: relative;
}

.input-with-apply {
  border-radius: 12px;
  padding: 12px 104px 12px 16px;
  gap: 8px;
  border: 1px solid #f1f3f9;
}

.input-with-apply::placeholder {
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0%;
}

.apply-btn {
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #F1F3F9;
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  height: 100%;
   border: 1px solid #f1f3f9;
}

.spanbutton {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0%;
  text-align: right;
  color: #7e7e7e;
}

.total-amount {
  background-color: #ecfaf2;
  padding: 20px 23px;
  border-radius: 12px;
  margin-top: 16px;
}

.amount {
  font-family: var(--font-alt);
  font-weight: 600;
  font-size: 20px;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: center;
}

@media (max-width: 768px) {
  .price {
    font-size: 16px;
  }
  .span {
    font-size: 12px;
  }
}
</style>
