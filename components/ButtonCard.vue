<template>
  <div class="parent-button">
    <button
      class="d-flex padding-button align-items-center justify-content-center gap-2 mb-3 button background-main border-radius-20px w-100 text-capitalize"
    >
      <CarIconCard v-if="isActive" />
      <span class="button-text">{{ textButton }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  textButton: String,
  isActive: Boolean,
});
</script>

<style scoped>
.padding-button {
  padding: 18px 40px;
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
  transition: all 0.3s ease;
}

.button-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-black);
  margin: 0;
  line-height: 1;
  display: inline-block;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .padding-button {
    padding: 12px 16px;
    font-size: 14px;
  }

  .button-text {
    font-size: 14px;
  }
}
</style>
