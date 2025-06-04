<template>
  <div class="veiws-parent">
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
                  <!-- <i class="fa-solid fa-house"></i> -->
                  <IconHome />

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
  </div>
</template>
<style scoped>
.veiws-parent {
  display: flex;
  justify-content: center;
  padding: 5px 0;
  overflow-x: hidden;
  width: 45%;
  margin: auto;
}

.links-wrapper {
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  padding-bottom: 0px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
  white-space: nowrap;
}

.links-wrapper::-webkit-scrollbar {
  display: none;
}

.ul-justify {
  gap: 10px;
  justify-content: center;
  flex-wrap: nowrap;
  min-width: max-content;
}

ul li a {
  color: #7e7e7e;
  border-radius: 20px;
  transition: all 0.3s ease;
  transform: scale(1);
  position: relative;
  overflow: hidden;
}

.active {
  color: #040505;
  background-color: var(--main-color);
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 500;
}

ul li a:hover:not(.active) {
  color: #040505;
  background-color: rgba(var(--main-color-rgb, 255, 193, 7), 0.1);
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

ul li a:hover:not(.active)::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
  left: 100%;
}

ul li a:hover i,
ul li a:hover h6 {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

ul li a.active {
  transform: scale(1);
  box-shadow: none;
}

ul li a.active:hover {
  transform: scale(1);
}

ul li a i,
ul li a h6 {
  transition: transform 0.2s ease;
}

ul li a:focus {
  outline: 2px solid var(--main-color);
  outline-offset: 2px;
}

@media (max-width: 576px) {
  .link-sm {
    font-size: 12px;
  }
  i {
    font-size: 12px;
  }
  .ul-justify {
    justify-content: flex-start;
    gap: 6px;
  }

  ul li a:hover:not(.active) {
    transform: scale(1.02);
  }

  ul li a:hover i,
  ul li a:hover h6 {
    transform: translateY(-0.5px);
  }
  .veiws-parent {
    width: 100%;
  }
}
@media (min-width: 577px) and (max-width: 768px) {
  .veiws-parent {
    width: 100%;
    padding: 0 20px;
  }
}

/* من 769 لـ 992px - تابلت */
@media (min-width: 769px) and (max-width: 992px) {
  .veiws-parent {
    width: 80%;
    margin: auto;
  }
}

/* من 993 لـ 1200px - لابتوب */
@media (min-width: 993px) and (max-width: 1200px) {
  .veiws-parent {
    width: 70%;
    margin: auto;
  }
}

/* من 1201px وطالع - شاشات كبيرة */
@media (min-width: 1201px) {
  .veiws-parent {
    width: 60%;
    margin: auto;
  }
}
</style>
