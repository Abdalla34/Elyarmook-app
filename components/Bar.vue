<template>
  <div class="bar" ref="bottomBar">
    <div class="containeer">
      <div
        class="box-bar px-3 d-flex align-items-center justify-content-between gap-3 shadow-lg p-2 rounded-1 text-white"
      >
        <div
          class="box-bar-item text-center"
          @click="navigateTo(localePath('/'))"
        >
          <PuplicIconHome :isActive="$route.path === '/'" />
          <p class="price-currency text-capitalize">{{ $t("Home") }}</p>
        </div>
        <div
          class="box-bar-item text-center"
          @click="navigateTo(localePath('/profile'))"
        >
          <i v-if="$route.path !== '/profile'" class="fa-regular fa-user"></i>
          <i v-else class="fa-solid fa-user fa-1x"></i>
          <p class="price-currency text-capitalize">{{ $t("profile") }}</p>
        </div>
        <div
          class="box-bar-item text-center"
          @click="navigateTo(localePath('/offers'))"
        >
          <PuplicIconOfferIcon :isActive="$route.path === '/offers'" />
          <p class="price-currency text-capitalize">{{ $t("offers") }}</p>
        </div>
        <div
          class="box-bar-item text-center"
          @click="navigateTo(localePath('/services'))"
        >
          <PuplicIconServcesIcon :isActive="$route.path === '/services'" />
          <p class="price-currency text-capitalize">{{ $t("services") }}</p>
        </div>
        <div
          class="box-bar-item text-center"
          @click="navigateTo(localePath('/my-cars'))"
        >
          <i v-if="$route.path === '/my-cars'" class="fa-solid fa-car"></i>
          <PuplicIconCarIcon v-else />
          <p class="price-currency text-capitalize font-important">
            {{ $t("my cars") }}
          </p>
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
  bottom: 0%;
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
  background-color: #fff;
  box-shadow: 40px 40px 45px rgba(0, 0, 0, 0.25);
}
.box-bar-item {
  color: #000;
}

@media (max-width: 768px) {
  .bar {
    display: block;
  }
}
</style>
