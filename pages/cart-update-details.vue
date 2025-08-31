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
            spareParts.length === 0 &&
            order_id
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
              <Trash />
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
              <Trash />
              <span v-if="loadingDelete[order.offer_id]">Loading...</span>
            </div>
          </div>

          <div
            class="cart d-flex justify-content-between align-items-center border-radius-36px mb-3"
            v-for="sparepart in spareParts"
            :key="sparepart.id"
          >
            <div class="details-cart d-flex align-items-center gap-3">
              <div class="img">
                <img :src="sparepart.image" :alt="sparepart.title" />
              </div>
              <div class="name-cart">
                <h4 class="item-name item-left">{{ sparepart.title }}</h4>
                <p class="price">
                  {{ sparepart.price }}
                  <span class="p-color-fs span">SAR</span>
                </p>
                <div class="qty-controls d-flex align-items-center mt-2">
                  <button
                    class="qty-btn"
                    :disabled="loadingQty[sparepart.id] || sparepart.qty <= 1"
                    @click="
                      updateQty(
                        'spare_part',
                        order_id,
                        sparepart,
                        sparepart.qty - 1
                      )
                    "
                  >
                    -
                  </button>

                  <span class="mx-2">{{ sparepart.qty }}</span>
                  <button
                    class="qty-btn"
                    :disabled="loadingQty[sparepart.id]"
                    @click="
                      updateQty(
                        'spare_part',
                        order_id,
                        sparepart,
                        sparepart.qty + 1
                      )
                    "
                  >
                    +
                  </button>
                  <span v-if="loadingQty[sparepart.id]" class="ms-2"
                    >Loading...</span
                  >
                </div>
              </div>
            </div>
            <div
              class="delete-icon"
              @click="deletedOrder(sparepart.id, 'spare_part')"
            >
              <trash />
              <span v-if="loadingDelete[sparepart.id]">Loading...</span>
            </div>
          </div>
        </div>

        <!-- right section -->
        <div
          class="col-12 col-md-12 col-lg-4 col-test"
          v-if="token && (items.length || offers.length)"
        >
          <div class="h-100">
            <h1 class="text-capitalize fs-6 updated-details">
              order details updated
            </h1>
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
                    {{ amountToPay }}
                    <span class="p-color-fs span">SAR</span>
                  </p>
                </div>
              </div>

              <!-- <div
                class="wallet-box d-flex align-items-center justify-content-between bg-light p-3 rounded-3 shadow-sm mb-3"
              >
                <label for="warranty" class="form-label mb-0 fw-semibold">test 
                 
                </label>

                <div class="form-check form-switch m-0">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="warranty"
                  />
                </div>
              </div> -->

              <div
                class="input-code position-relative"
                v-if="itemsUpdates?.can_show_promo_code"
              >
                <input
                  v-model="voucherCode"
                  type="text"
                  class="w-100 input-with-apply text-capitalize"
                  placeholder="promocode"
                />

                <div v-if="hasVoucher">
                  <button
                    class="apply-btn apply position-absolute"
                    @click="voucherDeleted"
                  >
                    <span class="text-capitalize me-2 spanbutton">delete</span>
                    <iconsOrder-applyCode />
                  </button>
                  <p class="text-success">{{ msg }}</p>
                </div>

                <div v-else>
                  <button
                    class="apply-btn apply position-absolute"
                    @click="voucherApply"
                  >
                    <span class="text-capitalize me-2 spanbutton">apply</span>
                    <iconsOrder-applyCode />
                  </button>
                  <p class="error">{{ msg }}</p>
                </div>
              </div>

              <div
                class="total-amount d-flex align-items-center justify-content-between"
              >
                <h1 class="amount text-capitalize">total amount</h1>
                <p>
                  {{ amountToPay }} <span class="p-color-fs span">SAR</span>
                </p>
              </div>

              <div
                v-if="itemsUpdates?.data?.user_balance > 0"
                class="wallet-box mt-3 d-flex align-items-center justify-content-between bg-light p-3 rounded-3 shadow-sm"
              >
                <label for="usewallet" class="form-label mb-0 fw-semibold"
                  >Use Wallet Balance
                  <p class="p-color-fs">
                    you have {{ balance }} <span class="sar">SAR</span> in
                    wallet
                  </p></label
                >

                <div class="form-check form-switch m-0">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="usewallet"
                    @change="toggleUseWallet"
                    v-model="useWalletActive"
                  />
                </div>
              </div>

              <div class="buttion-confirm" @click="toContinue()">
                <ButtonCard textButton="continue" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="msg-done-use-wallet" v-if="msgDoneUseWallet">
        <i
          class="fa-solid fa-xmark cursor-pointer"
          style="cursor: pointer"
          @click="msgDoneUseWallet = false"
        ></i>
        <p class="text-success">order successfully!</p>
        <button-card
          class="width-btn w-50 m-auto mt-2"
          @click="navigateTo(`/orderdetails/${order_id}?from=cart-update-details`)"
          text-button="view my orders"
        >
        </button-card>
      </div>

      <div v-if="msgDoneUseWallet" class="over-lay"></div>
    </div>
  </div>
