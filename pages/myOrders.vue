<template>
  <div class="my-orders position-relative">
    <div class="container position-relative">
      <NotRegister
        :IsNotRegitser="!loading && msgError"
        message="your orders is Empty you must create account"
      />

      <div class="row justify-content-center">
        <div class="col-lg-7 col-md-10 col-sm-12">
          <div
            class="box-orders border-radius-36px d-flex align-items-center justify-content-between position-relative"
            v-if="!msgError && !loading"
            v-for="order in orders"
            :key="order.id"
            @click="toOrderStatus(order)"
          >
            <div class="details-title d-flex align-items-center gap-3">
              <div>
                <img src="/newLogo.png" alt="imageOrder" />
              </div>
              <div class="name price">
                <h4 class="text-capitalize">
                  {{ order.type_for_customer }}
                </h4>
                <p class="price">
                  {{ order.total_amount }}
                  <span class="SAR">SAR</span>
                </p>
              </div>
            </div>

            <div class="time-branch">
              <div class="time d-flex gap-2 align-items-center mb-2">
                <div class="icon-time icon-design">
                  <iconsOrder-timer />
                </div>
                <div class="time-order">
                  <p v-if="order.created_at" class="paragarph text-capitalize">
                    {{
                      dayjs(
                        order.created_at.replace("ص", "AM").replace("م", "PM"),
                        "MMM D, YYYY hh:mm A"
                      ).format("ddd, MMM D ,YYYY")
                    }}
                  </p>
                  <p v-if="order.created_at" class="paragarph text-capitalize">
                    {{
                      dayjs(
                        order.created_at.replace("ص", "AM").replace("م", "PM"),
                        "MMM D, YYYY hh:mm A"
                      ).format("hh:mm A")
                    }}
                  </p>
                </div>
              </div>
            </div>
            <!-- status orders -->
            <OrderStatus :order="order" :statusorder="statusorder" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const dayjs = useDayjs();
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

let msgError = ref(false);
let loading = ref(true);
let token = useCookie("token");

const orders = ref([]);
try {
  const res = await useApi().getMyOrders();
  if (res?.status === false && res?.message === "Unauthenticated") {
    msgError.value = true;
  } else if (token.value) {
    orders.value = res?.data?.items ?? [];
  }
} catch (err) {
  if (err?.response?.status === 401) {
    msgError.value = true;
  } else {
    console.error("حدث خطأ غير متوقع:", err);
  }
} finally {
  loading.value = false;
}

async function toOrderStatus(orderId) {
  navigateTo(`orderdetails/${orderId.id}`);
}
let statusorder = ref(null);
let responseStatus = await useApi().getStatusorders();
statusorder.value = responseStatus?.data;
</script>

<style scoped>
@import "@/assets/css/myorders.css";
</style>
