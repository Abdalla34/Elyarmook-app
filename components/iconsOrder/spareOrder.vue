<template>
  <div>
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
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
  </div>
</template>

<script setup>
defineProps({
  isActive: Boolean
})
</script>
