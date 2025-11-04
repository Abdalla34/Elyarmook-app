<template>
  <div class="row">
    <div class="col-8 col-padding">
      <!-- title -->
      <div class="placeholder-wave mb-4">
        <span class="placeholder col-3" style="height:25px;"></span>
      </div>

      <!-- car cards skeleton -->
      <div class="cars margin-bottom-24px position-relative">
        <div
          v-for="n in 3"
          :key="n"
          class="car-box d-flex justify-content-between align-items-center p-3 mb-3 border rounded placeholder-wave"
        >
          <!-- car name && image -->
          <div class="car-detalis d-flex gap-3 align-items-center">
            <div
              class="car-img rounded bg-light"
              style="width:70px; height:45px;"
            >
              <span class="placeholder col-12 h-100 w-100 d-block"></span>
            </div>

            <div class="car-name">
              <p class="mb-1">
                <span class="placeholder col-6 d-block mb-2"></span>
                <span class="placeholder col-4 d-block"></span>
              </p>
            </div>
          </div>

          <!-- icon and button -->
          <div class="d-flex gap-3 align-items-center">
            <span class="placeholder rounded-circle" style="width:20px; height:20px;"></span>
            <span class="placeholder col-3 rounded-pill" style="height:20px;"></span>
          </div>
        </div>
      </div>

      <!-- add new car button skeleton -->
      <div class="text-center mt-4 placeholder-wave">
        <span
          class="placeholder col-6 rounded-pill"
          style="height:40px; display:inline-block;"
        ></span>
      </div>
    </div>
  </div>
</template>
