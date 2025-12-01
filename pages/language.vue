<template>
  <div>
    <ProfileDetails />
    <div class="language position-relative">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-padding position-relative">
            <GoPageArrow :title="$t('language')" :showIcon="false" />

            <!-- lang Arabic -->
            <div class="lang margin-bottom-24px box-pages">
              <div class="lang-box">
                <div
                  class="lang-detalis d-flex justify-content-between align-items-center"
                  :class="{ 'opacity-input-1': isArabic }"
                >
                  <div class="d-flex align-items-center gap-2">
                    <PuplicIconSoudiaIcon />
                    <h5 class="arabic">{{ $t("Arabic") }}</h5>
                  </div>

                  <div class="input-check">
                    <input
                      class="inpuy-border"
                      type="checkbox"
                      :checked="checkedAr"
                      :disabled="checkedAr"
                      @click.prevent.stop="openArabicConfirm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- lang English -->
            <div class="lang margin-bottom-24px box-pages">
              <div class="lang-box">
                <div
                  class="lang-detalis d-flex justify-content-between align-items-center"
                  :class="{ 'opacity-input-1': isEnglish }"
                >
                  <div class="d-flex align-items-center gap-2">
                    <PuplicIconUSA />
                    <h5 class="english">{{ $t("English") }}</h5>
                  </div>

                  <div class="input-check">
                    <input
                      class="inpuy-border"
                      type="checkbox"
                      :checked="checkedEn"
                      :disabled="checkedEn"
                      @click.prevent.stop="openEnglishConfirm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- box Arabic -->
            <div
              class="box-checked border-radius-36px text-center"
              v-if="isArabic"
            >
              <div class="isarabic transition">
                <PuplicIconSoudiaIcon />
                <h6>{{ $t("Change Language to Arabic") }}</h6>
                <p>{{ $t("Are you Sure to Change Language to Arabic?") }}</p>

                <div
                  class="done margin-60px d-flex align-items-center justify-content-center gap-2"
                >
                  <div
                    class="cancel box-button text-capitalize"
                    @click="cancelArabic"
                  >
                    cancel
                  </div>

                  <div
                    class="yes-change box-button text-capitalize"
                    @click="ChangeToAr"
                  >
                    {{ $t("yes,change") }}
                  </div>
                </div>
              </div>
            </div>

            <!-- box English -->
            <div
              class="box-checked border-radius-36px text-center"
              v-if="isEnglish"
            >
              <div class="isenglish transition">
                <PuplicIconUSA />
                <h6>{{ $t("Change Language to English") }}</h6>
                <p>{{ $t("Are you Sure to Change Language to English?") }}</p>

                <div
                  class="done margin-60px d-flex align-items-center justify-content-center gap-2"
                >
                  <div
                    class="cancel box-button text-capitalize"
                    @click="cancelEnglish"
                  >
                    cancel
                  </div>

                  <div
                    class="yes-change box-button text-capitalize"
                    @click="ChangeToEn"
                  >
                    {{ $t("yes,change") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="over-lay" v-if="isArabic || isEnglish"></div>
</template>

<script setup>
let isArabic = ref(false);
let isEnglish = ref(false);

const { locale, setLocale } = useI18n();

const checkedAr = computed(() => locale.value === "ar");
const checkedEn = computed(() => locale.value === "en");


function openArabicConfirm() {
  if (!checkedAr.value) {
    isArabic.value = true;
  }
}


function openEnglishConfirm() {
  if (!checkedEn.value) {
    isEnglish.value = true;
  }
}

function cancelArabic() {
  isArabic.value = false;
}

function cancelEnglish() {
  isEnglish.value = false;
}

function ChangeToAr() {
  setLocale("ar");
  isArabic.value = false;
}

function ChangeToEn() {
  setLocale("en");
  isEnglish.value = false;
}
</script>


<style scoped>
@import "@/assets/css/language.css";
.disabled {
  cursor: not-allowed;
}
</style>
