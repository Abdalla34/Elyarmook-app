<template>
  <div class="cart-parent mt-5">
    <div class="container">
      <div class="row justify-content-center">
        
        <div v-if="notRegister" class="text-center py-5">
          <h1 class="text-capitalize create text-danger">you must create account</h1>
          <button @click="navigateTo('/createaccount')" class="btn-create mt-3 text-capitalize">
            create account
          </button>
        </div>

        <div class="empty-cart text-center" v-if="token && orders.length === 0">
          <div>
            <img src="/Vector.png" alt="" />
            <h3 class="text-capitalize create">your cart is empty</h3>
            <div class="btn-items">
              <button @click="navigateTo('/services')">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 12.5H18.5"
                    stroke="#040505"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.5 18.5V6.5"
                    stroke="#040505"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Add Items
              </button>
            </div>
          </div>
        </div>

        <!-- left section -->
        <div
          class="col-12 col-md-12 col-lg-6 col-md-6"
          v-if="token && orders.length"
        >
          <h4 class="mb-4 fw-bold">Order Details</h4>
          <div
            class="cart d-flex justify-content-between align-items-center border-radius-36px mb-3"
            v-for="order in orders"
            :key="order.id"
          >
            <div class="details-cart d-flex align-items-center gap-3">
              <div class="img">
                <img :src="order.image" :alt="order.title" />
              </div>
              <div class="name-cart">
                <h4 class="item-name item-left">{{ order.title }}</h4>
                <p class="price">
                  {{ order.price }}
                  <span class="p-color-fs span">SAR</span>
                </p>
                <div class="qty-controls d-flex align-items-center mt-2">
                  <button
                    class="qty-btn"
                    :disabled="loadingQty[order.id] || order.qty <= 1"
                    @click="updateQty(order, order.qty - 1)"
                  >
                    -
                  </button>
                  <span class="mx-2">{{ order.qty }}</span>
                  <button
                    class="qty-btn"
                    :disabled="loadingQty[order.id]"
                    @click="updateQty(order, order.qty + 1)"
                  >
                    +
                  </button>
                  <span v-if="loadingQty[order.id]" class="ms-2"
                    >Loading...</span
                  >
                </div>
              </div>
            </div>
            <div class="delete-icon" @click="deletedOrder(order.id)">
              <svg
                width="28"
                height="24"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                :style="
                  loadingDelete[order.id]
                    ? 'opacity:0.5;pointer-events:none;'
                    : ''
                "
              >
                <path
                  d="M24.5 5.98047C20.615 5.65047 16.7067 5.48047 12.81 5.48047C10.5 5.48047 8.19 5.58047 5.88 5.78047L3.5 5.98047"
                  stroke="#3D3D3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.91602 4.97L10.1727 3.66C10.3593 2.71 10.4993 2 12.471 2H15.5277C17.4994 2 17.651 2.75 17.826 3.67L18.0827 4.97"
                  stroke="#3D3D3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21.9911 9.14062L21.2328 19.2106C21.1045 20.7806 20.9995 22.0006 17.7445 22.0006H10.2545C6.99948 22.0006 6.89448 20.7806 6.76615 19.2106L6.00781 9.14062"
                  stroke="#3D3D3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.0508 16.5H15.9358"
                  stroke="#3D3D3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.084 12.5H16.9173"
                  stroke="#3D3D3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span v-if="loadingDelete[order.id]">Loading...</span>
            </div>
          </div>
          <!-- <div
            class="button-continue width"
            @click="navigateTo('/orderDetails')"
          >
            <ButtonCard textButton="continue" />
          </div> -->
        </div>

        <!-- right section -->
        <div
          class="col-12 col-md-12 col-lg-4 col-test"
          v-if="token && orders.length"
        >
          <div class="h-100">
            <div class="">
              <h6 class="fw-bold">Order Details</h6>
              <div class="box-design">
                <div
                  class="branch d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">branch</h4>
                  <p class="text-capitalize">riyddah</p>
                </div>

                <div
                  class="model d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">car model</h4>

                  <p>BMW</p>
                </div>

                <div
                  class="reservation-date d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">Reservation Date</h4>

                  <p>sun , oct 5 , 2025</p>
                </div>

                <div
                  class="reservation-time d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">Reservation time</h4>
                  <p class="text-capitalize">10:40</p>
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
                  <p class="text-capitalize">1112151545237</p>
                </div>

                <div
                  class="vat d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">vat</h4>
                  <p class="text-capitalize">2415151245</p>
                </div>

                <div
                  class="final-amount d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">Final Amount</h4>
                  <p class="text-capitalize">400</p>
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
                <p>400sar</p>
              </div>

              <div class="buttion-confirm">
                <ButtonCard textButton="continue" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getMyCart, deleteItemFromCart, updateCartItemQuantity } = useApi();
const orders = ref([]);
const loadingDelete = ref({});
const loadingQty = ref({});

let notRegister = ref(false);
let token = useCookie("token").value;
if (!token) {
  notRegister.value = true;
} else {
  const res = await getMyCart();
  orders.value = res?.data?.services || [];

  if (res?.status === false && res?.message === "Unauthenticated") {
    notRegister.value = true;
  }
}

async function deletedOrder(id) {
  const item = orders.value.find((o) => o.id === id);
  if (!item) return;
  loadingDelete.value[id] = true;
  try {
    const cartRes = await getMyCart();
    const order_id = cartRes?.data?.id;
    await deleteItemFromCart("service", order_id, id);
    orders.value = orders.value.filter((o) => o.id !== id);
  } catch (err) {
    console.log("test", err);
  } finally {
    loadingDelete.value[id] = false;
  }
}

async function updateQty(order, newQty) {
  if (newQty < 1) return;
  loadingQty.value[order.id] = true;
  try {
    const cartRes = await getMyCart();
    const order_id = cartRes?.data?.id;
    await updateCartItemQuantity("service", order_id, order.id, newQty);
    order.qty = newQty;
  } catch (err) {
    console.log("test", err);
  } finally {
    loadingQty.value[order.id] = false;
  }
}
</script>

<style scoped>
@import "@/assets/css/cartorder.css";
.btn-create {
  background-color: var(--main-color);
  border: none;
  padding: 10px 60px;
  border-radius: 20px;
}
.empty-cart {
  margin-bottom: 200px;
}

.btn-items {
  width: fit-content;
  margin: auto;
}
.btn-items button {
  background-color: var(--main-color);
  border: none;
  padding: 21px 125px;
  border-radius: 36px;
}
.create {
  font-family: var(--font-main);
  font-weight: 600;
  font-style: SemiBold;
  font-size: 28px;
  color: #27273c;
  margin-bottom: 25px;
  margin-top: 25px;
}
</style>
