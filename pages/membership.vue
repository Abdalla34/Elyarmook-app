<template>
  <div class="membership">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-5 col-sm-12">
          <div
            class="card mb-3 shadow rounded overflow-hidden"
            v-for="value in allMemberShip"
            :key="value.id"
            style="cursor: pointer"
            @click="navigateTo(`/membership-details/${value.id}`)"
          >
            <img
              :src="value.image"
              class="card-img-top image-member"
              :alt="value.descrption"
            />
            <h1 class="label ps-2 text-start">{{ value.name }}</h1>
            <div class="card-body d-flex justify-content-between">
              <div class="price-month d-flex align-items-center gap-2">
                <p class="price">
                  {{ value.price_after_discount }}
                  <span class="text-uppercase">{{ $t("sar") }}</span>
                </p>
                <p>
                  | {{ value.plan_duration }}
                  <span class="month"
                    ><i class="fa-solid fa-calendar-days"></i
                  ></span>
                </p>
              </div>
              <div class="subscripe" style="cursor: pointer">
                <p class="text-capitalize text-danger label">
                  {{ $t("subscripe now") }} >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const allMemberShip = ref([]);
const response = await useApi().memberShips();
allMemberShip.value = response?.data;
</script>

<style scoped>
.card:hover {
  opacity: 0.7;
}
.month i {
  color: var(--main-color);
}
</style>
