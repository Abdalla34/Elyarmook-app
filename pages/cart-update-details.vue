<template>
  <div class="cart-parent mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <!-- if not register -->
        <NotRegister
          :IsNotRegitser="notRegister"
          :message="$t('cart is Empty you must create account')"
        />
        <!-- if cart empty -->
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
            <h3 class="text-capitalize create">
              {{ $t("your cart is empty") }}
            </h3>
            <div class="btn-items">
              <button @click="navigateTo('/services')">
                <PuplicIconPlusIcon />
                {{ $t("Add Items") }}
              </button>
            </div>
          </div>
        </div>

        <!-- left section -->
        <div
          data-aos="fade-up"
          class="col-12 col-md-12 col-lg-6 col-md-6 section-scroll"
          v-if="
            (token && items.length > 0) ||
            offers.length > 0 ||
            spareParts.length > 0
          "
        >
          <h4 class="mb-4 fw-bold">{{ $t("Order Details") }}</h4>
          <!-- services items -->
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
                  <span class="p-color-fs span text-uppercasr">{{
                    $t("sar")
                  }}</span>
                </p>
              </div>
            </div>
            <div class="delete-icon" @click="deletedOrder(order.id, 'service')">
              <Trash />
              <span v-if="loadingDelete[order.id]">{{ $t("loading...") }}</span>
            </div>
          </div>
          <!-- offers items -->
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
                  <span class="p-color-fs span text-uppercasr">{{
                    $t("sar")
                  }}</span>
                </p>
                <div class="qty-controls d-flex align-items-center mt-2">
                  <button
                    class="qty-btn"
                    :disabled="loadingQty[order.id] || order.qty <= 1"
                    @click="
                      updateQty(
                        'offer',
                        order_id,
                        order,
                        order.qty - 1,
                        'minus'
                      )
                    "
                  >
                    -
                  </button>
                  <span class="mx-2">{{ order.qty }}</span>
                  <button
                    class="qty-btn"
                    :disabled="loadingQty[order.id]"
                    @click="
                      updateQty('offer', order_id, order, order.qty + 1, 'plus')
                    "
                  >
                    +
                  </button>
                  <span v-if="loadingQty[order.id]" class="ms-2">{{
                    $t("loading...")
                  }}</span>
                  <div
                    v-if="msgErrorQty[order.id]"
                    class="text-danger label mt-2"
                  >
                    {{ msgErrorQty[order.id] }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="delete-icon"
              @click="deletedOrder(order.offer_id, 'offer')"
            >
              <Trash />
              <span v-if="loadingDelete[order.offer_id]"
                >{{ $t("loading...") }}.</span
              >
            </div>
          </div>
          <!-- spare parts items -->
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
                  <span class="p-color-fs span text-uppercase">{{
                    $t("sar")
                  }}</span>
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
                        sparepart.qty - 1,
                        'minus'
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
                        sparepart.qty + 1,
                        'plus'
                      )
                    "
                  >
                    +
                  </button>
                  <span v-if="loadingQty[sparepart.id]" class="ms-2">{{
                    $t("loading...")
                  }}</span>
                </div>
              </div>
            </div>
            <div
              class="delete-icon"
              @click="deletedOrder(sparepart.id, 'spare_part')"
            >
              <trash />
              <span v-if="loadingDelete[sparepart.id]">{{
                $t("loading...")
              }}</span>
            </div>
          </div>
        </div>

        <!-- right section -->
        <div
          data-aos="fade-up"
          class="col-12 col-md-12 col-lg-4 col-test"
          v-if="
            (token && items.length > 0) ||
            offers.length > 0 ||
            spareParts.length > 0
          "
        >
          <div class="h-100">
            <transition name="slide-right">
              <div
                v-if="useWalletAlert"
                class="success-msg-box d-flex align-items-center justify-content-between gap-5"
              >
                <i
                  class="fa-solid fa-xmark close-icon"
                  @click="useWalletAlert = false"
                ></i>
                <p class="text-success m-0 fs">
                  {{ $t("Order details have been successfully updated") }}
                </p>
              </div>
            </transition>
            <!-- price details -->
            <div class="branches-details">
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

            <div class="cost-details">
              <h6 class="fw-bold text-capitalize">{{ $t("cost Details") }}</h6>
              <!-- details -->
              <div class="box-design">
                <div
                  class="total-order d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">{{ $t("sub total") }}</h4>
                  <p class="text-capitalize">
                    {{ itemsUpdates?.data?.sub_total }}
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
                    {{ itemsUpdates?.data?.vat_amount }}
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
                    {{ amountToPay }}
                    <span class="p-color-fs span text-uppercase">{{
                      $t("sar")
                    }}</span>
                  </p>
                </div>
              </div>
              <!-- warranty -->
              <div class="warranty" v-if="itemsUpdates?.data?.pro_warranty">
                <!-- <LoadingOtp :isLoadingOtp="isloading" /> -->
                <div
                  class="input-warranty d-flex align-items-center justify-content-between"
                >
                  <div class="input-checked">
                    <div class="form-check form-switch m-0">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        v-model="itemsUpdates.data.pro_warranty.is_pro_warranty"
                        @change="toogleWarranty"
                        style="cursor: pointer"
                      />
                    </div>
                  </div>
                  <div class="title-warranty">
                    <h1 class="label">
                      {{ itemsUpdates.data.pro_warranty.title }}
                    </h1>
                  </div>
                </div>

                <p class="p-color-fs mt-2">
                  {{ itemsUpdates.data.pro_warranty.message_when_warranty_pro }}
                </p>

                <p
                  class="p-color-fs mt-2"
                  v-if="itemsUpdates.data.pro_warranty.is_pro_warranty"
                >
                  {{ itemsUpdates.data.pro_warranty.description }}
                </p>

                <p
                  class="mt-3"
                  :class="{
                    'not-warranty':
                      !itemsUpdates.data.pro_warranty.is_pro_warranty,
                    'success-warranty':
                      itemsUpdates.data.pro_warranty.is_pro_warranty,
                  }"
                >
                  {{
                    itemsUpdates.data.pro_warranty.message_when_default_warranty
                  }}
                  <span v-if="itemsUpdates.data.pro_warranty.is_pro_warranty">
                    <i class="fa-solid fa-check"></i>
                  </span>
                </p>
              </div>

              <!-- promo code -->
              <div class="promo mt-3">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="input form-control p-2"
                    placeholder="Promo code"
                    v-model="voucherCode"
                  />
                  <button
                    v-if="hasVoucher"
                    class="apply-btn"
                    @click="voucherDeleted"
                  >
                    <span
                      v-if="!loadVoucherBtnDel"
                      class="text-capitalize me-2 spanbutton"
                      >{{ $t("delete") }}</span
                    >
                    <span
                      v-else
                      class="spinner-border spinner-border-sm text-danger"
                      style="margin: 0px 8px 0px"
                    ></span>
                    <iconsOrder-applyCode />
                  </button>

                  <button
                    v-else
                    class="apply-btn"
                    @click="voucherApply"
                    :disabled="!voucherCode"
                  >
                    <span
                      v-if="!loadVoucherBtnApply"
                      class="text-capitalize me-2 spanbutton"
                      >{{ $t("apply") }}</span
                    >
                    <span
                      v-else
                      class="spinner-border spinner-border-sm text-success"
                      style="margin: 0px 8px 0px"
                    ></span>
                    <iconsOrder-applyCode />
                  </button>
                </div>
                <p
                  v-if="msg"
                  :class="voucherMessageClass"
                  style="font-size: 14px"
                >
                  {{ msg }}
                </p>
              </div>

              <!-- amount to pay  -->
              <div
                class="total-amount d-flex align-items-center justify-content-between"
              >
                <h1 class="amount text-capitalize">{{ $t("total amount") }}</h1>
                <p>
                  {{ amountToPay }}
                  <span class="p-color-fs span text-uppercase">{{
                    $t("sar")
                  }}</span>
                </p>
              </div>

              <!-- use wallet  -->
              <div
                v-if="itemsUpdates?.data?.user_balance > 0"
                class="wallet-box mt-3 d-flex align-items-center justify-content-between bg-light p-3 rounded-3 shadow-sm"
              >
                <label
                  for="usewallet"
                  class="form-label mb-0 fw-semibold text-capitalize"
                  >{{ $t("Use Wallet balance") }}
                  <p class="p-color-fs">
                    {{ $t("you have") }} {{ balance }}
                    <span class="sar text-uppercase">{{ $t("sar") }}</span>
                    {{ $t("in wallet") }}
                  </p></label
                >

                <div class="form-check form-switch m-0">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="usewallet"
                    v-model="useWalletActive"
                  />
                </div>
              </div>

              <div class="buttion-confirm" @click="toContinue()">
                <ButtonCard
                  v-if="!btnLoadUseWallet"
                  :textButton="$t('continue')"
                />
                <button
                  style="background-color: var(--main-color)"
                  class="btn border-radius-36px w-100 mb-2"
                  v-else
                >
                  <span
                    class="spinner-border spinner-border-sm text-success"
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- message done use wallet -->
      <div v-if="msgDoneUseWallet" class="wallet-success-overlay">
        <div class="wallet-success-box">
          <i
            class="fa-solid fa-xmark close-btn"
            @click="msgDoneUseWallet = false"
          ></i>

          <img
            class="image-media"
            src="/donePayment.png"
            alt="تم الدفع بنجاح"
          />
          <p class="text-success title-success">
            {{ $t("order successfully!") }}
          </p>

          <div class="box-design mt-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h4 class="label">{{ $t("sub total") }}</h4>
              <p>
                {{ detailsBackUsedWallet.sub_total }}
                <span>{{ $t("sar") }}</span>
              </p>
            </div>

            <div class="d-flex justify-content-between align-items-center mb-2">
              <h4 class="label">{{ $t("vat") }}</h4>
              <p>
                {{ detailsBackUsedWallet.vat_amount }}
                <span>{{ $t("sar") }}</span>
              </p>
            </div>

            <div class="d-flex justify-content-between align-items-center mb-2">
              <h4 class="label">{{ $t("pay from wallet") }}</h4>
              <p>
                -{{ detailsBackUsedWallet.sub_total }}
                <span>{{ $t("sar") }}</span>
              </p>
            </div>

            <div
              class="d-flex justify-content-between align-items-center final"
            >
              <h4 class="label">{{ $t("Final Amount") }}</h4>
              <p>
                {{ detailsBackUsedWallet.total_amount }}
                <span>{{ $t("sar") }}</span>
              </p>
            </div>
          </div>

          <button-card
            class="width-btn w-75 m-auto mt-4"
            @click="
              navigateTo(
                $localePath(
                  `/orderdetails/${order_id}?from=cart-update-details`
                )
              )
            "
            :text-button="$t('view my orders')"
          ></button-card>
        </div>
      </div>

      <!-- over lay msg -->
      <div v-if="msgDoneUseWallet" class="over-lay"></div>
      <!-- load request -->
      <LoadingSpinner :isLoadingOtp="isloading" />
    </div>
  </div>
