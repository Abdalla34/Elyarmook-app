<template>
  <div class="services-parent">
    <div class="container cards-wrapper margin-bottom-section">
      <div v-if="feedbackMessage" :class="['cart-feedback', feedbackType]">
        {{ feedbackMessage }}
      </div>
      <div class="row">
        <div
          class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
          v-for="(service, index) in imagesServices"
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
                :currency="'SAR'"
                :sar="service.price"
              />
            </div>
            <div class="div-button">
              <ButtonCard
                textButton="add to card"
                isActive="activeIcon"
                @click="handleAddToCart(service)"
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

const imagesServices = ref([]);
const loading = ref(true);
const error = ref(null);
const feedbackMessage = ref("");
const feedbackType = ref(""); // 'success' or 'error'

onMounted(async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await getServices();
    // Adjust this mapping if your API response structure is different
    imagesServices.value = res?.data?.items || res?.data || [];
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
});

let activeIcon = ref(true);

async function handleAddToCart(service) {
  try {
    const res = await addToCart("service", service.id, 1);
    feedbackMessage.value = "Item added to cart!";
    feedbackType.value = "success";
    setTimeout(() => { feedbackMessage.value = ""; }, 2000);
    // Optionally show a toast or update UI
    console.log("Added to cart:", res);
  } catch (err) {
    feedbackMessage.value = "Failed to add item to cart.";
    feedbackType.value = "error";
    setTimeout(() => { feedbackMessage.value = ""; }, 2000);
    // Handle error (show toast, etc.)
    console.error("Add to cart failed:", err);
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
