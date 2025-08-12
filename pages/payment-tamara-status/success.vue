<template>
  <div class="container text-center py-10">
    <div class="text-center">
      <div>
        <img src="/donePayment.png" alt="تم الدفع بنجاح" />
        <h1 class="text-green-600 text-3xl font-bold mb-4">
          ✅ تم الدفع بنجاح
        </h1>
      </div>
    </div>

    <button-card
      @click="navigateTo('/cart')"
      text-button="العودة للصفحة الرئيسية"
    >
    </button-card>
  </div>
</template>

<script setup>
const route = useRoute();

try {
  let paymentId = route.query.payment_id;
  if (paymentId) {
    res = await useApi().tabbyStatusSuccess(paymentId);
  }
  if (paymentId) {
    res = await useApi().tabbyStatusFailure(paymentId);
  }
  if (paymentId) {
    res = await useApi().tabbyStatusCancel(paymentId);
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
