<template>
  <div
    class="parent-index-success text-green-600 text-3xl font-bold mb-4 text-center fs-3"
  >
    {{ $t("loading check status Payment") }}
  </div>
  <div class="load">
    <loading-spinner :is-loading-otp="loading" />
  </div>
</template>

<script setup>
const { getHyperpayStatus } = useApi();
let isChecking = false;
let route = useRoute();
let router = useRouter();
const loading = ref(false);
const localePath = useLocalePath();

onMounted(async () => {
  if (isChecking) return;
  isChecking = true;
  loading.value = true;

  const rawId = route.query.id;
  const paymentType = route.query.type;

  if (!rawId) {
    router.replace(localePath("/payment-tamara-status/failed"));
    return;
  }

  try {
    const res = await getHyperpayStatus(rawId);
    if (res?.status === true || res?.status === "true") {
      if (paymentType === "wallet") {
        router.push("/wallet");
      } else {
        router.push("/payment-tamara-status/success?hyper=success");
      }
    } else {
      router.push("/payment-tamara-status/failed");
    }
  } catch (err) {
    router.push(localePath("/payment-tamara-status/failed"));
  } finally {
    loading.value = false;
  }
});
</script>
<style scoped>

</style>
