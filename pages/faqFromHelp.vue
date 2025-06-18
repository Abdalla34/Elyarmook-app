<template>
  <div class="faq-page">
    <ProfileDetails />
    <div class="faq-help">
      <div class="container">
        <div class="row">
          <div class="col-8 col-padding">
            <div
              class="wllet-title d-flex align-items-center gap-2 margin-bottom-24px"
            >
              <div class="icon-width" @click="navigateTo('/help')">
                <i class="fa-solid fa-arrow-left-long"></i>
              </div>
              <h1 class="text-capitalize text">help > FAQ</h1>
            </div>

            <div
              class="box-main padding-left-25px box-pages d-flex align-items-center justify-content-between"
            >
              <div class="detalis">
                <h6 class="text-capitalize font-p fw-bold">title</h6>
                <p
                  class="font-p display-paragraph"
                  :class="{ 'd-block': isIconTrue }"
                >
                  Answer the frequently asked question in a simple sentence, a
                  longish paragraph, or even in a list.
                </p>
              </div>
              <div class="icon-arrow">
           
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let isIconTrue = ref(false);
</script>

<style scoped>
.padding-left-25px {
  padding-left: 30px;
}

.text {
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 25px;
  line-height: 38px;
  letter-spacing: 0%;
}

.faq-help {
  margin-bottom: 600px;
}

.icon-width {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.fa-solid {
  cursor: pointer;
  font-size: 16px;
  color: #7e7e7e;
  transition: all 0.3s ease;
}

.icon-width:hover .fa-solid {
  color: var(--color-black);
  transform: translateX(-4px) scale(2);
  animation: slideLeft 0.3s ease infinite;
}

.display-paragraph {
  display: none;
}

@keyframes slideLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-4px);
  }
}

@media (max-width: 576px) {
  .padding-left {
    padding-left: 0px;
  }
}
</style>
