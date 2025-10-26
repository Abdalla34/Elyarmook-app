<template>
  <ProfileDetails />
  <div class="point">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8 col-padding">
          <div
            class="current-point d-flex align-items-center justify-content-between"
          >
            <div class="point-num text-center">
              <h4 class="title-pages">{{ Points?.current_points }}</h4>
              <p class="p-color-fs text-capitalize created-at">
                {{ $t("current point") }}
              </p>
            </div>

            <div
              :style="{ cursor: 'pointer' }"
              class="redeem p-color-fs text-capitalize border-radius-36px"
              @click="buttonsOpen = true"
            >
              {{ title }}
            </div>
          </div>

          <div class="ul-point">
            <ul
              class="d-flex justify-content-center align-items-center gap-4 mb-0 text-capitalize hand-ul"
            >
              <li
                @click="eanread"
                class="li-point link"
                :class="{ active: step === 0 }"
              >
                {{ $t("earned") }}
              </li>
              <li
                @click="redeem"
                class="li-point link"
                :class="{ active: step === 1 }"
              >
                {{ $t("redeem") }}
              </li>
              <li
                @click="expired"
                class="li-point link"
                :class="{ active: step === 2 }"
              >
                {{ $t("expired") }}
              </li>
            </ul>
          </div>

          <div
            v-if="step === 0"
            class="box-point margin-bottom-24px col-padding d-flex justify-content-between align-items-center"
            v-for="item in Points?.transactions?.items.filter(
              (type) => type.type === 'credit'
            )"
            :key="item.id"
          >
            <div class="cachback d-flex align-items-center gap-4">
              <div
                class="icon-cach"
                :class="{
                  'background-plus': item.type === 'credit',
                }"
              >
                <div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6673 6.7487H9.25065V1.33203C9.25065 0.648698 8.68398 0.0820312 8.00065 0.0820312C7.31732 0.0820312 6.75065 0.648698 6.75065 1.33203V6.7487H1.33398C0.650651 6.7487 0.0839844 7.31536 0.0839844 7.9987C0.0839844 8.68203 0.650651 9.2487 1.33398 9.2487H6.75065V14.6654C6.75065 15.3487 7.31732 15.9154 8.00065 15.9154C8.68398 15.9154 9.25065 15.3487 9.25065 14.6654V9.2487H14.6673C15.3507 9.2487 15.9173 8.68203 15.9173 7.9987C15.9173 7.31536 15.3507 6.7487 14.6673 6.7487Z"
                      fill="#41C980"
                    />
                  </svg>
                </div>
              </div>

              <div class="date-title-cach">
                <h4 class="h4 text-capitalize">{{ item.type_value_old }}</h4>
                <p class="p-color-fs">
                  {{ dayjs(item.created_at).format("ddd , MMM D , YYYY") }}
                  <span class="p-color-fs">
                    {{ dayjs(item.created_at).format("hh:mm A") }}</span
                  >
                </p>
                <p class="p-color-fs fw-bold fs">{{ item.description }}</p>
              </div>
            </div>

            <div class="points d-flex align-items-center gap-2">
              <p class="num">{{ item.points }}</p>
              <span class="span">{{ $t("point") }}</span>
            </div>
          </div>

          <div
            v-if="step === 1"
            class="box-point margin-bottom-24px col-padding d-flex justify-content-between align-items-center"
            v-for="item in Points?.transactions?.items.filter(
              (type) => type.type === 'debit'
            )"
            :key="item.id"
          >
            <div class="cachback d-flex align-items-center gap-4">
              <div
                class="icon-cach"
                :class="{
                  'background-negative': item.type === 'debit',
                }"
              >
                <div>
                  <svg
                    width="24"
                    height="4"
                    viewBox="0 0 24 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 3.25H2C1.31667 3.25 0.75 2.68333 0.75 2C0.75 1.31667 1.31667 0.75 2 0.75H22C22.6833 0.75 23.25 1.31667 23.25 2C23.25 2.68333 22.6833 3.25 22 3.25Z"
                      fill="#FDD800"
                    />
                  </svg>
                </div>
              </div>

              <div class="date-title-cach">
                <h4 class="h4 text-capitalize">{{ item.type_value_old }}</h4>
                <p class="p-color-fs">
                  {{ dayjs(item.created_at).format("ddd , MMM D , YYYY") }}
                  <span class="p-color-fs">
                    {{ dayjs(item.created_at).format("hh:mm A") }}</span
                  >
                </p>
                <p class="p-color-fs fw-bold">{{ item.description }}</p>
              </div>
            </div>

            <div class="points d-flex gap-2">
              <p class="num">{{ item.points }}</p>
              <span class="span">{{ $t("point") }}</span>
            </div>
          </div>

          <div
            v-if="step === 2"
            class="box-point margin-bottom-24px col-padding d-flex justify-content-between align-items-center"
            v-for="item in Points?.transactions?.items.filter(
              (type) => type.type === 'debit'
            )"
            :key="item.id"
          >
            <div class="cachback d-flex align-items-center gap-4">
              <div
                class="icon-cach"
                :class="{
                  'background-ex': item.type === 'debit',
                }"
              >
                <div>
                  <div>
                    <svg
                      width="4"
                      height="11"
                      viewBox="0 0 4 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 10.9154C2.68333 10.9154 3.25 10.3487 3.25 9.66536V1.33203C3.25 0.648698 2.68333 0.0820312 2 0.0820312C1.31667 0.0820312 0.75 0.648698 0.75 1.33203V9.66536C0.75 10.3487 1.31667 10.9154 2 10.9154Z"
                        fill="#C71F45"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="date-title-cach">
                <h4 class="h4 text-capitalize">{{ item.type_value_old }}</h4>
                <p class="p-color-fs">
                  {{ dayjs(item.created_at).format("ddd , MMM D , YYYY") }}
                  <span class="p-color-fs">
                    {{ dayjs(item.created_at).format("hh:mm A") }}</span
                  >
                </p>
                <p class="p-color-fs fw-bold">{{ item.description }}</p>
              </div>
            </div>

            <div class="points d-flex gap-2">
              <p class="num">{{ item.points }}</p>
              <span class="span">{{ $t("point") }}</span>
            </div>
          </div>

          <div v-if="Points.length === 0" class="not-point text-center">
            <img src="/notPoints.png" alt="no points" />
            <p>{{ $t("ther a not points yet") }}</p>
          </div>
        </div>
      </div>
      <!-- box buttons -->
      <div
        v-if="buttonsOpen"
        class="modal-overlay"
        @click.self="buttonsOpen = false"
      >
        <div class="modal-content">
          <div class="mdoal-box">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <h1 class="text-capitalize label">{{ $t("send points") }}</h1>
              <div
                class="icon-to-page d-flex justify-content-center align-items-center"
                @click="buttonsOpen = false"
              >
                <i class="fa-solid fa-xmark"></i>
              </div>
            </div>
            <!-- buttons choose opertaions -->
            <div>
              <ButtonCard
                @click="handleRedeemClick"
                :text-button="$t('redeem points')"
                class="mt-4"
                :class="{ 'disabled-btn': !current_points_int }"
              />

              <button
                :class="{ 'disabled-btn': !current_points_int }"
                @click="handleTransferClick"
                class="additems text-capitalize label"
              >
                <i class="fa-solid fa-paper-plane"></i>
                {{ $t("send points") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- box redeem -->
      <div
        v-if="popupRedeem"
        class="modal-overlay"
        @click.self="popupRedeem = false"
      >
        <div class="modal-content">
          <div class="mdoal-box">
            <div class="input-num">
              <!-- input numbe points -->
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <h1 class="text-capitalize label">{{ $t("redeem points") }}</h1>
                <div
                  class="icon-to-page d-flex justify-content-center align-items-center"
                  @click="popupRedeem = false"
                >
                  <i class="fa-solid fa-xmark"></i>
                </div>
              </div>
              <input
                type="text"
                class="input-point w-100 p-2 rounded"
                :placeholder="current_points_int"
                v-model="pointNum"
              />
              <p class="p-color-fs text-capitalize mt-2">
                {{ $t("NOTES: Minimum points = 1000 points") }}
              </p>
            </div>
            <!-- box details operation -->
            <div
              class="box-style p-3 mt-3 rounded d-flex align-items-center justify-content-between"
            >
              <div class="point-num text-center">
                <h6
                  v-if="pointNum && current_points_int"
                  class="h4point label fw-bold"
                >
                  {{ pointNum || current_points_int }}
                </h6>
                <h6 v-else class="h4point label">0</h6>
                <p class="p-color-fs text-capitalize">{{ $t("point") }}</p>
              </div>
              <!-- redeem to -->
              <div class="point-redeemto text-center">
                <PuplicIconDubleArrows />
                <p class="p-color-fs text-capitalize">{{ $t("redeem to") }}</p>
              </div>
              <!-- calculater -->
              <div class="num-sar text-center">
                <h6 class="label fw-bold">
                  {{ calculatedSar }}
                </h6>
                <p class="p-color-fs text-uppercase">{{ $t("sar") }}</p>
              </div>
            </div>
          </div>
          <!-- buttons -->
          <div>
            <button
              v-if="!current_points_int"
              class="disabled-btn rounded mt-3 p-3 text-capitalize"
            >
              {{ $t("redeem points") }}
            </button>

            <ButtonCard
              @click="sendRedeemPoints"
              v-else
              text-button="redeem points"
              class="mt-4"
            />
          </div>
        </div>
      </div>
      <!-- box transfer  -->
      <div
        v-if="popupTransfer"
        class="modal-overlay"
        @click.self="popupTransfer = false"
      >
        <div class="modal-content">
          <div class="mdoal-box">
            <div class="input-num">
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <h1 class="text-capitalize label">{{ $t("send points") }}</h1>
                <div
                  class="icon-to-page d-flex justify-content-center align-items-center"
                  @click="popupTransfer = false"
                >
                  <i class="fa-solid fa-xmark"></i>
                </div>
              </div>
              <!-- input number point -->
              <label for="" class="label">{{ $t("point") }}</label>
              <input
                type="text"
                class="input-point w-100 p-2 rounded mb-3"
                placeholder="number with dial code like +966"
                v-model="phoneNumberSend"
              />
              <input
                type="text"
                class="input-point w-100 p-2 rounded"
                :placeholder="current_points_int"
                v-model="pointNum"
              />
              <p class="p-color-fs fs text-capitalize mt-2">
                {{$t("NOTES: please you shouled this number used in yarmook app")}}
              </p>
            </div>
          </div>
          <!-- button -->
          <div>
            <button
              v-if="!phoneNumberSend"
              class="disabled-btn rounded mt-3 p-3 text-capitalize"
            >
              {{ $t("send") }}
            </button>
            <ButtonCard
              v-else
              @click="sendTransferPoints"
              text-button="send points"
              class="mt-4"
            />
          </div>
        </div>
      </div>
      <!-- box congratulation -->
      <div v-if="congrate" class="modal-overlay" @click.self="congrate = false">
        <div class="modal-content">
          <div class="modal-box box-width text-center p-3 rounded">
            <div class="mb-3 text-end">
              <div
                class="icon-to-page d-flex justify-content-center align-items-center"
                @click="congrate = false"
              >
                <i class="fa-solid fa-xmark"></i>
              </div>
            </div>
            <img
              v-if="statusOperation"
              src="/congratulation.png"
              alt="congratulations"
              class="img-fluid mb-3"
            />

            <p
              class="fs-5 fw-bold"
              :class="statusOperation ? 'text-success' : 'text-danger'"
            >
              {{ messageYourOperation }}
            </p>
          </div>
        </div>
      </div>

      <div>
        <LoadingSpinner :is-loading-otp="isLoading" />
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "#build/dayjs.imports.mjs";
import { startOfSecond } from "date-fns";
import { number } from "yup";

const buttonsOpen = ref(false);
const popupRedeem = ref(false);
const popupTransfer = ref(false);

const isLoading = ref(false);
const congrate = ref(false);
const statusOperation = ref(false);

const messageYourOperation = ref("");
const phoneNumberSend = ref(null);

const handleRedeemClick = () => {
  if (current_points_int.value) {
    popupRedeem.value = true;
    buttonsOpen.value = false;
  }
};
const handleTransferClick = () => {
  if (current_points_int.value) {
    popupTransfer.value = true;
    buttonsOpen.value = false;
  }
};

let Points = ref([]);
let res = await useApi().getPoints();
Points.value = res?.data;

const current_points_int = ref(0);
const example_rate = ref({ points: 1000, amount: 10 });
const pointNum = ref(0);

current_points_int.value = res.data.current_points_int;
pointNum.value = res.data.current_points_int;
example_rate.value = res.data.example_rate;

const calculatedSar = computed(() => {
  if (!pointNum.value || pointNum.value <= 0) return 0;
  const rate = example_rate.value;
  return ((pointNum.value / rate.points) * rate.amount).toFixed(2);
});

const pointToNumber = computed(() => Number(pointNum.value));
const sendRedeemPoints = async () => {
  isLoading.value = true;
  try {
    const res = await useApi().redeemPoints(pointToNumber.value);
    if (res?.status) {
      popupRedeem.value = false;
      messageYourOperation.value = res?.message || "";
      congrate.value = true;
      statusOperation.value = res?.status;
      // Update current points immediately
      Points.value.current_points =
        Points.value.current_points - pointToNumber.value;
      Points.value.current_points_int = Points.value.current_points;
      current_points_int.value = Points.value.current_points;
      pointNum.value = Points.value.current_points;
    } else {
      messageYourOperation.value = res?.message || "";
      congrate.value = true;
      popupRedeem.value = false;
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

const sendTransferPoints = async () => {
  try {
    isLoading.value = true;
    const res = await useApi().pointTransfer(
      pointNum.value,
      phoneNumberSend.value
    );

    const data = res?._data;

    if (data?.status) {
      // Update current points immediately
      Points.value.current_points =
        Points.value.current_points - pointNum.value;
      Points.value.current_points_int = Points.value.current_points;
      current_points_int.value = Points.value.current_points;
      pointNum.value = Points.value.current_points;

      popupTransfer.value = false;
      messageYourOperation.value = res?.message || "";
      congrate.value = true;
      statusOperation.value = data?.status;
    } else {
      messageYourOperation.value = data?.message || data?.errors?.user?.[0];
      statusOperation.value = false;
      congrate.value = true;
      popupTransfer.value = false;
    }
  } catch (err) {
    messageYourOperation.value =
      err?.response?._data?.message || err?.response?._data?.errors?.user?.[0];
    congrate.value = true;
    popupTransfer.value = false;
  } finally {
    isLoading.value = false;
  }
};

let step = ref(0);
const title = computed(() => {
  if (step.value === 0) return $t("earned");
  if (step.value === 1) return $t("redeem");
  if (step.value === 2) return $t("expired");
  return;
});

function eanread() {
  step.value = 0;
}
function redeem() {
  step.value = 1;
}
function expired() {
  step.value = 2;
}
</script>

<style scoped>
@import "@/assets/css/point.css";
</style>
