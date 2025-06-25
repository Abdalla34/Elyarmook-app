<template>
  <div class="cart-parent">
    <div class="container">
      <div class="row">
        <div class="col-8 col-padding">
          <div class="cart-name">
            <h1 class="title-pages">
              Cart <span class="p-color-fs">({{ orders.length }})</span>
            </h1>
          </div>

          <div
            class="cart d-flex justify-content-between align-items-center border-radius-36px mb-3"
            v-for="order in orders"
            :key="order.id"
          >
            <div class="details-cart d-flex align-items-center gap-2">
              <div class="img">
                <img :src="order.imgorder" alt="" />
              </div>
              <div class="name-cart">
                <h4 class="item-name">{{ order.nameorder }}</h4>
                <p class="price">
                  {{ order.priceorder }}
                  <span class="p-color-fs span">{{ order.currency }}</span>
                </p>
              </div>
            </div>
            <div class="delete-icon">
              <svg
                @click="deletedOrder(order.id)"
                width="28"
                height="24"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.5 5.98047C20.615 5.65047 16.7067 5.48047 12.81 5.48047C10.5 5.48047 8.19 5.58047 5.88 5.78047L3.5 5.98047"
                  stroke="#3D3D3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.91602 4.97L10.1727 3.66C10.3593 2.71 10.4993 2 12.471 2H15.5277C17.4994 2 17.651 2.75 17.826 3.67L18.0827 4.97"
                  stroke="#3D3D3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21.9911 9.14062L21.2328 19.2106C21.1045 20.7806 20.9995 22.0006 17.7445 22.0006H10.2545C6.99948 22.0006 6.89448 20.7806 6.76615 19.2106L6.00781 9.14062"
                  stroke="#3D3D3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.0508 16.5H15.9358"
                  stroke="#3D3D3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.084 12.5H16.9173"
                  stroke="#3D3D3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div
            class="button-continue width"
            @click="navigateTo('/orderDetails')"
          >
            <ButtonCard textButton="continue" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let orders = ref([
  {
    id: 1,
    imgorder: "car Brake Icon.png",
    nameorder: "Brakes Services",
    priceorder: "90",
    currency: "SAR",
  },
  {
    id: 2,
    imgorder: "car Brake Icon.png",
    nameorder: "Brakes Services",
    priceorder: "70",
    currency: "SAR",
  },
  {
    id: 3,
    imgorder: "car Brake Icon.png",
    nameorder: "Brakes Services",
    priceorder: "60",
    currency: "SAR",
  },
]);
function deletedOrder(id) {
  orders.value = orders.value.filter((order) => order.id !== id);
}
</script>

<style scoped>
@import "./assets/css/cardorder.css";
</style>
