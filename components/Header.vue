<template>
  <div>
    <div
      class="container p-2 d-flex justify-content-between align-items-center pt-3"
    >
      <div class="logo d-flex align-items-center gap-1">
        <div class="image-logo">
          <img class="width-image" src="/Yarmook Logo.png" alt="" />
        </div>
        <div class="search position-relative">
          <input
            type="search"
            placeholder="search"
            class="text-capitalize focus-input fw-600 p-2 input-search"
          />
          <i class="fa-solid fa-magnifying-glass icon-search position-absolute"></i>
        </div>
      </div>
      <div
        class="profile-card d-flex justify-content-center align-items-center gap-2"
      >
        <div
          class="background-color-cart d-flex align-items-center justify-content-center"
        >
          <button class="buttons">
            <i
              class="fa-solid fa-cart-shopping fa-1x d-flex align-items-center justify-content-center z-index-after"
            ></i>
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
            <img class="profile-img z-index-after" src="/public/profile.jpg" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.width-image {
  width: 80px;
  transition: transform 0.3s ease, filter 0.3s ease;
  cursor: pointer;
}

.width-image:hover {
  transform: scale(1.1) rotate(5deg);
  filter: brightness(1.1) drop-shadow(0 4px 8px rgba(255, 230, 84, 0.4));
}

.input-search {
  width: 320px;
  transition: all 0.3s ease;
}

.focus-input {
  border-radius: 10px;
  border: none;
  background-color: rgba(247, 242, 244, 1);
  transition: all 0.3s ease;
}

.focus-input:hover {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 15px rgba(255, 230, 84, 0.2);
  transform: translateY(-1px);
}

.focus-input:focus {
  background-color: white;
  box-shadow: 0 6px 20px rgba(255, 230, 84, 0.3);
  transform: translateY(-2px);
  outline: 2px solid var(--main-color);
}
.focus-input::placeholder {
  color: (147, 147, 147, 1);
  font-weight: 500;
}
.focus-input:focus {
  border: none;
  outline: none;
}
.icon-search {
  width: 20px;
  right: 20px;
  top: 50%;
  transform: translatey(-50%);
  color: #939393;
  cursor: pointer;
}
.profile-img {
  width: 46px;
  height: 47px;
  border-radius: 10px;
}
.buttons {
  border: none;
}
.bmw-img {
  width: 21px;
}
.input-search {
  width: 320px;
}
.background-color-cart {
  background-color: rgba(255, 249, 212, 1);
  border-radius: 10px;
  height: 50px;
  width: 55px;
  padding: 7px;
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
  border-radius: 50%;
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
  transform: scale(1.1);
}

.z-index-after {
  position: relative;
  z-index: 2;
  transition: all 0.2s ease;
}

.profile-img, .bmw-img {
  transition: all 0.3s ease;
}

.profile-img:hover, .bmw-img:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.icon-search {
  transition: all 0.3s ease;
}

.icon-search:hover {
  color: var(--main-color);
  transform: translateY(-50%) scale(1.2);
}

@media (max-width: 576px) {
  .search {
    display: none;
  }
  .profile-img {
    width: 30px;
    height: 35px;
    border-radius: 10px;
  }
  .background-color-cart {
    background-color: rgba(255, 249, 212, 1);
    border-radius: 10px;
    height: 35px;
    width: 40px;
    padding: 7px;
  }
}
@media (max-width: 768px) {
  .input-search {
    display: none;
  }
}
</style>
