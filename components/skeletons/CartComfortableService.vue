<template>
  <div class="row">
    <!-- 🧩 Left Section (Order Details) -->
    <div class="col-12 col-lg-6">
      <div class="mb-4">
        <div class="placeholder-wave mb-3">
          <span class="placeholder col-4" style="height: 28px;"></span>
        </div>
      </div>

      <!-- Skeleton for Cart Items -->
      <div v-for="n in 3" :key="n" class="card mb-3 p-3 shadow-sm placeholder-wave border-0">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex align-items-center gap-3 w-100">
            <div class="placeholder rounded" style="width: 80px; height: 80px;"></div>
            <div class="flex-grow-1">
              <div class="placeholder col-8 mb-2" style="height: 18px;"></div>
              <div class="placeholder col-4 mb-2" style="height: 16px;"></div>
              <div class="d-flex align-items-center gap-2">
                <div class="placeholder rounded-circle" style="width: 25px; height: 25px;"></div>
                <div class="placeholder rounded-pill col-1" style="height: 10px;"></div>
                <div class="placeholder rounded-circle" style="width: 25px; height: 25px;"></div>
              </div>
            </div>
          </div>
          <div class="placeholder rounded-circle" style="width: 30px; height: 30px;"></div>
        </div>
      </div>
    </div>

    <!-- 💰 Right Section (Cost Details) -->
    <div class="col-12 col-lg-4 offset-lg-1 mt-4 mt-lg-0">
      <div class="card p-3 shadow-sm border-0 placeholder-wave">
        <div class="placeholder col-5 mb-3" style="height: 20px;"></div>

        <div class="d-flex justify-content-between mb-2">
          <span class="placeholder col-6" style="height: 18px;"></span>
          <span class="placeholder col-3" style="height: 18px;"></span>
        </div>

        <div class="d-flex justify-content-between mb-2">
          <span class="placeholder col-5" style="height: 18px;"></span>
          <span class="placeholder col-4" style="height: 18px;"></span>
        </div>

        <div class="d-flex justify-content-between mb-3">
          <span class="placeholder col-6" style="height: 18px;"></span>
          <span class="placeholder col-2" style="height: 18px;"></span>
        </div>

        <div class="placeholder col-8 rounded-pill my-3" style="height: 45px;"></div>
        <div class="placeholder col-6" style="height: 18px;"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.placeholder {
  display: inline-block;
  background-color: #e6e6e6;
  border-radius: 8px;
}

.placeholder-wave .placeholder {
  animation: wave 1.4s linear infinite;
  background: linear-gradient(90deg, #f0f0f0 25%, #e2e2e2 37%, #f0f0f0 63%);
  background-size: 400% 100%;
}

@keyframes wave {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
