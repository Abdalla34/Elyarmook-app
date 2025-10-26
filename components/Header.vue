<template>
  <div class="header-parent">
    <div
      class="container p-2 d-flex justify-content-between align-items-center pt-3"
    >
      <div class="logo d-flex align-items-center gap-3 position-relative">
        <div class="image-logo" @click="navigateTo(localePath('/'))">
          <img class="width-image" src="/Yarmook Logo.png" alt="Logo" />
        </div>
      </div>

      <div class="profile-ds">
        <div
          class="profile-card d-flex justify-content-center align-items-center gap-2"
        >
          <div
            class="background-color-cart position-relative d-flex align-items-center justify-content-center"
            @click="navigateTo($localePath('/cart'))"
          >
            <button class="buttons">
              <PuplicIconCartIcon />
            </button>
            <span v-if="cartCount > 0" class="span-length">
              {{ cartCount }}
            </span>
          </div>

          <div>
            <div
              class="background-color-cart d-flex align-items-center justify-content-center"
              @click="navigateTo($localePath('/my-cars'))"
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
              @click="navigateTo($localePath('/profile'))"
              v-if="!token"
              class="icon-user login"
              style="cursor: pointer"
            >
              <i class="fa-solid fa-user fa-2x"></i>
            </div>
            <div
              v-if="token"
              @click="navigateTo('/profile')"
              class="background-color-cart d-flex align-items-center justify-content-center position-relative"
            >
              <button class="buttons">
                <img
                  class="profile-img z-index-after"
                  src="/public/img-icon.jpg"
                  alt="imgProfile"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath();
const token = useCookie("token");
const { defaultCar, fetchMyCars } = useMyCars();

onMounted(() => {
  fetchMyCars();
});

watch(
  () => token.value,
  () => {
    fetchMyCars();
  }
);
const cartCount = useState("cartCount", () => 0);
</script>

<style scoped>
@import "@/assets/css/header.css";

.menu-profile-log {
  position: absolute;
  top: 80px;
  right: 0;
  width: 250px;
  height: 150px;
  padding: 16px 0;
  background-color: #eee;
  border-radius: 36px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  z-index: 9999 !important;
  margin-bottom: 10px;
}

.login {
  padding: 10px 21px;
  background-color: var(--color-secound-main);
  width: -moz-fit-content;
  width: fit-content;
  border-radius: 11px;
  font-weight: bold;
  text-align: center;
  position: relative;
  top: 50%;
  transition: all 0.3s;
}

.login:hover {
  background-color: #b7b7b9;
  transform: scale(0.9);
}

.span-length {
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
}
.bmw-img {
  width: 40px;
}
</style>