</template>

<script setup>
let dayjs = useDayjs();
const {
  getSingleOrder,
  deleteItemFromCart,
  updateCartItemQuantity,
  applyVoucherToCart,
  deleteVoucherFromCart,
  toggleUseWallet,
  changeCartToOrder,
  ToggleWarranty,
} = useApi();

const loadVoucherBtnDel = ref(false);
const loadVoucherBtnApply = ref(false);

const loadingDelete = ref({});
const loadingQty = ref({});
let route = useRoute();
let order_id = route.query.id;
const itemsUpdates = await getSingleOrder(order_id);
const items = ref([]);
let token = useCookie("token").value;
let offers = ref([]);
let spareParts = ref([]);
let notRegister = ref(false);
const cartCount = useState("cartCount", () => 0);

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
    cartCount.value = cartCount.value - 1;
  } catch (err) {
    console.log("test");
  }
}

const msgErrorQty = ref({});
async function updateQty(type, order_id, cart_item_id, qty, action) {
  loadingQty.value[cart_item_id.id] = true;
  try {
    let res = await updateCartItemQuantity(
      type,
      order_id,
      cart_item_id.id,
      qty
    );

    if (res?.status === true) {
      cart_item_id.qty = qty;
      msgErrorQty.value[cart_item_id.id] = "";
      if (action === "plus") {
        cartCount.value = cartCount.value + 1;
      } else {
        cartCount.value = cartCount.value - 1;
      }
    } else {
      if (res?.errors?.qty?.length) {
        msgErrorQty.value[cart_item_id.id] = res.errors.qty[0];
      } else {
        msgErrorQty.value[cart_item_id.id] = res?.message;
      }
    }
  } catch (err) {
    if (err?.data?.errors?.qty?.length) {
      msgErrorQty.value[cart_item_id.id] = err.data.errors.qty[0];
    } else {
      msgErrorQty.value[cart_item_id.id] = err?.data?.message || err.message;
    }
  } finally {
    loadingQty.value[cart_item_id.id] = false;
  }
}

