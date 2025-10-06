<template>
  <div class="parent">
    <div class="container">
      <SwiperSlideHome />
      <ComfortableSerivces />
      <Serv-Section-Card />
      <qr-code-slider />
    </div>
  </div>
</template>

<script setup>
import ComfortableService from "./comfortable-service.vue";

// Index page specific logic can go here
</script>

<style scoped>
/* Index page specific styles */
.parent {
  position: relative;
}
</style>
