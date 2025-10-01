<template>
  <div class="container text-center py-10">
    <div class="text-center">
      <div>
        <img src="/donePayment.png" alt="تم الدفع بنجاح" />
        <h1 class="text-green-600 text-3xl font-bold mb-4">
          An appointment has been set successfully
        </h1>
        <p class="label">
          Lorem ipsum dolor sit amet,Lorem Lorem ipsum dolor sit amet,Lorem
          Lorem ipsum dolor sit amet sit amet,Lorem
        </p>
      </div>
    </div>

    <button-card
      @click="navigateTo('/myorders')"
      text-button="view my orders"
    >
    </button-card>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

try {
  let paymentId = route.query.payment_id;
  let hyperSucess = route.query.hyper;

  if (hyperSucess === 'success') {
    setTimeout(() => {
      router.replace("/");
    }, 2000);
  }

  if (paymentId) {
    const res = await useApi().tabbyStatusSuccess(paymentId);
    if (res?.status === true || res?.status === "true") {
      router.replace("/");
    } else {
      router.replace("/payment-tamara-status/failed");
    }
  }
  // if (paymentId) {
  //   const res = await useApi().tabbyStatusFailure(paymentId);
  // }
  // if (paymentId) {
  //   const res = await useApi().tabbyStatusCancel(paymentId);
  // }
} catch (err) {
  console.log(err);
}

onMounted(() => {
  if (route.query?.from === 'cart-update-details') {
    router.push("/cart");
  }
});

</script>

<style scoped>
.container {
  max-width: 700px;
  margin: auto;
}
</style>
