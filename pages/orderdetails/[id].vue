<template>
  <div
    v-if="cancelOrder || times || sureCancel"
    class="position-absolute over-lay"
  ></div>
  <div v-if="sureCancel">
    <div class="popup-sure-cancel">
      <div class="d-flex justify-content-end">
        <i
          class="fa-solid fa-xmark cursor-pointer"
          style="cursor: pointer"
          @click="sureCancel = false"
        ></i>
      </div>
      <h1 class="mt-3">cancel order</h1>
      <p class="p-color-fs">Are you sure you want to cancel this order?</p>
      <div class="button-cancel cancel-order mt-3">
        <button @click="cancelOrder = true">Yes, Cancel Order</button>
      </div>
    </div>
  </div>

  <div v-if="cancelOrder">
    <div class="popup">
      <div class="reasons">
        <div class="d-flex justify-content-between">
          <div class="Mention-reason reason-title mb-5 mt-2">
            Mention reason
          </div>

          <div
            class="icon-to-page d-flex justify-content-center align-items-center"
            @click="toFalse"
          >
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>

        <div class="reason-box" v-for="reason in getReasons" :key="reason.id">
          <div
            @click="changeStatusOrder('canceled', reason.id)"
            class="d-flex align-items-center"
          >
            <p class="reason-title text-capitalize">{{ reason.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="order-steps">
    <div class="container position-relative">
      <div class="row justify-content-center mt-3">
        <div class="col-7 pb-4 mt-2 mb-4 background">
          <div v-if="orderSelected">
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
                    {{ Math.trunc(orderSelected.total_amount) }}
                    <span class="span text-uppercase">sar</span>
                  </p>
                </div>
              </div>

              <div
                class="status text-capitalize"
                :class="{
                  'bg-requested': orderSelected.status === 'request_done',
                  'bg-report': orderSelected.status === 'report_ready',
                  'bg-inspection':
                    orderSelected.status === 'car_under_inspection' ||
                    orderSelected.status === 'booking_done',
                  'bg-canceled': orderSelected.status === 'canceled',
                  'bg-ready': orderSelected.status === 'car is ready',
                  'bg-finished': orderSelected.status === 'order_finished',
                }"
              >
                <p class="status text-capitalize">
                  {{ orderSelected.status_value }}
                </p>
              </div>
            </div>

            <div
              class="model-car margin-60px d-flex flex-wrap justify-content-between align-items-center gap-3"
            >
              <div
                class="car-name d-flex align-items-center justify-content-center gap-4 box-car "
              >
                <div class="icons-car">
                  <PuplicIconCarIconOrder />
                </div>
                <div class="name" v-if="orderSelected.car_type">
                  <p class="text-capitalize parag">car model</p>
                  <p class="name-order">{{ orderSelected.car_type.title }}</p>
                </div>
              </div>

              <div
                class="order-number d-flex align-items-center justify-content-center gap-4 box-car "
              >
                <div class="icons-car">
                  <PuplicIconHashtag />
                </div>
                <div class="number">
                  <p class="text-capitalize parag">order number</p>
                  <p class="name-order">{{ orderSelected.order_num }}</p>
                </div>
              </div>
            </div>

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
                    Reschedule Order
                  </p>
                  <p class="text-msg-change">{{ messageTimeChange }}</p>
                </div>
              </div>

              <div
                @click="navigateTo('/map')"
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
                  <p class="color-Eb text-capitalize">show in maps</p>
                </div>
              </div>
            </div>

            <div class="like text-center margin-30px">
              <div v-if="orderSelected?.status === 'canceled'">
                <PuplicIconCancelOrderIcon />
                <h1 class="title-step">Canceled</h1>
                <p class="width-p">
                  We're sorry, but your order has been canceled.
                </p>
              </div>

              <h1 class="title-step"></h1>
              <p class="width-p"></p>
            </div>

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
                  <p class="step-name">reuested</p>
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
                  <p class="step-name">booked</p>
                </li>

                <li>
                  <div class="bg-icons text-center">
                    <icons-status-step-inspection />
                  </div>
                  <p class="step-name">inspection</p>
                </li>

                <li>
                  <div class="bg-icons text-center">
                    <icons-status-step-report />
                  </div>
                  <p class="step-name">report</p>
                </li>

                <li>
                  <div class="bg-icons text-center">
                    <icons-status-step-car-fine
                      :status="orderSelected.status"
                    />
                  </div>
                  <p class="step-name">car is fine</p>
                </li>

                <li>
                  <div class="bg-icons text-center">
                    <icons-status-step-maintenance />
                  </div>
                  <p class="step-name">maintenance</p>
                </li>

                <li>
                  <div class="bg-icons text-center">
                    <icons-status-step-ready />
                  </div>
                  <p class="step-name">ready</p>
                </li>

                <li>
                  <div
                    class="bg-icons text-center"
                    :class="{
                      'bg-active': orderSelected.status === 'order_finished',
                    }"
                  >
                    <icons-status-step-completed
                      :status="orderSelected.status"
                    />
                  </div>
                  <p class="step-name">completed</p>
                </li>
              </ul>
            </div>

            <div
              v-if="orderSelected.status === 'request_done'"
              class="input-code position-relative margin-60px"
            >
              <input
                type="text"
                class="w-100 input-with-apply text-capitalize"
                placeholder="promocode"
              />
              <button
                class="apply-btn position-absolute d-flex align-items-center gap-2"
              >
                <span class="text-capitalize apply">apply</span>
                <iconsOrder-applyCode />
              </button>
            </div>

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
              <div class="total text-capitalize">total amount</div>
              <div class="price-total">
                {{ orderSelected.total_amount }}
                <span class="span">SAR</span>
              </div>
            </div>

            <!-- <div
              v-if="
                orderSelected.status === 'request_done'
                // orderSelected.status === 'report'
              "
            >
              <div class="button-order margin-20px">
                <button-card
                  textButton="accept and pay"
                  :isActive="activeFalse"
                />
              </div>
            </div> -->

            <div
              v-if="orderSelected?.can_cancel"
              @click="sureCancel = true"
              :class="{ 'd-none': orderSelected?.status === 'canceled' }"
              class="cancel-order mt-4 position-relative d-flex align-items-center"
            >
              <button>cancel order</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="times" class="popup-reschedule">
      <div class="d-flex justify-content-between">
        <div class="Mention-reason reason-title mb-3 mt-2">
          choose from the date available
        </div>

        <div
          class="icon-to-page d-flex justify-content-center align-items-center"
          @click="times = false"
        >
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div class="time-box">
        <template v-for="dateObj in availableDates" :key="dateObj.date">
          <div class="date-title">{{ dateObj.date }}</div>
          <div
            class="slots"
            v-for="slot in dateObj.time_slots"
            :key="slot.time"
            @click="rescheduleTime({ date: dateObj.date, time: slot.time })"
          >
            <div class="slot">{{ slot.time }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "#build/dayjs.imports.mjs";
import { id } from "date-fns/locale";

let activeFalse = ref(false);
let route = useRoute();
let order_id = route.params.id;
let orderSelected = ref(null);
let res = await useApi().getSingleOrder(order_id);
orderSelected.value = res?.data ?? {};

const getReasons = ref([]);
let cancelOrder = ref(false);
try {
  let resReasons = await useApi().getCancelReasons();
  getReasons.value = resReasons?.data || [];
  console.log(getReasons.value);
} catch (error) {
  console.error(error);
}

let sureCancel = ref(false);
let changeStatusOrder = async (order_status, cancel_Reason_id) => {
  await useApi().changeOrderStatus(order_id, order_status, cancel_Reason_id);
  cancelOrder.value = false;
  sureCancel.value = false;
};

let availableDates = ref([]);
let times = ref(false);
let rescheduleOrder = async (branch_id) => {
  let resTimeAvailable = await useApi().getAvailableTimes(branch_id);
  availableDates.value = resTimeAvailable?.available_times;
  console.log(availableDates.value);
  times.value = true;
};
let messageTimeChange = ref("");
let rescheduleTime = async ({ date, time }) => {
  let dateTime = dayjs(`${date} ${time}`, "YYYY-MM-DD HH:mm");
  let res = await useApi().reversationTime(
    order_id,
    dateTime.format("YYYY-MM-DD HH:mm:ss")
  );
  if (res?.status && res?.message) {
    messageTimeChange.value = res?.message;
    console.log(messageTimeChange);
  } else {
    messageTimeChange.value = res?.message;
  }
  times.value = false;
};

function toFalse() {
  cancelOrder.value = false;
  sureCancel.value = false;
}
</script>

<style scoped>
@import "./assets/css/ordersteps.css";
</style>
