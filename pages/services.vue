<template>
  <div class="services-parent">
    <div class="container cards-wrapper margin-bottom-section">
      <div v-if="feedbackMessage" :class="['cart-feedback', feedbackType]">
        {{ feedbackMessage }}
      </div>
      <!-- <div v-if="pending">جاري التحميل...</div> -->
      <div class="row">
        <div
          class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
          v-for="(service, index) in allParts"
          :key="index"
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
                :textButton="
                  loadingAddToCart[service.id] ? 'Loading...' : 'add to cart'
                "
                :isActive="activeIcon"
                :disabled="loadingAddToCart[service.id]"
                @click="handleAdd(service)"
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
const { getServices, addToCart } = useApi();

// const loading = ref(true);
const feedbackMessage = ref("");
const feedbackType = ref("");
const loadingAddToCart = ref({});

const { data: servicesData } = await useAsyncData("services", () =>
  getServices()
);

const allParts = computed(() => servicesData.value?.data?.items || []);
let activeIcon = ref(true);

async function handleAdd(service) {
  loadingAddToCart.value[service.id] = true;
  try {
    let res = await addToCart("service", service.id, 1);
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

// async function handleAddToCart(service) {
//   loadingAddToCart.value[service.id] = true;
//   try {
//     const res = await addToCart("service", service.id, 1);
//     if (res && res.status === false && res.message === "Unauthenticated") {
//       return navigateTo("/createaccount");
//     }
//     feedbackMessage.value = "Item added to cart!";
//     feedbackType.value = "success";
//     setTimeout(() => {
//       feedbackMessage.value = "";
//     }, 2000);
//     // Optionally show a toast or update UI
//     console.log("Added to cart:", res);
//   } catch (err) {
//     feedbackMessage.value = "Failed to add item to cart.";
//     feedbackType.value = "error";
//     setTimeout(() => {
//       feedbackMessage.value = "";
//     }, 2000);
//     // Handle error (show toast, etc.)
//     console.error("Add to cart failed:", err);
//     return navigateTo("/createaccount");
//   } finally {
//     loadingAddToCart.value[service.id] = false;
//   }
// }
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
