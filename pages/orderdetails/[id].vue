<template>
  <div
    v-if="cancelOrder || times || sureCancel"
    class="position-absolute over-lay"
  ></div>

  <!-- Cancel Confirmation Popup -->
  <div v-if="sureCancel" class="popup-overlay" @click.self="sureCancel = false">
    <div class="popup-box">
      <h4 class="label">{{ $t("cancel order") }}</h4>
      <div class="popup-content-scroll">
        <p class="p-color-fs mb-3">
          {{ $t("Are you sure you want to cancel this order?") }}
        </p>
        <div class="d-flex justify-content-center gap-2 mt-3">
          <button class="btn btn-danger" @click="cancelOrder = true">
            {{ $t("Yes, Cancel Order") }}
          </button>
          <button class="btn btn-secondary" @click="sureCancel = false">
            {{ $t("Close") }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Cancel Reason Popup -->
  <div v-if="cancelOrder" class="popup-overlay" @click.self="toFalse">
    <div class="popup-box">
      <h4 class="label">{{ $t("Mention reason") }}</h4>
      <div class="popup-content-scroll">
        <div
          class="popup-option"
          v-for="reason in getReasons"
          :key="reason.id"
          @click="changeStatusOrder('canceled', reason.id)"
        >
          {{ reason.title }}
        </div>
      </div>
      <div class="d-flex justify-content-center mt-3">
        <button class="btn btn-secondary" @click="toFalse">
          {{ $t("Close") }}
        </button>
      </div>
    </div>
  </div>

  <!-- order details -->
  <div class="order-steps">
    <div class="container position-relative">
      <d iv v-if="skeleton">
        <div class="row justify-content-center mt-3">
          <SkeletonsOrderIdDetails />
        </div>
      </d>
      <div v-else class="row justify-content-center mt-3">
        <div class="col-7 pb-4 mt-2 mb-4 background">
          <div v-if="orderSelected">
            <!-- order title -->
            <div
              class="order-img-name pt-5 d-flex align-items-center justify-content-between"
            >
              <div class="img-title d-flex align-items-center gap-4">
                <img
                  v-if="orderSelected?.car_type?.image"
                  :src="orderSelected.car_type.image"
                  alt=""
                />

                <div class="title">
                  <h1 class="h1 text-capitalize">{{ orderSelected.type }}</h1>
                  <p class="price">
                    {{ orderSelected.total_amount }}
                    <span class="span text-uppercase">{{ $t("sar") }}</span>
                  </p>
                </div>
              </div>
              <!-- status orders -->
              <OrderStatus :order="orderSelected" />
            </div>
            <!-- car modal -->
            <div
              class="model-car margin-60px d-flex flex-wrap justify-content-between align-items-center gap-3"
            >
              <div
                class="car-name d-flex align-items-center justify-content-center gap-4 box-car"
              >
                <div class="icons-car">
                  <PuplicIconCarIconOrder />
                </div>
                <div class="name" v-if="orderSelected.car_type">
                  <p class="text-capitalize parag">{{ $t("car model") }}</p>
                  <p class="name-order">{{ orderSelected.car_type.title }}</p>
                </div>
              </div>

              <div
                class="order-number d-flex align-items-center justify-content-center gap-4 box-car"
              >
                <div class="icons-car">
                  <PuplicIconHashtag />
                </div>
                <div class="number">
                  <p class="text-capitalize parag">
                    {{ $t("number order..") }}
                  </p>
                  <p class="name-order">{{ orderSelected.order_num }}</p>
                </div>
              </div>
            </div>
            <!-- reschedule time -->
            <div
              class="time-order margin-20px d-flex justify-content-between gap-3"
            >
              <div
                @click="rescheduleOrder(orderSelected?.branch.id)"
                class="time text-center box-order border-radius-36px border-radius-36px"
              >
                <div class="box-icon">
                  <PuplicIconTimeIcon />
                </div>
                <div class="days-time">
                  <h4>{{ orderSelected.reservation_time }}</h4>
                  <p class="color-Eb" v-if="orderSelected?.can_reschedule">
                    {{ $t("Reschedule Order") }}
                  </p>
                  <p class="fw-bold" :class="[messageClass, 'text-msg-change']">
                    {{ messageTimeChange }}
                  </p>
                </div>
              </div>

              <div
                @click="openInMaps(orderSelected?.branch)"
                class="order-location text-center box-order border-radius-36px border-radius-36px"
                v-if="orderSelected?.branch"
              >
                <div class="box-icon">
                  <PuplicIconLocation />
                </div>
                <div class="days-time">
                  <h4 v-if="orderSelected.branch?.title">
                    {{ orderSelected.branch.title }}
                  </h4>
                  <p class="color-Eb text-capitalize">
                    {{ $t("show in maps") }}
                  </p>
                </div>
              </div>
            </div>

            <div class="like text-center margin-30px">
              <div v-if="orderSelected?.status === 'canceled'">
                <PuplicIconCancelOrderIcon />
                <h1 class="title-step">{{ $t("Canceled") }}</h1>
                <p class="width-p">
                  {{ $t("Were sorry, but your order has been canceled.") }}
                </p>
              </div>

              <h1 class="title-step"></h1>
              <p class="width-p"></p>
            </div>
            <!-- steps -->
            <div class="steps">
              <ul
                class="d-flex justify-content-center align-items-center gap-4 flex-nowrap overflow-auto"
              >
                <li>
                  <div class="bg-icons bg-active text-center">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 3.74219H7C4 3.74219 2 5.24219 2 8.74219V15.7422C2 19.2422 4 20.7422 7 20.7422H10.57C11.16 20.7422 11.64 20.2222 11.56 19.6322C11.46 18.9222 11.48 18.1822 11.63 17.4222C12.16 14.8222 14.3 12.7522 16.92 12.3222C18.23 12.1122 19.48 12.2922 20.58 12.7722C21.25 13.0622 22 12.6022 22 11.8722V8.74219C22 5.24219 20 3.74219 17 3.74219ZM17.47 9.33219L14.34 11.8322C13.68 12.3622 12.84 12.6222 12 12.6222C11.16 12.6222 10.31 12.3622 9.66 11.8322L6.53 9.33219C6.21 9.07219 6.16 8.60219 6.41 8.27219C6.67 7.95219 7.14 7.89219 7.46 8.15219L10.59 10.6522C11.35 11.2622 12.64 11.2622 13.4 10.6522L16.53 8.15219C16.85 7.89219 17.33 7.94219 17.58 8.27219C17.84 8.60219 17.79 9.07219 17.47 9.33219Z"
                        fill="#FDD800"
                      />
                      <path
                        d="M18 13.7422C15.24 13.7422 13 15.9722 13 18.7422C13 21.5022 15.24 23.7422 18 23.7422C20.77 23.7422 23 21.5022 23 18.7422C23 15.9722 20.77 13.7422 18 13.7422ZM20.05 18.2922L19.68 18.6522L17.5 20.8422C17.4 20.9322 17.21 21.0322 17.07 21.0522L16.09 21.1922C15.74 21.2422 15.49 20.9922 15.54 20.6422L15.68 19.6622C15.7 19.5222 15.79 19.3322 15.89 19.2322L18.07 17.0622L18.43 16.6922C18.67 16.4522 18.94 16.2922 19.22 16.2922C19.46 16.2922 19.73 16.4022 20.03 16.6922C20.7 17.3422 20.49 17.8522 20.05 18.2922Z"
                        fill="#FDD800"
                      />
                    </svg>
                  </div>
                  <p class="step-name">{{ $t("reuested") }}</p>
                </li>

                <li>
                  <div
                    class="bg-icons text-center"
                    :class="{
                      'bg-active': orderSelected.status === 'booking_done',
                    }"
                  >
                    <icons-status-step-booked :status="orderSelected.status" />
                  </div>
                  <p class="step-name">{{ $t("booked") }}</p>
                </li>

                <li>
                  <div
                    class="bg-icons text-center"
                    :class="{
                      'bg-active':
                        orderSelected.status === 'Car Under Inspection',
                    }"
                  >
                    <icons-status-step-inspection />
                  </div>
                  <p class="step-name">{{ $t("inspection") }}</p>
                </li>

                <li>
                  <div
                    class="bg-icons text-center"
                    :class="{
                      'bg-active': orderSelected.status === 'Report Ready',
                    }"
                  >
                    <icons-status-step-report />
                  </div>
                  <p class="step-name">{{ $t("report") }}</p>
                </li>

                <li>
                  <div
                    class="bg-icons text-center"
                    :class="{
                      'bg-active': orderSelected.status === 'Car is Fine',
                    }"
                  >
                    <icons-status-step-car-fine
                      :status="orderSelected.status"
                    />
                  </div>
                  <p class="step-name">{{ $t("car is fine") }}</p>
                </li>

                <li>
                  <div
                    class="bg-icons text-center"
                    :class="{
                      'bg-active':
                        orderSelected.status === 'Car Under Maintenance',
                    }"
                  >
                    <icons-status-step-maintenance />
                  </div>
                  <p class="step-name">{{ $t("maintenance") }}</p>
                </li>

                <li>
                  <div
                    class="bg-icons text-center"
                    :class="{
                      'bg-active': orderSelected.status === 'Car Ready',
                    }"
                  >
                    <icons-status-step-ready />
                  </div>
                  <p class="step-name">{{ $t("ready") }}</p>
                </li>

                <li>
                  <div
                    class="bg-icons text-center"
                    :class="{
                      'bg-active': orderSelected.status === 'Finished',
                    }"
                  >
                    <icons-status-step-completed
                      :status="orderSelected.status"
                    />
                  </div>
                  <p class="step-name">{{ $t("completed") }}</p>
                </li>
              </ul>
            </div>
            <!-- invoice -->
            <div class="mt-3">
              <!-- <a :href="openInvoice" target="_blank" rel="noopener noreferrer">{{
                $t("View Invoice")
              }}</a> -->
              <!-- <div @click="openInvoice" target="_blank" rel="noopener noreferrer">{{
                $t("View Invoice")
              }}</div> -->
            </div>
            <!-- items details -->
            <div
              v-if="
                orderSelected &&
                (orderSelected.services?.length || 0) +
                  (orderSelected.spare_parts?.length || 0) +
                  (orderSelected.offers?.length || 0) >
                  0
              "
              class="parent-items"
            >
              <div
                class="d-flex align-items-center justify-content-between mt-2"
              >
                <h4 class="label">{{ $t("items") }}</h4>

                <h4 class="label">
                  {{ orderSelected?.total_amount }}
                  <span class="span text-uppercasr">{{ $t("sar") }}</span>
                </h4>
              </div>
              <div class="items-order order-amount mt-3">
                <div
                  class="title d-flex align-items-center justify-content-between"
                  v-for="item in (orderSelected?.services?.length
                    ? orderSelected.services
                    : orderSelected?.offers?.length
                    ? orderSelected.offers
                    : orderSelected?.spare_parts || []
                  ).slice(0, 1)"
                  :key="item.id || item.offer_id"
                >
                  <div class="img-title d-flex align-items-center gap-2">
                    <img :src="item.image" class="image-width" alt="" />
                    <h4 class="label">{{ item.title }}</h4>
                  </div>
                  <button
                    @click="popupItems = true"
                    type="button"
                    class="btn btn-danger txet-capitalize btn-text"
                  >
                    {{ $t("more") }}
                  </button>
                </div>
              </div>
            </div>
            <!-- modal items show -->
            <div
              v-if="popupItems"
              class="popup-overlay"
              @click.self="popupItems = false"
            >
              <div class="popup-box">
                <h4 class="label">{{ $t("items order") }}</h4>
                <div class="popup-content-scroll">
                  <div
                    v-if="
                      orderSelected &&
                      orderSelected.services &&
                      orderSelected.services.length
                    "
                    class="services"
                  >
                    <h5 class="label">{{ $t("services") }}</h5>
                    <div
                      class="popup-option"
                      v-for="service in orderSelected.services"
                      :key="service.id"
                    >
                      <img
                        :src="service.image"
                        class="image-width me-2"
                        alt=""
                      />
                      {{ service.title }} -
                      <span class="text-danger"
                        >{{ service.price }} {{ $t("sar") }}</span
                      >
                    </div>
                  </div>
                  <div
                    v-if="
                      orderSelected &&
                      orderSelected.spare_parts &&
                      orderSelected.spare_parts.length
                    "
                    class="spareparts"
                  >
                    <h5 class="label">{{ $t("spare-parts") }}</h5>
                    <div
                      class="popup-option"
                      v-for="sparePart in orderSelected.spare_parts"
                      :key="sparePart.id"
                    >
                      <img
                        :src="sparePart.image"
                        class="image-width me-2"
                        alt=""
                      />
                      {{ sparePart.title }} -
                      <span class="text-danger"
                        >{{ sparePart.price }} {{ $t("sar") }}</span
                      >
                    </div>
                  </div>
                  <div
                    v-if="
                      orderSelected &&
                      orderSelected.offers &&
                      orderSelected.offers.length
                    "
                    class="offers"
                  >
                    <h5 class="label">{{ $t("offers") }}</h5>
                    <div
                      class="popup-option"
                      v-for="offer in orderSelected.offers"
                      :key="offer.offerid"
                    >
                      <img :src="offer.image" class="image-width me-2" alt="" />
                      {{ offer.title }} -
                      <span class="text-danger"
                        >{{ offer.price }} {{ $t("sar") }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="details-items mt-3">
                  <div class="box-design">
                    <div
                      class="total-order d-flex justify-content-between align-items-center"
                    >
                      <h5 class="label">{{ $t("sub total") }}</h5>
                      <span
                        >{{ orderSelected && orderSelected.sub_total }}
                        <span class="p-color-fs text-uppercase span">{{
                          $t("sar")
                        }}</span></span
                      >
                    </div>
                    <div
                      class="vat d-flex justify-content-between align-items-center"
                    >
                      <h5 class="label">{{ $t("vat") }}</h5>
                      <span
                        >{{ orderSelected && orderSelected.vat_amount }}
                        <span class="p-color-fs text-uppercase span">{{
                          $t("sar")
                        }}</span></span
                      >
                    </div>
                    <div
                      class="final-amount d-flex justify-content-between align-items-center"
                    >
                      <h5 class="label">{{ $t("Final Amount") }}</h5>
                      <span
                        >{{ orderSelected && orderSelected.total_amount }}
                        <span class="p-color-fs text-uppercase span">{{
                          $t("sar")
                        }}</span></span
                      >
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-center mt-3">
                  <button class="btn btn-secondary" @click="popupItems = false">
                    {{ $t("Close") }}
                  </button>
                </div>
              </div>
            </div>

            <!-- details amount -->
            <div
              v-for="order in orderSelected?.order_attributes"
              :key="order.id"
              class="order-amount d-flex align-items-center justify-content-between margin-20px"
            >
              <div class="amount text-capitalize">
                {{ order.label }}
              </div>
              <div class="num-order-amount">
                {{ order.value }}
              </div>
            </div>
            <div
              class="totla-amount margin-20px d-flex align-items-center justify-content-between"
            >
              <div class="total text-capitalize">{{ $t("total amount") }}</div>
              <div class="price-total">
                {{ orderSelected.total_amount }}
                <span class="span text-uppercase">{{ $t("sar") }}</span>
              </div>
            </div>
            <!-- cancel order -->
            <div
              v-if="orderSelected?.can_cancel"
              @click="sureCancel = true"
              :class="{ 'd-none': orderSelected?.status === 'canceled' }"
              class="cancel-order mt-4 position-relative d-flex align-items-center"
            >
              <button>{{ $t("cancel order") }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reschedule Time Popup -->
    <div v-if="times" class="popup-overlay" @click.self="times = false">
      <div class="popup-box">
        <h4 class="label">{{ $t("choose from the date available") }}</h4>
        <div class="popup-content-scroll">
          <template v-for="dateObj in availableDates" :key="dateObj.date">
            <div class="fw-bold mb-2">{{ dateObj.date }}</div>
            <div class="d-flex flex-column gap-2 mb-3">
              <div
                class="popup-option"
                v-for="slot in dateObj.time_slots"
                :key="slot.time"
              >
                <button
                  class="btn w-100"
                  @click="
                    rescheduleTime({ date: dateObj.date, time: slot.time })
                  "
                >
                  {{ slot.time }}
                </button>
              </div>
            </div>
          </template>
        </div>
        <div class="d-flex justify-content-center mt-3">
          <button class="btn btn-secondary" @click="times = false">
            {{ $t("Close") }}
          </button>
        </div>
      </div>
    </div>
    <LoadingSpinner :is-loading-otp="isLoading" />
  </div>
</template>

<script setup>
import dayjs from "#build/dayjs.imports.mjs";
import { id } from "date-fns/locale";

const {
  getSingleOrder,
  changeOrderStatus,
  reversationTime,
  getCancelReasons,
  getAvailableTimes,
} = useApi();
const skeleton = ref(true);
const openInMaps = (branch) => {
  if (!branch?.lat || !branch?.lng) return;
  const url = `https://www.google.com/maps/search/?api=1&query=${branch.lat},${branch.lng}`;
  window.open(url, "_blank");
};

let route = useRoute();
let order_id = route.params.id;
let orderSelected = ref(null);
const isLoading = ref(false);

const openInvoice = () => {
  if (process.client) {
    const invoiceUrl = `https://yarmok.co/invoice/${order_id}`;
    const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
      invoiceUrl
    )}#file=Invoice`;
    window.open(viewerUrl, "_blank");
  }
};

