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
            class="text-capitalize focus-input fw-600 p-1"
          />
          <i class="fa-solid fa-magnifying-glass icon position-absolute"></i>
        </div>
      </div>
      <div
        class="profile-card d-flex justify-content-center align-items-center gap-2"
      >
        <i
          class="fa-solid fa-cart-shopping fa-1x d-flex align-items-center justify-content-center background-color-cart"
        ></i>
        <div
          class="background-color-cart d-flex align-items-center justify-content-center"
        >
          <img class="bmw-img" src="/public/BMW.png" alt="" />
        </div>
        <div
          class="background-color-cart d-flex align-items-center justify-content-center"
        >
          <img class="profile-img" src="/public/profile.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.width-image {
  width: 80px;
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
.icon {
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
.background-color-cart {
  background-color: rgba(255, 249, 212, 1);
  border-radius: 10px;
  height: 50px;
  width: 55px;
  padding: 7px;
}
.bmw-img {
  width: 21px;
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
</style>
