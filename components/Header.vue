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
}
.input-search {
  width: 320px;
}
.focus-input {
  border-radius: 10px;
  border: none;
  background-color: rgba(247, 242, 244, 1);
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
  transition: all 0.4s ease;
  overflow: hidden;
  z-index: 1;
  overflow: hidden;
}
.background-color-cart::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  background-color: var(--secound-color);
  width: 0;
  height: 0;
  opacity: 1;
  transition: all 0.4s ease;
}
.background-color-cart:hover::after {
  width: 100%;
  height: 100%;
  background-color: var(--main-color);
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
