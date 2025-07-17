<template>
  <div class="my-orders position-relative">
    <div class="container position-relative">
      <div class="position-relative">
        <div class="msg-error text-capitalize" v-if="!loading && msgError">
          <p class="text-danger">You must create an account to continue</p>
          <button class="goAcc" @click="navigateTo('/createaccount')">
            Go To Create Acc
          </button>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-7 col-md-10 col-sm-12">
          <ul
            v-if="!msgError && !loading"
            class="links d-flex justify-content-center align-items-end ul"
          >
            <li class="">
              <NuxtLink
                to="/"
                exact-active-class="active"
                class="d-flex align-items-center gap-1 border-radius-36px p-color-fs link-fix"
              >
                <iconsOrder-iconAll :isActive="$route.path === '/AllOrder'" />
                <h6 class="text-capitalize link-sm">all</h6>
              </NuxtLink>
            </li>

            <li class="">
              <NuxtLink
                to="/myOrders"
                exact-active-class="active"
                class="d-flex align-items-center gap-1 border-radius-36px p-color-fs link-fix"
              >
                <iconsOrder-requested :isActive="$route.path === '/myOrders'" />
                <h6 class="text-capitalize link-sm">requested</h6>
              </NuxtLink>
            </li>

            <li class="">
              <NuxtLink
                to="/"
                exact-active-class="active"
                class="d-flex align-items-center gap-1 border-radius-36px p-color-fs link-fix"
              >
                <iconsOrder-canceled :isActive="$route.path === '/canceled'" />
                <h6 class="text-capitalize link-sm">canceled</h6>
              </NuxtLink>
            </li>

            <li class="">
              <NuxtLink
                to="/"
                exact-active-class="active"
                class="d-flex align-items-center gap-1 border-radius-36px p-color-fs link-fix"
              >
                <iconsOrder-spareOrder :isActive="$route.path === '/'" />

                <h6 class="text-capitalize link-sm">spare parts</h6>
              </NuxtLink>
            </li>
          </ul>

          <div
            class="box-orders border-radius-36px d-flex align-items-center justify-content-between position-relative"
            v-if="!msgError && !loading"
            v-for="order in orders"
          >
            <!-- <div
              v-if="order.status === 'requested' || order.status === 'report'"
              class="action position-absolute text-capitalize"
            >
              action nedeed
            </div> -->

            <div class="details-title d-flex align-items-center gap-3">
              <div>
                <!-- <img :src="orders?.data?.items." alt="imageOrder" /> -->
              </div>
              <div class="name price">
                <h4 class="text-capitalize">
                  {{ order.vendor_name }}
                </h4>
                <p class="price">
                  <span class="p-color-fs span">{{ order.total_amount }}</span>
                </p>
              </div>
            </div>

            <div class="time-branch">
              <div class="time d-flex gap-2 align-items-center mb-2">
                <div class="icon-time icon-design">
                  <iconsOrder-timer />
                </div>
                <div class="time-order">
                  <p class="paragarph text-capitalize">
                    {{ dayjs(order.created_at).format("ddd, MMM D ,YYYY") }}
                  </p>
                  <p class="paragarph text-capitalize">
                    {{ dayjs(order.created_at).format("hh:mm A") }}
                  </p>
                </div>
              </div>

              <div class="barnch d-flex gap-2 align-items-center">
                <div class="icon-branch icon-design">
                  <iconsOrder-timer />
                </div>
                <div class="title-order">
                  <p class="paragarph">sasasasas</p>
                  <p class="paragarph">asasasas</p>
                </div>
              </div>
            </div>

            <div>requsted</div>

            <!-- <div
              class="status text-capitalize"
              :class="{
                'bg-requested': order.status === 'requested',
                'bg-report': order.status === 'report',
                'bg-inspection': order.status === 'inspection',
                'bg-canceled': order.status === 'canceled',
                'bg-ready': order.status === 'car is ready',
              }"
            >
             req
            </div> -->
          </div>
        </div>
      </div>
      <!-- <div class="position-absolute test">
        <PoupPremium />
      </div> -->
    </div>
  </div>
  <!-- <div class="position-absolute over"></div> -->
</template>

<script setup>
let dayjs = useDayjs();
let msgError = ref(false);
let loading = ref(true);
let token = useCookie("token");

const orders = ref([]);
  try {
    const res = await useApi().getMyOrders();
    if (res?.status === false && res?.message === "Unauthenticated") {
      msgError.value = true;
    } else if(token.value) {
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

console.log(token.value);
// console.log(orders.value)
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
</style>
