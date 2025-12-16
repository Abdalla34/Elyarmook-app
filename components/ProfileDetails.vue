<template>
  <div class="links-profile margin-bottom-40px">
    <div class="container links">
      <div class="row">
        <div class="col-10 col-sm-12">
          <div class="pages mb-4 border-radius-36px profile-scroll-container">
            <ul class="links d-flex align-items-end ul">
              <li v-if="token" class="">
                <NuxtLink
                  :to="$localePath('/profile')"
                  exact-active-class="active"
                  class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                >
                  <PuplicIconProfileIcon />
                  <h6 class="text-capitalize link-sm">{{ $t("profile") }}</h6>
                </NuxtLink>
              </li>
              <li v-if="token" class="border-radius-36px">
                <NuxtLink
                  :to="$localePath('/my-cars')"
                  exact-active-class="active"
                  class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                >
                  <PuplicIconCarIcon />
                  <h6 class="text-capitalize link-sm">{{ $t("my cars") }}</h6>
                </NuxtLink>
              </li>
              <li v-if="token" class="">
                <NuxtLink
                  :to="$localePath('/wallet')"
                  exact-active-class="active"
                  class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                >
                  <PuplicIconWalletIcon />
                  <h6 class="text-capitalize link-sm">{{ $t("wallet") }}</h6>
                </NuxtLink>
              </li>
              <li class="">
                <NuxtLink
                  :to="$localePath('/language')"
                  exact-active-class="active"
                  class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                >
                  <PuplicIconLanguageIcon />
                  <h6 class="text-capitalize link-sm">{{ $t("language") }}</h6>
                </NuxtLink>
              </li>

              <li v-if="token" class="">
                <NuxtLink
                  :to="$localePath('/point')"
                  exact-active-class="active"
                  class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                >
                  <PuplicIconPointIcon />

                  <h6 class="text-capitalize link-sm">{{ $t("point") }}</h6>
                </NuxtLink>
              </li>

              <li v-if="token" class="">
                <NuxtLink
                  :to="$localePath('/vouchers')"
                  exact-active-class="active"
                  class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                >
                  <i class="fa-solid fa-ticket-simple"></i>
                  <h6 class="text-capitalize link-sm">{{ $t("vouchers") }}</h6>
                </NuxtLink>
              </li>

              <li class="">
                <NuxtLink
                  :to="$localePath('/help')"
                  exact-active-class="active"
                  class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                >
                  <PuplicIconHelpIcon />
                  <h6 class="text-capitalize link-sm">{{ $t("Help") }}</h6>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const token = useCookie("token");
const localePath = useLocalePath();
</script>

<style>
.margin-bottom-40px {
  margin-bottom: 40px;
}

.col-10 {
  width: 100%;
  margin: auto;
  padding-left: 0px !important;
  padding-right: 0px !important;
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
    display: block;
  }
  .profile-scroll-container {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    border-radius: 10px;
    scrollbar-width: thin;
  }

  .profile-scroll-container::-webkit-scrollbar {
    height: 6px;
  }

  .profile-scroll-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  .profile-scroll-container::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  .profile-scroll-container::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .ul {
    width: max-content;
    flex-wrap: nowrap;
    border-radius: 10px !important;
    background-color: #ffffff;
    padding: 12px 0px;
    gap: 12px !important;
  }

}

@media (max-width: 768px) {
  .pages {
    display: block;
  }

  .profile-scroll-container {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }

  .profile-scroll-container::-webkit-scrollbar {
    height: 6px;
  }

  .profile-scroll-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  .profile-scroll-container::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  .profile-scroll-container::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .ul {
    width: max-content;
    flex-wrap: nowrap;
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
