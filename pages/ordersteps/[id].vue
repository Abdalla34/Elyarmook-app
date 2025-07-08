<template>
  <div class="order-steps">
    <div class="container">
      <div class="row justify-content-center mt-3">
        <div class="col-7 pb-4 mt-2 mb-4 background">
          <div v-if="orderSelected">
            <div
              class="order-img-name pt-5 d-flex align-items-center justify-content-between"
            >
              <div class="img-title d-flex align-items-center gap-3">
                <img :src="orderSelected.imgOrder" alt="" />
                <div class="title">
                  <h1 class="h1 text-capitalize">
                    {{ orderSelected.nameOrder }}
                  </h1>
                  <p class="price">
                    {{ orderSelected.priceOrder }}
                    <span class="span text-uppercase">{{
                      orderSelected.currency
                    }}</span>
                  </p>
                </div>
              </div>

              <div
                :class="{
                  'bg-requested': orderSelected.status === 'requested',
                  'bg-report': orderSelected.status === 'report',
                  'bg-inspection': orderSelected.status === 'inspection',
                  'bg-canceled': orderSelected.status === 'canceled',
                  'bg-ready': orderSelected.status === 'car is ready',
                }"
              >
                <p class="status text-capitalize">
                  {{ orderSelected.status }}
                </p>
              </div>
            </div>

            <div
              class="model-car margin-60px d-flex justify-content-between alig-items-center gap-3"
            >
              <div
                class="car-name d-flex align-items-center justify-content-center gap-4 box-car"
              >
                <div class="icons-car">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.75 8.74031C21.75 9.15031 21.41 9.49031 21 9.49031H3C2.59 9.49031 2.25 9.15031 2.25 8.74031C2.25 8.33031 2.59 7.99031 3 7.99031H4.02L4.4 6.18031C4.76 4.43031 5.51 2.82031 8.49 2.82031H15.51C18.49 2.82031 19.24 4.43031 19.6 6.18031L19.98 7.99031H21C21.41 7.99031 21.75 8.33031 21.75 8.74031Z"
                      fill="#7E7E7E"
                    />
                    <path
                      d="M22.1796 14.4022C22.0296 12.7522 21.5896 10.9922 18.3796 10.9922H5.6196C2.4096 10.9922 1.9796 12.7522 1.8196 14.4022L1.2596 20.4922C1.1896 21.2522 1.4396 22.0122 1.9596 22.5822C2.4896 23.1622 3.2396 23.4922 4.0396 23.4922H5.9196C7.5396 23.4922 7.8496 22.5622 8.0496 21.9522L8.2496 21.3522C8.4796 20.6622 8.5396 20.4922 9.4396 20.4922H14.5596C15.4596 20.4922 15.4896 20.5922 15.7496 21.3522L15.9496 21.9522C16.1496 22.5622 16.4596 23.4922 18.0796 23.4922H19.9596C20.7496 23.4922 21.5096 23.1622 22.0396 22.5822C22.5596 22.0122 22.8096 21.2522 22.7396 20.4922L22.1796 14.4022ZM8.9996 16.4922H5.9996C5.5896 16.4922 5.2496 16.1522 5.2496 15.7422C5.2496 15.3322 5.5896 14.9922 5.9996 14.9922H8.9996C9.4096 14.9922 9.7496 15.3322 9.7496 15.7422C9.7496 16.1522 9.4096 16.4922 8.9996 16.4922ZM17.9996 16.4922H14.9996C14.5896 16.4922 14.2496 16.1522 14.2496 15.7422C14.2496 15.3322 14.5896 14.9922 14.9996 14.9922H17.9996C18.4096 14.9922 18.7496 15.3322 18.7496 15.7422C18.7496 16.1522 18.4096 16.4922 17.9996 16.4922Z"
                      fill="#7E7E7E"
                    />
                  </svg>
                </div>
                <div class="name">
                  <p class="text-capitalize parag">car model</p>
                  <p class="name-order">{{ orderSelected.nameOrder }}</p>
                </div>
              </div>

              <div
                class="order-number d-flex align-items-center justify-content-center gap-4 box-car"
              >
                <div class="icons-car">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.9199 14.1603H13.7599L14.0799 11.3203H11.2399L10.9199 14.1603Z"
                      fill="#7E7E7E"
                    />
                    <path
                      d="M16.69 2.74219H8.31C4.67 2.74219 2.5 4.91219 2.5 8.55219V16.9222C2.5 20.5722 4.67 22.7422 8.31 22.7422H16.68C20.32 22.7422 22.49 20.5722 22.49 16.9322V8.55219C22.5 4.91219 20.33 2.74219 16.69 2.74219ZM19.32 11.3222H15.55L15.23 14.1722H18.6C19 14.1722 19.33 14.5022 19.33 14.9022C19.33 15.3022 19 15.6322 18.6 15.6322H15.07L14.66 19.2922C14.62 19.6622 14.3 19.9422 13.93 19.9422C13.9 19.9422 13.88 19.9422 13.85 19.9422C13.45 19.9022 13.16 19.5322 13.2 19.1322L13.59 15.6322H10.75L10.34 19.2922C10.3 19.6622 9.98 19.9422 9.61 19.9422C9.58 19.9422 9.56 19.9422 9.53 19.9422C9.13 19.9022 8.84 19.5322 8.88 19.1322L9.27 15.6322H5.68C5.28 15.6322 4.95 15.3022 4.95 14.9022C4.95 14.5022 5.28 14.1722 5.68 14.1722H9.45L9.77 11.3222H6.4C6 11.3222 5.67 10.9922 5.67 10.5922C5.67 10.1922 6 9.86219 6.4 9.86219H9.93L10.34 6.20219C10.38 5.80219 10.75 5.51219 11.15 5.55219C11.55 5.59219 11.84 5.96219 11.8 6.36219L11.41 9.86219H14.25L14.66 6.20219C14.71 5.80219 15.07 5.51219 15.47 5.55219C15.87 5.59219 16.16 5.96219 16.12 6.36219L15.73 9.86219H19.34C19.74 9.86219 20.07 10.1922 20.07 10.5922C20.07 10.9922 19.72 11.3222 19.32 11.3222Z"
                      fill="#7E7E7E"
                    />
                  </svg>
                </div>
                <div class="number">
                  <p class="text-capitalize parag">order nunmber</p>
                  <p class="name-order"># {{ orderSelected.orderNumber }}</p>
                </div>
              </div>
            </div>

            <div
              class="time-order margin-20px d-flex justify-content-between gap-3"
            >
              <div
                class="time text-center box-order border-radius-36px border-radius-36px"
              >
                <div class="box-icon">
                  <TimeIcon />
                </div>
                <div class="days-time">
                  <h4>
                    {{ orderSelected.day }} {{ orderSelected.dayNumber }}
                    {{ orderSelected.month }} {{ orderSelected.year }}
                    {{ orderSelected.time }} {{ orderSelected.meinute }}
                  </h4>
                  <p class="color-Eb">Reschedule Order</p>
                </div>
              </div>

              <div
                class="order-location text-center box-order border-radius-36px border-radius-36px"
              >
                <div class="box-icon">
                  <LocationIcon />
                </div>
                <div class="days-time">
                  <h4>
                    {{ orderSelected.branch }} {{ orderSelected.area }}
                    {{ orderSelected.stret }}
                  </h4>
                  <p class="color-Eb text-capitalize">show in maps</p>
                </div>
              </div>
            </div>

            <div class="like text-center margin-top">
              <svg
                width="48"
                height="49"
                viewBox="0 0 48 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.7793 37.7236V17.4036C16.7793 16.6036 17.0193 15.8236 17.4593 15.1636L22.9193 7.0436C23.7793 5.7436 25.9193 4.8236 27.7393 5.5036C29.6993 6.1636 30.9993 8.3636 30.5793 10.3236L29.5393 16.8636C29.4593 17.4636 29.6193 18.0036 29.9593 18.4236C30.2993 18.8036 30.7993 19.0436 31.3393 19.0436H39.5593C41.1393 19.0436 42.4993 19.6836 43.2993 20.8036C44.0593 21.8836 44.1993 23.2836 43.6993 24.7036L38.7793 39.6836C38.1593 42.1636 35.4593 44.1836 32.7793 44.1836H24.9793C23.6393 44.1836 21.7593 43.7236 20.8993 42.8636L18.3393 40.8836C17.3593 40.1436 16.7793 38.9636 16.7793 37.7236Z"
                  fill="#BEBEBE"
                />
                <path
                  d="M10.42 13.5039H8.36C5.26 13.5039 4 14.7039 4 17.6639V37.7839C4 40.7439 5.26 41.9439 8.36 41.9439H10.42C13.52 41.9439 14.78 40.7439 14.78 37.7839V17.6639C14.78 14.7039 13.52 13.5039 10.42 13.5039Z"
                  fill="#BEBEBE"
                />
              </svg>

              <h1 class="title-step">{{ orderSelected.nameIcon }}</h1>
              <p class="width-p">
                {{ orderSelected.details }}
              </p>
            </div>

            <div class="steps">
              <ul
                class="d-flex justify-content-center align-items-center gap-4"
              >
                <li>
                  <div class="bg-icons text-center">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 3.74219H7C4 3.74219 2 5.24219 2 8.74219V15.7422C2 19.2422 4 20.7422 7 20.7422H10.57C11.16 20.7422 11.64 20.2222 11.56 19.6322C11.46 18.9222 11.48 18.1822 11.63 17.4222C12.16 14.8222 14.3 12.7522 16.92 12.3222C18.23 12.1122 19.48 12.2922 20.58 12.7722C21.25 13.0622 22 12.6022 22 11.8722V8.74219C22 5.24219 20 3.74219 17 3.74219ZM17.47 9.33219L14.34 11.8322C13.68 12.3622 12.84 12.6222 12 12.6222C11.16 12.6222 10.31 12.3622 9.66 11.8322L6.53 9.33219C6.21 9.07219 6.16 8.60219 6.41 8.27219C6.67 7.95219 7.14 7.89219 7.46 8.15219L10.59 10.6522C11.35 11.2622 12.64 11.2622 13.4 10.6522L16.53 8.15219C16.85 7.89219 17.33 7.94219 17.58 8.27219C17.84 8.60219 17.79 9.07219 17.47 9.33219Z"
                        fill="#FDD800"
                      />
                      <path
                        d="M18 13.7422C15.24 13.7422 13 15.9722 13 18.7422C13 21.5022 15.24 23.7422 18 23.7422C20.77 23.7422 23 21.5022 23 18.7422C23 15.9722 20.77 13.7422 18 13.7422ZM20.05 18.2922L19.68 18.6522L17.5 20.8422C17.4 20.9322 17.21 21.0322 17.07 21.0522L16.09 21.1922C15.74 21.2422 15.49 20.9922 15.54 20.6422L15.68 19.6622C15.7 19.5222 15.79 19.3322 15.89 19.2322L18.07 17.0622L18.43 16.6922C18.67 16.4522 18.94 16.2922 19.22 16.2922C19.46 16.2922 19.73 16.4022 20.03 16.6922C20.7 17.3422 20.49 17.8522 20.05 18.2922Z"
                        fill="#FDD800"
                      />
                    </svg>
                  </div>
                  <p class="step-name">reuested</p>
                </li>

                <li>
                  <div class="bg-icons text-center">
                    <icons-status-step-booked />
                  </div>
                  <p class="step-name">booked</p>
                </li>

                <li>
                  <div class="bg-icons text-center">
                    <icons-status-step-inspection />
                  </div>
                  <p class="step-name">inspection</p>
                </li>

                <li>
                  <div class="bg-icons text-center">
                    <icons-status-step-report />
                  </div>
                  <p class="step-name">report</p>
                </li>

                <li>
                  <div class="bg-icons text-center">
                    <icons-status-step-car-fine />
                  </div>
                  <p class="step-name">car is fine</p>
                </li>

                <li>
                  <div class="bg-icons text-center">
                    <icons-status-step-maintenance />
                  </div>
                  <p class="step-name">maintenance</p>
                </li>

                <li>
                  <div class="bg-icons text-center">
                    <icons-status-step-ready />
                  </div>
                  <p class="step-name">ready</p>
                </li>

                <li>
                  <div class="bg-icons text-center">
                    <icons-status-step-completed />
                  </div>
                  <p class="step-name">completed</p>
                </li>
              </ul>
            </div>

            <div class="input-code position-relative margin-60px">
              <input
                type="text"
                class="w-100 input-with-apply text-capitalize"
                placeholder="promocode"
              />
              <button
                class="apply-btn position-absolute d-flex align-items-center gap-2"
              >
                <span class="text-capitalize apply">apply</span>
                <iconsOrder-applyCode />
              </button>
            </div>

            <div
              class="order-amount d-flex align-items-center justify-content-between margin-20px"
            >
              <div class="amount text-capitalize">order amount</div>
              <div class="num-order-amount">
                {{ orderSelected.orderamount }}
              </div>
            </div>

            <div
              class="order-amount d-flex align-items-center justify-content-between margin-20px"
            >
              <div class="amount">VAT</div>
              <div class="num-order-amount">{{ vatnum }}</div>
            </div>

            <div
              class="totla-amount margin-20px d-flex align-items-center justify-content-between"
            >
              <div class="total text-capitalize">total amount</div>
              <div class="price-total">
                {{ orderSelected.totalprice }} <span class="span">SAR</span>
              </div>
            </div>
            <div
              v-if="
                orderSelected.status === 'requested' ||
                orderSelected.status === 'report'
              "
            >
              <div class="button-order margin-20px">
                <button-card
                  textButton="accept and pay"
                  :isActive="activeFalse"
                />
              </div>
            </div>

            <div
              class="cancel-order mt-4 position-relative d-flex align-items-center"
            >
              <button>cancel order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let activeFalse = ref(false);
let orderSelected = ref(null);

onMounted(() => {
  let getOrder = localStorage.getItem("orderget");
  if (getOrder) {
    let orderDone = JSON.parse(getOrder);
    if (orderDone) {
      orderSelected.value = orderDone;
    }
  }
});
</script>

<style scoped>
@import "./assets/css/ordersteps.css";
.bg-requested {
  background-color: #fef5bf;
  color: #fdd800;
  padding: 0px 28px;
  border-radius: 12px;
}

.bg-inspection {
  background-color: #ecfaf2;
  color: #41c980;
  padding: 0px 28px;
  border-radius: 12px;
}

.bg-report {
  background-color: #fef5bf;
  color: #fdd800;
  padding: 0px 28px;
  border-radius: 12px;
}

.bg-canceled {
  background-color: #f9cbcb;
  color: #eb5757;
  padding: 0px 28px;
  border-radius: 12px;
}
.bg-ready {
  background-color: #ecfaf2;
  color: #41c980;
  border-radius: 12px;
  padding: 0px 28px;
}
</style>
