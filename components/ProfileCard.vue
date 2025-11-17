<template>
  <div class="profile-ds">
    <div
      class="profile-card d-flex justify-content-center align-items-center gap-2"
    >
      <div>
        <div
          class="background-color-cart d-flex align-items-center justify-content-center"
          @click="
            navigateTo($localePath(`/my-cars?redirect=${route.fullPath}`))
          "
        >
          <button v-if="token" class="buttons">
            <img
              class="bmw-img z-index-after"
              :src="defaultCar?.brand?.image"
              alt=""
            />
          </button>
          <button v-if="!token" class="buttons">
            <PuplicIconCarIcon />
          </button>
        </div>
      </div>

      <div class="position-relative">
        <div
          @click="
            navigateTo($localePath(`/profile?redirect=${route.fullPath}`))
          "
          v-if="!token"
          class="icon-user login"
          style="cursor: pointer"
        >
          <i class="fa-solid fa-user fa-2x"></i>
        </div>
        <div
          v-if="token"
          @click="
            navigateTo($localePath(`/profile?redirect=${route.fullPath}`))
          "
          class="background-color-cart d-flex align-items-center justify-content-center position-relative"
        >
          <button class="buttons">
            <i class="fa-solid fa-user-check fa-2x" style="color: #28a745"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const token = useCookie("token");
const route = useRoute();
const { defaultCar, fetchMyCars } = useMyCars();

onMounted(() => {
  fetchMyCars();
});
</script>

<style scoped>
.profile-img {
  width: 64px;
  padding: 5px;
  border-radius: 16px;
  height: 64px;
}
.buttons {
  border: none;
}
.bmw-img {
  width: 21px;
}
.background-color-cart {
  background-color: rgba(255, 249, 212, 1);
  height: 64px;
  width: 64px;
  border-radius: 16px;
  padding: 20px;
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
}

.background-color-cart:hover {
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 230, 84, 0.4);
  background-color: var(--main-color);
}

.background-color-cart::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
  width: 0;
  height: 0;
  transition: all 0.4s ease;
  z-index: 0;
}

.background-color-cart:hover::after {
  width: 100px;
  height: 100px;
}

.buttons {
  border: none;
  background: transparent;
  transition: transform 0.2s ease;
  z-index: 2;
  position: relative;
}

.buttons:hover {
  transform: scale(1.04);
}

.z-index-after {
  position: relative;
  z-index: 2;
  transition: all 0.2s ease;
}

.profile-img,
.bmw-img {
  transition: all 0.3s ease;
}

.profile-img:hover,
.bmw-img:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}
.span-length {
  position: absolute;
  background-color: red;
  border-radius: 50%;
  padding: 8px;
  left: 0%;
  top: 0px;
  z-index: 10;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: white;
  font-weight: bold;
}
</style>
