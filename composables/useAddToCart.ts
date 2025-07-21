export function useAddToCart() {
  const addToCart = async (type: string, item_id: number, qty: number) => {
    const baseURL = useRuntimeConfig().public.apiBase; // تأكد إنها متضبطة عندك
    const token = useCookie("token").value;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    return await $fetch(`${baseURL}/marketplace/cart/add-to-cart`, {
      method: "POST",
      body: { type, item_id, qty },
      headers,
    });
  };

  return {
    addToCart,
  };
}
