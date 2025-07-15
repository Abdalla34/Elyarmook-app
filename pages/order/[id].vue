<template>
  <div class="margin-top">
    <div class="container">
      <!-- <div v-if="test">
        <Veiws />
      </div> -->
      <div class="row justify-content-center">
       
        <div class="col-lg-5 col-md-7">
          <div class="h-100">
            <h4 class="mb-4 fw-bold">Order Details</h4>

            <div
              class="card border-radius-36px mb-4 d-flex flex-row align-items-center"
              v-for="item in order.data.services"
              :key="item.id"
            >
              <img :src="item.image" alt="Brakes" width="60" />
              <div class="ms-3 flex-grow-1">
                <h6 class="fw-bold">{{ item.title }}</h6>
                <p class="font-p parag mb-0 text-start">
                  {{ item.description }}
                </p>
              </div>
              <p class="price">
                {{ item.price }}
                <span class="p-color-fs span">{{ item.currency }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-4 col-test">
          <div class="h-100">
            <div class="">
              <h6 class="fw-bold">Order Details</h6>
              <div class="box-design">
                <div
                  class="branch d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">branch</h4>
                  <p class="text-capitalize">
                    {{ order.data.branch.title }}
                  </p>
                </div>

                <div
                  class="model d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">car model</h4>
                  <ClientOnly>
                    <p>
                      {{
                        dayjs(order.data.reservation_time).format(
                          "ddd, MMM D, YYYY"
                        )
                      }}
                    </p>
                  </ClientOnly>
                </div>

                <div
                  class="reservation-date d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">Reservation Date</h4>
                  <ClientOnly>
                    <p>
                      {{ dayjs(order.data.reservation_time).format("hh:mm A") }}
                    </p>
                  </ClientOnly>
                </div>

                <div
                  class="reservation-time d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">Reservation time</h4>
                  <p class="text-capitalize">
                    {{ dayjs(order.data.reservation_time).format("hh:mm A") }}
                  </p>
                </div>
              </div>
            </div>

            <!-- تفاصيل السعر -->
            <div class="">
              <h6 class="fw-bold">Cost Details</h6>
              <div class="box-design">
                <div
                  class="total-order d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">Total Order</h4>
                  <p class="text-capitalize">{{ order.data.order_num }}</p>
                </div>

                <div
                  class="vat d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">vat</h4>
                  <p class="text-capitalize">{{ order.data.vat_amount }}</p>
                </div>

                <div
                  class="final-amount d-flex justify-content-between align-items-center"
                >
                  <h4 class="label">Final Amount</h4>
                  <p class="text-capitalize">{{ order.data.total_amount }}</p>
                </div>
              </div>

              <div class="input-code position-relative">
                <input
                  type="text"
                  class="w-100 input-with-apply text-capitalize"
                  placeholder="promocode"
                />
                <button class="apply-btn position-absolute">
                  <span class="text-capitalize me-2 spanbutton">apply</span>
                  <iconsOrder-applyCode />
                </button>
              </div>

              <div
                class="total-amount d-flex align-items-center justify-content-between"
              >
                <h1 class="amount text-capitalize">total</h1>
                <p>{{ order.data.total_amount }} sar</p>
              </div>

              <div class="buttion-confirm">
                <ButtonCard textButton="continue" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const route = useRoute();
const id = route.params.id;
const order = ref(null);
const dayjs = useDayjs();
order.value = await useApi().getSingleOrder(id);
</script>

<style scoped>
@import "@/assets/css/confirmorder.css";
</style>
