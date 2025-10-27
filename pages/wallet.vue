<template>
  <div>
    <ProfileDetails />
    <div class="wallet-information wallet-margin">
      <div class="container">
        <div class="row">
          <div class="col-8 col-padding">
            <div
              class="wllet-title d-flex align-items-center justify-content-between"
            >
              <div class="d-flex align-items-center gap-3">
                <h1 class="margin-bottom-24px text-capitalize title-pages mb-0">
                  {{ $t("wallet") }}
                </h1>
                <button
                  @click="otpModalAmount = true"
                  class="btn text-capitalize"
                >
                  {{ $t("deposit money") }}
                </button>
              </div>

              <div class="balance d-flex flex-column text-center">
                <span class="p-color-fs fs">{{ $t("current balance") }}</span>
                <div
                  class="d-flex align-items-center gap-2 justify-conent-center"
                >
                  <p class="price">{{ allData?.balance }}</p>
                  <span class="text-uppercase span">{{ $t("sar") }}</span>
                </div>
              </div>
            </div>
            <!-- wallets  -->
            <div
              class="box-pages margin-bottom-24px col-padding"
              v-for="item in wallets"
              :key="item.id"
            >
              <div
                class="flex-box d-flex align-items-center justify-content-between"
              >
                <div class="box-hand d-flex gap-2 align-items-center">
                  <div class="icon">
                    <div class="icon">
                      <div
                        v-if="item.type === 'deposit'"
                        class="background-plus radius-padding"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.6673 6.75065H9.25065V1.33398C9.25065 0.650651 8.68398 0.0839844 8.00065 0.0839844C7.31732 0.0839844 6.75065 0.650651 6.75065 1.33398V6.75065H1.33398C0.650651 6.75065 0.0839844 7.31732 0.0839844 8.00065C0.0839844 8.68398 0.650651 9.25065 1.33398 9.25065H6.75065V14.6673C6.75065 15.3507 7.31732 15.9173 8.00065 15.9173C8.68398 15.9173 9.25065 15.3507 9.25065 14.6673V9.25065H14.6673C15.3507 9.25065 15.9173 8.68398 15.9173 8.00065C15.9173 7.31732 15.3507 6.75065 14.6673 6.75065Z"
                            fill="#41C980"
                          />
                        </svg>
                      </div>
                      <div
                        v-else-if="item.type === 'withdraw'"
                        class="background radius-padding"
                      >
                        <svg
                          width="16"
                          height="4"
                          viewBox="0 0 16 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.6673 3.25H1.33398C0.650651 3.25 0.0839844 2.68333 0.0839844 2C0.0839844 1.31667 0.650651 0.75 1.33398 0.75H14.6673C15.3507 0.75 15.9173 1.31667 15.9173 2C15.9173 2.68333 15.3507 3.25 14.6673 3.25Z"
                            fill="#EB5757"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="name-wallet">
                    <h5>{{ item.type_value }}</h5>
                    <p class="p-color-fs">
                      {{ dayjs(item.created_at).format("dddd, MMM D, YYYY") }}
                      <span>{{
                        dayjs(item.created_at).format("hh:mm A")
                      }}</span>
                    </p>
                    <p class="p-color-fs fs fw-bold">{{ item.description }}</p>
                  </div>
                </div>
                <div class="pricewall">
                  {{ item.amount }}
                  <span class="span fs">{{ $t("sar") }}</span>
                </div>
              </div>
            </div>

            <!-- pagination -->
            <div class="d-flex justify-content-center gap-3 mt-4">
              <button
                @click="handlePrev"
                class="btn"
                :disabled="currentPage <= 1"
              >
                {{ $t("Prev") }}
              </button>
              <span class="align-self-center"
                >{{ $t("Page") }} {{ currentPage }}</span
              >

              <button
                @click="handleNext"
                class="btn"
                :disabled="
                  currentPage >=
                  (allData?.transactions?.paginate?.total_pages || 1)
                "
              >
                {{ $t("Next") }}
              </button>
            </div>

            <!-- load -->
            <div v-if="isLoading" class="text-center my-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">{{ $t("loading...") }}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="otpModalAmount"
          class="modal-overlay"
          @click.self="otpModalAmount = false"
        >
          <div class="modal-content">
            <div class="mdoal-box">
              <h4 class="label fw-bold mb-2">{{ $t("the amount") }}</h4>
              <!-- amount input -->
              <input
                type="number"
                class="input w-100 p-2 rounded mb-3"
                placeholder=""
                v-model="walletAmount"
              />
              <!-- box-details -->
              <div class="box-details rounded p-3 mb-3">
                <div class="d-flex align-items-centre justify-content-between">
                  <h1 class="label">{{ $t("the amount") }}</h1>
                  <p v-if="cashback" class="label">
                    {{ cashback.amount }} {{ $t("sar") }}
                  </p>
                  <p v-else class="label">0.0 {{ $t("sar") }}</p>
                </div>
                <div class="d-flex align-items-centre justify-content-between">
                  <h1 class="label">{{ $t("Cash back") }}</h1>
                  <p v-if="cashback" class="label text-success">
                    {{ cashback.cashback }} {{ $t("sar") }}
                  </p>
                  <p v-else class="label text-success">0.0 {{ $t("sar") }}</p>
                </div>
                <div class="d-flex align-items-centre justify-content-between">
                  <h1 class="label">{{ $t("Expenses") }}</h1>
                  <p v-if="cashback" class="label text-success">
                    {{ cashback.fees }} {{ $t("sar") }}
                  </p>
                  <p v-else class="label text-success">0.0 {{ $t("sar") }}</p>
                </div>
              </div>
              <!-- total amount -->
              <div class="totalamount text-center rounded p-1">
                <span class="p-color-fs text-capitalize">{{
                  $t("the amount")
                }}</span>
                <h4 v-if="cashback">
                  {{ cashback.total }}
                  <span class="label">{{ $t("sar") }}</span>
                </h4>
                <h4 v-else>
                  0 <span class="label">{{ $t("sar") }}</span>
                </h4>
              </div>
              <!-- to pay -->
              <div
                class="to-pay mt-3"
                @click="
                  navigateTo({
                    path: $localePath('/payment'),
                    query: { totalAmountWall: walletAmount },
                  })
                "
              >
                <ButtonCard
                  :textButton="$t('deposit money')"
                  :disabled="!walletAmount"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getCashbackWalletReq, getWallet } = useApi();