let msg = ref("");
let voucherCode = ref(null);
let hasVoucher = ref(false);

let voucherApply = async () => {
  try {
    loadVoucherBtnApply.value = true;
    let resVoucher = await applyVoucherToCart(order_id, voucherCode.value);

    if (!resVoucher?.status || !resVoucher?.data) {
      msg.value = resVoucher?.message || "حدث خطأ أثناء تطبيق الكوبون";
      hasVoucher.value = false;
    } else {
      const voucher = resVoucher.data.voucher;
      if (voucher && voucher.is_valid) {
        msg.value = voucher.message;
        hasVoucher.value = true;
      } else {
        msg.value = resVoucher.data.message || "الكوبون غير صالح";
        hasVoucher.value = false;
      }
      itemsUpdates.value = resVoucher.data;
    }
  } catch (error) {
    console.error("Error applying voucher code:", error);
    msg.value = "حدث خطأ أثناء تطبيق الكوبون";
  } finally {
    loadVoucherBtnApply.value = false;
  }
};

let voucherDeleted = async () => {
  try {
    loadVoucherBtnDel.value = true;
    let res = await deleteVoucherFromCart(order_id);

    itemsUpdates.value = res.data || {};
    hasVoucher.value = false;
    voucherCode.value = "";
    msg.value =
      res.data?.voucher?.message || res.message || "تم حذف الكوبون بنجاح";
  } catch (error) {
    console.error("Error deleting voucher code:", error);
    msg.value = "حدث خطأ أثناء حذف الكوبون";
  } finally {
    loadVoucherBtnDel.value = false;
  }
};
const voucherMessageClass = computed(() => {
  if (!msg.value) return "";
  if (hasVoucher.value && itemsUpdates.value?.voucher?.is_valid) {
    return "text-success";
  } else {
    return "text-danger";
  }
});

