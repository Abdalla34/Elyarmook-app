<template>
  <div>
    <ProfileDetails />
    <div class="language">
      <div class="container">
        <div class="row">
          <div class="col-8 col-padding position-relative">
            <GoPageArrow title="language" :showIcon="false" />

            <!-- lang Arabic -->
            <div class="lang margin-bottom-24px box-pages">
              <div class="lang-box">
                <div
                  class="lang-detalis d-flex justify-content-between align-items-center"
                  :class="{ 'opacity-input-1': isArabic }"
                >
                  <div class="d-flex align-items-center gap-2">
                    <SoudiaIcon />
                    <h5 class="arabic">Arabic</h5>
                  </div>
                  <div class="input-check">
                    <input
                      type="checkbox"
                      :checked="isArabic"
                      @change="isArabic = true"
                      :disabled="isConfirmationOpen"
                      :class="{ 'opacity-input-1': isConfirmationOpen }"
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
                    <USA />
                    <h5 class="english">English</h5>
                  </div>
                  <div class="input-check">
                    <input
                      type="checkbox"
                      :checked="isEnglish"
                      @change="isEnglish = true"
                      :disabled="isConfirmationOpen"
                      :class="{ 'opacity-input-1': isConfirmationOpen }"
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
                <SoudiaIcon />
                <h6>Change Language to Arabic</h6>
                <p>Are you Sure to Change Language to Arabic?</p>
                <div
                  class="done margin-60px d-flex align-items-center justify-content-center gap-2"
                >
                  <div
                    class="cancel box-button text-capitalize"
                    @click="cancelArabic"
                  >
                    cancel
                  </div>
                  <div class="yes-change box-button text-capitalize">
                    yes,change
                  </div>
                </div>
              </div>
            </div>

            <!-- box English  -->
            <div
              class="box-checked border-radius-36px text-center"
              v-if="isEnglish"
            >
              <div class="isenglish transition">
                <USA />
                <h6>Change Language to English</h6>
                <p>Are you Sure to Change Language to English?</p>
                <div
                  class="done margin-60px d-flex align-items-center justify-content-center gap-2"
                >
                  <div
                    class="cancel box-button text-capitalize"
                    @click="cancelEnglish"
                  >
                    cancel
                  </div>
                  <div class="yes-change box-button text-capitalize">
                    yes,change
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
let isArabic = ref(false);
let isEnglish = ref(false);

const isConfirmationOpen = computed(() => isArabic.value || isEnglish.value);

function cancelArabic() {
  isArabic.value = false;
}
function cancelEnglish() {
  isEnglish.value = false;
}
</script>

<style scoped>
@import "./assets/css/language.css";
</style>
