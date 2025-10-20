<template>
  <div class="container text-center py-10">
    <h1 class="text-danger text-3xl font-bold mb-4">
      {{ message }}
    </h1>

    <NuxtLink
      to="/"
      class="mt-8 inline-block bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
    >
      العودة للصفحة الرئيسية
    </NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const message = ref("");
try {
  let paymentId = route.query.payment_id;
  if (paymentId) {
    const res = await useApi().tabbyStatusFailure(paymentId);
    message.value = res?.message || "فشلت عملية الدفع";
  }
} catch (err) {
  console.log(err);
}
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: auto;
}
</style>
