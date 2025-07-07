<template>
  <div class="permium">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8">
          <div class="membership">
            <div
              class="member d-flex align-items-center justify-content-between"
            >
              <div class="title d-flex align-items-center gap-2">
                <div>
                  <img src="/Diamond.png" alt="" />
                </div>
                <div>
                  <h1 class="title-h1">
                    Save With an ALyarmook One Membership For 1 Year
                  </h1>
                  <p class="date">end date: des,4,2024</p>
                </div>
              </div>

              <div class="price">
                <p class="now d-flex gap-2">
                  5000 <span class="text-uppercase span mt-2">sar</span>
                </p>
                <p class="desc">80SAR</p>
              </div>
            </div>
          </div>

          <imgTapy />

          <div class="details">
            <h1 class="about-title">About Membership</h1>
            <p>
              Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, Lorem ipsum
              dolor sit amet,Lorem ipsumLorem ipsum dolor sit amet,Lorem ipsum
              dolor sit amet, em ipsum Lorem ipsum dolor sit amet,Lorem ipsum
              dolor sit amet, Lorem ipsum dolor sit
            </p>
          </div>

          <div class="member-features">
            <h3 class="text-capitalize">member features</h3>

            <BoxesFeatures
              desfirstbox="Discount on all services"
              dessecoundbox="Discount on all services"
              salefirstbox="%20"
              salesecoundbox="%20"
            />
          </div>

          <div class="button-member" v-if="ismemberShip">
            <button @click="toggleButton" class="text-capitalize">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 15.7895V6.20953C2 4.87953 2.77 4.55953 3.71 5.49953L6.3 8.08953C6.69 8.47953 7.33 8.47953 7.71 8.08953L11.29 4.49953C11.68 4.10953 12.32 4.10953 12.7 4.49953L16.29 8.08953C16.68 8.47953 17.32 8.47953 17.7 8.08953L20.29 5.49953C21.23 4.55953 22 4.87953 22 6.20953V15.7995C22 18.7995 20 20.7995 17 20.7995H7C4.24 20.7895 2 18.5495 2 15.7895Z"
                  stroke="#040505"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              get membership
            </button>
          </div>

          <div class="button-member position" v-if="isAddCart">
            <button @click="toggleButton" class="text-capitalize add-card">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3C17.2339 3 21.5 7.26614 21.5 12.5C21.5 17.7339 17.2339 22 12 22C6.76614 22 2.5 17.7339 2.5 12.5C2.5 7.26614 6.76614 3 12 3ZM17.1338 8.78613C16.6485 8.30092 15.8515 8.30092 15.3662 8.78613L10.5801 13.5723L8.63379 11.626C8.14855 11.1409 7.35145 11.1409 6.86621 11.626C6.38099 12.1112 6.38107 12.9083 6.86621 13.3936L9.69629 16.2236C9.92899 16.4563 10.246 16.5898 10.5801 16.5898C10.9142 16.5898 11.2312 16.4563 11.4639 16.2236L17.1396 10.5479C17.6137 10.0574 17.6223 9.27464 17.1338 8.78613Z"
                  fill="#41C980"
                  stroke="#41C980"
                />
              </svg>
              added to card
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let ismemberShip = ref(true);
let isAddCart = ref(false);

const toggleButton = () => {
  ismemberShip.value = !ismemberShip.value;
  isAddCart.value = !isAddCart.value;
};
</script>

<style scoped>
@import "../assets/css/premium.css";
</style>
