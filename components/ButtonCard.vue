<template>
  <div class="parent-button">
    <button
      class="button-card d-flex align-items-center  justify-content-center gap-1 mb-3 button background-main border-radius-20px w-100 text-capitalize p-1"
    >
      <CarIconCard />
      {{ textButton }}
    </button>
  </div>
</template>
<script setup>
defineProps({
  textButton: String,
});
</script>
<style scoped>

</style>
