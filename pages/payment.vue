<template>
  <div class="order-details">
    <div class="container">
      <div class="row">
        <div class="col-8 col-padding">
          <h1
            v-if="!checkoutId && !cachLayout"
            data-v-8bcd5751
            class="text-capitalize text title-pages"
          >
            chose payment method
          </h1>
          <div v-if="msg" class="modal-overlay" @click.self="msg = ''">
            <div class="modal-body">
              <button class="close-btn" @click="msg = ''">×</button>
              <p>{{ msg }}</p>
            </div>
          </div>
          <div v-if="!checkoutId && !cachLayout" class="methods">
            <div
              :disabled="isLoading"
              @click="selecteBrand('visa')"
              class="box-method border-radius-36px p-color-fs text-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">Pay with visa</div>
            </div>

            <div
              @click="!isPayTrue && selecteBrand('mada')"
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">pay whith mada</div>
            </div>

            <div
              :disabled="isLoading"
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
              :disabled="isLoading"
              @click="selecteBrand('master')"
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">master</div>
            </div>

            <div
              :disabled="isLoading"
              @click="paywithTamara"
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">tamara</div>
            </div>

            <div
              :disabled="isLoading"
              @click="paymentWihtTbby"
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">tabby</div>
            </div>

            <div
              v-if="orderDetails?.open_cash"
              @click="chachOnDelivery"
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">cach on delivery</div>
            </div>
          </div>

          <div v-if="checkoutId" class="text-center">
            <h4 class="name fw-bold text-capitalize mb-3"></h4>
            <form
              :action="formAction"
              class="paymentWidgets"
              data-brands="VISA MASTER MADA"
            ></form>
          </div>

          <div class="cach-layout text-center" v-if="cachLayout">
            <div class="voucher">
              <div>
                <img src="/donePayment.png" alt="تم الدفع بنجاح" />
                <h1 class="text-green-600 text-3xl font-bold mb-4">
                  {{ orderDetails?.status_value }}
                </h1>
              </div>
              <div class="box-design">
                <div
                  class="total-order d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">sub total</h4>
                  <p class="text-capitalize">
                    {{ orderDetails?.sub_total }}
                    <span class="p-color-fs span">SAR</span>
                  </p>
                </div>

                <div
                  class="vat d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">vat</h4>
                  <p class="text-capitalize">
                    {{ orderDetails?.vat_amount }}
                    <span class="p-color-fs span">SAR</span>
                  </p>
                </div>

                <div
                  class="final-amount d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">Final Amount</h4>
                  <p class="text-capitalize">
                    {{ orderDetails?.amount_to_pay }}
                    <span class="p-color-fs span">SAR</span>
                  </p>
                </div>
              </div>

              <div @click="navigateTo('/point')" class="points">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="point-img">
                    <img src="/pointsFrame.png" alt="points" />
                  </div>
                  <div>
                    <h1 class="point-text fw-bold fs-6 text-end">
                      you will get a reward
                      {{ orderDetails.points_will_earn }} point !
                    </h1>
                    <p class="p-color-fs">
                      dont forget to use it next time to save more money in your
                      order
                    </p>
                  </div>
                </div>
                <div
                  @click="navigateTo('/point')"
                  class="show-point text-end mt-4 text-danger text-capitalize"
                  style="cursor: pointer"
                >
                  show points
                </div>
              </div>

              <div class="button" @click="navigateTo('/myorders')">
                <button class="details text-capitalize label button">
                  details
                </button>
              </div>
              <div class="btn-profile mt-3">
                <button
                  type="button"
                  class="btn btn-secondary w-100 rounded-pill"
                  @click="navigateTo('/profile')"
                >
                  continue profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <loading-spinner :isLoadingOtp="isLoading" />
    </div>
  </div>
</template>

<script setup>
let orderDetails = ref({});

const isLoading = ref(false);
const isPayTrue = ref(false);
let route = useRoute();
let id = route.query.id;
let membershipId = route.query.membership;

let brand = ref("");
let checkoutId = ref(null);
let amount = ref(null);