let useWalletActive = ref(null);
const useWalletAlert = ref(true);

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
  setTimeout(() => {
    useWalletAlert.value = false;
  }, 2500);
});

let balance = ref(null);
let amountToPay = ref(null);
let msgDoneUseWallet = ref(false);
const btnLoadUseWallet = ref(false);
const detailsBackUsedWallet = ref(null);
let toggleUseWalletFn = async () => {
  try {
    btnLoadUseWallet.value = true;
    let resWallet = await toggleUseWallet(order_id, "cart_type");

    if (resWallet?.status === true) {
      useWalletActive.value = resWallet?.data?.use_wallet;
      balance.value = resWallet?.data?.user_balance;
      amountToPay.value = resWallet?.data?.amount_to_pay;
      cartCount.value = 0;
      localStorage.removeItem("yarmook-cart");
      detailsBackUsedWallet.value = resWallet?.data;

      if (Number(resWallet?.data?.amount_to_pay) === 0) {
        let resChange = await changeCartToOrder(order_id);
      }
    } else {
      useWalletActive.value = resWallet?.data?.use_wallet;
    }
  } catch (error) {
    console.log("Error happened:");
    console.log("Error response:");
  } finally {
    btnLoadUseWallet.value = false;
  }
};
const localePath = useLocalePath();
const isloading = ref(false);

