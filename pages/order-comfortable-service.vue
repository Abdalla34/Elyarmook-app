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
          <div class="col-12 col-lg-10 col-md-10 col-sm-12">
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
              <input
                v-model="voucherCode"
                type="text"
                class="w-100 input-with-apply text-capitalize"
                placeholder="promocode"
              />
              <!-- delete code  -->
              <div>
                <button
                  class="apply-btn apply position-absolute"
                  :disabled="!voucherCode"
                  @click="voucherDeleted"
                >
                  <span class="text-capitalize me-2 spanbutton">delete</span>
                  <iconsOrder-applyCode />
                </button>
                <!-- <p class="text-success">{{ msg }}</p>
                  -->
              </div>
              <!-- apply code  -->
              <div>
                <button
                  @click="voucherApply"
                  class="apply-btn apply position-absolute"
                  :disabled="!voucherCode"
                >
                  <span class="text-capitalize me-2 spanbutton">apply</span>
                  <iconsOrder-applyCode />
                </button>
                <p class="error">{{ msg }}</p>
              </div>
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

// console.log("order", getMyorder?.wench_requests?.created_at);
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
.error {
  color: red;
  font-family: var(--font-family);
  font-size: 15px;
}
</style>
