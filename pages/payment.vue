<template>
  <div class="order-details">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-padding">
          <h1
            v-if="!checkoutId && !cachLayout"
            data-v-8bcd5751
            class="text-capitalize text title-pages"
          >
            {{ $t("chose payment method") }}
          </h1>
          <!-- message if user have a membership -->
          <div v-if="msg" class="modal-overlay" @click.self="msg = ''">
            <div class="modal-body">
              <button class="close-btn" @click="msg = ''">×</button>
              <p>{{ msg }}</p>
            </div>
          </div>

          <!-- message if user charge wallet field -->
          <div
            v-if="walletChargeMsg"
            class="modal-overlay"
            @click.self="walletChargeMsg = ''"
          >
            <div class="modal-body">
              <button class="close-btn" @click="walletChargeMsg = ''">×</button>
              <p>{{ walletChargeMsg }}</p>
            </div>
          </div>

          <!-- payment methods -->
          <div v-if="!checkoutId && !cachLayout" class="methods">
            <!-- visa -->
            <div
              :disabled="isLoading"
              @click="selecteBrand('visa')"
              class="box-method border-radius-36px p-color-fs text-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">
                {{ $t("Pay with visa") }}
              </div>
            </div>
            <!-- mada -->
            <div
              @click="!isPayTrue && selecteBrand('mada')"
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">
                {{ $t("Pay whith mada") }}
              </div>
            </div>
            <!-- apple pay -->
            <div
              :disabled="isLoading"
              @click="selecteBrand('applepay')"
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">
                {{ $t("apple pay") }}
              </div>

              <div class="icon-pay">
                <img src="/paymentImg.png" alt="" />
              </div>
            </div>
            <!-- master -->
            <div
              :disabled="isLoading"
              @click="selecteBrand('master')"
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">{{ $t("master") }}</div>
            </div>
            <!-- tamara -->
            <div
              :disabled="isLoading"
              @click="paywithTamara"
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">{{ $t("tamara") }}</div>
            </div>
            <!-- tabby -->
            <div
              :disabled="isLoading"
              @click="paymentWihtTbby"
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">{{ $t("tabby") }}</div>
            </div>
            <!-- cach on delivery -->
            <div
              v-if="orderDetails?.open_cash"
              @click="chachOnDeliveryFn"
              class="box-method d-flex gap-4 justify-content-center border-radius-36px p-color-fs align-items-center mb-4 position-relative box-hover-bg"
            >
              <div class="position-absolute bg-hover"></div>
              <div class="name text-capitalize fw-bold">
                {{ $t("cach on delivery") }}
              </div>
            </div>
          </div>

          <div v-if="checkoutId" class="text-center">
            <h4 class="name fw-bold text-capitalize mb-3"></h4>
            <form
              :action="formAction"
              class="paymentWidgets"
              data-brands="VISA MASTER MADA"
              :data-lang="locale === 'ar' ? 'ar' : 'en'"
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
                  <h4 class="label">{{ $t("sub total") }}</h4>
                  <p class="text-capitalize">
                    {{ orderDetails?.sub_total }}
                    <span class="p-color-fs span text-uppercase">{{
                      $t("sar")
                    }}</span>
                  </p>
                </div>

                <div
                  class="vat d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">{{ $t("vat") }}</h4>
                  <p class="text-capitalize">
                    {{ orderDetails?.vat_amount }}
                    <span class="p-color-fs span text-uppercase">{{
                      $t("sar")
                    }}</span>
                  </p>
                </div>

                <div
                  class="final-amount d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">{{ $t("Final Amount") }}</h4>
                  <p class="text-capitalize">
                    {{ orderDetails?.amount_to_pay }}
                    <span class="p-color-fs span text-uppercase">{{
                      $t("sar")
                    }}</span>
                  </p>
                </div>
              </div>

              <div @click="navigateTo($localePath('/point'))" class="points">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="point-img">
                    <img src="/pointsFrame.png" alt="points" />
                  </div>
                  <div>
                    <h1 class="point-text fw-bold fs-6 text-end">
                      {{ $t("you will get a reward") }}
                      {{ orderDetails.points_will_earn }} {{ $t("point") }} !
                    </h1>
                    <p class="p-color-fs">
                      {{
                        $t(
                          "dont forget to use it next time to save more money in your order"
                        )
                      }}
                    </p>
                  </div>
                </div>
                <div
                  @click="navigateTo($localePath('/point'))"
                  class="show-point text-end mt-4 text-danger text-capitalize"
                  style="cursor: pointer"
                >
                  {{ $t("show points") }}
                </div>
              </div>

              <div
                class="button"
                @click="navigateTo($localePath('/my-orders'))"
              >
                <button class="details text-capitalize label button">
                  {{ $t("details") }}
                </button>
              </div>
              <div class="btn-profile mt-3">
                <button
                  type="button"
                  class="btn btn-secondary w-100 rounded-pill"
                  @click="navigateTo($localePath('/profile'))"
                >
                  {{ $t("continue profile") }}
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
const cartCount = useState("cartCount", () => 0);
const {
  usePayment,
  usePaymentMembership,
  usePaymentToChargeWallet,
  tamaraPayment,
  tabyPayment,
  chachOnDelivery,
  getSingleOrder,
} = useApi();
let orderDetails = ref({});

