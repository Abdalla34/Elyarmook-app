<template>
  <div class="d-flex align-items-center gap-2 margin-bottom-24px">
    <div class="icon-width" v-if="showIcon" @click="navigateTo(backPath)">
      <i class="fa-solid fa-arrow-left-long"></i>
    </div>
    <h1 class="text-capitalize text title-pages">{{ title }}</h1>
  </div>
</template>

<script setup>

defineProps({
  title: String,

  showIcon: {
    type: Boolean,
    default: true,
  },

   backPath: {
    type: String,
    default: '',
  },

});
</script>

<style scoped>
.icon-width {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.fa-solid {
  cursor: pointer;
  font-size: 16px;
  color: #7e7e7e;
  transition: all 0.3s ease;
}

.icon-width:hover .fa-solid {
  color: var(--color-black);
  transform: translateX(-4px) scale(2);
  animation: slideLeft 0.3s ease infinite;
}

@keyframes slideLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-4px);
  }
}
</style>
