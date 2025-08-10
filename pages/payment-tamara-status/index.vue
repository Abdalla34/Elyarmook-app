<script setup>
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const rawId = route.query.id;

  try {
    const res = await useApi().getHyperpayStatus(rawId);
    console.log("Response from backend:", res);

    if (res?.status === true || res?.status === "true") {
      router.replace("/payment-tamara-status/success");
    } else {
      router.replace("/payment-tamara-status/failed");
    }
  } catch (err) {
    console.error(err);
    router.replace("/payment-tamara-status/failed");
  }
});
</script>
<template>
  <div class="text-green-600 text-3xl font-bold mb-4 text-center fs-3">جاري التحقق من حالة الدفع...</div>
</template>