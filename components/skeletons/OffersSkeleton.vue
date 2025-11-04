<template>
  <div class="row">
    <div class="col-lg-6 col-md-12 col-sm-12" v-for="n in 4" :key="n">
      <div class="offer-card margin-bottom-24px p-3">
        <div class="img-offer text-center mb-3">
          <div
            class="placeholder-wave bg-secondary bg-opacity-25 rounded w-100"
            style="height: 200px"
          ></div>
        </div>

        <div
          class="details-card d-flex justify-content-between align-items-center mb-3"
        >
          <span
            class="placeholder-wave bg-secondary bg-opacity-25 rounded col-6"
            style="height: 22px"
          ></span>
          <span
            class="placeholder-wave bg-secondary bg-opacity-25 rounded col-3"
            style="height: 22px"
          ></span>
        </div>

        <div
          class="parent-price d-flex align-items-center justify-content-between"
        >
          <div class="price-section d-flex align-items-end gap-2">
            <span
              class="placeholder-wave bg-secondary bg-opacity-25 rounded col-4"
              style="height: 20px"
            ></span>
            <span
              class="placeholder-wave bg-secondary bg-opacity-25 rounded col-3"
              style="height: 18px"
            ></span>
          </div>
          <div class="date text-center">
            <span
              class="placeholder-wave bg-secondary bg-opacity-25 rounded col-6 mb-1"
              style="height: 16px; display: block"
            ></span>
            <span
              class="placeholder-wave bg-secondary bg-opacity-25 rounded col-8"
              style="height: 18px; display: block"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
