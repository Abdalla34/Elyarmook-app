<template>
  <div class="faq-page">
    <ProfileDetails />
    <div class="faq-help">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-padding">
            <GoPageArrow
              :title="$t('Help') + ' > ' + $t('faq')"
              :backPath="$localePath('/help')"
            />

            <div
              class="box-main padding-left-25px d-flex align-items-center justify-content-between box-hover-bg"
              v-for="item in faqs"
              :key="item.id"
              @click="toggleIcon(item.id)"
              :class="{ active: activeIndexes[item.id] }"
            >
              <!-- hover -->
              <div class="position-absolute bg-hover"></div>

              <div class="detalis position-relative z-index">
                <h6 class="text-capitalize font-p fw-bold">
                  {{ item.question }}
                </h6>
                <transition name="fade-slide">
                  <p
                    v-if="activeIndexes[item.id]"
                    class="font-p display-paragraph d-block"
                  >
                    {{ item.answer }}
                  </p>
                </transition>
              </div>

              <div class="icon-arrow position-relative z-index">
                <div
                  class="arrow-bottom"
                  :class="{ 'd-none': activeIndexes[item.id] }"
                >
                  <svg
                    class="font-icon"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="#7E7E7E"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>

                <div class="arrow-top" v-if="activeIndexes[item.id]">
                  <svg
                    class="font-icon"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 6.5L6 1.5L1 6.5"
                      stroke="#7E7E7E"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-center gap-3 mt-4">
              <button
                @click="handlePrev"
                class="btn"
                style="
                  background-color: var(--main-color);
                  border: none;
                  cursor: pointer;
                "
                :disabled="cuurentPage <= 1"
              >
                {{ $t("Prev") }}
              </button>
              <span class="align-self-center"
                >{{ $t("Page") }} {{ cuurentPage }}</span
              >

              <button
                @click="handleNext"
                class="btn"
                style="
                  background-color: var(--main-color);
                  border: none;
                  cursor: pointer;
                "
                :disabled="cuurentPage >= (faqs.value.paginate?.total_pages || 1)"
              >
                {{ $t("Next") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cuurentPage = ref(1);
let faqs = ref([]);
const { getFaqs } = useApi();

const timeEndCach = 12 * 60 * 60 * 1000;

const fetchFaq = async (page = 1) => {
  const cacheKey = `faqCache_page_${page}`;
  const cacheData = localStorage.getItem(cacheKey);
  const currentTime = Date.now();

  if (cacheData) {
    const parsedData = JSON.parse(cacheData);
    if (currentTime - parsedData.timestamp < timeEndCach) {
      faqs.value = parsedData.items;
    }
  }

  const res = await getFaqs(page);
  faqs.value = res?.data?.items || [];

  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      items: faqs.value,
      timestamp: currentTime,
    })
  );
};

async function handlePrev() {
  if (cuurentPage.value > 1) {
    cuurentPage.value--;
    let res = await getFaqs(cuurentPage);
    faqs.value = res?.data?.items;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
async function handleNext() {
  if ((cuurentPage.value >= 1) & faqs.paginate.total_pages) return;
  cuurentPage.value++;
  let res = await getFaqs(cuurentPage);
  faqs.value = res?.data?.items;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const activeIndexes = ref(faqs.value.map(() => false));

function toggleIcon(id) {
  activeIndexes.value[id] = !activeIndexes.value[id];
}
onMounted(() => {
  fetchFaq();
});
</script>

<style scoped>
@import "@/assets/css/faqfromhelp.css";
.btn:disabled{
  cursor: not-allowed;
}
</style>
