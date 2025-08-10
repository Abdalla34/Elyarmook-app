<template>
  <div class="container text-center py-10">

    <div class="text-center">
      <div>
        <img src="/donePayment.png" alt="تم الدفع بنجاح" />
        <h1 class="text-green-600 text-3xl font-bold mb-4"> ✅ تم الدفع بنجاح </h1>
      </div>
    </div>

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

const status = ref(null);
const message = ref(null);
try {
  const rawId = route.query.id;
  const res = await useApi().getHyperpayStatus(rawId);

  if (res?.status === true || res?.status === "true") {
    status.value = true;
    message.value = res?.data?.message || "✅ تم الدفع بنجاح ";
    console.log("Payment successful:", res);
  } else {
    status.value = false;
    message.value = res?.data?.message || "فشل الدفع";
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
