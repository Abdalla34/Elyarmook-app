<template>
  <div class="services-parent">
    <div class="container cards-wrapper margin-bottom-section">
      <div class="row">
        <div
          class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
          v-for="service in allParts"
          :key="service.id"
        >
          <div class="service-card text-center margin-bottom-24px">
            <div class="service-icon-wrapper">
              <div class="service-icon">
                <img class="img" :src="service.image" :alt="service.title" />
              </div>
            </div>

            <div class="service-content">
              <TitleServices
                :title="service.title"
                :currency="service.price"
                :sar="'sar'"
              />
            </div>
            <div class="div-button">
              <ButtonCard
                v-if="!itemAdded.some((item) => item.id === service.id)"
                :textButton="
                  loadingAddToCart[service.id] ? 'Loading...' : 'add to cart'
                "
                :isActive="activeIcon"
                @click="handleAdd(service)"
              />
              <div v-else="itemAdded.includes(service.id)" class="div-button">
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
              </div>
            </div>
          </div>
        </div>
        <div class="isEmpty"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { add } from "date-fns";

const { getServices, addToCart } = useApi();

let itemAdded = ref([]);
let loadingAddToCart = ref({});

onMounted(() => {
  itemAdded.value = JSON.parse(localStorage.getItem("add") || "[]");
});

const { data: servicesData } = await useAsyncData("services", () =>
  getServices()
);

const allParts = computed(() => servicesData.value?.data?.items || []);
let activeIcon = ref(true);

async function handleAdd(service) {
  loadingAddToCart.value[service.id] = true;
  try {
    let res = await addToCart("service", service.id, 1);
    if ((res && res.status === true) || res.status === "true") {
      let savedItems = JSON.parse(localStorage.getItem("add") || "[]");
      
      if (!savedItems.some((item) => item.id === service.id)) {
        savedItems.push({ id: service.id });
        localStorage.setItem("add", JSON.stringify(savedItems));
      }

      itemAdded.value = savedItems;
    }
    

    if (res && res.status === false && res.message === "Unauthenticated") {
      return navigateTo("/createaccount");
    }
  } catch (err) {
    if (err?.response?.status === 401) {
      return navigateTo("/createaccount");
    }
  } finally {
    loadingAddToCart.value[service.id] = false;
  }
}

</script>

<style scoped>
@import "@/assets/css/services.css";
.cart-feedback {
  margin-bottom: 16px;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
}
.cart-feedback.success {
  background: #e6ffed;
  color: #1a7f37;
  border: 1px solid #b7ebc6;
}
.cart-feedback.error {
  background: #fff1f0;
  color: #cf1322;
  border: 1px solid #ffa39e;
}
</style>
