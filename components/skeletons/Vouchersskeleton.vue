<template>
  <div class="row justify-content-center">
    <div class="col-8 col-padding">
      <!-- title -->
      <div class="current-point d-flex align-items-center justify-content-between mb-3">
        <div class="point-num text-center w-50">
          <h4 class="placeholder-wave">
            <span class="placeholder col-6"></span>
          </h4>
          <p class="placeholder-wave">
            <span class="placeholder col-4"></span>
          </p>
        </div>

        <div class="placeholder-wave">
          <span class="placeholder col-4 rounded-pill" style="height:30px;"></span>
        </div>
      </div>

      <!-- nav links -->
      <div class="ul-point mb-4 text-center">
        <ul class="d-flex justify-content-center align-items-center gap-4 mb-0">
          <li v-for="n in 3" :key="n" class="placeholder-wave">
            <span class="placeholder col-4"></span>
          </li>
        </ul>
      </div>

      <!-- vouchers -->
      <div v-for="n in 3" :key="n" class="coupon-box p-2 mb-3 border rounded">
        <div class="d-flex justify-content-between align-items-start mb-2 placeholder-wave">
          <div class="w-75">
            <h6><span class="placeholder col-8"></span></h6>
            <p><span class="placeholder col-10"></span></p>
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center mt-2 placeholder-wave">
          <span class="placeholder col-3 rounded-pill" style="height:30px;"></span>
          <div class="text-end">
            <span class="placeholder col-4 d-block mb-1"></span>
            <span class="placeholder col-6 d-block"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