const getReasons = ref([]);
let cancelOrder = ref(false);

let sureCancel = ref(false);
let changeStatusOrder = async (order_status, cancel_Reason_id) => {
  try {
    isLoading.value = true;
    const response = await changeOrderStatus(
      order_id,
      order_status,
      cancel_Reason_id
    );
    if (response?.status) {
      orderSelected.value = {
        ...orderSelected.value,
        status: order_status,
        status_value: $t("Canceled"),
        can_cancel: false,
      };
    }
    cancelOrder.value = false;
    sureCancel.value = false;
  } catch (error) {
    console.error("Error changing order status:");
  } finally {
    isLoading.value = false;
  }
};

let availableDates = ref([]);
let times = ref(false);
let rescheduleOrder = async (branch_id) => {
  let resTimeAvailable = await getAvailableTimes(branch_id);
  availableDates.value = resTimeAvailable?.available_times;
  times.value = true;
};

let messageTimeChange = ref("");
let messageClass = ref("");

let rescheduleTime = async ({ date, time }) => {
  isLoading.value = true;
  try {
    let dateTime = dayjs(`${date} ${time}`, "YYYY-MM-DD HH:mm");
    let res = await reversationTime(
      order_id,
      dateTime.format("YYYY-MM-DD HH:mm:ss")
    );

    if (res?.status && res?.message) {
      messageTimeChange.value = res?.message;
      messageClass.value = "text-success";

      orderSelected.value = {
        ...orderSelected.value,
        reservation_time: dateTime.format("YYYY-MM-DD HH:mm"),
      };
    } else {
      messageTimeChange.value = res?.message;
      messageClass.value = "text-danger";
    }

    times.value = false;
  } catch (err) {
    // لو فيه errors جايه من السيرفر
    if (err?.data?.errors?.reservation_time?.length) {
      messageTimeChange.value = err.data.errors.reservation_time[0];
      messageClass.value = "text-danger";
    }
  } finally {
    isLoading.value = false;
    times.value = false;
  }
};

