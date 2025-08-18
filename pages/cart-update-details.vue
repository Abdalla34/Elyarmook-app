<template>
  <div class="cart-parent mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <NotRegister
          :IsNotRegitser="notRegister"
          message="cart is Empty you must create account "
        />

        <div
          class="empty-cart text-center"
          v-if="
            token &&
            items.length === 0 &&
            offers.length === 0 &&
            !test?.data?.id
          "
        >
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
          v-if="(token && items.length > 0) || offers.length > 0"
        >
          <h4 class="mb-4 fw-bold">Order Details</h4>
          <div
            class="cart d-flex justify-content-between align-items-center border-radius-36px mb-3"
            v-for="order in items"
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
            <div class="delete-icon" @click="deletedOrder(order.id, 'service')">
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

          <div
            class="cart d-flex justify-content-between align-items-center border-radius-36px mb-3"
            v-for="order in offers"
            :key="order.offer_id"
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
            <div
              class="delete-icon"
              @click="deletedOrder(order.offer_id, 'offer')"
            >
              <svg
                width="28"
                height="24"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                :style="
                  loadingDelete[order.offer_idfer_id]
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
              <span v-if="loadingDelete[order.offer_id]">Loading...</span>
            </div>
          </div>
        </div>

        <!-- right section -->
        <div
          class="col-12 col-md-12 col-lg-4 col-test"
          v-if="token && (items.length || offers.length)"
        >
          <div class="h-100">
            <h1 class="text-capitalize fs-6 updated-details">order details updated</h1>
            <!-- price details -->
            <div class="">
              <div class="box-design">
                <div
                  v-for="item in itemsUpdates?.data?.date_branch_attributes"
                  class="branch d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">{{ item.label }}</h4>
                  <p class="text-capitalize">
                    {{ item.value }}
                  </p>
                </div>
              </div>
            </div>

            <div class="">
              <h6 class="fw-bold">Cost Details</h6>
              <div class="box-design">
                <div
                  class="total-order d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">sub total</h4>
                  <p class="text-capitalize">
                    {{ itemsUpdates?.data?.sub_total }}
                  </p>
                </div>

                <div
                  class="vat d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">vat</h4>
                  <p class="text-capitalize">
                    {{ itemsUpdates?.data?.vat_amount }}
                  </p>
                </div>

                <div
                  class="final-amount d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">Final Amount</h4>
                  <p class="text-capitalize">
                    {{ itemsUpdates?.data?.amount_to_pay }}
                    <span class="p-color-fs span">SAR</span>
                  </p>
                </div>
              </div>

              <div
                v-if="
                  itemsUpdates?.data?.branch &&
                  itemsUpdates?.data?.default_car?.car_type
                "
                class="input-code position-relative"
              >
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
                <h1 class="amount text-capitalize">total amonut</h1>
                <p>{{ itemsUpdates?.data?.total_amount }}</p>
              </div>

              <div class="buttion-confirm" @click="toContinue()">
                <ButtonCard textButton="continue" />
              </div>
              <div class="buttion-confirm">
                <button
                  @click="navigateTo('/services')"
                  class="additems text-capitalize label"
                >
                  <i class="fa-solid fa-plus"></i>
                  add another items
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let dayjs = useDayjs();

const { updateCartDetails, deleteItemFromCart, updateCartItemQuantity } =
  useApi();
const items = ref([]);
const loadingDelete = ref({});
const loadingQty = ref({});
let route = useRoute();
let order_id = route.query.id;
const itemsUpdates = await updateCartDetails(order_id);
let notRegister = ref(false);
let token = useCookie("token").value;
let offers = ref([]);
offers.value = itemsUpdates?.data?.offers || [];

if (!token) {
  notRegister.value = true;
} else {
  items.value = itemsUpdates?.data?.services || [];

  if (
    itemsUpdates?.status === false &&
    itemsUpdates?.message === "Unauthenticated"
  ) {
    notRegister.value = true;
  }
}

async function deletedOrder(id, type) {
  if (type === "service") {
    items.value = items.value.filter((o) => o.id !== id);
    loadingDelete.value[id] = true;
  } else if (type === "offer") {
    loadingDelete.value[id] = true;
    offers.value = offers.value.filter((o) => o.offer_id !== id);
  } else {
    return;
  }

  try {
    await deleteItemFromCart(type, order_id, id);
  } catch (err) {
    console.log("test", err);
  }
}

async function updateQty(order, newQty) {
  if (newQty < 1) return;
  loadingQty.value[order.id] = true;
  try {
    await updateCartItemQuantity("service", order_id, order.id, newQty);
    order.qty = newQty;
  } catch (err) {
    console.log("test", err);
  } finally {
    loadingQty.value[order.id] = false;
  }
}

let router = useRouter();
function toContinue() {
  router.push({
    path: `/payment`,
    query: {
      id: order_id,
    },
  });
}
</script>

<style scoped>
@import "@/assets/css/cartorder.css";
.updated-details{
  color : var(--color-black) ;
  padding: 10px;
  border-radius: 20px;
  font-family: var(--font-family);
  font-weight: bold;
  background-color: var(--main-color);
}
</style>
