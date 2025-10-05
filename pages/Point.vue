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
              <p class="p-color-fs text-capitalize created-at">current point</p>
            </div>

            <div class="redeem p-color-fs text-capitalize border-radius-36px">
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
                earned
              </li>
              <li
                @click="redeem"
                class="li-point link"
                :class="{ active: step === 1 }"
              >
                redeem
              </li>
              <li
                @click="expired"
                class="li-point link"
                :class="{ active: step === 2 }"
              >
                expired
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
                <p class="p-color-fs fw-bold">{{ item.description }}</p>
              </div>
            </div>

            <div class="points d-flex gap-2">
              <p class="num">{{ item.points }}</p>
              <span class="span"> point</span>
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
              <span class="span"> point</span>
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
              <span class="span"> point</span>
            </div>
          </div>

          <div v-if="Points.length === 0" class="not-point text-center">
            <img src="/notPoints.png" alt="no points" />
            <p>not points yet</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "#build/dayjs.imports.mjs";

let Points = ref([]);
let res = await useApi().getPoints();
Points.value = res?.data;
let step = ref(0);

const title = computed(() => {
  if (step.value === 0) return "eanread";
  if (step.value === 1) return "redeem";
  if (step.value === 2) return "expired";
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

console.log(Points);
</script>

<style scoped>
@import "@/assets/css/point.css";
.box-point {
  border: 1px solid #ebebeb;
  border-radius: 12px;
  border-width: 1px;
  padding: 20px 16px;
  transition: all 0.4s ease;
  margin-bottom: 16px;
  position: relative;
}
.box-point::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background-color: #e4e1e1;
  z-index: -1;
  transition: all 0.4s ease-in-out;
  border-radius: 12px;
}
.box-point:hover:after {
  width: 100%;
}
</style>
