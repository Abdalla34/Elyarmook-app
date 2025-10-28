<template>
  <div class="container text-center py-10">
    <div class="text-center">
      <div>
        <img src="/donePayment.png" alt="تم الدفع بنجاح" />
        <h1 class="text-green-600 text-3xl font-bold mb-4">
          {{ message }}
        </h1>
      </div>
    </div>

    <button-card
      @click="navigateTo($localePath('/myorders'))"
      :text-button="$t('view my orders')"
    >
    </button-card>
  </div>
</template>

<script setup>
const { tabbyStatusSuccess } = useApi();
const message = ref("");
const route = useRoute();
const cartCount = useState("cartCount", () => 0);
const router = useRouter();
try {
  let paymentId = route.query.payment_id;
  let hyperSucess = route.query.hyper;

  if (hyperSucess === "success") {
    setTimeout(() => {
      cartCount.value = 0;
      router.replace("/");
    }, 2000);
  }

  if (paymentId) {
    const res = await tabbyStatusSuccess(paymentId);
    if (res?.status === true || res?.status === "true") {
      message.value = res?.message || "تمت عملية الدفع بنجاح";
      cartCount.value = 0;
      router.replace("/");
    } else {
      router.replace("/payment-tamara-status/failed");
      message.value = res?.message || "فشلت عملية الدفع";
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
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: auto;
}
</style>
