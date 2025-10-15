// export const useCart = () => {
//   // ✅ State Global — متاح في كل مكان
//   const cartItems = useState<any>("cartItems", () => ({
//     services: [],
//     spare_parts: [],
//     offers: [],
//   }));

//   const order_id = useState<any>("order_id", () => null);
//   const cartCount = useState<number>("cartCount", () => 0);

//   const loadingQty = useState<{ [key: number]: boolean }>(
//     "loadingQty",
//     () => ({})
//   );

//   const loadingDelete = useState<{ [key: number]: boolean }>(
//     "loadingDelete",
//     () => ({})
//   );

//   const msg = useState<{ [key: number]: string }>("msg", () => ({}));

//   const token = useCookie("token");

//   // ✅ تحديث عدد العناصر تلقائيًا
//   function syncCartCount() {
//     const total =
//       cartItems.value.services.length +
//       cartItems.value.spare_parts.length +
//       cartItems.value.offers.length;
//     cartCount.value = total;
//   }

//   // ✅ جلب بيانات الكارت من السيرفر
//   async function getMyCart() {
//     if (!token.value) return; // لو المستخدم مش مسجل متبعتش API

//     try {
//       const res: any = await useApi().getMyCart();

//       if (res?.data) {
//         order_id.value = res.data.id; // ✅ تخزين order_id مرة واحدة فقط
//         cartItems.value.services = res.data.services || [];
//         cartItems.value.spare_parts = res.data.spare_parts || [];
//         cartItems.value.offers = res.data.offers || [];
//         syncCartCount();
//       }
//     } catch (err) {
//       console.log("خطأ أثناء جلب بيانات الكارت", err);
//     }
//   }

//   // ✅ تحديث الكمية
//   async function updateQty(
//     type: string,
//     orderId: number,
//     cart_item_id: number, // ✅ ناخد id مباشرة
//     newQty: number
//   ) {
//     loadingQty.value[cart_item_id] = true;
//     msg.value[cart_item_id] = "";

//     try {
//       const res = await useApi().updateCartItemQuantity(
//         type,
//         orderId,
//         cart_item_id,
//         newQty
//       );

//       if (res?.status === true) {
//         // تحديث الـ array فورًا لكل الأنواع
//         const updateItemInArray = (arr: any[]) => {
//           const index = arr.findIndex((i) => i.id === cart_item_id);
//           if (index !== -1) {
//             arr.splice(index, 1, { ...arr[index], qty: newQty });
//           }
//         };

//         updateItemInArray(cartItems.offers);
//         updateItemInArray(cartItems.spare_parts);
//         updateItemInArray(cartItems.services);

//         msg.value[cart_item_id] = "تم تحديث الكمية بنجاح";
//       } else {
//         msg.value[cart_item_id] = res?.errors?.qty?.[0] || res?.message;
//       }
//     } catch (err: any) {
//       msg.value[cart_item_id] =
//         err?.data?.errors?.qty?.[0] || err?.data?.message;
//     } finally {
//       loadingQty.value[cart_item_id] = false;
//     }
//   }

//   // ✅ حذف عنصر من الكارت
//   async function deleteItem(id: any, type: any) {
//     if (!order_id.value) {
//       console.log("⚠️ order_id مفقود، لم يتم إرسال الطلب");
//       return;
//     }

//     loadingDelete.value[id] = true;
//     try {
//       await useApi().deleteItemFromCart(type, order_id.value, id);

//       if (type === "service") {
//         cartItems.value.services = cartItems.value.services.filter(
//           (o: any) => o.id !== id
//         );
//       } else if (type === "offer") {
//         cartItems.value.offers = cartItems.value.offers.filter(
//           (o: any) => o.offer_id !== id
//         );
//       } else {
//         cartItems.value.spare_parts = cartItems.value.spare_parts.filter(
//           (o: any) => o.id !== id
//         );
//       }

//       syncCartCount();
//     } catch (err) {
//       console.log("خطأ أثناء حذف العنصر", err);
//     } finally {
//       loadingDelete.value[id] = false;
//     }
//   }

//   return {
//     // ✅ State
//     cartItems,
//     cartCount,
//     order_id,
//     loadingQty,
//     loadingDelete,
//     msg,

//     // ✅ Actions
//     getMyCart,
//     updateQty,
//     deleteItem,
//     syncCartCount,
//   };
// };
