<template>
  <div class="order-details">
    <div class="container">
      <div class="row">
        <div class="col-8 col-padding">
          <h1
            v-if="!checkoutId"
            data-v-8bcd5751
            class="text-capitalize text title-pages"
          >
            chose payment method
          </h1>

          <div v-if="!checkoutId" class="methods">
            <div
              class="box-method border-radius-36px p-color-fs text-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div @click="sendDetails" class="name text-capitalize fw-bold">
                Pay with debit or credit card
              </div>
            </div>

            <div
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">pay whith mada</div>
            </div>

            <div
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">apple pay</div>
              <div class="icon-pay">
                <img src="/paymentImg.png" alt="" />
              </div>
            </div>

            <div
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">master</div>
            </div>
          </div>

          <div v-if="checkoutId" class="text-center">
            <h4 class="name fw-bold text-capitalize mb-3">
              amount to pay {{ amount }}
            </h4>
            <form
              action="/payment-status"
              class="paymentWidgets"
              data-brands="VISA MASTER"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let orderId = ref(null);
let res = await useApi().getMyCart();
orderId.value = res?.data?.id;

let brand = ref("visa");
let checkoutId = ref(null);
let amount = ref(null);

let sendDetails = async () => {
  try {
    let res = await useApi().usePayment(orderId.value, brand.value);
    if (res) {
      checkoutId.value = res?.data?.checkoutId;
      amount.value = res?.data?.amount_to_pay;
      console.log(
        "id",
        checkoutId.value,
        "total",
        amount.value,
        "brand",
        brand.value
      );

      window.wpwlOptions = {
        style: "card",
        locale: "en",
      };

      const script = document.createElement("script");
      script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId.value}`;
      script.async = true;
      document.body.appendChild(script);
    }
  } catch (err) {
    console.log(err);
  }
};

let route = useRoute();
let statusPayment = ref(null);
let id = route.query.id;

function test() {
  navigateTo("/");
  console.log("test");
}
</script>

<style scoped>
@import "@/assets/css/payment.css";
</style>
