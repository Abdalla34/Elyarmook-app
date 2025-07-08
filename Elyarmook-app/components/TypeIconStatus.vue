<template>
  <div class="like text-center">
    <div class="icon" v-html="icon"></div>
    <h1 class="h1">{{ titleicon }}</h1>
    <p class="width-p">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  titleicon: String,
  description: String,
});
</script>