let dayjs = useDayjs();
let wallets = ref([]);
let allData = ref(null);
let currentPage = ref(1);
const otpModalAmount = ref(false);
const walletAmount = ref(null);

const isLoading = ref(true);

let getDataWallet = async (page = 1) => {
  isLoading.value = true;
  try {
    let resWallet = await getWallet(page);
    allData.value = resWallet?.data || null;
    wallets.value = resWallet?.data?.transactions?.items || [];
  } finally {
    isLoading.value = false;
  }
};

const cashback = ref(null);

let debounceTimer;

watch(walletAmount, (val) => {
  clearTimeout(debounceTimer);
  if (!val) {
    cashback.value = null;
    return;
  }
  debounceTimer = setTimeout(() => {
    getCashbackWallet(val);
  }, 300);
});

let getCashbackWallet = async (amount) => {
  isLoading.value = true;
  try {
    let resWallet = await getCashbackWalletReq(walletAmount.value);
    cashback.value = resWallet?.data || null;
    console.log(cashback.value);
  } finally {
    isLoading.value = false;
  }
};

const handleNext = async () => {
  if (currentPage.value >= allData?.transactions?.paginate?.total_pages) return;
  currentPage.value++;
  await getDataWallet(currentPage.value);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handlePrev = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    await getDataWallet(currentPage.value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

onMounted(() => {
  getDataWallet();
});
</script>

<style scoped>
@import "@/assets/css/wallet.css";
.btn {
  background-color: var(--main-color);
  border: none;
}
.fs {
  font-size: 13px;
  color: #3d3d3d;
}
.mdoal-box input {
  outline: none;
  background-color: var(--color-secound-main);
  border: 2px solid var(--color-secound-main);
}
.box-details {
  background-color: var(--color-secound-main);
}
.totalamount {
  background-color: #ecfaf2;
}

.to-pay :deep(button:disabled) {
  background-color: #ccc !important;
  color: #666 !important;
  border-color: #bbb !important;
  cursor: not-allowed !important;
}
</style>
