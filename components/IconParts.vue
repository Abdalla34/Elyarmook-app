<template>
  <!-- <svg
    width="21"
    height="22"
    viewBox="0 0 21 22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 8.10937V13.8794C1.5 15.9994 1.5 15.9994 3.5 17.3494L9 20.5294C9.83 21.0094 11.18 21.0094 12 20.5294L17.5 17.3494C19.5 15.9994 19.5 15.9994 19.5 13.8894V8.10937C19.5 5.99937 19.5 5.99937 17.5 4.64937L12 1.46937C11.18 0.989375 9.83 0.989375 9 1.46937L3.5 4.64937C1.5 5.99937 1.5 5.99937 1.5 8.10937Z"
      stroke="currentColor"
      :fill="isActive ? '#000' : 'none'"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> -->
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.5 9.10937V14.8794C3.5 16.9994 3.5 16.9994 5.5 18.3494L11 21.5294C11.83 22.0094 13.18 22.0094 14 21.5294L19.5 18.3494C21.5 16.9994 21.5 16.9994 21.5 14.8894V9.10937C21.5 6.99937 21.5 6.99937 19.5 5.64937L14 2.46937C13.18 1.98937 11.83 1.98937 11 2.46937L5.5 5.64937C3.5 6.99937 3.5 6.99937 3.5 9.10937Z"
      stroke="currentColor"
      :fill="isActive ? '#000' : 'none'"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.5 15C14.1569 15 15.5 13.6569 15.5 12C15.5 10.3431 14.1569 9 12.5 9C10.8431 9 9.5 10.3431 9.5 12C9.5 13.6569 10.8431 15 12.5 15Z"
      stroke="currentColor"
      :fill="isActive ? '#000' : 'none'"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script setup>
defineProps(["isActive"]);
</script>
<style></style>
