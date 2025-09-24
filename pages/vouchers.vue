<template>
  <ProfileDetails />
  <div class="point">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8 col-padding">
          <!-- title -->
          <div
            class="current-point d-flex align-items-center justify-content-between"
          >
            <div class="point-num text-center">
              <h4 class="title-pages"></h4>
              <p class="p-color-fs text-capitalize created-at">vouchers</p>
            </div>

            <div class="redeem p-color-fs text-capitalize border-radius-36px">
              {{ title }}
            </div>
          </div>
          <!-- li toogle -->
          <div class="ul-point">
            <ul
              class="d-flex justify-content-center align-items-center gap-4 mb-0 text-capitalize hand-ul"
            >
              <li
                :class="{ active: step === 0 }"
                @click="available"
                class="li-point link"
              >
                available
              </li>
              <li
                :class="{ active: step === 1 }"
                @click="used"
                class="li-point link"
              >
                used
              </li>
              <li
                :class="{ active: step === 2 }"
                @click="expired"
                class="li-point link"
              >
                expired
              </li>
            </ul>
          </div>
          <!-- available -->
          <div v-if="step === 0" class="box-details">
            <div class="name-desc">
              <h1>
                <!-- {{ naem }} -->
                name
              </h1>
              <p>
                description
                {{ description }}
              </p>
            </div>
            <div class="expired-at">
              <div class="end-at">
                <span>end at</span>
                <!-- {{ expires_at }} -->
                end at aug 3, 2026
              </div>
              <div class="code">
                <!-- {{ code }} -->
                code sssss
              </div>
            </div>
          </div>
          <!-- used -->
          <div v-if="step === 1" class="box-details">
            <div class="name-desc">
              <h1>
                <!-- {{ naem }} -->
                name
              </h1>
              <p>
                description
                {{ description }}
              </p>
            </div>
            <div class="expired-at">
              <div class="end-at">
                <span>end at</span>
                <!-- {{ expires_at }} -->
                end at aug 3, 2026
              </div>
              <div class="code">
                <!-- {{ code }} -->
                code sssss
              </div>
            </div>
          </div>
          <!-- expired -->
          <div v-if="step === 2" class="box-details">
            <div class="name-desc">
              <h1>
                <!-- {{ naem }} -->
                name
              </h1>
              <p>
                description
                {{ description }}
              </p>
            </div>
            <div class="expired-at">
              <div class="end-at">
                <span>end at</span>
                <!-- {{ expires_at }} -->
                end at aug 3, 2026
              </div>
              <div class="code">
                <!-- {{ code }} -->
                code sssss
              </div>
              <!-- <div class="messageEmpty" v-if="messageEmpty">{{  }}</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const availableVouchers = ref([]);
const usedVouchers = ref([]);
const ExVouchers = ref([]);

const step = ref(0);
const title = computed(() => {
  if (step.value === 0) return "available";
  if (step.value === 1) return "used";
  if (step.value === 2) return "expired";
  return;
});

const messageEmpty = ref(null);
async function available() {
  step.value = 0;
  const resAvailabel = await useApi().getAvailableVouchers();
  availableVouchers.value = resAvailabel?.data || [];
  messageEmpty.value = true;
}

async function used() {
  step.value = 1;
  const resUsedVouchers = await useApi().getUsedVouhcers();
  usedVouchers.value = resUsedVouchers?.data || [];
  if (resUsedVouchers.data === "") {
    messageEmpty.value = true;
  }
}

async function expired() {
  step.value = 2;
  const resExVouchers = await useApi().getExVouhcers();
  ExVouchers.value = resExVouchers?.data || [];
  messageEmpty.value = true;
}
</script>

<style scoped>
@import "@/assets/css/point.css";
</style>
