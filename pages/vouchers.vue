<template>
  <ProfileDetails />
  <div class="point">
    <div class="container">
      <div v-if="skeleton" class="row justify-content-center">
        <SkeletonsVouchersskeleton />
      </div>
      <div v-else class="row justify-content-center">
        <div class="col-8 col-padding">
          <!-- title -->
          <div
            class="current-point d-flex align-items-center justify-content-between"
          >
            <div class="point-num text-center">
              <h4 class="title-pages"></h4>
              <p class="p-color-fs text-capitalize created-at">
                {{ $t("vouchers") }}
              </p>
            </div>

            <div class="redeem p-color-fs text-capitalize border-radius-36px">
              {{ title }}
            </div>
          </div>
          <!-- li links -->
          <div class="ul-point">
            <ul
              class="d-flex justify-content-center align-items-center gap-4 mb-0 text-capitalize hand-ul"
            >
              <li
                :class="{ active: step === 0 }"
                @click="available"
                class="li-point link"
              >
                {{ $t("available") }}
              </li>
              <li
                :class="{ active: step === 1 }"
                @click="used"
                class="li-point link"
              >
                {{ $t("used") }}
              </li>
              <li
                :class="{ active: step === 2 }"
                @click="expired"
                class="li-point link"
              >
                {{ $t("expired") }}
              </li>
            </ul>
          </div>
          <!-- available -->
          <div v-if="step === 0">
            <div
              v-for="voucher in availableVouchers"
              :key="voucher.id"
              class="coupon-box p-1 mb-3"
            >
              <div
                class="d-flex justify-content-between p-2 rounded align-items-start bg-name"
              >
                <div>
                  <h6 class="fw-bold mb-1 label">{{ voucher.name }}</h6>
                  <p class="text-muted mb-2">{{ voucher.description }}</p>
                </div>
              </div>

              <div
                class="d-flex justify-content-between align-items-center mt-3"
              >
                <button class="coupon-code">
                  {{ $t("copy") }} "{{ voucher.code }}"
                </button>
                <div>
                  <span class="price-currency">{{ $t("expired at") }}</span>
                  <p class="text-muted">{{ voucher.expires_at }}</p>
                </div>
              </div>
              <div class="empty-msg fw-bold mb-1 label" v-if="messageEmpty">
                <div class="ing-false text-center not-offer">
                  <PuplicIconNotOffer />
                  <h1 class="label fw-bold">
                    {{ $t("there as not found vouchers yet") }}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <!-- used -->
          <div v-if="step === 1" class="box-details">
            <div
              v-for="voucher in usedVouchers"
              :key="voucher.id"
              class="p-1 mb-3"
            >
              <div
                class="d-flex justify-content-between p-2 rounded align-items-start"
              >
                <div>
                  <h6 class="fw-bold mb-1 label">{{ voucher.name }}</h6>
                  <p class="text-muted mb-2">{{ voucher.description }}</p>
                </div>
              </div>

              <div
                class="d-flex justify-content-between align-items-center mt-3"
              >
                <!-- <button class="coupon-code">نسخ "{{ voucher.code }}"</button> -->
                <div>
                  <span class="price-currency">{{ $t("expired at") }}</span>
                  <p class="text-muted">{{ voucher.expires_at }}</p>
                </div>
              </div>
            </div>
            <div class="empty-msg fw-bold mb-1 label" v-if="messageEmpty">
              <div class="ing-false text-center not-offer">
                <PuplicIconNotOffer />
                <h1 class="label fw-bold">
                  {{ $t("there as not found vouchers yet") }}
                </h1>
              </div>
            </div>
          </div>

          <!-- expired -->
          <div v-if="step === 2" class="coupon-box opacity-50 p-1 mb-3">
            <div
              v-for="voucher in ExVouchers"
              :key="voucher.id"
              class="p-1 mb-3"
            >
              <div
                class="d-flex justify-content-between p-2 rounded align-items-start expired-box"
              >
                <div>
                  <h6 class="fw-bold mb-1 label">{{ voucher.name }}</h6>
                  <p class="text-muted mb-2">{{ voucher.description }}</p>
                </div>
              </div>

              <div
                class="d-flex justify-content-between align-items-center mt-3"
              >
                <!-- <button class="coupon-code">نسخ "{{ voucher.code }}"</button> -->
                <div>
                  <span class="price-currency">{{ $t("expired at") }}</span>
                  <p class="text-muted">{{ voucher.expires_at }}</p>
                </div>
              </div>
            </div>
            <div class="empty-msg fw-bold mb-1 label" v-if="messageEmpty">
              <div class="ing-false text-center not-offer">
                <PuplicIconNotOffer />
                <h1 class="label fw-bold">
                  {{ $t("there as not found vouchers yet") }}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getAvailableVouchers, getUsedVouhcers, getExVouhcers } = useApi();
const skeleton = ref(true);
const availableVouchers = ref([]);
const timeEndCach = 12 * 60 * 60 * 1000; // 12 ساعة

async function loadAvailableVouchers() {
  const cacheData = localStorage.getItem("availableVouchersCache");
  const currentTime = Date.now();

  if (cacheData) {
    const parsedData = JSON.parse(cacheData);
    if (currentTime - parsedData.timestamp < timeEndCach) {
      availableVouchers.value = parsedData.vouchers;
      skeleton.value = false;
    }
  }

  const res = await getAvailableVouchers();
  availableVouchers.value = res?.data || [];
  skeleton.value = false;

  localStorage.setItem(
    "availableVouchersCache",
    JSON.stringify({
      vouchers: availableVouchers.value,
      timestamp: currentTime,
    })
  );
}

const usedVouchers = ref([]);
const ExVouchers = ref([]);

const step = ref(0);
const title = computed(() => {
  if (step.value === 0) return $t("available");
  if (step.value === 1) return $t("used");
  if (step.value === 2) return $t("expired");
  return;
});

const messageEmpty = ref(null);
async function available() {
  step.value = 0;
  emptyMsg();
}

async function used() {
  step.value = 1;
  emptyMsg();
}

async function expired() {
  step.value = 2;
  emptyMsg();
}
const messageValue = ref("");
function emptyMsg() {
  if (step.value === 0 && availableVouchers.value.length === 0) {
    messageEmpty.value = true;
    messageValue.value = "not found vouchers yet . . !";
  } else if (step.value === 1 && usedVouchers.value.length === 0) {
    messageEmpty.value = true;
    messageValue.value = "not found vouchers yet . . !";
  } else if (step.value === 2 && ExVouchers.value.length === 0) {
    messageEmpty.value = true;
    messageValue.value = "not found vouchers yet . . !";
  } else {
    messageEmpty.value = false;
  }
}

onMounted(async () => {
  loadAvailableVouchers();

  const resUsedVouchers = await getUsedVouhcers();
  usedVouchers.value = resUsedVouchers?.data || [];

  const resExVouchers = await getExVouhcers();
  ExVouchers.value = resExVouchers?.data || [];
});
</script>

<style scoped>
@import "@/assets/css/point.css";

.coupon-box {
  border: 2px dashed #dcdcdc;
  background-color: #fff;
  border-radius: 12px;
}

.coupon-code {
  border: 2px dashed #28a745;
  background: transparent;
  color: #28a745;
  border-radius: 8px;
  padding: 4px 12px;
  font-size: 14px;
  cursor: pointer;
}
.coupon-code:hover {
  background: #eaf9f0;
}
.bg-name {
  background: #7ace8e;
}
.expired-box {
  background-color: rgb(228, 228, 194);
}
</style>
