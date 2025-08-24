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
              <div
                @click="selecteBrand('visa')"
                class="name text-capitalize fw-bold"
              >
                Pay with debit or credit card
              </div>
            </div>

            <div
              @click="selecteBrand('mada')"
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">pay whith mada</div>
            </div>

            <div
              @click="selecteBrand('applepay')"
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">apple pay</div>
              <div class="icon-pay">
                <img src="/paymentImg.png" alt="" />
              </div>
            </div>

            <div
              @click="selecteBrand('master')"
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">master</div>
            </div>

            <div
              @click="paywithTamara"
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">tamara</div>
            </div>

            <div
              @click="paymentWihtTbby"
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">tabby</div>
            </div>
          </div>

          <div v-if="checkoutId" class="text-center">
            <h4 class="name fw-bold text-capitalize mb-3">
              amount to pay {{ amount }}
            </h4>
            <form
              method="POST"
              :action="formAction"
              class="paymentWidgets"
              :data-brands="brand.toUpperCase()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let route = useRoute();
let id = route.query.id;

let brand = ref("");
let checkoutId = ref(null);
let amount = ref(null);

const formAction = ref("");

onMounted(() => {
  // هنا بتحدد لينك صفحة الـ status بعد الدفع
  formAction.value = `${window.location.origin}/payment-tamara-status`;
});

let paymentWithHyperPay = async () => {
  try {
    let res = await useApi().usePayment(id, brand.value);
    if (res) {
      checkoutId.value = res?.data?.checkoutId;
      amount.value = res?.data?.amount_to_pay;

      window.wpwlOptions = {
        style: "card",
        locale: "en",
        applePay: {
          displayName: "Your Store Name",
          total: {
            label: "Total",
            amount: amount.value,
          },
        },
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

function selecteBrand(brandPay) {
  brand.value = brandPay;
  paymentWithHyperPay();
}
const domain = window.location.origin;

let paywithTamara = async () => {
  try {
    let res = await useApi().tamaraPayment({
      order_id: id,
      success_url: `${domain}/payment-tamara-status/success`,
      failure_url: `${domain}/payment-tamara-status/failed`,
      cancel_url: `${domain}/payment-tamara-status/cancel`,
    });
    if (res?.data?.checkout_url) {
      // checkoutId.value = res.data.checkoutId;
      window.location.href = res.data.checkout_url;
    }
  } catch (err) {
    console.log(err);
  }
};

let paymentWihtTbby = async () => {
  try {
    let res = await useApi().tabyPayment({
      order_id: id,
      success_url: `${domain}/payment-tamara-status/success`,
      failure_url: `${domain}/payment-tamara-status/failed`,
      cancel_url: `${domain}/payment-tamara-status/cancel`,
    });
    if (res && res?.data?.checkout_url) {
      // checkoutId.value = res?.data?.checkoutId;
      window.location.href = res?.data?.checkout_url;
    }
  } catch (err) {
    console.log('err',err);
  }
};
</script>

<style scoped>
@import "@/assets/css/payment.css";
</style>
