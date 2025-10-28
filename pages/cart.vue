<template>
  <div class="cart-parent mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <NotRegister
          :IsNotRegitser="notRegister"
          :message="$t('cart is Empty you must create account')"
        />

           <div
          class="empty-cart text-center"
          v-if="
            token &&
            services.length === 0 &&
            offers.length === 0 &&
            spareParts.length === 0 &&
            cartRes?.id
          "
        >
          <div>
            <img src="/Vector.png" alt="" />
            <h3 class="text-capitalize create">
              {{ $t("your cart is empty") }}
            </h3>
            <div class="btn-items">
              <button @click="navigateTo(localePath('/services'))">
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
                {{ $t("Add Items") }}
              </button>
            </div>
          </div>
        </div>

        <!-- left section -->
        <div
          class="col-12 col-md-12 col-lg-6 col-md-6"
          v-if="token && cartRes?.id"
        >
          <h4 class="mb-4 fw-bold">{{ $t("Order Details") }}</h4>

          <div
            class="cart d-flex justify-content-between align-items-center border-radius-36px mb-3"
            v-for="service in services"
            :key="service.id"
          >
            <div class="details-cart d-flex align-items-center gap-3">
              <div class="img">
                <img :src="service.image" :alt="service.title" />
              </div>
              <div class="name-cart">
                <h4 class="item-name item-left">{{ service.title }}</h4>
                <p class="price">
                  {{ service.price }}
                  <span class="p-color-fs span text-uppercase">{{
                    $t("sar")
                  }}</span>
                </p>
                <div class="qty-controls d-flex align-items-center mt-2">
                  <button
                    class="qty-btn"
                    :disabled="loadingQty[service.id] || service.qty <= 1"
                    @click="
                      updateQty(
                        'service',
                        order_id,
                        service,
                        service.qty - 1,
                        'minus'
                      )
                    "
                  >
                    -
                  </button>
                  <span class="mx-2">{{ service.qty }}</span>
                  <button
                    @click="
                      updateQty(
                        'service',
                        order_id,
                        service,
                        service.qty + 1,
                        'plus'
                      )
                    "
                    class="qty-btn"
                    :disabled="loadingQty[service.id]"
                  >
                    +
                  </button>
                  <span v-if="loadingQty[service.id]" class="ms-2">{{
                    $t("Loading...")
                  }}</span>
                  <div v-if="msg[service.id]" class="text-danger label mt-2">
                    {{ msg[service.id] }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="delete-icon"
              @click="deletedOrder(service.id, 'service', service.qty)"
            >
              <trash />
            </div>
          </div>

          <div
            class="cart d-flex justify-content-between align-items-center border-radius-36px mb-3"
            v-for="offer in offers"
            :key="offer.offer_id"
          >
            <div class="details-cart d-flex align-items-center gap-3">
              <div class="img">
                <img :src="offer.image" :alt="offer.title" />
              </div>
              <div class="name-cart">
                <h4 class="item-name item-left">{{ offer.title }}</h4>
                <p class="price">
                  {{ offer.price }}
                  <span class="p-color-fs span text-uppercase">{{
                    $t("sar")
                  }}</span>
                </p>
                <div class="qty-controls d-flex align-items-center mt-2">
                  <button
                    class="qty-btn"
                    :disabled="loadingQty[offer.id] || offer.qty <= 1"
                    @click="
                      updateQty(
                        'offer',
                        order_id,
                        offer,
                        offer.qty - 1,
                        'minus'
                      )
                    "
                  >
                    -
                  </button>

                  <span class="mx-2">{{ offer.qty }}</span>
                  <button
                    class="qty-btn"
                    :disabled="loadingQty[offer.id]"
                    @click="
                      updateQty('offer', order_id, offer, offer.qty + 1, 'plus')
                    "
                  >
                    +
                  </button>
                  <span v-if="loadingQty[offer.id]" class="ms-2">{{
                    $t("Loading...")
                  }}</span>
                </div>
              </div>
            </div>
            <div
              class="delete-icon"
              @click="deletedOrder(offer.offer_id, 'offer', offer.qty)"
            >
              <trash />
              <span v-if="loadingDelete[offer.offer_id]">
                {{ $t("Loading...") }}</span
              >
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
                    $t("Loading...")
                  }}</span>
                </div>
              </div>
            </div>
            <div
              class="delete-icon"
              @click="deletedOrder(sparepart.id, 'spare_part', sparepart.qty)"
            >
              <trash />
              <span v-if="loadingDelete[sparepart.id]">{{
                $t("Loading...")
              }}</span>
            </div>
          </div>
        </div>
        <!-- load component -->

        <!-- right section -->
        <div
          class="col-12 col-md-12 col-lg-4 col-test"
          v-if="token && cartRes?.id"
        >
          <div class="h-100">
            <div class=""></div>
            <!-- price details -->
            <div class="">
              <h6 class="fw-bold">{{ $t("Cost Details") }}</h6>
              <div class="box-design">
                <div
                  class="total-order d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">{{ $t("sub total") }}</h4>
                  <p class="text-capitalize">{{ cartRes?.sub_total }}</p>
                </div>

                <div
                  class="vat d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">{{ $t("vat") }}</h4>
                  <p class="text-capitalize">{{ cartRes?.vat_amount }}</p>
                </div>

                <div
                  class="final-amount d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">{{ $t("Final Amount") }}</h4>
                  <p class="text-capitalize">
                    {{ cartRes?.amount_to_pay }}
                    <span class="p-color-fs span text-uppercase">{{
                      $t("sar")
                    }}</span>
                  </p>
                </div>
              </div>

              <div
                class="total-amount d-flex align-items-center justify-content-between"
              >
                <h1 class="amount text-capitalize">{{ $t("total amount") }}</h1>
                <p>{{ cartRes?.total_amount }}</p>
              </div>

              <div class="buttion-confirm" @click="toContinue">
                <ButtonCard :textButton="$t('continue')" />
              </div>
              <div class="buttion-confirm">
                <button
                  v-if="
                    services.length >= 1 ||
                    offers.length >= 1 ||
                    spareParts.length >= 1
                  "
                  @click="navigateTo('/services')"
                  class="additems text-capitalize label"
                >
                  <i class="fa-solid fa-plus"></i>
                  {{ $t("add another items") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingSpinner :is-loading-otp="isLoadingOtp" />
    </div>
  </div>
</template>

<script setup>
import dayjs from "#build/dayjs.imports.mjs";

const { deleteItemFromCart, updateCartItemQuantity,getMyCart } = useApi();
const services = ref([]);
const loadingDelete = ref({});
const loadingQty = ref({});
const cartRes = ref(null);
const order_id = ref(null);
let notRegister = ref(false);
let token = useCookie("token").value;
let offers = ref([]);
let spareParts = ref([]);
const cartCount = useState("cartCount", () => 0);

try {
  if (!token) {
    notRegister.value = true;
  }
  let res = await getMyCart();
  cartRes.value = res?.data;
  services.value = cartRes.value?.services || [];
  offers.value = cartRes.value?.offers || [];
  spareParts.value = cartRes.value?.spare_parts || [];
  order_id.value = res?.data?.id;
} catch (err) {
  if (err?.response.status === 401) {
    console.log(err);
  }
}

async function deletedOrder(id, type, quantity) {
  if (type === "service") {
    services.value = services.value.filter((o) => o.id !== id);
    loadingDelete.value[id] = true;
  } else if (type === "offer") {
    loadingDelete.value[id] = true;
    offers.value = offers.value.filter((o) => o.offer_id !== id);
  } else if (type === "spare_part") {
    loadingDelete.value[id] = true;
    spareParts.value = spareParts.value.filter((o) => o.id !== id);
  } else {
    return;
  }

  try {
    await deleteItemFromCart(type, order_id.value, id);
    cartCount.value = cartCount.value - quantity;
  } catch (err) {
    console.log("test", err);
  }
}

let msg = ref({});
async function updateQty(type, orderId, cart_item_id, newQty, action) {
  loadingQty.value[cart_item_id.id] = true;
  msg.value[cart_item_id.id] = "";

  try {
    let res = await updateCartItemQuantity(
      type,
      orderId,
      cart_item_id.id,
      newQty
    );

    if (res?.status === true) {
      cart_item_id.qty = newQty;
      if (action === "minus") {
        cartCount.value = cartCount.value - 1;
      } else if (action === "plus") {
        cartCount.value = cartCount.value + 1;
      }
    } else {
      if (res?.errors?.qty?.length) {
        msg.value[cart_item_id.id] = res.errors.qty[0];
      } else {
        msg.value[cart_item_id.id] = res?.message;
      }
    }
  } catch (err) {
    if (err?.data?.errors?.qty?.length) {
      msg.value[cart_item_id.id] = err.data.errors.qty[0];
    } else {
      msg.value[cart_item_id.id] = err?.data?.message;
    }
  } finally {
    loadingQty.value[cart_item_id.id] = false;
  }
}

let isLoadingOtp = ref(false);
const router = useRouter();
const localePath = useLocalePath();

function toContinue() {
  isLoadingOtp.value = true;
  router.push({
    path: localePath("/order-update-details"),
    query: {
      id: order_id.value,
    },
  });
}
</script>

<style scoped>
@import "@/assets/css/cartorder.css";
</style>
