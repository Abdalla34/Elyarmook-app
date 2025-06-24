<template>
  <div class="my-orders">
    <div class="container">
      <div class="row">
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
            v-for="order in ordersAll"
            :key="order.id"
          >
            <div
              v-if="order.status === 'requested' || order.status === 'report'"
              class="action position-absolute text-capitalize"
            >
              action nedeed
            </div>
            <div class="details-title d-flex align-items-center gap-3">
              <div>
                <img :src="order.imgOrder" alt="" />
              </div>
              <div class="name price">
                <h4 class="text-capitalize">{{ order.nameOrder }}</h4>
                <p class="price">
                  {{ order.priceOrder }}
                  <span class="p-color-fs span">{{ order.currency }}</span>
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
                    {{ order.day }} , {{ order.dayNumber }} ,
                    {{ order.month }} ,
                    {{ order.year }}
                  </p>
                  <p class="paragarph text-capitalize">
                    {{ order.time }} : {{ order.meinute }}
                  </p>
                </div>
              </div>

              <div class="barnch d-flex gap-2 align-items-center">
                <div class="icon-branch icon-design">
                  <iconsOrder-timer />
                </div>
                <div class="title-order">
                  <p class="paragarph">
                    {{ order.branch }} , {{ order.area }} ,
                  </p>
                  <p class="paragarph">{{ order.stret }}</p>
                </div>
              </div>
            </div>

            <div
              class="status text-capitalize"
              :class="{
                'bg-requested': order.status === 'requested',
                'bg-report': order.status === 'report',
                'bg-inspection': order.status === 'inspection',
                'bg-canceled': order.status === 'canceled',
                'bg-ready': order.status === 'car is ready',
              }"
            >
              {{ order.status }}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let ordersAll = ref([
  {
    imgOrder: "Car Brake Icon.png",
    nameOrder: "Brakes Services",
    priceOrder: "60",
    currency: "SAR",
    day: "wed",
    dayNumber: 23,
    month: "oct",
    year: 2024,
    time: 10,
    meinute: "00",
    branch: "Riadah",
    area: "senaeyah",
    stret: "25 soliman",
    status: "requested",
  },
  {
    imgOrder: "Car Brake Icon.png",
    nameOrder: "Brakes Services",
    priceOrder: "60",
    currency: "SAR",
    day: "wed",
    dayNumber: 23,
    month: "oct",
    year: 2024,
    time: 10,
    meinute: "00",
    branch: "Riadah",
    area: "senaeyah",
    stret: "25 soliman",
    status: "inspection",
  },
  {
    imgOrder: "Car Brake Icon.png",
    nameOrder: "Brakes Services",
    priceOrder: "60",
    currency: "SAR",
    day: "wed",
    dayNumber: 23,
    month: "oct",
    year: 2024,
    time: 10,
    meinute: "00",
    branch: "Riadah",
    area: "senaeyah",
    stret: "25 soliman",
    status: "report",
  },
  {
    imgOrder: "Car Brake Icon.png",
    nameOrder: "Brakes Services",
    priceOrder: "60",
    currency: "SAR",
    day: "wed",
    dayNumber: 23,
    month: "oct",
    year: 2024,
    time: 10,
    meinute: "00",
    branch: "Riadah",
    area: "senaeyah",
    stret: "25 soliman",
    status: "canceled",
  },
  {
    imgOrder: "Car Brake Icon.png",
    nameOrder: "Brakes Services",
    priceOrder: "60",
    currency: "SAR",
    day: "wed",
    dayNumber: 23,
    month: "oct",
    year: 2024,
    time: 10,
    meinute: "00",
    branch: "Riadah",
    area: "senaeyah",
    stret: "25 soliman",
    status: "car is ready",
  },
]);
</script>

<style scoped>
.my-orders {
  margin-bottom: 80px;
}

.links {
  margin-bottom: 48px;
}

.box-orders {
  padding: 28px;
  margin: auto;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px 0px #0000000a;
  margin-bottom: 48px;
}

.name h4 {
  font-size: 24px;
  font-weight: 500;
  font-family: var(--font-main);
  color: #2f2f2f;
}

.price {
  font-size: 24px;
  font-weight: 600;
}

.paragarph {
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  vertical-align: middle;
}

.icon-design {
  background-color: #ecfaf2;
  border-radius: 12px;
  padding: 8px;
}

.status {
  border-radius: 20px;
  padding-right: 12px;
  padding-left: 12px;
  gap: 4px;
}

.bg-requested {
  background-color: #fef5bf;
  color: #fdd800;
}

.bg-inspection {
  background-color: #ecfaf2;
  color: #41c980;
}

.bg-report {
  background-color: #fef5bf;
  color: #fdd800;
}

.bg-canceled {
  background-color: #f9cbcb;
  color: #eb5757;
}
.bg-ready {
  background-color: #ecfaf2;
  color: #41c980;
}

.action {
  position: absolute !important;
  background-color: #de2b53;
  padding: 4px 12px;
  right: -30px;
  top: -14px;
  color: white;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  font-family: var(--font-main);
}

@media (max-width: 768px) {
  .price {
    font-size: 16px;
  }
  .span {
    font-size: 12px;
  }
    a {
    font-size: 10px;
  }
}

@media (max-width: 1399px) {
  .box-orders {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    gap: 16px;
  }

  .details-title {
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
  }

  .details-title img {
    width: 50px;
    height: auto;
  }

  .time-branch {
    width: 100%;
  }

  .status {
    align-self: flex-end;
    margin-top: 12px;
  }

  .link-fix {
    flex: 1 1 45%;
    text-align: center;
    font-size: 14px;
    padding: 8px 10px;
  }
}

@media (max-width: 576px) {
  .links {
    flex-wrap: wrap;
    gap: 12px;
  }

  .links li {
    width: 48%;
    text-align: center;
  }

  .box-orders {
    width: 100%;
  }

  .name h4 {
    font-size: 18px;
  }

  .price {
    font-size: 18px;
  }

  .paragarph {
    font-size: 14px;
    line-height: 20px;
  }

  .status {
    font-size: 12px;
    padding: 6px 10px;
  }
  .link-fix {
    flex: 1 1 45%;
    text-align: center;
    font-size: 14px;
    padding: 8px 10px;
  }
}
/* @media (min-width: 992px) and (max-width: 1199px) {
  a {
    font-size: 13px;
  }
} */
</style>
