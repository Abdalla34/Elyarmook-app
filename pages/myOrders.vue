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

            <div
              class="status text-capitalize"
              :class="{
                'bg-requested': order.status === 'request_done',
                'bg-report': order.status === 'report_ready',
                'bg-inspection':
                  order.status === 'booking_done' ||
                  order.status === 'car_under_inspection',
                'bg-canceled': order.status === 'canceled',
                'bg-ready': order.status === 'car is ready',
                'bg-finished': order.status === 'order_finished',
              }"
            >
              {{ order.status_value }}
            </div>
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
    console.log("orders ", res?.data?.items?.[0].created_at);
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
// let statusorder = ref(null);
// let responseStatus = await useApi().getStatusorders();

// statusorder.value = responseStatus?.data;
// console.log("this is available", statusorder.value?.["wench-order"]);
</script>

<style scoped>
@import "@/assets/css/myorders.css";
.test {
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  z-index: 16;
}
.over {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 11;
}
.msg-error {
  background-color: white;
  box-shadow: 0px 0px 20px 0px #0000000a;
  border-radius: 30px;
  padding: 20px;
  text-align: center;
  width: 50%;
  margin: auto;
  margin-bottom: 300px;
  margin-top: 100px;
}
.goAcc {
  border: none;
  background-color: var(--main-color);
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 20px;
  cursor: pointer;
  font-family: var(--font-main);
  font-weight: 500;
  font-size: 16px;
  color: #040505;
}
.goAcc:hover {
  border: none;
  background-color: var(--main-color);
  box-shadow: 0px 0px 20px 0px var(--main-color);
}
.bg-finished {
  background-color: green;
  color: white;
}
.SAR {
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 16px;
  line-height: 32px;
  letter-spacing: 0%;
  color: #7e7e7e;
}
</style>
