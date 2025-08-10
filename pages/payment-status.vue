<template>
  <div class="text-center">
    <div v-if="Array.isArray(getcart) && getcart.length === 0">
      <h1>السلة فارغة</h1>
    </div>

    <!-- <div v-else-if="status === true">
      <img src="/donePayment.png" alt="تم الدفع بنجاح" />
      <h1>{{ datares?.data?.message || "تم الدفع بنجاح" }}</h1>
      <p>{{ datares?.message }}</p>
      <button-card textButton="اضافة عناصر أخري" @click="navigateTo('/')" />
    </div>

    <div v-else-if="status === false">
      <h1>فشل الدفع</h1>
      <p>{{ datares?.message || "يبدو أن عملية الدفع لم تتم بنجاح." }}</p>
      <NuxtLink to="/cart">العودة إلى السلة</NuxtLink>
    </div> -->
  </div>
</template>

<script setup>
// const router = useRouter();
// const route = useRoute();
// let idCart = route.query.id;

// const status = ref(null);
// const datares = ref({});
const getcart = ref(null);

// try {
//   if (!idCart) {
//     router.push("/cart");
//   }
//   const res = await useApi().getHyperpayStatus(idCart);
//   datares.value = res?.data;

//   if (res?.status === true || res?.status === "true") {
//     status.value = true;
//   } else {
//     status.value = false;
//   }
// } catch (err) {
//   console.error("❌ Error getting payment status", err);
//   status.value = false;
// }

try {
  const rescart = await useApi().getMyCart();
  getcart.value = rescart?.data;
} catch (err) {
  console.error("❌ Error fetching cart", err);
}
</script>