</template>

<script setup>
let dayjs = useDayjs();
const { updateCartDetails, deleteItemFromCart, updateCartItemQuantity } =
  useApi();
const loadingDelete = ref({});
const loadingQty = ref({});
let route = useRoute();
let order_id = route.query.id;
const itemsUpdates = await updateCartDetails(order_id);
const items = ref([]);
let token = useCookie("token").value;
let offers = ref([]);
let spareParts = ref([]);
let notRegister = ref(false);

if (!order_id) {
  notRegister.value = true;
} else {
  items.value = itemsUpdates?.data?.services || [];
  offers.value = itemsUpdates?.data?.offers || [];
  spareParts.value = itemsUpdates?.data?.spare_parts || [];
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

let msg = ref("");
let voucherCode = ref(null);
let hasVoucher = ref(false);
let voucherApply = async () => {
  try {
    let resVoucher = await useApi().applyVoucherToCart(
      order_id,
      voucherCode.value
    );

    if (resVoucher?.status === false) {
      msg.value = resVoucher?.message;
    } else {
      msg.value = resVoucher?.message;
      itemsUpdates.value = resVoucher;
      hasVoucher.value = true;
    }
  } catch (error) {
    console.error("Error applying voucher code:", error);
  }
};
let voucherDeleted = async () => {
  try {
    let res = await useApi().deleteVoucherFromCart(order_id);
    itemsUpdates.value = res;
    msg.value = res?.message || "Voucher deleted successfully";
    hasVoucher.value = false;
    voucherCode.value = "";
  } catch (error) {
    console.error("Error deleting voucher code:", error);
  }
};

let useWalletActive = ref(null);

onMounted(() => {
  if (itemsUpdates?.data?.use_wallet !== undefined) {
    useWalletActive.value = itemsUpdates?.data?.use_wallet;
  }
  if (itemsUpdates?.data?.user_balance !== undefined) {
    balance.value = itemsUpdates?.data?.user_balance;
  }
  if (itemsUpdates?.data?.amount_to_pay !== undefined) {
    amountToPay.value = itemsUpdates?.data?.amount_to_pay;
  }
});

let balance = ref(null);
let amountToPay = ref(null);

let toggleUseWallet = async () => {
  try {
    let resWallet = await useApi().toggleUseWallet(order_id, "cart_type");

    if (resWallet?.status === true) {
      useWalletActive.value = resWallet?.data?.use_wallet;
      balance.value = resWallet?.data?.user_balance;
      amountToPay.value = resWallet?.data?.amount_to_pay;

      if (Number(resWallet?.data?.amount_to_pay) === 0) {
        let resChange = await useApi().changeCartToOrder(order_id);
        console.log("changeCartToOrder response:", resChange);
      }
    } else {
      useWalletActive.value = resWallet?.data?.use_wallet;
    }
  } catch (error) {
    console.log("Error happened:", error);
    console.log("Error response:", error?.response);
  }
};


let msgDoneUseWallet = ref(false);
let router = useRouter();
function toContinue() {
  if (amountToPay.value > 0) {
    router.push({
      path: `/payment`,
      query: {
        id: order_id,
      },
    });
  } else {
    msgDoneUseWallet.value = true;
  }
}
</script>

<style scoped>
@import "@/assets/css/cartorder.css";
.updated-details {
  color: var(--color-black);
  padding: 10px;
  border-radius: 20px;
  font-family: var(--font-family);
  font-weight: bold;
  background-color: var(--main-color);
}
.error {
  color: red;
  font-family: var(--font-family);
  font-size: 15px;
}
.border {
  border: 2px solid green;
}

.sar {
  color: black;
  font-size: 12px;
  font-weight: 600;
}
.msg-done-use-wallet {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 200px;
  padding-top: 40px;
  text-align: center;
  background-color: white;
  z-index: 20;
  border-radius: 14px;
}
.text-success {
  font-size: 20px;
}
.cursor-pointer {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
