<template>
  <div>
    <div class="title-page d-flex align-items-center gap">
      <div
        class="icon-to-page d-flex justify-content-center align-items-center"
        @click="navigateTo(backPath)"
      >
        <i class="fa-solid fa-xmark"></i>
      </div>
      <div class="d-flex gap-2 align-items-center">
        <img src="public/BMW.png" alt="" />
        <h1 class="title-pages">{{ namePage }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  namePage: String,

  backPath: {
    type: String,
    default: "",
  },

});
</script>

<style scoped>
.title-page {
  width: 90%;
  margin: auto;
}
.gap {
  gap: 199px;
}
</style>
