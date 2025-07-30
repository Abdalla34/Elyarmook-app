<!-- components/icons-status-step-car-fine.vue -->
<template>
  <div>
    <svg
      :class="{
        'icon-color': status === 'car_is_fine',
        'color-gray': status !== 'car_is_fine',
      }"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7309 4.25281L15.4909 7.77281C15.7309 8.26281 16.3709 8.73281 16.9109 8.82281L20.1009 9.35281C22.1409 9.69281 22.6209 11.1728 21.1509 12.6328L18.6709 15.1128C18.2509 15.5328 18.0209 16.3428 18.1509 16.9228L18.8609 19.9928C19.4209 22.4228 18.1309 23.3628 15.9809 22.0928L12.9909 20.3228C12.4509 20.0028 11.5609 20.0028 11.0109 20.3228L8.02089 22.0928C5.88089 23.3628 4.58089 22.4128 5.14089 19.9928L5.85089 16.9228C5.98089 16.3428 5.75089 15.5328 5.33089 15.1128L2.85089 12.6328C1.39089 11.1728 1.86089 9.69281 3.90089 9.35281L7.09089 8.82281C7.62089 8.73281 8.26089 8.26281 8.50089 7.77281L10.2609 4.25281C11.2209 2.34281 12.7809 2.34281 13.7309 4.25281Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  status: String,
});
</script>

<style scoped>
.icon-color {
  color: red;
}
.color-gray {
  color: gray;
}
</style>
