<template>
  <div class="point">
    <div class="container">
      <PointPages :itemPoints="myItems" />
    </div>
  </div>
</template>

<script setup>
let myItems = ref([
  {
    nameItems: "redeem",
    dateItems: "Tuesday, Nov, 12, 6:22 AM",
    type: "redeem",
      num:'-6000'
  },
  {
    nameItems: "redeem",
    dateItems: "Tuesday, Nov, 12, 6:22 AM",
    type: "redeem",
      num:'-6000'
  },
  {
    nameItems: "redeem",
    dateItems: "Tuesday, Nov, 12, 6:22 AM",
    type: "redeem",
      num:'-6000'
  },
]);
</script>

<style scoped>
.point {
  margin-bottom: 219px;
}
</style>
