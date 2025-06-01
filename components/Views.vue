<template>
  <div class="container px-2 links">
    <div class="row">
      <div class="col-12 mt-4">
        <div class="links-wrapper">
          <ul class="d-flex align-items-center flex-nowrap ul-justify">
            <li class="">
              <NuxtLink
                to="/"
                class="d-flex gap-1 align-items-center color-text"
                exact-active-class="active"
              >
                <i class="fa-solid fa-house"></i>
                <h6 class="text-capitalize link-sm">home</h6>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/myOrders"
                class="d-flex gap-1 align-items-center justify-content-center color-text"
                exact-active-class="active"
              >
                <i class="fa-solid fa-bag-shopping"></i>
                <h6 class="text-capitalize link-sm">my orders</h6>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/offers"
                class="d-flex gap-1 align-items-center color-text"
                exact-active-class="active"
              >
                <i class="fa-solid fa-tags"></i>
                <h6 class="text-capitalize link-sm">offers</h6>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/services"
                class="d-flex gap-1 align-items-center color-text"
                exact-active-class="active"
              >
                <i class="fa-solid fa-wrench"></i>
                <h6 class="text-capitalize link-sm">services</h6>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/spareParts"
                class="d-flex gap-1 align-items-center color-text"
                exact-active-class="active"
              >
                <i class="fa-solid fa-cogs"></i>
                <h6 class="text-capitalize link-sm">spare parts</h6>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.links-wrapper {
  overflow-x: auto;
  white-space: nowrap;
}
.links-wrapper::-webkit-scrollbar {
  display: none;
}
.active {
  color: #040505;
  background-color: var(--main-color);
  padding: 7px 8px;
  border-radius: 20px;
  font-weight: 500;
}
.ul-justify {
  justify-content: center;
  gap: 20px;
}
ul li a {
  color: #7e7e7e;
}
@media (max-width: 576px) {
  .link-sm {
    font-size: 12px;
  }
  i {
    font-size: 12px;
  }
  .ul-justify {
    justify-content: start;
    gap: 5px;
  }
}
</style>
