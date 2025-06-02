<template>
  <div class="parent">
    <div class="detailes-card d-flex justify-content-between ps-2 pe-2 gap-2">
      <h4 class="h1">{{ title }}</h4>
      <p class="d-flex align-items-center gap-1 fw-bold">
        {{ currency }} <span class="currency text-capitalize">{{ sar }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  currency: [String, Number],
  sar: String,
});
</script>
<style scoped>
p {
  font-size: 20px;
  font-weight: 600;
}
.currency {
  font-size: 14px;
  font-weight: 600;
}
</style>
