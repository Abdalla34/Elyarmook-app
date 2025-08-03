// stores/offers.js
// stores/cart.js
import { defineStore } from "pinia";
export const useCartStore = defineStore(
  "cart",
  () => {
    const orders = ref([]);
    const cartLength = computed(() => orders.value.length);

    async function fetchCart() {
      const res = await useApi().getMyCart();
      orders.value = res?.data?.services || [];
    }

    async function deleteFromCart(type, order_id, id) {
      await useApi().deleteItemFromCart(type, order_id, id);
      orders.value = orders.value.filter((o) => o.id !== id);
    }

    return {
      orders,
      cartLength,
      fetchCart,
      deleteFromCart,
    };
  }
);
