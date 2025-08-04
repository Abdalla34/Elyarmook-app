// usePayment.js (Composable أو جزء من store حسب ما تحب)
// export const usePayment = () => {
//   const createCheckout = async () => {
//     const res = await $fetch("/payment/hyper-pay/prepare-checkout"); // دي API عندك في الباك
//     if (res.status) {
//       return res.data;
//     } else {
//       throw new Error("فشل إنشاء الدفع");
//     }
//   };

//   return { createCheckout };
// };
