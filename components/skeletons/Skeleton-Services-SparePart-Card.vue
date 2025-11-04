<template>
  <div class="row">
    <div
      class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
      v-for="n in 6"
      :key="n"
    >
      <div
        class="service-card text-center margin-bottom-24px position-relative p-3 w-100"
      >
        <div class="service-icon-wrapper mb-3 d-flex justify-content-center">
          <div
            class="rounded bg-secondary bg-opacity-25 placeholder-wave"
            style="width: 80px; height: 80px"
          ></div>
        </div>

        <div class="service-content d-flex flex-column align-items-center">
          <span
            class="placeholder-wave col-12 mb-2 rounded bg-secondary bg-opacity-25"
            style="height: 18px"
          ></span>
        </div>

        <div class="div-button mt-3 d-flex justify-content-center">
          <span
            class="placeholder-wave col-12 rounded-pill bg-secondary bg-opacity-25"
            style="height: 34px"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
