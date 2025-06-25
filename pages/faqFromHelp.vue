<template>
  <div class="faq-page">
    <ProfileDetails />
    <div class="faq-help">
      <div class="container">
        <div class="row">
          <div class="col-8 col-padding">
            <GoPageArrow title="help > FAQ" backPath="/help" />

            <div
              class="box-main padding-left-25px d-flex align-items-center justify-content-between box-hover-bg"
              v-for="(item, index) in questions"
              :key="index"
              @click="toggleIcon(index)"
              :class="{ active: activeIndexes[index] }"
            >
             <!-- hover -->
              <div class="position-absolute bg-hover"></div>

              <div class="detalis position-relative z-index">
                <h6 class="text-capitalize font-p fw-bold">
                  {{ item.title }}
                </h6>
                <transition name="fade-slide">
                  <p
                    v-if="activeIndexes[index]"
                    class="font-p display-paragraph d-block"
                  >
                    {{ item.answer }}
                  </p>
                </transition>
              </div>

              <div class="icon-arrow position-relative z-index">
                <div
                  class="arrow-bottom"
                  :class="{ 'd-none': activeIndexes[index] }"
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
                <div class="arrow-top" v-if="activeIndexes[index]">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const questions = ref([
  {
    title: "title",
    answer:
      "Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.",
  },
  {
    title: "tilt",
    answer: "This is the second answer content.",
  },
  {
    title: "tilt",
    answer: "This is the second answer content.",
  },
  {
    title: "tilt",
    answer: "This is the second answer content.",
  },
]);

const activeIndexes = ref(questions.value.map(() => false));

function toggleIcon(index) {
  activeIndexes.value[index] = !activeIndexes.value[index];
}
</script>

<style scoped>

@import "./assets/css/faqfromhelp.css"
</style>
