<template>
  <div class="car-details">
    <div class="container">
      <div class="row">
        <div class="col-8 col-padding">
          <div class="parent">
            <!-- car-details -->
            <div
              class="car-model rounded ps-3 pe-3 d-flex align-items-center justify-content-between mb-5"
            >
              <div class="model d-flex align-items-center gap-2">
                <img
                  class="img"
                  :src="carDetails.brand.image"
                  :alt="carDetails.brand.image"
                />
                <p class="label">
                  {{ carDetails.car_type.title }} - {{ carDetails.brand.title }}
                  <span
                    class="p-color-fs ps-2 pe-2 rounded bg"
                    v-if="carDetails.is_default"
                    >defualt</span
                  >
                </p>
              </div>
              <div
                @click="
                  navigateTo(`/car-update-details/${carDetails.brand.id}`)
                "
                class="edit-car-details"
                style="cursor: pointer"
              >
                <i class="fa-solid fa-pen-to-square color"></i>
              </div>
            </div>
            <div class="chassis-num details-order p-3">
              <p class="p-colo-fs mb-2">chassis Number</p>
              {{ carDetails.chassis_number }}
            </div>
            <!-- last-order -->
            <div class="last-order">
              <h1 class="label">last orders</h1>
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
                        number order..
                        <span class="font-p fw-bold"
                          >#{{ item.order_num }}</span
                        >
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div
                    class="show-order"
                    @click="navigateTo(`/orderdetails/${item.id}`)"
                  >
                    <div
                      class="show-details d-flex align-items-center justify-content-between"
                    >
                      <button class="btn order-bg text-light p-color-fs fs">
                        show order
                      </button>

                      <div style="cursor: pointer">
                        <p class="font-p fw-bold" style="cursor: pointer">
                          {{ item.total_amount }}
                          <span class="p-color-fs fs text-uppercase">sar</span>
                        </p>
                        <p class="p-color-fs fs text-capitalize">
                          details amount
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
                not found orders yet
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


try {
  const responseCarDetails = await useApi().getDetailsCar(idCar);
  carDetails.value = responseCarDetails?.data || {};
  console.log(carDetails);
} catch (err) {
  console.error("❌ حصل خطأ:", err);
}
</script>

<style scoped>
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
</style>
