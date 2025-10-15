// export function useCartLength() {
//   const cartLength = ref(0);
//   const token = useCookie("token");

//   const calculateGuestCartLength = () => {
//     try {
//       const storedCart = localStorage.getItem("cartGuest");
//       const cart = storedCart ? JSON.parse(storedCart) : [];
//       return cart.reduce((total: number, item: any) => total + (item.qty || 1), 0);
//     } catch {
//       return 0;
//     }
//   };

//   const calculateAuthCartLength = async () => {
//     try {
//       const res = await useApi().getMyCart();
//       if (res?.data) {
//         const services = res.data.services || [];
//         const offers = res.data.offers || [];
//         const spareParts = res.data.spare_parts || [];

//         const servicesCount = services.reduce((total: number, item: any) => total + (item.qty || 1), 0);
//         const offersCount = offers.length;
//         const sparePartsCount = spareParts.reduce((total: number, item: any) => total + (item.qty || 1), 0);

//         return servicesCount + offersCount + sparePartsCount;
//       }
//       return 0;
//     } catch {
//       return 0;
//     }
//   };

//   const updateCartLength = async () => {
//     if (token.value) {
//       cartLength.value = await calculateAuthCartLength();
//     } else {
//       cartLength.value = calculateGuestCartLength();
//     }
//   };

//   // تعريف الهاندلرز فوق
//   const handleStorageChange = (e: StorageEvent) => {
//     if (e.key === "cartGuest" && !token.value) {
//       cartLength.value = calculateGuestCartLength();
//     }
//   };

//   const handleCartUpdate = () => {
//     updateCartLength();
//   };

//   onMounted(() => {
//     updateCartLength();

//     if (process.client) {
//       window.addEventListener("storage", handleStorageChange);
//       window.addEventListener("cart-updated", handleCartUpdate);
//     }
//   });


//   onUnmounted(() => {
//     if (process.client) {
//       window.removeEventListener("storage", handleStorageChange);
//       window.removeEventListener("cart-updated", handleCartUpdate);
//     }
//   });

//   watch(token, () => {
//     updateCartLength();
//   });

//   const refreshCartLength = () => {
//     updateCartLength();
//   };

//   return {
//     cartLength: readonly(cartLength),
//     refreshCartLength,
//     updateCartLength,
//   };
// }
