<template>
  <div class="footer p-5 text-light">
    <div class="container">
      <div class="row hand d-flex text-md-start">
        <!-- Logo + Download + Contact -->
        <div class="col-lg-3 col-md-6 col-12 logo">
          <img
            src="/Yarmook Logo (1).png"
            alt="Yarmook Logo"
            class="img-fluid mb-3"
          />
          <p class="text-light mb-3">{{ $t("Download our app") }}</p>
          <div class="icons-link d-flex flex-wrap justify-content-end gap-2">
            <div
              class="google d-flex align-items-center gap-2 ps-3 pe-3 pt-2 pb-2 box-style"
            >
              <img class="icon" src="/Google-logo.png" alt="Google" />

              <a
                style="text-decoration: none; color: white"
                class="text-capitalize span"
                :href="getSettings?.android_customer_app"
                target="_blank"
                >{{ $t("Google Play") }}</a
              >
            </div>
            <div
              class="apple d-flex align-items-center gap-2 ps-3 pe-3 pt-2 pb-2 box-style"
            >
              <img class="icon" src="/Apple-logo.png" alt="Apple" />

              <a
                style="text-decoration: none; color: white"
                class="text-capitalize span"
                :href="getSettings?.ios_customer_app"
                target="_blank"
                >{{ $t("App Store") }}</a
              >
            </div>
          </div>
          <div class="contact-us mt-4">
            <h6 class="text-capitalize">{{ $t("Contact Us") }}:</h6>
            <p class="mt-2 num">{{ getSettings.mobile }}</p>
            <p class="days">{{ $t("Everyday") }} 8 am - 12 am</p>
          </div>
        </div>
        <!-- links  -->
        <div class="col-lg-2 col-md-3 col-sm-12">
          <h6 class="text-capitalize mb-3 font-size-title">
            {{ $t("Links") }}
          </h6>
          <ul class="list-unstyled">
            <li class="pt-1">
              <NuxtLink class="font-size-16px" :to="$localePath('/')">{{
                $t("Home")
              }}</NuxtLink>
            </li>
            <li class="pt-1">
              <NuxtLink class="font-size-16px" :to="$localePath('services')">{{
                $t("services")
              }}</NuxtLink>
            </li>
            <li class="pt-1">
              <NuxtLink
                class="font-product"
                :to="$localePath('/spare-parts')"
                >{{ $t("spare-parts") }}</NuxtLink
              >
            </li>
            <li class="pt-1">
              <NuxtLink class="font-size-16px" :to="$localePath('/offers')">{{
                $t("offers")
              }}</NuxtLink>
            </li>
            <li class="pt-1" v-if="token">
              <NuxtLink
                class="font-size-16px"
                :to="$localePath('/membership')"
                >{{ $t("membership") }}</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div class="col-lg-2 col-md-3 col-sm-12">
          <h6 class="text-capitalize mb-3 font-size-title">
            {{ $t("About Us") }}
          </h6>

          <span class="font-size-16px text-capitalize">
            {{ $t("About Us DescriptioN Visit our information website") }}
          </span>

          <a
            href="https://yarmok.co/ar"
            target="_blank"
            rel="noopener noreferrer"
            class="about-link"
          >
            https://yarmok.co
          </a>
        </div>

        <div class="col-lg-2 col-md-3 col-sm-12">
          <h6 class="text-capitalize mb-3 font-size-title">{{ $t("Help") }}</h6>
          <p
            @click="navigateTo($localePath('/faq'))"
            class="pt-1 font-size-16px text-uppercase"
          >
            {{ $t("faq") }}
          </p>
          <p
            @click="navigateTo($localePath('/fill-form'))"
            class="pt-1 font-size-16px"
          >
            {{ $t("Contact Us") }}
          </p>
          <p class="pt-1 font-size-16px">{{ $t("WhatsApp") }}</p>
        </div>

        <div class="col-lg-2 col-md-3 col-sm-12">
          <h6 class="text-capitalize mb-3 font-size-title">
            {{ $t("social Media") }}
          </h6>
          <div
            class="d-flex gap-2 align-items-center justify-content-start gap-4"
          >
            <div class="box-hover-icons">
              <PuplicIconFacebook />
            </div>
            <div
              class="box-hover-icons"
              :class="{ disabled: !getSettings?.instagram }"
              @click="
                getSettings?.instagram && navigateToFn(getSettings.instagram)
              "
            >
              <PuplicIconInstagramIcon />
            </div>
            <div class="box-hover-icons">
              <PuplicIconWhatsApp />
            </div>
          </div>

          <div class="accpet">
            <h6 class="text-capitalize mb-3 font-size-title mt-2 text-center">
              {{ $t("we accept") }}
            </h6>
            <button class="button-visa">
              <img src="/tamara.png" alt="" />
            </button>
            <button class="button-visa">
              <img src="/tabby.png" alt="" />
            </button>
            <button class="button-visa">
              <img src="/mada.png" alt="" />
            </button>
            <button class="button-visa">
              <img src="/master_card.png" alt="" />
            </button>
            <button class="button-visa">
              <img src="/visa.png" alt="" />
            </button>
            <button class="button-visa">
              <img src="/pay.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const token = useCookie("token");
