<template>
  <div>
    <div class="offers margin-bottom-section">
      <div class="offers-page">
        <div class="container">
          <div class="row">
            <div
              class="col-lg-6 col-md-12 col-sm-12"
              v-for="item in offers"
              :key="item.id"
            >
              <div
                class="offer-card margin-bottom-24px"
                @click="toBox(item)"
              >
                <div class="img-offer text-center">
                  <img :src="item.imgPrice" alt="" class="margin-bottom-24px" />
                </div>
                <div
                  class="details-card d-flex justify-content-between margin-bottom-24px"
                >
                  <h1 class="item-name">{{ item.title }}</h1>
                  <span
                    class="offers-sale d-flex align-items-center justify-content-center"
                    >{{ item.sale }}
                  </span>
                </div>
                <div class="date currency d-flex justify-content-between">
                  <span class="price-value price"
                    >{{ item.prices }}
                    <span class="price-currency sar">{{
                      item.currency
                    }}</span></span
                  >
                  <span class="text-capitalize date-item price-value">{{
                    item.endDate
                  }}</span>
                </div>
              </div>
            </div>
            <!-- <div class="ing-false" v-if="isNotoffer">
              <img src="/Yarmook-Website.htm" alt="" />
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

let offers = ref([
  {
    id: 1,
    imgPrice: "/img-price2.png",
    title: "Periodic Maintenance",
    prices: "50",
    currency: "SAR",
    sale: "30% OFF",
    endDate: "Dec 3, 2024",
  },
  {
    id: 2,
    imgPrice: "/img-price2.png",
    title: "Periodic Maintenance",
    prices: "60",
    currency: "SAR",
    sale: "20% OFF",
    endDate: "Jan 1, 2024",
  },
  {
    id: 3,
    imgPrice: "/img-price2.png",
    title: "Periodic Maintenancee",
    prices: "70",
    currency: "SAR",
    sale: "20% OFF",
    endDate: "Jan 1, 2022",
  },
  {
    id: 4,
    imgPrice: "/img-price2.png",
    title: "Periodic Maintenance",
    prices: "80",
    currency: "SAR",
    sale: "20% OFF",
    endDate: "Jan 1, 3030",
  },
  {
    id: 5,
    imgPrice: "/img-price2.png",
    title: "Periodic Maintenance",
    prices: "90",
    currency: "SAR",
    sale: "20% OFF",
    endDate: "Jan 1, 2026",
  },
  {
    id: 6,
    imgPrice: "/img-price2.png",
    title: "Periodic Maintenance",
    prices: "100",
    currency: "SAR",
    sale: "20% OFF",
    endDate: "Jan 1, 2020",
  },
]);

let router = useRouter();
function toBox(item) {
  localStorage.setItem("testsave", JSON.stringify(item));
  router.push(`/offerSelected/${item.id}`);
}

// const router = useRouter();
// function clickBox(item) {
//   localStorage.setItem("selectedOffer", JSON.stringify(item));
//   router.push(`/offerSelected/${item.id}`);
// }

let isNotoffer = ref(false);
onMounted(() => {
  if (offers.value.length === 0) {
    isNotoffer.value = true;
  } else {
    isNotoffer.value = false;
  }
});

// const offers = ref([]);
// const { data } = await useFetch("/api/offers");
// offers.value = data.value;
</script>

<style scoped>
@import "@/assets/css/offers.css";
</style>
