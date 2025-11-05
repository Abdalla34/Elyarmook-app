<template>
  <div>
    <div>
      <ProfileDetails />
      <div class="help margin-280px">
        <div class="container">
          <div v-if="skeleton" class="row">
            <SkeletonsHelpPageSkel />
          </div>
          <div v-else class="row">
            <div class="col-md-8 col-padding">
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
                  @click="navigateTo($localePath('faq'))"
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
const skeleton = ref(true);
const getsettings = ref([]);
const timeEndCach = 12 * 60 * 60 * 1000;
const localePath = useLocalePath();
const { getSettings } = useApi();

async function loadSettings() {
  const currentTime = Date.now();
  const cacheData = localStorage.getItem("settingsCache");

  if (cacheData) {
    const parsedData = JSON.parse(cacheData);
    if (currentTime - parsedData.timestamp < timeEndCach) {
      getsettings.value = parsedData.settings;
      skeleton.value = false;
    }
  }

  const resSettings = await getSettings();
  getsettings.value = resSettings?.data?.settings || [];
  skeleton.value = false;

  localStorage.setItem(
    "settingsCache",
    JSON.stringify({
      settings: getsettings.value,
      timestamp: currentTime,
    })
  );
}

onMounted(() => {
  loadSettings();
});
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
