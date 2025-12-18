<template>
  <div class="car-details">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-padding">
          <div class="parent">
            <!-- car-details -->
            <div class="car-model rounded mb-5 border">
              <!-- header -->
              <div
                class="d-flex align-items-center justify-content-between p-3 border-bottom"
              >
                <div class="model d-flex align-items-center gap-2">
                  <img
                    class="img"
                    :src="carDetails.brand.image"
                    :alt="carDetails.brand.image"
                  />
                  <p class="label mb-0">
                    {{ carDetails.car_type.title }} -
                    {{ carDetails.brand.title }}
                    <span
                      class="p-color-fs ps-2 pe-2 rounded bg"
                      v-if="carDetails.is_default"
                    >
                      {{ $t("default") }}
                    </span>
                  </p>
                </div>
                <div
                  @click="getIdCarToEdit"
                  class="edit-car-details"
                  style="cursor: pointer"
                >
                  <i
                    v-if="!isloadingBtn"
                    class="fa-solid fa-pen-to-square color"
                  ></i>
                  <span
                    v-else
                    class="spinner-border spinner-border-sm text-warning"
                    role="status"
                  ></span>
                </div>
              </div>

              <!-- footer -->
              <div class="foot-box d-flex justify-content-between w-100 p-3">
                <!-- left section -->
                <div
                  class="chassis-num text-center details-order flex-fill pe-3"
                >
                  <p class="p-colo-fs mb-2">
                    <span class="p-color-fs fs-14px">{{ $t("chassis Number:") }} </span>
                    {{ carDetails.chassis_number }}
                  </p>
                </div>

                <!-- right section -->
                <div
                  class="chassis-num text-center details-order flex-fill ps-3"
                >
                  <p class="p-colo-fs mb-2">
                    <span class="p-color-fs fs-14px">{{
                      $t("Manufacture Year:")
                    }}</span>
                    {{ carDetails.manufacture_year }}
                  </p>
                </div>
              </div>
            </div>

            <!-- last-order -->
            <div class="last-order">
              <h1 class="label">{{ $t("last orders") }}</h1>
              <div class="orders" v-for="item in carDetails.latest_orders">
                <div class="details-order p-3 rounded mb-3">
                  <!-- details date -->
                  <div
                    class="details-date d-flex align-items-center justify-content-between"
                  >
                    <div class="status p-color-fs fs">
                      {{ item.status_value }}
                    </div>
                    <div class="p-color-fs fs">{{ item.created_at }}</div>
                  </div>
                  <!-- vendor name  -->
                  <div class="vendor-name d-flex align-items-center gap-2">
                    <img class="img" src="/public/image 10.png" alt="" />
                    <div class="order-num-name">
                      <h1 class="label">
                        {{ item.vendor_name }}
                      </h1>
                      <p class="p-color-fs fs">
                        {{ $t("number order..") }}
                        <span class="font-p fw-bold"
                          >#{{ item.order_num }}</span
                        >
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div
                    class="show-order"
                    @click="navigateTo(localePath(`/orderdetails/${item.id}`))"
                  >
                    <div
                      class="show-details d-flex align-items-center justify-content-between"
                    >
                      <button class="btn order-bg text-light p-color-fs fs">
                        {{ $t("show order") }}
                      </button>

                      <div style="cursor: pointer">
                        <p class="font-p fw-bold" style="cursor: pointer">
                          {{ item.total_amount }}
                          <span class="p-color-fs fs text-uppercase">{{
                            $t("sar")
                          }}</span>
                        </p>
                        <p class="p-color-fs fs text-capitalize">
                          {{ $t("details amount") }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="carDetails.latest_orders.length === 0"
                class="empty-order p-color-fs text-uppercase"
              >
                {{ $t("not found orders yet") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const carDetails = ref({});
const route = useRoute();
const idCar = route.params.id;
const { getDetailsCar } = useApi();
const localePath = useLocalePath();
const isloadingBtn = ref(false);
try {
  const responseCarDetails = await getDetailsCar(idCar);
  carDetails.value = responseCarDetails?.data || {};
} catch (err) {
  console.error("❌ حصل خطأ:", err);
}

function getIdCarToEdit() {
  isloadingBtn.value = true;
  navigateTo(localePath(`/car-update-details/${carDetails.value.id}`));
}
</script>

<style scoped>
.car-details {
  margin-bottom: 150px;
}
.car-model,
.details-order {
  background-color: var(--color-secound-main);
}
.img {
  width: 60px;
}
.color {
  color: red;
}
.bg {
  background-color: var(--main-color);
}
.fs {
  font-size: 12px;
}
.order-bg {
  background-color: #14142b;
  transition: all 0.3s;
}
@media (max-width: 576px) {
  .car-details {
    margin-bottom: 100px;
  }
  .img {
    width: 45px;
  }
  .fs-14px{
    font-size: 14px;
  }
}
</style>
