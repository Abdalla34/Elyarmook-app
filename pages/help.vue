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
              <div
                @click="navigateToFn('fill-form', 'fillForm')"
                class="help margin-bottom-24px box-pages"
              >
                <div class="help-box">
                  <div
                    class="help-detalis d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <PuplicIconFillName />
                      <div class="details">{{ $t("Fill a Form") }}</div>
                    </div>
                    <div v-if="!loadingBox.fillForm" class="Arrow">
                      <PuplicIconArrowRight />
                    </div>
                    <div v-else class="Arrow">
                      <span
                        class="spinner-border spinner-border-sm text-success"
                        role="status"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- fa1 -->
              <div
                @click="navigateToFn('/faq', 'faq')"
                class="help margin-bottom-24px box-pages"
              >
                <div class="help-box">
                  <div
                    class="help-detalis d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <PuplicIconFAQ />
                      <div class="details text-uppercase">{{ $t("faq") }}</div>
                    </div>
                    <div v-if="!loadingBox.faq" class="Arrow">
                      <PuplicIconArrowRight />
                    </div>
                    <div v-else class="Arrow">
                      <span
                        class="spinner-border spinner-border-sm text-success"
                        role="status"
                      ></span>
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
              <div
                @click="navigateToFn('/map', 'map')"
                class="help margin-bottom-24px box-pages"
              >
                <div class="help-box">
                  <div
                    class="help-detalis d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <PuplicIconBranch />
                      <div class="details">
                        {{ $t("Visit Your Nearest Branch") }}
                      </div>
                    </div>
                    <div v-if="!loadingBox.map" class="Arrow">
                      <PuplicIconArrowRight />
                    </div>
                    <div v-else class="Arrow">
                      <span
                        class="spinner-border spinner-border-sm text-success"
                        role="status"
                      ></span>
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
const timeEndCach = 7 * 24 * 60 * 60 * 1000;
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
const loadingBox = ref({
  fillForm: false,
  faq: false,
  map: false,
});

function navigateToFn(path, key) {
  Object.keys(loadingBox.value).forEach((k) => (loadingBox.value[k] = false));
  loadingBox.value[key] = true;
  navigateTo(localePath(path));
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
@media (max-width: 576px) {
  .margin-280px {
    margin-bottom: 20px;
  }
}
</style>
