<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-padding">
      <div
        class="current-point d-flex align-items-center justify-content-between"
      >
        <div class="point-num text-center">
          <h4 class="title-pages">5000</h4>
          <p class="p-color-fs text-capitalize">current point</p>
        </div>
        <div class="redeem p-color-fs text-capitalize border-radius-36px">
          redeem
        </div>
      </div>
      <div class="ul-point">
        <ul
          class="d-flex justify-content-center align-items-center gap-2 mb-0 text-capitalize hand-ul"
        >
          <li class="li-point">
            <NuxtLink to="/point" class="link" active-class="active"
              >earned</NuxtLink
            >
          </li>
          <li class="li-point">
            <NuxtLink to="/point/redeem" class="link" active-class="active"
              >redeem</NuxtLink
            >
          </li>
          <li class="li-point">
            <NuxtLink to="/point/expired" class="link" active-class="active"
              >expired</NuxtLink
            >
          </li>
        </ul>
      </div>

      <div
        class="box-pages margin-bottom-24px col-padding d-flex justify-content-between align-items-center"
        v-for="(item, index) in itemPoints"
        :key="index"
      >
        <div class="cachback d-flex align-items-center gap-4">
          <div
            class="icon-cach"
            :class="{
              'background-plus': item.type === 'checkback',
              'background-negative': item.type === 'redeem',
              'background-ex': item.type === 'expired',
            }"
          >
            <div v-if="item.type === 'checkback'">
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
            <div v-if="item.type === 'redeem'">
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
            <div v-if="item.type === 'expired'">
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

          <div class="date-title-cach">
            <h4 class="h4 text-capitalize">{{ item.nameItems }}</h4>
            <p class="p-color-fs">{{ item.dateItems }}</p>
          </div>
        </div>

        <div class="points d-flex gap-2">
          <p class="num">{{ item.num }}</p>
          <span class="span"> point</span>
        </div>
      </div>

      <div v-if="itemPoints.length === 0" class="not-point text-center">
        <img src="/notPoints.png" alt="no points" />
        <p>not points yet</p>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  itemPoints: { Array, required: true },
});
</script>

<style scoped>
.redeem {
  color: #14142b;
  background-color: var(--main-color);
  padding: 10px 16px;
  box-shadow: 0px 1px 2px 0px #1018280d;
}
.ul-point {
  margin-bottom: 44px;
}
.hand-ul {
  background-color: #f7f7fc;
  width: fit-content;
  margin: auto;
  padding: 14px 4px;
  margin-top: 44px;
  border-radius: 16px;
}

.li-point {
  font-family: var(--font-alt);
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 1px;
  text-align: center;
}

.li-point a:not(.active) {
  color: #262338;
  outline: none;
  padding: 14px 20px;
}

.active {
  background-color: #14142b;
  padding: 14px 27px;
  color: white;
  border-radius: 12px;
  outline: none;
}

.h4 {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0%;
  color: #3d3d3d;
}

.background-plus {
  background-color: #ecfaf2;
  padding: 8px;
  border-radius: 10px;
}

.num {
  font-weight: 600;
  font-size: 30px;
  line-height: 32px;
  letter-spacing: 0%;
  color: #3d3d3d;
}

.span {
  font-size: 24px;
  color: #3d3d3d;
  font-family: var(--font-main);
}

.background-negative {
  background-color: #fffcea;
  padding: 8px;
  border-radius: 10px;
}

.background-ex {
  background-color: #fae1e7;
  padding: 5px 12px;
  border-radius: 50%;
}

.not-point p {
  margin-top: 24px;
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0px;
  text-align: center;
  vertical-align: middle;
  text-transform: capitalize;
  padding-left: 30px;
}
</style>
