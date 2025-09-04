<template>
  <div>
    <div v-if="isLoadingOtp" class="spinner-overlay">
      <div class="spinner"></div>
      <p class="mt-2">Loading...</p>
    </div>
  </div>
</template>
<script setup>
defineProps({
  isLoadingOtp: Boolean,
});
</script>