const getSettings = ref({});
const resSettings = await useApi().getSettings();
getSettings.value = resSettings?.data?.settings || {};
const navigateToFn = (link) => {
  if (!link) return;
  window.open(link, "_blank");
};
</script>

<style scoped>
p {
  padding: 0px;
  margin: 0px;
}

.contact-us h6 {
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0%;
}
.contact-us .num {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}

.days {
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0%;
  color: #fcfcfc;
}

.footer {
  background-color: #1e1e1e;
}

.font-size-title {
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0%;
}

.logo img {
  max-width: 100px;
  height: auto;
  transition: all 0.3s ease;
  cursor: pointer;
}

.logo img:hover {
  transform: scale(1.1) rotate(5deg);
  filter: brightness(1.2) drop-shadow(0 4px 8px rgba(255, 230, 84, 0.4));
}

.box-style {
  background-color: #040505;
  border-radius: 20px;
  border: 1px solid white;
  width: fit-content;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.box-style:hover {
  transform: scale(1.05) translateY(-2px);
  color: #040505;
}

.box-style:hover .span {
  color: #040505;
  font-weight: 600;
}

.icon {
  width: 15px;
}

.work-time {
  margin-top: -5px;
}

ul li a {
  font-family: var(--font-main);
  color: white;
  transition: all 0.3s ease;
  position: relative;
  padding: 5px 0;
  display: inline-block;
}

ul li a:hover {
  color: var(--main-color);
  transform: translateX(5px);
  text-shadow: 0 2px 4px rgba(255, 230, 84, 0.3);
}

ul li a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--main-color);
  transition: width 0.3s ease;
}

ul li a:hover::after {
  width: 100%;
}

.font-size-16px {
  font-size: 16px;
}

.button-visa {
  background-color: #ffffff;
  border-radius: 5px;
  border: none;
  width: 50px;
  height: 21px;
  margin-bottom: 10px;
  margin-left: 10px;
}

.button-visa:hover {
  transform: scale(1.1);
}

/* Social media and other text links */
.col-lg-2 p {
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  padding: 2px 0;
}

.col-lg-2 p:hover {
  color: var(--main-color);
  transform: translateX(3px);
  text-shadow: 0 2px 4px rgba(255, 230, 84, 0.3);
}

/* Medium Screens */
@media (max-width: 992px) {
  .hand {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: flex-start;
  }

  .hand > div {
    width: 45%;
    margin-bottom: 1rem;
  }

  .icons-link {
    flex-direction: column;
    align-items: flex-start;
  }

  .box-style {
    width: 100%;
    justify-content: flex-start;
  }

  .span {
    font-size: 13px;
  }
}

/* Small Screens */
@media (max-width: 576px) {
  .hand {
    flex-direction: column;
    align-items: flex-start;
    text-align: start;
  }

  .hand > div {
    width: 100%;
  }

  .icons-link {
    align-items: flex-start;
  }

  .box-style {
    justify-content: flex-start;
  }

  .span {
    font-size: 11px;
  }
  .box-style {
    width: 150px;
  }
}
.about-link {
  display: block;
  margin-top: 5px;
  color: var(--main-color);
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s;
  opacity: 0.6;
}

.about-link:hover {
  text-decoration: underline;
  opacity: 1;
}
</style>
