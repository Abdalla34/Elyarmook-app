<template>
  <div class="header-parent">
    <div
      class="container p-2 d-flex justify-content-between align-items-center pt-3"
    >
      <div class="logo d-flex align-items-center gap-3 position-relative">
        <div class="image-logo">
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
            @click="navigateTo('/myCars')"
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
/* start logo card */
.header-parent {
  background-color: #ffffff;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 5px; 
}
.width-image {
  width: 120px;
  height: 48px;
  transition: transform 0.3s ease, filter 0.3s ease;
  cursor: pointer;
}
.width-image:hover {
  transform: scale(1.1) rotate(5deg);
  filter: brightness(1.1) drop-shadow(0 4px 8px rgba(255, 230, 84, 0.4));
}
.search {
  width: 339px;
}
.input-search {
  max-width: 100%;
  padding: 20px 262px 20px 20px;
  transition: all 0.3s ease;
  background-color: #f7f7fc;
}
.focus-input {
  border: none;
  background-color: rgba(247, 242, 244, 1);
  transition: all 0.3s ease;
}
.focus-input:hover {
  box-shadow: 0 4px 15px rgba(255, 230, 84, 0.2);
  transform: translateY(-1px);
}
.focus-input:focus {
  transform: translateY(-2px);
  outline: 2px solid var(--main-color);
}
.focus-input::placeholder {
  color: #939393;

  font-size: 16px;
  font-weight: 400;
  font-family: var(--font-main);
}
.focus-input:focus {
  border: none;
  outline: none;
}
.icon-search {
  right: 20px;
  top: 50%;
  transform: translatey(-50%);
  color: #939393;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon-search:hover {
  color: blac;
  transform: translateY(-50%) scale(1.2);
}

.profile-ds {
  display: flex;
}

@media (max-width: 576px) {
  .search {
    display: none;
  }
}

@media (max-width: 768px) {
  .search {
    display: none;
  }
  .profile-ds {
    display: none;
  }
}

/* start prfile card */
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
  /* overflow: hidden; */
  z-index: 1;
  cursor: pointer;
}

.background-color-cart:hover {
  transform: scale(1.01) translateY(-1px);
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
  transform: scale(1.03);
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

@media (max-width: 768px) {
  .profile-card {
    display: none;
  }
}

.span-length {
  position: absolute;
  background-color: var(--main-color);
  border-radius: 50%;
  padding: 8px;
  left: 0%;
  top: -16px;
  z-index: 10;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: black;
  font-weight: bold;
}
</style>
