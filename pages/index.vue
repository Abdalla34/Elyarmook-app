<template>
  <div class="parent">
    <div class="container">
      <SwiperSlideHome />
      <ComfortableSerivcesLayOut />
      <Serv-Section-Card />
      <qr-code-slider />
    </div>
  </div>
</template>

<script setup>
import ComfortableSerivcesLayOut from "~/components/ComfortableSerivcesLayOut.vue";
import ComfortableService from "./comfortable-service.vue";

// Index page specific logic can go here
</script>

<style scoped>
/* Index page specific styles */
.parent {
  position: relative;
}
</style>
