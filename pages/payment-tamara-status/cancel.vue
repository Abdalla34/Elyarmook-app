<template>
  <div class="container text-center py-10">
    <h1 class="text-danger text-3xl font-bold mb-4">
      {{ $t("this operation cacelled") }}
    </h1>

    <NuxtLink
      to="/"
      class="mt-8 inline-block bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
    >
      {{ $t("back to home") }}
    </NuxtLink>
  </div>
</template>

<script setup>
const { tabbyStatusCancel } = useApi();
const route = useRoute();
const router = useRouter();
try {
  let paymentId = route.query.payment_id;
  if (paymentId) {
    const res = await tabbyStatusCancel(paymentId);
  }
} catch (err) {
  console.log('Error fetching ');
}
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: auto;
}
</style>
