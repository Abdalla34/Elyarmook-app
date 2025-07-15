<template>
  <div class="parent-button">
    <button
      :type="type"
      class="d-flex padding-button align-items-center justify-content-center gap-2 mb-3 button background-main border-radius-20px w-100 text-capitalize"
      @click="handleAddToCart"
    >
      <CarIconCard v-if="isActive" />
      <span class="button-text">{{ textButton }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { addToCart } from "@/api/cart"; // غيّر المسار حسب مشروعك

const props = defineProps({
  isActive: {
    type: Boolean,
    default: true,
  },
  textButton: String,
  service: Object,
});

const feedbackMessage = ref("");
const feedbackType = ref("");
const loadingAddToCart = ref({});
const router = useRouter();

async function handleAddToCart() {
  const service = props.service;
  loadingAddToCart.value[service.id] = true;
  try {
    const res = await addToCart("service", props.service.id, 1);
    if (res && res.status === false && res.message === "Unauthenticated") {
      return router.push("/createaccount");
    }

    feedbackMessage.value = "Item added to cart!";
    feedbackType.value = "success";
    setTimeout(() => {
      feedbackMessage.value = "";
    }, 2000);

    console.log("Added to cart:", res);
  } catch (err) {
    feedbackMessage.value = "Failed to add item to cart.";
    feedbackType.value = "error";
    setTimeout(() => {
      feedbackMessage.value = "";
    }, 2000);
    console.error("Add to cart failed:", err);
    return router.push("/createaccount");
  } finally {
    loadingAddToCart.value[service.id] = false;
  }
}
</script>
