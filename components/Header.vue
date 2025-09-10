<template>
  <div class="header-parent">
    <div
      class="container p-2 d-flex justify-content-between align-items-center pt-3"
    >
      <div class="logo d-flex align-items-center gap-3 position-relative">
        <div class="image-logo" @click="navigateTo('/')">
          <img class="width-image" src="/Yarmook Logo.png" alt="Logo" />
        </div>

        <div class="search position-relative">
          <input
            type="text"
            placeholder="search"
            class="text-capitalize focus-input fw-600 input-search border-radius-36px"
          />
          <PuplicIconSearch class="icon-search position-absolute" />
        </div>
      </div>

      <div class="profile-ds">
        <div
          class="profile-card d-flex justify-content-center align-items-center gap-2"
        >
          <div
            class="background-color-cart position-relative d-flex align-items-center justify-content-center"
            @click="navigateTo('/cart')"
          >
            <button class="buttons">
              <PuplicIconCartIcon />
            </button>
            <span v-if="cartLength > 0" class="span-length">{{
              cartLength
            }}</span>
          </div>

          <div
            class="background-color-cart d-flex align-items-center justify-content-center"
            @click="navigateTo('/my-cars')"
          >
            <button class="buttons">
              <img class="bmw-img z-index-after" src="/public/BMW.png" alt="" />
            </button>
          </div>

          <div class="position-relative">
            <div
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

              <!-- <div class="menu-profile-log">
                <div class="login">login</div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// const { getMyCart } = useApi()

// const cartLength = ref(0)

// onMounted(async () => {
//   try {
//     const res = await getMyCart()
//     cartLength.value = res?.data?.services?.length || 0
//   } catch (err) {
//     console.error("Error loading cart:", err)
//     cartLength.value = 0
//   }
// })
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
  padding: 10px 60px;
  background-color: var(--main-color);
  width: fit-content;
  margin: auto auto 10px;
  border-radius: 20px;
  color: var(--colo-black);
  font-weight: bold;
  text-align: center;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
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
</style>
