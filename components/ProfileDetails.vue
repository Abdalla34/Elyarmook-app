<template>
  <div class="links-profile margin-bottom-40px">
    <div class="container px-2 links">
      <div class="row">
        <div class="col-10">
          <div class="pages border-radius-36px">
            <ul class="links d-flex justify-content-center align-items-end ul">
              <li class="">
                <NuxtLink
                  to="/profile"
                  exact-active-class="active"
                  class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                >
                  <PuplicIconProfileIcon />
                  <h6 class="text-capitalize link-sm">profile</h6>
                </NuxtLink>
              </li>
              <li class="border-radius-36px">
                <NuxtLink
                  to="/my-cars"
                  exact-active-class="active"
                  class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                >
                  <PuplicIconCarIcon />
                  <h6 class="text-capitalize link-sm">my cars</h6>
                </NuxtLink>
              </li>
              <li class="">
                <NuxtLink
                  to="/wallet"
                  exact-active-class="active"
                  class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                >
                  <PuplicIconWalletIcon />
                  <h6 class="text-capitalize link-sm">wallet</h6>
                </NuxtLink>
              </li>
              <li class="">
                <NuxtLink
                  to="/language"
                  exact-active-class="active"
                  class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                >
                  <PuplicIconLanguageIcon />
                  <h6 class="text-capitalize link-sm">language</h6>
                </NuxtLink>
              </li>

              <li class="">
                <NuxtLink
                  to="/point"
                  exact-active-class="active"
                  class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                >
                  <PuplicIconPointIcon />

                  <h6 class="text-capitalize link-sm">point</h6>
                </NuxtLink>
              </li>

              <li class="">
                <NuxtLink
                  to="/vouchers"
                  exact-active-class="active"
                  class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                >
                  <i class="fa-solid fa-ticket-simple"></i>
                  <h6 class="text-capitalize link-sm">vouchers</h6>
                </NuxtLink>
              </li>

              <li class="">
                <NuxtLink
                  to="/help"
                  exact-active-class="active"
                  class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                >
                  <PuplicIconHelpIcon />
                  <h6 class="text-capitalize link-sm">help</h6>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.margin-bottom-40px {
  margin-bottom: 40px;
}

.col-10 {
  width: 100%;
  margin: auto;
}

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
  background-color: rgba(247, 242, 244, 1);
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
  .margin-bottom-40px {
    margin-bottom: 0px;
  }
}

@media (min-width: 768px) and (max-width: 992px) {
  .link-sm {
    font-size: 11px;
  }
}
</style>
