<template>
  <div
    class="profile-card d-flex justify-content-center align-items-center gap-2"
  >
    <div
      class="background-color-cart d-flex align-items-center justify-content-center"
    >
      <button class="buttons">
        <CarIconCard />
      </button>
    </div>
    <div
      class="background-color-cart d-flex align-items-center justify-content-center"
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
          @click="navigateTo('/profile')"
        />
      </button>
    </div>
  </div>
</template>
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

/* @media (max-width: 768px) {
  .profile-card {
    display: none;
  }
} */
</style>
