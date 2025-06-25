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
                <img src="/Diamond.png" alt="" />
                <h1 class="title-h1">
                  Save With an ALyarmook One Membership For 1 Year
                </h1>
              </div>
              <div class="price">
                <p class="now">
                  5000 <span class="text-uppercase span">sar</span>
                </p>
                <p class="desc">80SAR</p>
              </div>
            </div>
          </div>

          <div
            class="learn-more-box margin-bottom-24px d-flex justify-content-between align-item-center"
          >
            <div class="img-taby d-flex align-items-center gap-2 flex-wrap">
              <img src="/tabby-new 1.png" alt="Tabby Logo" class="tabby-img" />
              <p class="tabby-text mb-0">
                4 Interest-free payments of
                <span class="sar-currency fw-bold">22.41 SAR</span> With Tabby
              </p>
            </div>
            <div class="button-more p-color-fs text-capitalize">learn more</div>
          </div>

          <div class="details">
            <h1 class="about-title">About Membership</h1>
            <p>
              Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, Lorem ipsum
              dolor sit amet,Lorem ipsumLorem ipsum dolor sit amet,Lorem ipsum
              dolor sit amet,  em ipsum Lorem ipsum dolor sit amet,Lorem ipsum
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

          <div class="button-member">
            <button class="text-capitalize">
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
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './assets/css/premium.css';
</style>
