<template>
  <div class="cart-parent mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <!-- left section -->
        <div class="col-12 col-md-12 col-lg-6 col-md-6">
          <h4 class="mb-4 fw-bold">{{ $t("Order Details") }}</h4>

          <div
            class="cart d-flex justify-content-between align-items-center border-radius-36px mb-3"
          >
            <div class="details-cart d-flex align-items-center gap-3">
              <div class="img">
                <img
                  :src="wenchOrder?.brand?.image"
                  :alt="wenchOrder?.brand?.title"
                />
              </div>
              <div class="name-cart">
                <h4 class="item-name">{{ wenchOrder?.brand?.title }}</h4>
                <p class="car-type">{{ wenchOrder?.car_type?.title }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- right section -->
        <div class="col-12 col-md-12 col-lg-4 col-test">
          <div class="h-100">
            <div class="">
              <h6 class="fw-bold text-capitalize">{{ $t("wench details") }}</h6>
              <div class="box-design">
                <div
                  class="total-order d-flex justify-content-between align-items-center"
                >
                  <h4 class="label text-capitalize">
                    {{ $t("type delivery") }}
                  </h4>
                  <p class="text-capitalize">
                    {{ wenchOrder?.delivery_direction }}
                  </p>
                </div>

                <div
                  class="final-amount d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">{{ $t("branch") }}</h4>
                  <p class="text-capitalize">
                    {{ wenchOrder?.branch?.title }}
                  </p>
                </div>

                <div
                  class="final-amount d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">{{ $t("created_at") }}</h4>
                  <p class="text-capitalize">
                    {{ wenchOrder?.created_at }}
                  </p>
                </div>
              </div>

              <div
                class="total-amount d-flex align-items-center justify-content-between"
              >
                <h1 class="amount text-capitalize">{{ $t("total amount") }}</h1>
                <p>{{ wenchOrder?.total_amount }}</p>
              </div>

              <div
                class="buttion-confirm"
                @click="navigateTo($localePath(`/payment?id=${order_id}`))"
              >
                <ButtonCard :textButton="$t('continue')" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingSpinner :is-loading-otp="isLoading" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const order_id = route.params.id;
const wenchOrder = ref(null);
const isLoading = ref(true);
onMounted(async () => {
  try {
    const response = await useWenchServices().getWenchInCart();
    wenchOrder.value = response?.data;
  } catch (error) {
    console.error("Error fetching wench order");
  } finally {
    isLoading.value = false;
  }
});
</script>
<style scoped>
@import "@/assets/css/cartorder.css";
</style>
