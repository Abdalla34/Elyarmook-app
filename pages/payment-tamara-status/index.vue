<template>
  <div class="text-green-600 text-3xl font-bold mb-4 text-center fs-3">
    جاري التحقق من حالة الدفع...
  </div>
</template>

<script setup>
let isChecking = false;
let route = useRoute();
let router = useRouter();

onMounted(async () => {
  if (isChecking) return;
  isChecking = true;

  const rawId = route.query.id;
  if (!rawId) {
    router.replace("/payment-tamara-status/failed");
    return;
  }

  try {
    const res = await useApi().getHyperpayStatus(rawId);
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
