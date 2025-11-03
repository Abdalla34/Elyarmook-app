<template>
  <div>
    <div v-if="isLoadingOtp" class="spinner-overlay">
      <div class="dashed-spinner"></div>
      <p class="mt-2">Loading...</p>
    </div>
  </div>
</template>
<script setup>
defineProps({
  isLoadingOtp: Boolean,
});
</script>
<style scoped>
.spinner-overlay {
  position: fixed;
  inset: 0;
  background: rgba(245, 246, 248, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
  z-index: 9999;
}

/* الدائرة المتقطعة */
.dashed-spinner {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 6px dashed #8499af;
  animation: spin 1.2s linear infinite;
  position: relative;
}

/* المربع الصغير جوه الدايرة (تأثير بكسل) */
.dashed-spinner::after {
  content: "";
  width: 12px;
  height: 12px;
  background: #007bff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2px;
  animation: pulse 1s ease-in-out infinite;
}

/* حركات الدوران والنبض */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}
</style>
