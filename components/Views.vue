<template>
  <div>
    <div class="veiws-parent margin-bottom-24px">
      <div class="container px-2 links">
        <div class="row">
          <div class="col-12 mt-4">
            <div class="pages border-radius-36px">
              <ul
                class="links d-flex justify-content-center align-items-end ul"
              >
                <li class="">
                  <NuxtLink
                    to="/"
                    exact-active-class="active"
                    class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                  >
                    <iconHome />
                    <h6 class="text-capitalize link-sm">Home</h6>
                  </NuxtLink>
                </li>
                <li class="border-radius-36px">
                  <NuxtLink
                    to="/myOrders"
                    exact-active-class="active"
                    class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                  >
                    <BagTic />
                    <h6 class="text-capitalize link-sm">my orders</h6>
                  </NuxtLink>
                </li>
                <li class="">
                  <NuxtLink
                    to="/services"
                    exact-active-class="active"
                    class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                  >
                    <ServicesIcon />
                    <h6 class="text-capitalize link-sm">services</h6>
                  </NuxtLink>
                </li>
                <li class="">
                  <NuxtLink
                    to="/offers"
                    exact-active-class="active"
                    class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                  >
                    <OffersIcon />
                    <h6 class="text-capitalize link-sm">offers</h6>
                  </NuxtLink>
                </li>
                <li class="">
                  <NuxtLink
                    to="/spareParts"
                    exact-active-class="active"
                    class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                  >
                    <IconParts />
                    <h6 class="text-capitalize link-sm">spare Parts</h6>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
let boxOpen = ref(false);
function toogleBox() {
  boxOpen.value = !boxOpen.value;
}
</script>



<style scoped>

.ul {
  gap: 24px;
  background-color: #ffffff;
  width: fit-content;
  margin: auto;
  padding: 12px 32px;
  border-radius: 36px;
  box-shadow: 0px 0px 20px 0px #0000000a;
}

.ul li {
  height: 48px;
}

.ul li a {
  padding: 12px 16px;
  transition: all 0.4s ease;
  outline: none;
}

.active {
  background-color: var(--main-color);
  color: var(--color-black);
}

.ul li a:hover:not(.active) {
  color: var(--color-black);
  background-color: rgba(247, 242, 244, 1);
  transform: scale(1.03);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}


.ul-phone li {
  padding-top: 10px;
}

.ul-phone li a {
  padding: 10px;
}

.link-sm {
  margin-bottom: 0px;
  font-size: 16px;
}



@media (max-width: 576px) {
  .pages {
    display: none;
  }
}

@media (max-width: 768px) {
  .pages {
    display: none;
  }
}

@media (min-width: 768px) and (max-width: 992px) {
  .link-sm {
    font-size: 11px;
  }
}

</style>
