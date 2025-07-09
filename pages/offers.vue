<template>
  <div>
    <div class="offers margin-bottom-section">
      <div class="offers-page">
        <div class="container">
          <div class="row">
            <div
              class="col-lg-6 col-md-12 col-sm-12"
              v-for="item in offers.data.items"
              :key="item.id"
            >
              <div class="offer-card margin-bottom-24px" @click="toBox(item)">
                <div class="img-offer text-center">
                  <img :src="item.image" alt="" class="margin-bottom-24px" />
                </div>

                <div
                  class="details-card d-flex justify-content-between margin-bottom-24px"
                >
                  <h1 class="item-name">{{ item.title }}</h1>
                  <span
                    class="offers-sale d-flex align-items-center justify-content-center"
                    >{{ item.discount_percentage_text }} OFF
                  </span>
                </div>

                <!-- السعرين -->
                <!-- <div class="price-section currency d-flex justify-content-between align-items-center mb-2">
                  <p class="price-value price mb-0">
                    <del>{{ item.price_before_discount }}</del>
                  </p>
                  <p class="price-value price mb-0 fw-bold">
                    {{ item.price_after_discount }}
                    <span class="price-currency sar">sar</span>
                  </p>
                </div> -->

                <!-- تاريخ الانتهاء -->
                <!-- <div class="date currency d-flex justify-content-between">
                  <span class="text-capitalize date-item price-value">
                    end date:
                  {{ dayjs(item.expires_at).format("ddd, MMM D, YYYY") }}
                  </span>
                </div> -->
              </div>
            </div>

            <!-- <div class="ing-false" v-if="isNotOffers">
              <img src="/Yarmook-Website.htm" alt="" />
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
let offers = await useApi().getOffers();
// let offers = ref([
//   {
//     id: 1,
//     imgPrice: "/img-price2.png",
//     title: "Periodic Maintenance",
//     prices: "50",
//     currency: "SAR",
//     sale: "30% OFF",
//     endDate: "Dec 3, 2024",
//   },
//   {
//     id: 2,
//     imgPrice: "/img-price2.png",
//     title: "Periodic Maintenance",
//     prices: "60",
//     currency: "SAR",
//     sale: "20% OFF",
//     endDate: "Jan 1, 2024",
//   },
//   {
//     id: 3,
//     imgPrice: "/img-price2.png",
//     title: "Periodic Maintenancee",
//     prices: "70",
//     currency: "SAR",
//     sale: "20% OFF",
//     endDate: "Jan 1, 2022",
//   },
//   {
//     id: 4,
//     imgPrice: "/img-price2.png",
//     title: "Periodic Maintenance",
//     prices: "80",
//     currency: "SAR",
//     sale: "20% OFF",
//     endDate: "Jan 1, 3030",
//   },
//   {
//     id: 5,
//     imgPrice: "/img-price2.png",
//     title: "Periodic Maintenance",
//     prices: "90",
//     currency: "SAR",
//     sale: "20% OFF",
//     endDate: "Jan 1, 2026",
//   },
//   {
//     id: 6,
//     imgPrice: "/img-price2.png",
//     title: "Periodic Maintenance",
//     prices: "100",
//     currency: "SAR",
//     sale: "20% OFF",
//     endDate: "Jan 1, 2020",
//   },
// ]);

let router = useRouter();
function toBox(item) {
  router.push(`/offerSelected/${item.id}`);
}



let isNotOffers = ref(false);
onMounted(() => {
  if (offers.data.items.length === 0) {
    isNotOffers.value = true;
  } else {
    isNotOffers.value = false;
  }
  console.log(offers.data);
});

// const offers = ref([]);
// const { data } = await useFetch("/api/offers");
// offers.value = data.value;
</script>

<style scoped>
@import "@/assets/css/offers.css";
</style>
