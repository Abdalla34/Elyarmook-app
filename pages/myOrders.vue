<template>
  <div class="my-orders position-relative">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7 col-md-10 col-sm-12">
          <ul class="links d-flex justify-content-center align-items-end ul">
            <li class="">
              <NuxtLink
                to="/"
                exact-active-class="active"
                class="d-flex align-items-center gap-1 border-radius-36px p-color-fs link-fix"
              >
                <iconsOrder-iconAll :isActive="$route.path === '/AllOrder'" />
                <h6 class="text-capitalize link-sm">all</h6>
              </NuxtLink>
            </li>

            <li class="">
              <NuxtLink
                to="/myOrders"
                exact-active-class="active"
                class="d-flex align-items-center gap-1 border-radius-36px p-color-fs link-fix"
              >
                <iconsOrder-requested :isActive="$route.path === '/myOrders'" />
                <h6 class="text-capitalize link-sm">requested</h6>
              </NuxtLink>
            </li>

            <li class="">
              <NuxtLink
                to="/"
                exact-active-class="active"
                class="d-flex align-items-center gap-1 border-radius-36px p-color-fs link-fix"
              >
                <iconsOrder-canceled :isActive="$route.path === '/canceled'" />
                <h6 class="text-capitalize link-sm">canceled</h6>
              </NuxtLink>
            </li>

            <li class="">
              <NuxtLink
                to="/"
                exact-active-class="active"
                class="d-flex align-items-center gap-1 border-radius-36px p-color-fs link-fix"
              >
                <iconsOrder-spareOrder :isActive="$route.path === '/'" />

                <h6 class="text-capitalize link-sm">spare parts</h6>
              </NuxtLink>
            </li>
          </ul>

           <div
            class="box-orders border-radius-36px d-flex align-items-center justify-content-between position-relative"
           
          >
            <!-- <div
              v-if="order.status === 'requested' || order.status === 'report'"
              class="action position-absolute text-capitalize"
            >
              action nedeed
            </div> -->
          
            <div class="details-title d-flex align-items-center gap-3">
              <div>
                <img src="" alt="imageOrder" />
              </div>
              <div class="name price">
                <h4 class="text-capitalize"></h4>
                <p class="price">
                  
                  <span class="p-color-fs span"></span>
                </p>
              </div>
            </div>

            <div class="time-branch">
              <div class="time d-flex gap-2 align-items-center mb-2">
                <div class="icon-time icon-design">
                  <iconsOrder-timer />
                </div>
                <div class="time-order">
                  <p class="paragarph text-capitalize">
                  aasas
                  </p>
                  <p class="paragarph text-capitalize">
                    asasas
                  </p>
                </div>
              </div>

              <div class="barnch d-flex gap-2 align-items-center">
                <div class="icon-branch icon-design">
                  <iconsOrder-timer />
                </div>
                <div class="title-order">
                  <p class="paragarph">
                   sasasasas
                  </p>
                  <p class="paragarph">asasasas</p>
                </div>
              </div>
            </div>

            <div>requsted</div>
      
            <!-- <div
              class="status text-capitalize"
              :class="{
                'bg-requested': order.status === 'requested',
                'bg-report': order.status === 'report',
                'bg-inspection': order.status === 'inspection',
                'bg-canceled': order.status === 'canceled',
                'bg-ready': order.status === 'car is ready',
              }"
            >
             req
            </div> -->
          
          </div> 
        </div>
      </div>
      <!-- <div class="position-absolute test">
        <PoupPremium />
      </div> -->
    </div>
  </div>
  <!-- <div class="position-absolute over"></div> -->
</template>

<script setup>
let orders = ref([]);
onMounted(async () => {
  try {
    const res = await useApi().getMyOrders();
    console.log("Orders fetched: ", res);
    orders.value = res?.data?.items;
  } catch (error) {
    console.error("Error fetching orders:", error?.response?._data || error);
  }
});

// let ordersAll = ref([
//   {
//     imgOrder: "/Car Brake Icon.png",
//     nameOrder: "Brakes Services",
//     priceOrder: "60",
//     currency: "SAR",
//     day: "wed",
//     dayNumber: 23,
//     month: "oct",
//     year: 2024,
//     time: 10,
//     meinute: "00",
//     branch: "Riadah",
//     area: "senaeyah",
//     stret: "25 soliman",
//     status: "requested",
//     orderNumber: 1540,
//     nameIcon: "like",
//     details:
//       "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,  Lorem ipsum dolor sit amet",
//     totalprice: 80,
//     vatnum: 300315382500003,
//     orderamount: 300315382500003,
//   },
//   {
//     imgOrder: "/Car Brake Icon.png",
//     nameOrder: "Brakes Services",
//     priceOrder: "60",
//     currency: "SAR",
//     day: "wed",
//     dayNumber: 23,
//     month: "oct",
//     year: 2024,
//     time: 10,
//     meinute: "00",
//     branch: "Riadah",
//     area: "senaeyah",
//     stret: "25 soliman",
//     status: "inspection",
//     orderNumber: 1540,
//     nameIcon: "like",
//     details:
//       "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,  Lorem ipsum dolor sit amet",
//     totalprice: 80,
//     vatnum: 300315382500003,
//     orderamount: 300315382500003,
//   },
//   {
//     imgOrder: "/Car Brake Icon.png",
//     nameOrder: "Brakes Services",
//     priceOrder: "60",
//     currency: "SAR",
//     day: "wed",
//     dayNumber: 23,
//     month: "oct",
//     year: 2024,
//     time: 10,
//     meinute: "00",
//     branch: "Riadah",
//     area: "senaeyah",
//     stret: "25 soliman",
//     status: "report",
//     orderNumber: 1540,
//     nameIcon: "like",
//     details:
//       "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,  Lorem ipsum dolor sit amet",
//     totalprice: 80,
//     vatnum: 300315382500003,
//     orderamount: 300315382500003,
//   },
//   {
//     imgOrder: "/Car Brake Icon.png",
//     nameOrder: "Brakes Services",
//     priceOrder: "60",
//     currency: "SAR",
//     day: "wed",
//     dayNumber: 23,
//     month: "oct",
//     year: 2024,
//     time: 10,
//     meinute: "00",
//     branch: "Riadah",
//     area: "senaeyah",
//     stret: "25 soliman",
//     status: "canceled",
//     orderNumber: 1540,
//     nameIcon: "like",
//     details:
//       "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,  Lorem ipsum dolor sit amet",
//     totalprice: 80,
//     vatnum: 300315382500003,
//     orderamount: 300315382500003,
//   },
//   {
//     imgOrder: "/Car Brake Icon.png",
//     nameOrder: "Brakes Services",
//     priceOrder: "60",
//     currency: "SAR",
//     day: "wed",
//     dayNumber: 23,
//     month: "oct",
//     year: 2024,
//     time: 10,
//     meinute: "00",
//     branch: "Riadah",
//     area: "senaeyah",
//     stret: "25 soliman",
//     status: "car is ready",
//     orderNumber: 1540,
//     nameIcon: "like",
//     details:
//       "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,  Lorem ipsum dolor sit amet",
//     totalprice: 80,
//     vatnum: 300315382500003,
//     orderamount: 300315382500003,
//   },
// ]);

// let router = useRouter();
// function clickGoToOrder(item) {
//   localStorage.setItem("orderget", JSON.stringify(item));
//   router.push(`/ordersteps/${item.id}`);
// }
</script>

<style scoped>
@import "@/assets/css/myorders.css";
.test {
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  z-index: 16;
}
.over {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 11;
}
</style>
