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
    nameItems: "expired",
    dateItems: "Tuesday, Nov, 12, 6:22 AM",
    type: "expired",
    num: "-6000",
  },
  {
    nameItems: "expired",
    dateItems: "Tuesday, Nov, 12, 6:22 AM",
    type: "expired",
    num: "-6000",
  },
  {
    nameItems: "expired",
    dateItems: "Tuesday, Nov, 12, 6:22 AM",
    type: "expired",
    num: "-6000",
  },
]);
</script>

<style scoped>
.point {
  margin-bottom: 219px;
}
</style>
