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
          <IconSearch class="icon-search position-absolute" />
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
              <CarIconCard />
            </button>
            <!-- <span class="span-length">50</span> -->
          </div>
          <div
            class="background-color-cart d-flex align-items-center justify-content-center"
            @click="navigateTo('/mycars')"
          >
            <button class="buttons">
              <img class="bmw-img z-index-after" src="/public/BMW.png" alt="" />
            </button>
          </div>
          <div
            class="background-color-cart d-flex align-items-center justify-content-center"
          >
            <button class="buttons">
              <img
                class="profile-img z-index-after"
                src="/public/img-icon.jpg"
                alt=""
                @click="navigateTo('/personalInformation')"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const { getMyCart } = useApi();

// const cartLength = ref(0);

// onMounted(async () => {
//   try {
//     const res = await getMyCart();
//     cartLength.value = res?.data?.services?.length || 0;
//   } catch (err) {
//     console.error("Error loading cart:", err);
//     cartLength.value = 0;
//   }
// });
</script>

<style scoped>
@import "@/assets/css/header.css";
</style>
