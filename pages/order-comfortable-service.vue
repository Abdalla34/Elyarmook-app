<template>
  <div class="comfotable-service">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-7 col-md-10 col-sm-12">
          <h1 class="title mb-5 fs-4">comfortable service</h1>
          <div class="car-user">
            <div
              class="box-car d-flex align-items-center justify-content-between mb-3 pt-1 pb-1 pe-3 ps-3"
            >
              <div class="car-details d-flex align-items-center gap-3">
                <img :src="getMyorder?.brand?.image" alt="" />
                {{ getMyorder?.brand?.title }} -
                {{ getMyorder?.car_type?.title }}
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-12 col-md-10 col-sm-12">
            <div class="details rounded p-3">
              <div
                class="branch d-flex justify-content-between align-items-center mb-3"
              >
                <div class="p-color-fs">branch</div>
                <div class="branch-order">{{ getMyorder?.branch?.title }}</div>
              </div>
              <div
                class="car-name lay-out d-flex justify-content-between align-items-center mb-3"
              >
                <div class="label p-color-fs">car name</div>
                <div class="car-details">
                  {{ getMyorder?.brand?.title }} -
                  {{ getMyorder?.car_type?.title }}
                </div>
              </div>
              <div
                class="time-booking d-flex justify-content-between align-items-center"
              >
                <div class="time-date p-color-fs">time booking</div>
                <div class="time">
                  {{ getMyorder?.wench_requests?.[0]?.created_at }}
                </div>
              </div>
            </div>

            <div
              class="input-code position-relative mt-4"
              v-if="getMyorder?.can_show_promo_code"
            >
              <label for="" class="label">Do you have a promo code?</label>

              <div class="position-relative">
                <input
                  v-model="voucherCode"
                  type="text"
                  class="w-100 input-with-apply text-capitalize pe-5"
                  placeholder="promocode"
                />

                <!-- apply / delete -->
                <button
                  v-if="!voucherApplied"
                  @click="voucherApply"
                  class="apply-btn-inside"
                  :disabled="!voucherCode"
                >
                  <span class="text-capitalize me-1">apply</span>
                  <iconsOrder-applyCode />
                </button>

                <button v-else @click="voucherDeleted" class="apply-btn-inside">
                  <span class="text-capitalize me-1">delete</span>
                  <iconsOrder-applyCode />
                </button>
              </div>

              <p class="error m-0 mt-1">{{ msg }}</p>
            </div>

            <!-- total amount -->
            <div
              class="total-amount d-flex align-items-center justify-content-between"
            >
              <h1 class="amount text-capitalize">total amount</h1>
              <p>
                {{ getMyorder?.amount_to_pay }}
                <span class="p-color-fs span">SAR</span>
              </p>
            </div>

            <div class="mt-4">
              <ButtonCard
                text-button="Continue"
                @Click="navigateTo('/payment')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const getMyorder = ref([]);
const resOrders = await useWenchServices().getLastOrder();
getMyorder.value = resOrders?.data;
// const orderId = getMyorder.value?.id;
const voucherCode = ref("");
const msg = ref("");
let voucherApply = async () => {
  try {
    let resVoucher = await useApi().applyVoucherToCart(
      getMyorder.value?.id,
      voucherCode.value
    );

    if (resVoucher?.status === false) {
      msg.value = resVoucher?.message;
    } else {
      msg.value = resVoucher?.message;
    }
  } catch (error) {
    console.error("Error applying voucher code:", error);
  }
};

let voucherDeleted = async () => {
  try {
    let res = await useApi().deleteVoucherFromCart(getMyorder.value?.id);
    msg.value = res?.message || "Voucher deleted successfully";
    voucherCode.value = "";
  } catch (error) {
    console.error("Error deleting voucher code:", error);
  }
};
</script>

<style scoped>
@import "@/assets/css/cartorder.css";
.box-car {
  border-radius: 20px;
  background-color: var(--color-secound-main);
}
.car-details img {
  width: 60px;
}
.details {
  background-color: #f7f9f9;
}

.input-with-apply {
  height: 42px;
  padding-right: 90px; /* مساحة للزرار من جوة */
}

.apply-btn-inside {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  height: 28px;
  padding: 0 12px;
  background: #007bff;
  border: none;
  color: #fff;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.apply-btn-inside:disabled {
  background: #aaa;
  cursor: not-allowed;
}

.error {
  font-size: 13px;
  color: #e74c3c;
  margin-top: 4px;
}
</style>
