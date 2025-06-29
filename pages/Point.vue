<template>
  <div class="point">
    <div class="container">
      <PointPages :itemPoints="myItems" />

      <div class="not-point text-center">
        <img src="/notPoints.png" alt="no points" />
        <p>not points yet</p>
      </div>
    </div>
  </div>
</template>

<script setup>
let myItems = ref([
  {
    nameItems: "Cashback",
    dateItems: "Tuesday, Nov, 12, 6:22 AM",
    type: "checkback",
    num: "+6000",
  },
  {
    nameItems: "Cashback",
    dateItems: "Tuesday, Nov, 12, 6:22 AM",
    type: "checkback",
    num: "+6000",
  },
  {
    nameItems: "Cashback",
    dateItems: "Tuesday, Nov, 12, 6:22 AM",
    type: "checkback",
    num: "+6000",
  },
]);
</script>

<style scoped>
.point {
  margin-bottom: 219px;
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
