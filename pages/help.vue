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

              <!-- fil name -->
              <div class="help margin-bottom-24px box-pages">
                <div class="help-box" @click="navigateTo('fillName')">
                  <div
                    class="help-detalis d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <FillNameIcon />
                      <div class="details">Fill a Form</div>
                    </div>
                    <div class="Arrow">
                      <ArrowRight />
                    </div>
                  </div>
                </div>
              </div>

              <!-- fa1 -->
              <div class="help margin-bottom-24px box-pages">
                <div class="help-box" @click="navigateTo('faqFromHelp')">
                  <div
                    class="help-detalis d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <FAQ />
                      <div class="details">FAQ</div>
                    </div>
                    <div class="Arrow">
                      <ArrowRight />
                    </div>
                  </div>
                </div>
              </div>

              <!-- contact us -->
              <div class="help margin-bottom-24px box-pages">
                <div class="help-box" @click="navigateTo('contactUs')">
                  <div
                    class="help-detalis d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <callUs />
                      <div class="details">Call Us</div>
                    </div>
                    <div class="Arrow">
                      <ArrowRight />
                    </div>
                  </div>
                </div>
              </div>

              <!-- visit branch -->
              <div class="help margin-bottom-24px box-pages">
                <div class="help-box" @click="navigateTo('ourBranches')">
                  <div
                    class="help-detalis d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <Branch />
                      <div class="details">Visit Your Nearest Branch</div>
                    </div>
                    <div class="Arrow">
                      <ArrowRight />
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
