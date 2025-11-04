<template>
  <div class="row g-4">
    <!-- تفاصيل التكلفة -->
    <div class="col-md-4">
      <div class="card p-3 placeholder-wave">
        <div class="d-flex justify-content-between mb-2">
          <span class="placeholder-wave col-6"></span>
          <span class="placeholder-wave col-3"></span>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span class="placeholder-wave col-5"></span>
          <span class="placeholder-wave col-4"></span>
        </div>
        <div class="d-flex justify-content-between">
          <span class="placeholder-wave col-6"></span>
          <span class="placeholder-wave col-2"></span>
        </div>
      </div>

      <div class="placeholder-wave mt-3">
        <span
          class="placeholder-wave col-8 rounded-pill"
          style="height: 45px"
        ></span>
      </div>

      <div class="placeholder-wave mt-3">
        <span class="placeholder-wave col-6"></span>
      </div>
    </div>

    <!-- تفاصيل الطلب -->
    <div class="col-md-8">
      <div v-for="n in 3" :key="n" class="card mb-3 p-3 placeholder-wave">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="placeholder-wave col-6"></span>
          <span
            class="placeholder-wave rounded-circle"
            style="width: 50px; height: 50px"
          ></span>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <span class="placeholder-wave col-2"></span>
          <div class="d-flex gap-2">
            <span
              class="placeholder-wave rounded-circle"
              style="width: 25px; height: 25px"
            ></span>
            <span class="placeholder-wave col-1"></span>
            <span
              class="placeholder-wave rounded-circle"
              style="width: 25px; height: 25px"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
