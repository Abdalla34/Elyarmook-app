<template>
  <div class="my-orders position-relative">
    <div class="container position-relative">
      <div v-if="loading">
        <Skeletons-MyOrdersSkeleton />
      </div>
      <!-- status 2:   usere not register -->
      <div v-else-if="msgError">
        <NotRegister
          :IsNotRegitser="true"
          :message="$t('your orders is Empty you must create account')"
        />
      </div>
      <!-- if empty orders -->
      <div
        v-else-if="token && orders.length === 0"
        class="empty-cart d-flex justify-content-center align-items-center text-center min-vh-100"
      >
        <div>
          <img src="/Vector.png" alt="" />
          <h3 class="text-capitalize create">
            {{ $t("your orders is empty") }}
          </h3>
          <div class="btn-items mt-3">
            <button
              @click="navigateTo(localePath('/services'))"
              class="d-flex align-items-center gap-2 mx-auto btn rounded ps-3 pe-3"
            >
              <PuplicIconPlusIcon />
              <span>{{ $t("Add Items") }}</span>
            </button>
          </div>
        </div>
      </div>
      <!-- ordres -->
      <div v-else class="row justify-content-center">
        <div class="col-lg-7 col-md-10 col-sm-12">
          <div
            class="box-orders border-radius-36px d-flex align-items-center justify-content-between position-relative mb-3"
            v-for="order in orders"
            :key="order.id"
            @click="toOrderStatus(order)"
          >
            <div class="details-title d-flex align-items-center gap-3">
              <div>
                <!-- <img src="/newLogo.png" alt="imageOrder" /> -->
              </div>
              <div class="name price">
                <h4 class="text-capitalize">
                  {{ order.type_for_customer }}
                </h4>
                <p class="price">
                  {{ order.total_amount }}
                  <span class="SAR text-capitalize">{{ $t("sar") }}</span>
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

            <OrderStatus :order="order" :statusorder="statusorder" />
          </div>
        </div>
      </div>
      <!-- pagination -->
      <div v-if="token" class="d-flex justify-content-center gap-3 mt-4">
        <button @click="handlePrev" class="btn" :disabled="currentpage <= 1">
          {{ $t("Prev") }}
        </button>

        <span class="align-self-center"
          >{{ $t("Page") }} {{ currentpage }}</span
        >

        <button
          @click="handleNext"
          class="btn"
          :disabled="currentpage >= (pagination?.total_pages || 1)"
        >
          {{ $t("Next") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import customParseFormat from "dayjs/plugin/customParseFormat";
const dayjs = useDayjs();
dayjs.extend(customParseFormat);

const { getStatusorders, getMyOrders } = useApi();
const localePath = useLocalePath();
const token = useCookie("token");

const msgError = ref(false);
const loading = ref(true);
const orders = ref([]);
const pagination = ref({});
const currentpage = ref(1);
const statusorder = ref(null);

//  time cach
const cacheDuration = 12 * 60 * 60 * 1000;

//   get data status
const responseStatus = await getStatusorders();
statusorder.value = responseStatus?.data;

// to order details
function toOrderStatus(orderId) {
  navigateTo(localePath(`/orderdetails/${orderId.id}`));
}

// --- get data ---
async function getOrders(page = 1) {
  const cacheKey = `orders_page_${page}`;
  const cachedData = localStorage.getItem(cacheKey);
  const currentTime = Date.now();

  // if cach data not ended
  if (cachedData) {
    const parsed = JSON.parse(cachedData);
    if (
      currentTime - parsed.timestamp < cacheDuration &&
      parsed.orders?.length
    ) {
      orders.value = parsed.orders;
      pagination.value = parsed.pagination;
      loading.value = false;
      msgError.value = false;
    }
  }

  // new request
  try {
    // loading.value = true;
    const res = await getMyOrders(page);

    if (res?.status === false && res?.message === "Unauthenticated") {
      msgError.value = true;
      orders.value = [];
    } else if (token.value) {
      orders.value = res?.data?.items ?? [];
      pagination.value = res?.data?.paginate ?? {};
      msgError.value = false;

      // ✅ نخزن البيانات في الكاش
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          timestamp: currentTime,
          orders: orders.value,
          pagination: pagination.value,
        })
      );
    }
  } catch (err) {
    console.error("Error fetching orders:", err);
    msgError.value = true;
  } finally {
    loading.value = false;
  }
}

