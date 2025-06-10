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
            type="search"
            placeholder="search"
            class="text-capitalize focus-input fw-600 p-2 input-search border-radius-36px"
          />
          <IconSearch class="icon-search position-absolute" />
        </div>
      </div>

      <div class="profile-ds">
        <ProfileCard />
      </div>
      
    </div>
  </div>
</template>
<script></script>
<style scoped>
.header-parent {
  background-color: #ffffff;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
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
.input-search {
  width: 339px;
  height: 64px;
  padding: 20px 262px 20px 20px;
  transition: all 0.3s ease;
  background-color: #f7f7fc;
}
.focus-input {
  width: 330px;
  border: none;
  background-color: rgba(247, 242, 244, 1);
  transition: all 0.3s ease;
}
.focus-input:hover {
  /* background-color: rgba(255, 255, 255, 0.9); */
  box-shadow: 0 4px 15px rgba(255, 230, 84, 0.2);
  transform: translateY(-1px);
}
.focus-input:focus {
  /* background-color: white; */
  /* box-shadow: 0 6px 20px rgba(255, 230, 84, 0.3); */
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
  .input-search {
    display: none;
  }
  .profile-ds {
    display: none;
  }
}
</style>