const isLoading = ref(false);
const isPayTrue = ref(false);
let route = useRoute();
let id = route.query.id;
let membershipId = route.query.membership;
const walletAmount = ref(0);
walletAmount.value = route.query.totalAmountWall || 0;

let brand = ref("");
let checkoutId = ref(null);
let amount = ref(null);

watch(checkoutId, async (val) => {
  if (val) {
    await nextTick();
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId.value}`;
    document.body.appendChild(script);
  }
});

const formAction = ref("");
const msg = ref("");

const walletChargeMsg = ref("");

const localePath = useLocalePath();
const { locale } = useI18n();
let paymentWithHyperPay = async () => {
  try {
    const amountTonum = Number(walletAmount.value);
    let res;
    isLoading.value = true;

    if (membershipId) {
      res = await usePaymentMembership(membershipId, brand.value);
      formAction.value = `${window.location.origin}${localePath(
        "/payment-tamara-status"
      )}?type=order`;
      msg.value = res?.message;
    } else if (id) {
      res = await usePayment(id, brand.value);
      formAction.value = `${window.location.origin}${localePath(
        "/payment-tamara-status"
      )}?type=order`;
    } else {
      res = await usePaymentToChargeWallet(amountTonum, brand.value);
      formAction.value = `${window.location.origin}${localePath(
        "/payment-tamara-status"
      )}?type=wallet`;
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
      const langParam = locale.value === "ar" ? "ar" : "en";
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId.value}&lang=${langParam}`;
      document.body.appendChild(script);
    }
  } catch (err) {
    console.log("Error fetching");
  } finally {
    isLoading.value = false;
  }
};

function selecteBrand(brandPay) {
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
    console.error("Error fetching");
  }
});

let paywithTamara = async () => {
  try {
    const walletToNum = Number(walletAmount.value);
    isLoading.value = true;
    if (id) {
      let res = await tamaraPayment({
        order_id: id,
        success_url: `${domain}/payment-tamara-status/success`,
        failure_url: `${domain}/payment-tamara-status/failed`,
        cancel_url: `${domain}/payment-tamara-status/cancel`,
      });
      if (!res?.status) {
        msg.value = res?.message;
      }
      if (res?.data?.checkout_url) {
        window.location.href = res.data.checkout_url;
      }
    } else if (membershipId) {
      let res = await tamaraPayment({
        membership_id: membershipId,
        success_url: `${domain}/payment-tamara-status/success`,
        failure_url: `${domain}/payment-tamara-status/failed`,
        cancel_url: `${domain}/payment-tamara-status/cancel`,
      });
      if (!res?.status) {
        msg.value = res?.message;
      }
      if (res?.data?.checkout_url) {
        window.location.href = res.data.checkout_url;
      }
    } else {
      let res = await tamaraPayment({
        wallet_amount: walletToNum,
        success_url: `${domain}/wallet`,
        failure_url: `${domain}/wallet`,
        cancel_url: `${domain}/wallet`,
      });
      if (!res.status) {
        walletChargeMsg.value = res?.message;
      }
      if (res?.data?.checkout_url) {
        window.location.href = res.data.checkout_url;
      }
      // if (!res?.status) {
      //   msg.value = res?.message;
      // }
    }
  } catch (err) {
    walletChargeMsg.value = "Something went wrong!";
    msg.value = err?.response?.message;
  } finally {
    isLoading.value = false;
  }
};

let paymentWihtTbby = async () => {
  try {
    isLoading.value = true;
    if (id) {
      let res = await tabyPayment({
        order_id: id,
        success_url: `${domain}/payment-tamara-status/success`,
        failure_url: `${domain}/payment-tamara-status/failed`,
        cancel_url: `${domain}/payment-tamara-status/cancel`,
      });
      if (res && res?.data?.checkout_url) {
        window.location.href = res?.data?.checkout_url;
      }
    } else if (membershipId) {
      let res = await tabyPayment({
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
    } else {
      let res = await tabyPayment({
        wallet_amount: walletAmount.value,
        success_url: `${domain}/wallet`,
        failure_url: `${domain}/wallet`,
        cancel_url: `${domain}/wallet`,
      });
      if (!res.status) {
        walletChargeMsg.value = res?.message;
        msg.value = res?.message;
      }
      if (res && res?.data?.checkout_url) {
        window.location.href = res?.data?.checkout_url;
      }
      if (!res?.status) {
        msg.value = res?.message;
      }
    }
  } catch (err) {
    console.log("err");
    walletChargeMsg.value = err?.response?.message;
    msg.value = err?.response?.message;
  } finally {
    isLoading.value = false;
  }
};

const cachLayout = ref(false);
const orderPoints = ref(null);
let chachOnDeliveryFn = async () => {
  isLoading.value = true;
  try {
    let res = await chachOnDelivery(id);
    if (res?.status) {
      cachLayout.value = true;
      const res = await getSingleOrder(id);
      orderPoints.value = res?.data;
      cartCount.value = 0;
    }
    if (cachLayout.value) {
      router.replace({
        query: {},
      });
    }
  } catch (err) {
    console.log('Error fetching');
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
