<template>
<div class="row justify-content-center">
  <div class="col-lg-8 col-md-5 col-sm-12">
    <!-- skeleton loader -->
    <div
      class="card mb-3 shadow rounded overflow-hidden placeholder-glow"
      v-for="n in 3"
      :key="n"
    >
      <!-- image skeleton -->
      <div
        class="placeholder rounded-0 d-block w-100"
        style="height: 200px; background-color: #e9ecef;"
      ></div>

      <!-- label skeleton -->
      <h1 class="ps-2 text-start mt-3">
        <span class="placeholder col-6"></span>
      </h1>

      <!-- card body skeleton -->
      <div
        class="card-body d-flex justify-content-between align-items-center mt-3"
      >
        <div class="price-month d-flex align-items-center gap-3">
          <p class="mb-0">
            <span class="placeholder col-4 rounded-pill"></span>
          </p>
          <p class="mb-0">
            <span class="placeholder col-3 rounded-pill"></span>
          </p>
        </div>
        <div class="subscripe">
          <p class="text-capitalize mb-0">
            <span class="placeholder col-5 rounded-pill"></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>