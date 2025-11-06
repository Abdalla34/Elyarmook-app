<template>
  <div class="details-member">
    <div class="container py-5">
      <div v-if="isSkeleton" class="row justify-content-center">
        <SkeletonsMemberShipsSkeleId />
      </div>
      <div v-else class="row justify-content-center">
        <div class="col-lg-8 col-md-6 col-sm-12">
          <div class="parent" v-if="memmberDetails">
            <div class="image-details">
              <img
                :src="memmberDetails.image"
                :alt="memmberDetails.description"
                class="image-member border-radius-36px mb-2"
              />
            </div>
            <!-- date -->
            <div class="date d-flex gap-3 align-items-center">
              <div class="date-start">{{ memmberDetails.start_date }}</div>
              <div
                class="date-end ps-2 pe-2 rounded pt-1 pb-1"
                style="background-color: var(--color-secound-main)"
              >
                to {{ memmberDetails.end_date }}
              </div>
            </div>
            <!-- name -->
            <div class="name price discount">
              <h1 class="label">{{ memmberDetails.name }}</h1>
              <div class="price-des">
                <div class="price-details d-flex gap-3 align-items-center">
                  <div class="before-des text-uppercase">
                    {{ memmberDetails.price_before_discount }} {{ $t("sar") }}
                  </div>
                  <div
                    class="after-des text-uppercase"
                    style="font-size: 18px; color: #c71f45; font-weight: 400"
                  >
                    {{ memmberDetails.price_after_discount }} {{ $t("sar") }}
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <div class="member-includes">
              <h1 class="label text-uppercase">
                {{ $t("memberships includes") }} :
              </h1>
              <div v-for="value in memmberDetails.includes" class="items">
                <div class="title d-flex align-items-center gap-3 mb-3">
                  <div
                    v-if="value.service_icon"
                    class="img-items p-1 rounded"
                    style="background-color: rgba(255, 249, 212, 1)"
                  >
                    <img :src="value.service_icon" alt="" />
                  </div>
                  <div class="text">
                    <h4 class="label">{{ value.service_name }}</h4>
                    <p>{{ value.quantity_per_period }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="btn-get btn-have text-center pt-3 pb-3 border-radius-36px"
              style="background-color: var(--color-secound-main)"
              v-if="memmberDetails.has_active_subscription"
            >
              <button
                style="
                  border: none;
                  outline: none;
                  background-color: transparent;
                  cursor: not-allowed;
                "
                class="p-color-fs text-capitalize"
              >
                {{ $t("get this actully i have one") }}
              </button>
            </div>
            <div
              @click="
                navigateTo({
                  path: $localePath('/payment'),
                  query: { membership: idMember },
                })
              "
              class="btn-get"
              v-if="!memmberDetails.has_active_subscription"
            >
              <ButtonCard :text-button="$t('get this membership')" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <LoadingSpinner :is-loading-otp="isloading" /> -->
  </div>
</template>

<script setup>
const route = useRoute();
const idMember = route.params.id;
const memmberDetails = ref({});
const isSkeleton = ref(false);

onMounted(async () => {
  try {
    isSkeleton.value = true;
    const res = await useApi().memberShipDetails(idMember);
    memmberDetails.value = res?.data;
  } catch (err) {
    console.log('Error fetching ');
  } finally {
    isSkeleton.value = false;
  }
});
</script>

<style scoped>
.before-des {
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  text-align: center;
  text-decoration: line-through;
  color: #7e7e7e;
}
.img-items img {
  width: 40px;
}
</style>
