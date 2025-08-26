<template>
  <div class="services-parent">
    <div class="container cards-wrapper margin-bottom-section">
      <div class="row">
        <div
          class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
          v-for="sparepart in spareParts"
          :key="sparepart.id"
        >
          <div class="service-card text-center margin-bottom-24px">
            <div class="service-icon-wrapper">
              <div class="service-icon">
                <img
                  class="img"
                  :src="sparepart.image"
                  :alt="sparepart.title"
                />
              </div>
            </div>

            <div class="service-content">
              <TitleServices
                :title="sparepart.title"
                :currency="sparepart.has_price ? sparepart.price_text + ' sar' : ''"
              />
            </div>

            <div v-if="!sparepart.has_price" class="text-danger price-value mt-5">
              سوف يتم تحديد السعر قريبا
            </div>

            <div class="div-button">
              <ButtonCard
                :textButton="
                  loadingAddToCart[sparepart.id] ? 'Loading...' : 'add to cart'
                "
                :isActive="activeIcon"
                @click="handleAdd(sparepart)"
              />
            </div>
          </div>
        </div>
        <div class="isEmpty"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { add } from "date-fns";

const { getSpareParts, addToCart } = useApi();

let itemAdded = ref([]);
let loadingAddToCart = ref({});

const { data: sparePartsData } = await useAsyncData("spare_parts", () =>
  getSpareParts()
);

const spareParts = computed(() => sparePartsData.value?.data?.items || []);
let activeIcon = ref(true);

async function handleAdd(spareParts) {
  loadingAddToCart.value[spareParts.id] = true;
  try {
    let res = await addToCart("spare_part", spareParts.id, 1);
    if (res && res.status === false && res.message === "Unauthenticated") {
      return navigateTo("/createaccount");
    }
  } catch (err) {
    if (err?.response?.status === 401) {
      return navigateTo("/createaccount");
    }
  } finally {
    loadingAddToCart.value[spareParts.id] = false;
  }
}

console.log("sparPart", spareParts);
</script>

<style scoped>
@import "@/assets/css/services.css";
</style>
