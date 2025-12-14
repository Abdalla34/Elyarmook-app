<template>
  <div class="bar" ref="bottomBar">
    <div class="container">
      <div
        class="box-bar px-5 d-flex align-items-center justify-content-center gap-4 shadow-lg p-2 rounded-5 text-white"
      >
        <div class="box-bar-item" @click="navigateTo(localePath('/'))">
          <i class="fa-solid fa-house text-dark"></i>
        </div>
        <div class="box-bar-item" @click="navigateTo(localePath('/profile'))">
          <i class="fa-solid fa-user fa-1x text-dark"></i>
        </div>
        <div class="box-bar-item" @click="navigateTo(localePath('/my-cars'))">
          <i class="fa-solid fa-car text-dark"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const localePath = useLocalePath();
const bottomBar = ref(null);

const handleScroll = () => {
  if (window.scrollY > 50) {
    bottomBar.value.classList.add("show");
  } else {
    bottomBar.value.classList.remove("show");
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<style scoped>
.bar {
  display: none;
  position: fixed;
  bottom: 2%;
  left: 0;
  width: 100%;
  z-index: 999;

  opacity: 0;
  transform: translateY(100%);
  transition: all 0.4s ease;
}

.bar.show {
  opacity: 1;
  transform: translateY(0);
}
.box-bar {
  width: fit-content;
  margin: auto;
  background-color: var(--main-color);
  box-shadow: 20px 20px 25px rgba(0, 0, 0, 0.25);
}
@media (max-width: 768px) {
  .bar {
    display: block;
  }
}
</style>
