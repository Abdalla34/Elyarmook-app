<template>
  <div>
    <svg
      :class="{
        'icon-color': status === 'order_finished',
        'default-color': status !== 'order_finished',
      }"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22.7422C17.5 22.7422 22 18.2422 22 12.7422C22 7.24219 17.5 2.74219 12 2.74219C6.5 2.74219 2 7.24219 2 12.7422C2 18.2422 6.5 22.7422 12 22.7422Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.75 12.7441L10.58 15.5741L16.25 9.91406"
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

<style>
.icon-color{
  color: #FDD800;
}
.default-color{
  color: gray;
}
</style>