function toFalse() {
  cancelOrder.value = false;
  sureCancel.value = false;
}
const popupItems = ref(false);

onMounted(async () => {
  try {
    let res = await getSingleOrder(order_id);
    orderSelected.value = res?.data ?? {};
    skeleton.value = false;
  } catch (err) {
    console.log("Error fetching ");
  } finally {
    skeleton.value = false;
  }
  try {
    let resReasons = await getCancelReasons();
    getReasons.value = resReasons?.data || [];
    skeleton.value = false;
  } catch (error) {
    console.error("Error fetching ");
  }
});
</script>

<style scoped>
@import "@/assets/css/ordersteps.css";
@import "@/assets/css/cartorder.css";
.image-width {
  width: 40px;
}
.popup-sure-cancel {
  text-align: center;
  height: auto;
  max-height: 20vh;
}

.border-box-item {
  border: 1px solid #c71f45;
}

.amount,
.text-success {
  font-size: 15px !important;
}
.transparent {
  background-color: transparent !important;
}
.popup-reschedule {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  height: 50vh;
  display: flex;
  flex-direction: column;
  z-index: 1100;
}

.time-box {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
  margin-top: 10px;
}

.slots {
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .popup-reschedule {
    width: 95%;
    padding: 15px;
  }
  .btn-text {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .popup-reschedule {
    width: 100%;
    border-radius: 12px;
  }
}
</style>