// --- control pages---
async function handleNext() {
  if (currentpage.value < (pagination.value?.total_pages || 1)) {
    currentpage.value++;
    await getOrders(currentpage.value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

async function handlePrev() {
  if (currentpage.value > 1) {
    currentpage.value--;
    await getOrders(currentpage.value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

onMounted(() => {
  getOrders(currentpage.value);
});
</script>

<!-- <script setup>
import customParseFormat from "dayjs/plugin/customParseFormat";
const dayjs = useDayjs();
dayjs.extend(customParseFormat);
const { getStatusorders, getMyOrders } = useApi();
let msgError = ref(false);
let loading = ref(true);
let token = useCookie("token");
const orders = ref([]);
const pagination = ref({});
const localePath = useLocalePath();

let statusorder = ref(null);
let responseStatus = await getStatusorders();
statusorder.value = responseStatus?.data;

// الانتقال لتفاصيل الطلب
async function toOrderStatus(orderId) {
  navigateTo(localePath(`/orderdetails/${orderId.id}`));
}

// جلب الطلبات
const getOrders = async (page = 1) => {
  try {
    const res = await getMyOrders(page);
    // لو المستخدم غير مسجل
    if (res?.status === false && res?.message === "Unauthenticated") {
      msgError.value = true;
      orders.value = [];
    }
    // لو المستخدم عنده توكن وبيانات صحيحة
    else if (token.value) {
      loading.value = false;
      orders.value = res?.data?.items ?? [];
      pagination.value = res?.data?.paginate ?? {};
      msgError.value = false;
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
};

// التحكم في الصفحات
const currentpage = ref(1);
const handleNext = async () => {
  if (currentpage.value >= (pagination.value?.total_pages || 1)) return;
  currentpage.value++;
  await getOrders(currentpage.value);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handlePrev = async () => {
  if (currentpage.value > 1) {
    currentpage.value--;
    await getOrders(currentpage.value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

onMounted(() => {
  getOrders(currentpage.value);
});
// const dayjs = useDayjs();
// import customParseFormat from "dayjs/plugin/customParseFormat";
// dayjs.extend(customParseFormat);

// let msgError = ref(false);
// let loading = ref(true);

// let token = useCookie("token");
// const skeleton = ref(true);

// const orders = ref([]);
// const localePath = useLocalePath();

// async function toOrderStatus(orderId) {
//   navigateTo(localePath(`/orderdetails/${orderId.id}`));
// }
// let statusorder = ref(null);
// let responseStatus = await useApi().getStatusorders();
// statusorder.value = responseStatus?.data;

// const pagination = ref({});
// const getOrders = async (page = 1) => {
//   loading.value = true;
//   try {
//     const res = await useApi().getMyOrders(page);
//     if (res?.status === false && res?.message === "Unauthenticated") {
//       msgError.value = true;
//     } else if (token.value) {
//       orders.value = res?.data?.items ?? [];
//       skeleton.value = false;
//       pagination.value = res?.data?.paginate ?? {};
//     }
//   } catch (err) {
//     if (err?.response?.status === 401) {
//       msgError.value = true;
//     } else {
//       console.error("حدث خطأ غير متوقع:", err);
//     }
//   } finally {
//     loading.value = false;
//   }
// };

// const currentpage = ref(1);

// const handleNext = async () => {
//   if (currentpage.value >= (pagination.value?.total_pages || 1)) return;
//   currentpage.value++;
//   await getOrders(currentpage.value);
//   window.scrollTo({ top: 0, behavior: "smooth" });
// };

// const handlePrev = async () => {
//   if (currentpage.value > 1) {
//     currentpage.value--;
//     await getOrders(currentpage.value);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }
// };

// onMounted(() => {
//   getOrders(currentpage.value);
// });
</script> -->

<style scoped>
@import "@/assets/css/myorders.css";
.btn {
  background-color: var(--main-color);
  border: none;
}
</style>
