<template>
  <div>
    <div>
      <ProfileDetails />
      <div class="help margin-280px">
        <div class="container">
          <div class="row">
            <div class="col-md-8  col-padding">
              <h1 class="margin-bottom-24px text-capitalize title-pages">
                {{ $t("Help") }}
              </h1>

              <!-- fill name -->
              <div class="help margin-bottom-24px box-pages">
                <div
                  class="help-box"
                  @click="navigateTo($localePath('/fill-form'))"
                >
                  <div
                    class="help-detalis d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <PuplicIconFillName />
                      <div class="details">{{ $t("Fill a Form") }}</div>
                    </div>
                    <div class="Arrow">
                      <PuplicIconArrowRight />
                    </div>
                  </div>
                </div>
              </div>

              <!-- fa1 -->
              <div class="help margin-bottom-24px box-pages">
                <div
                  class="help-box"
                  @click="navigateTo($localePath('faq-from-help'))"
                >
                  <div
                    class="help-detalis d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <PuplicIconFAQ />
                      <div class="details text-uppercase">{{ $t("faq") }}</div>
                    </div>
                    <div class="Arrow">
                      <PuplicIconArrowRight />
                    </div>
                  </div>
                </div>
              </div>

              <!-- contact us -->
              <div class="help margin-bottom-24px box-pages">
                <div class="help-box">
                  <a :href="`tel:${getsettings.mobile}`" class="call-link">
                    <div
                      class="help-detalis d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex align-items-center gap-2">
                        <PuplicIconCallUs />
                        <div class="d-flex flex-column">
                          <h1 class="details text-uppercase">
                            {{ $t("call us") }}
                          </h1>
                          <p class="p-color-fs">{{ getsettings.mobile }}</p>
                        </div>
                      </div>
                      <div class="Arrow">
                        <PuplicIconArrowRight />
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <!-- visit branch -->
              <div class="help margin-bottom-24px box-pages">
                <div class="help-box" @click="navigateTo(localePath('/map'))">
                  <div
                    class="help-detalis d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <PuplicIconBranch />
                      <div class="details">
                        {{ $t("Visit Your Nearest Branch") }}
                      </div>
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
const localePath = useLocalePath();
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

.call-link {
  display: block;
  text-decoration: none;
  color: inherit;
}
.call-link:hover {
  opacity: 0.9;
}
</style>
