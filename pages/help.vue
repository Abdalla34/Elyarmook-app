<template>
  <div>
    <div>
      <ProfileDetails />
      <div class="help margin-280px">
        <div class="container">
          <div class="row">
            <div class="col-8 col-padding">
              <h1 class="margin-bottom-24px text-capitalize title-pages">
                help
              </h1>

              <!-- fill name -->
              <div class="help margin-bottom-24px box-pages">
                <div class="help-box" @click="navigateTo('fill-form')">
                  <div
                    class="help-detalis d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <PuplicIconFillName />
                      <div class="details">Fill a Form</div>
                    </div>
                    <div class="Arrow">
                      <PuplicIconArrowRight />
                    </div>
                  </div>
                </div>
              </div>

              <!-- fa1 -->
              <div class="help margin-bottom-24px box-pages">
                <div class="help-box" @click="navigateTo('faq-from-help')">
                  <div
                    class="help-detalis d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <PuplicIconFAQ />
                      <div class="details">FAQ</div>
                    </div>
                    <div class="Arrow">
                      <PuplicIconArrowRight />
                    </div>
                  </div>
                </div>
              </div>

              <!-- contact us -->
         <div class="help-box">
               <a
                :href="`tel:${getsettings.mobile}`"
                class="text-decoration-none"
              >
                <div
                  class="help-detalis d-flex justify-content-between align-items-center"
                >
                  <div class="d-flex align-items-center gap-2">
                    <PuplicIconCallUs />
                    <div class="d-flex flex-column">
                      <h1 class="details">Call Us</h1>
                      <p class="p-color-fs">{{ getsettings.mobile }}</p>
                    </div>
                  </div>
                  <div class="Arrow">
                    <PuplicIconArrowRight />
                  </div>
                </div>
              </a>
         </div>

              <!-- visit branch -->
              <div class="help margin-bottom-24px box-pages">
                <div class="help-box" @click="navigateTo('map')">
                  <div
                    class="help-detalis d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <PuplicIconBranch />
                      <div class="details">Visit Your Nearest Branch</div>
                    </div>
                    <div class="Arrow">
                      <PuplicIconArrowRight />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const getsettings = ref([]);
const resSettings = await useApi().getSettings();
getsettings.value = resSettings?.data?.settings;
console.log(getsettings.mobile, "getsettings");
</script>

<style scoped>
.margin-280px {
  margin-bottom: 240px;
}

.details {
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0%;
}
</style>