const toogleWarranty = async () => {
  isloading.value = true;
  try {
    const responseWarranty = await ToggleWarranty(order_id, "cart_type");

    if (responseWarranty?.pro_warranty) {
      itemsUpdates = {
        ...itemsUpdates,
        data: {
          ...itemsUpdates.data,
          pro_warranty: { ...responseWarranty.pro_warranty },
        },
      };
    }
  } catch (err) {
    console.log("Error fetching");
  } finally {
    isloading.value = false;
  }
};

let router = useRouter();
async function toContinue() {
  if (useWalletActive.value) {
    await toggleUseWalletFn();
    if (Number(amountToPay.value) === 0) {
      msgDoneUseWallet.value = true;
      setTimeout(() => {
        router.push(localePath("/"));
      }, 4000);
      return;
    }
  }
  router.push({
    path: localePath(`/payment`),
    query: {
      id: order_id,
    },
  });
}
</script>

<style scoped>
@import "@/assets/css/cartorder.css";
.section-scroll {
  max-height: 70vh;
  overflow-y: auto;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  scroll-behavior: smooth;
}
.image-media {
  width: 300px;
}
.success-msg-box {
  background-color: #e6ffed;
  color: #0f5132;
  border: 1px solid #a3cfbb;
  padding: 12px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  z-index: 100;
  min-width: 250px;
}
.success-msg-box p {
  font-size: 16px;
}

.success-msg-box .close-icon {
  cursor: pointer;
  color: #0f5132;
  font-size: 18px;
  margin-left: 10px;
}

/* Animation */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(120%);
  opacity: 0;
}

@media (max-width: 768px) {
  .image-media {
    width: 200px;
  }
  /* .success-msg-box{
    position: relative;
    top: 10%;
  } */
  .success-msg-box p {
    font-size: 14px;
  }
}

.wallet-success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(3px);
}

.wallet-success-box {
  background: #fff;
  border-radius: 20px;
  padding: 30px 25px;
  width: 90%;
  max-width: 480px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
  position: relative;
  animation: popupShow 0.3s ease;
}

.wallet-success-box .close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 20px;
  color: #444;
  cursor: pointer;
}

.title-success {
  font-size: 20px;
  font-weight: 600;
  margin-top: 5px;
  color: #16a34a;
}

.image-media {
  width: 120px;
  margin: 20px auto;
  display: block;
}

.box-design {
  background: #f8f8f8;
  border-radius: 15px;
  padding: 15px 20px;
  text-align: left;
}

.box-design .label {
  font-weight: 500;
  font-size: 15px;
  color: #333;
}

.box-design p {
  font-weight: 600;
  font-size: 15px;
  color: #111;
  margin: 0;
}

.box-design span {
  font-size: 13px;
  color: #777;
}

.final {
  border-top: 1px solid #ddd;
  padding-top: 10px;
  margin-top: 8px;
}

.width-btn {
  display: block;
  text-align: center;
}

@keyframes popupShow {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.form-control:focus {
  outline: none;
  border: none;
}
.form-check-input:checked {
  background-color: var(--main-color);
  border-color: var(--main-color);

}
</style>
