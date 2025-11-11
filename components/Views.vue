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
                <!-- home -->
                <li class="">
                  <NuxtLink
                    :to="$localePath('/')"
                    exact-active-class="active"
                    class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                  >
                    <PuplicIconHome :isActive="$route.path === '/'" />
                    <h6 class="text-capitalize link-sm">{{ $t("Home") }}</h6>
                  </NuxtLink>
                </li>
                <!-- orders -->
                <li class="border-radius-36px">
                  <NuxtLink
                    :to="$localePath('/my-orders')"
                    exact-active-class="active"
                    class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                  >
                    <PuplicIconBagTic :isActive="$route.path === 'my-0rders'" />
                    <h6 class="text-capitalize link-sm">
                      {{ $t("my orders") }}
                    </h6>
                  </NuxtLink>
                </li>
                <!-- services -->
                <li class="">
                  <NuxtLink
                    :to="$localePath('/services')"
                    exact-active-class="active"
                    class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                  >
                    <PuplicIconServcesIcon
                      :isActive="$route.path === '/services'"
                    />
                    <h6 class="text-capitalize link-sm">
                      {{ $t("services") }}
                    </h6>
                  </NuxtLink>
                </li>
                <!-- offers  -->
                <li class="">
                  <NuxtLink
                    :to="$localePath('/offers')"
                    exact-active-class="active"
                    class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                  >
                    <PuplicIconOfferIcon
                      :isActive="$route.path === '/offers'"
                    />
                    <h6 class="text-capitalize link-sm">{{ $t("offers") }}</h6>
                  </NuxtLink>
                </li>
                <!-- membership -->
                <li v-if="token" class="">
                  <NuxtLink
                    :to="$localePath('/membership')"
                    exact-active-class="active"
                    class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                  >
                    <PuplicIconOfferIcon
                      :isActive="$route.path === '/membership'"
                    />
                    <h6 class="text-capitalize link-sm">
                      {{ $t("membership") }}
                    </h6>
                  </NuxtLink>
                </li>
                <!-- spare Part -->
                <li class="">
                  <NuxtLink
                    :to="$localePath('/spare-parts')"
                    exact-active-class="active"
                    class="d-flex align-items-center gap-1 border-radius-36px p-color-fs"
                  >
                    <PuplicIconSparePart
                      :isActive="$route.path === '/spare-parts'"
                    />
                    <h6 class="text-capitalize link-sm">
                      {{ $t("spare-parts") }}
                    </h6>
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
// import { useI18n, useLocalePath } from '#imports'
const token = useCookie("token");
</script>

<style scoped>
.ul {
  gap: 12px;
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

a svg path {
  fill: none;
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
  .ul {
    gap: 12px;
  }
}

@media (min-width: 768px) and (max-width: 992px) {
  .link-sm {
    font-size: 11px;
  }
}
</style>
