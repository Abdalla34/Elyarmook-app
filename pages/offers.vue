<template>
  <div class="offers margin-bottom-section">
    <Header />
    <Views />
    <div class="offers-page">
      <div class="container">
        <div class="row">
          <div
            class="col-lg-6 col-md-12 col-sm-12"
            v-for="(item, indxe) in prices"
            :key="index"
          >
            <div class="offer-card margin-bottom-24px">
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
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <Footer />
  </div>
</template>

<script setup>
let prices = ref([
  {
    imgPrice: "/img-price2.png",
    title: "Periodic maintenance",
    prices: "50",
    currency: "sar",
    sale: "30% off",
    endDate: "dec,3,2024",
  },
  {
    imgPrice: "/img-price2.png",
    title: "Periodic maintenance",
    prices: "50",
    currency: "sar",
    sale: "30% off",
    endDate: "dec,3,2024",
  },
  {
    imgPrice: "/img-price2.png",
    title: "Periodic maintenance",
    prices: "50",
    currency: "sar",
    sale: "30% off",
    endDate: "dec,3,2024",
  },
  {
    imgPrice: "/img-price2.png",
    title: "Periodic maintenance",
    prices: "50",
    currency: "sar",
    sale: "30% off",
    endDate: "dec,3,2024",
  },
  {
    imgPrice: "/img-price2.png",
    title: "Periodic maintenance",
    prices: "50",
    currency: "sar",
    sale: "30% off",
    endDate: "dec,3,2024",
  },
  {
    imgPrice: "/img-price2.png",
    title: "Periodic maintenance",
    prices: "50",
    currency: "sar",
    sale: "30% off",
    endDate: "dec,3,2024",
  },
]);
</script>

<style scoped>
.offer-card {
  width: 100%;
  padding: 28px;
  background-color: #ffffff;
  box-shadow: 0 -4px 29px #0a0d121a;
  border-radius: 64px;
  transition: all 0.4s ease;
}
.offer-card:hover {
  transform: scale(1.02);
}

.img-offer img {
  border-radius: 36px;
  max-width: 100%;
}

.offers-sale {
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  vertical-align: middle;
  background-color: #c71f45;
  color: white;
  padding: 1px 13px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.offer-card:hover .offers-sale {
  animation: shake 0.6s infinite ease-in-out;
}

@keyframes shake {
  0% {
    transform: rotate(0);
  }
  20% {
    transform: rotate(-3deg);
  }
  40% {
    transform: rotate(3deg);
  }
  60% {
    transform: rotate(-3deg);
  }
  80% {
    transform: rotate(3deg);
  }
  100% {
    transform: rotate(0);
  }
}

.price,
.sar {
  color: #c71f45;
}

.price {
  font-size: 36px;
}

.sar,
.price {
  font-weight: 600;
}
.sar {
  font-size: 18px;
}
</style>
