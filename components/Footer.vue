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
          <p class="text-light mb-3">Download our app</p>
          <div class="icons-link d-flex flex-wrap justify-content-start gap-2">
            <div
              class="google d-flex align-items-center gap-2 ps-3 pe-3 pt-2 pb-2 box-style"
            >
              <img class="icon" src="/Google-logo.png" alt="Google" />
              <span class="text-capitalize span">Google Play</span>
            </div>
            <div
              class="apple d-flex align-items-center gap-2 ps-3 pe-3 pt-2 pb-2 box-style"
            >
              <img class="icon" src="/Apple-logo.png" alt="Apple" />
              <span class="text-capitalize span">App Store</span>
            </div>
          </div>
          <div class="contact-us mt-4">
            <h6 class="text-capitalize">Contact us:</h6>
            <p class="mt-2">0123456789</p>
            <p class="color-parag text-light">Everyday 8 am - 12 am</p>
          </div>
        </div>

        <div class="col-lg-2 col-md-3 col-sm-12">
          <h6 class="text-capitalize mb-3">Links</h6>
          <ul class="list-unstyled">
            <li class="pt-1"><NuxtLink to="/">Home</NuxtLink></li>
            <li class="pt-1"><NuxtLink to="/services">Services</NuxtLink></li>
            <li class="pt-1">
              <NuxtLink to="/SpareParts">Spare Parts</NuxtLink>
            </li>
            <li class="pt-1"><NuxtLink to="/offers">Offers</NuxtLink></li>
            <li class="pt-1"><NuxtLink to="/">Membership</NuxtLink></li>
          </ul>
        </div>

        <div class="col-lg-2 col-md-3 col-sm-12">
          <h6 class="text-capitalize mb-3">Products</h6>
          <p class="pt-1">Product 1</p>
          <p class="pt-1">Product 2</p>
          <p class="pt-1">Product 3</p>
          <p class="pt-1">Product 4</p>
        </div>

        <div class="col-lg-2 col-md-3 col-sm-12">
          <h6 class="text-capitalize mb-3">Help</h6>
          <p class="pt-1">FAQ</p>
          <p class="pt-1">Contact Us</p>
          <p class="pt-1">WhatsApp</p>
        </div>

        <div class="col-lg-2 col-md-3 col-sm-12">
          <h6 class="text-capitalize mb-3">Follow Us</h6>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Twitter</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  padding: 0px;
  margin: 0px;
}

.footer {
  background-color: #1e1e1e;
}

.logo img {
  max-width: 100px;
  height: auto;
}

.box-style {
  background-color: #040505;
  border-radius: 20px;
  border: 1px solid white;
  width: fit-content;
}

.icon {
  width: 15px;
}

.work-time {
  margin-top: -5px;
}

ul li a {
  color: white;
}

ul li a:hover {
  opacity: 0.6;
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
    width: 150px
  }
}
</style>
