<template>
  <div class="services-parent">
    <div class="container cards-wrapper margin-bottom-section">
      <div class="row">
        <div
          class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
          v-for="sparepart in allParts"
          :key="sparepart.id"
        >
          <div class="service-card text-center margin-bottom-24px">
            <div class="service-icon-wrapper">
              <div class="service-icon">
                <img class="img" :src="sparepart.image" :alt="sparepart.title" />
              </div>
            </div>

            <div class="service-content">
              <TitleServices
                :title="sparepart.title"
                :currency="sparepart.price"
                :sar="'sar'"
              />
            </div>
            <div class="div-button">
              <ButtonCard
                v-if="!itemAdded.some((item) => item.id === sparepart.id)"
                :textButton="
                  loadingAddToCart[sparepart.id] ? 'Loading...' : 'add to cart'
                "
                :isActive="activeIcon"
                @click="handleAdd(sparepart)"
              />
              <!-- <div v-else="itemAdded.includes(service.id)" class="div-button">
                <button class="additems text-capitalize label" disabled>
                  <svg
                    width="20"
                    height="79"
                    viewBox="0 0 80 79"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M40 78.3318C18.4344 78.3318 0.953125 60.7972 0.953125 39.1659C0.953125 17.5346 18.4344 0 40 0C61.5656 0 79.0469 17.5346 79.0469 39.1659C79.0469 60.7972 61.5656 78.3318 40 78.3318ZM36.107 54.8323L63.7132 27.1381L58.1919 21.6L36.107 43.7562L25.0607 32.6761L19.5394 38.2142L36.107 54.8323Z"
                      fill="#67A93E"
                    />
                  </svg>
                  added to cart
                </button>
              </div> -->
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

onMounted(() => {
  itemAdded.value = JSON.parse(localStorage.getItem("add") || "[]");
});

const { data: sparePartsData } = await useAsyncData("services", () =>
  getSpareParts()
);

const allParts = computed(() => sparePartsData.value?.data?.items || []);
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

</script>

<style scoped>
@import "@/assets/css/services.css";
</style>
