<template>
  <div class="parent-button">
    <button
      class="button-card mb-3 button background-main border-radius-20px w-100 text-capitalize fs-12-fw p-1"
    >
      {{ textButton }}
    </button>
  </div>
</template>
<script setup>
defineProps({
  textButton: String,
});
</script>
<style scoped></style>