const formAction = ref("");
const msg = ref("");
let paymentWithHyperPay = async () => {
  try {
    let res;
    isLoading.value = true;

    if (membershipId) {
      res = await useApi().usePaymentMembership(membershipId, brand.value);
      msg.value = res?.message;
    } else {
      res = await useApi().usePayment(id, brand.value);
    }

    if (res) {
      checkoutId.value = res?.data?.checkoutId;
      amount.value = res?.data?.amount_to_pay;

      let oldScript = document.querySelector(
        'script[src*="oppwa.com/v1/paymentWidgets.js"]'
      );
      if (oldScript) {
        oldScript.remove();
      }

      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId.value}`;
      document.body.appendChild(script);
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

function selecteBrand(brandPay) {
  console.log(brand.value);
  brand.value = brandPay;
  paymentWithHyperPay();
}

let domain = "";

onMounted(async () => {
  domain = window.location.origin;
  formAction.value = `${window.location.origin}/payment-tamara-status`;
  try {
    if (id) {
      const responseOrder = await useApi().getSingleOrder(id);
      orderDetails.value = responseOrder?.data || {};
    }
  } catch (e) {
    console.error(e);
  }
});

let paywithTamara = async () => {
  try {
    isLoading.value = true;
    if (id) {
      let res = await useApi().tamaraPayment({
        order_id: id,
        success_url: `${domain}/payment-tamara-status/success`,
        failure_url: `${domain}/payment-tamara-status/failed`,
        cancel_url: `${domain}/payment-tamara-status/cancel`,
      });
      if (res?.data?.checkout_url) {
        window.location.href = res.data.checkout_url;
      }
    } else {
      let res = await useApi().tamaraPayment({
        membership_id: membershipId,
        success_url: `${domain}/payment-tamara-status/success`,
        failure_url: `${domain}/payment-tamara-status/failed`,
        cancel_url: `${domain}/payment-tamara-status/cancel`,
      });
      if (res?.data?.checkout_url) {
        window.location.href = res.data.checkout_url;
      }
      if (!res?.status) {
        msg.value = res?.message;
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

let paymentWihtTbby = async () => {
  try {
    isLoading.value = true;
    if (id) {
      let res = await useApi().tabyPayment({
        order_id: id,
        success_url: `${domain}/payment-tamara-status/success`,
        failure_url: `${domain}/payment-tamara-status/failed`,
        cancel_url: `${domain}/payment-tamara-status/cancel`,
      });
      if (res && res?.data?.checkout_url) {
        window.location.href = res?.data?.checkout_url;
      }
    } else {
      let res = await useApi().tabyPayment({
        membership_id: membershipId,
        success_url: `${domain}/payment-tamara-status/success`,
        failure_url: `${domain}/payment-tamara-status/failed`,
        cancel_url: `${domain}/payment-tamara-status/cancel`,
      });
      if (res && res?.data?.checkout_url) {
        window.location.href = res?.data?.checkout_url;
      }
      if (!res?.status) {
        msg.value = res?.message;
      }
    }
  } catch (err) {
    console.log("err", err);
  } finally {
    isLoading.value = false;
  }
};



const cachLayout = ref(false);
const orderPoints = ref(null);
let chachOnDelivery = async () => {
  isLoading.value = true;
  try {
    let res = await useApi().chachOnDelivery(id);
    if (res?.status) {
      triggerCartUpdate();
      cachLayout.value = true;
      const res = await useApi().getSingleOrder(id);
      orderPoints.value = res?.data;
    }
    if (cachLayout.value) {
      router.replace({
        query: {},
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

const router = useRouter();
</script>

<style scoped>
@import "@/assets/css/payment.css";
.box-design {
  background-color: #f7f9f9;
  padding: 20px;
  border-radius: 12px;
  margin-top: 24px;
  margin-bottom: 40px;
}
.points {
  background-color: #fffcea;
  padding: 20px;
  border-radius: 12px;
  margin-top: 24px;
  margin-bottom: 40px;
}
.point-img img {
  width: 100px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-in-out;
}

.modal-body {
  background: #fff;
  color: #222;
  padding: 25px 35px;
  border-radius: 16px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  max-width: 50%;
  width: 320px;
  animation: slideUp 0.3s ease-out;
}

.modal-text {
  margin: 0;
  line-height: 1.5;
}
.close-btn {
  position: absolute;
  top: 8px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s;
}

.close-btn:hover {
  color: red;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
