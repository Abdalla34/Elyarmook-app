<template>
  <div class="row offer-details">
    <div class="col-12 col-lg-7 col-padding">
      <div class="offer-box margin-bottom-24px">
        <!-- العنوان -->
        <div class="flash-effect mb-3" style="height: 30px; width: 180px;"></div>

        <!-- صورة -->
        <div
          class="flash-effect mb-3 rounded-3"
          style="height: 350px; width: 100%;"
        ></div>

        <!-- العنوان والسعر -->
        <div
          class="d-flex align-items-start justify-content-between flex-wrap mb-3"
        >
          <div class="flash-effect" style="height: 25px; width: 60%;"></div>
          <div class="flash-effect" style="height: 25px; width: 25%;"></div>
        </div>

        <!-- تاريخ وخصم -->
        <div class="d-flex justify-content-between flex-wrap mb-3">
          <div class="flash-effect" style="height: 20px; width: 45%;"></div>
          <div class="flash-effect" style="height: 20px; width: 25%;"></div>
        </div>

        <!-- صندوق Tabby -->
        <div
          class="flash-effect rounded-3 mb-4"
          style="height: 80px; width: 100%;"
        ></div>

        <!-- Features -->
        <div class="mb-3">
          <div
            v-for="i in 3"
            :key="i"
            class="flash-effect mb-2"
            style="height: 15px; width: 80%;"
          ></div>
        </div>

        <!-- زرار -->
        <div class="flash-effect rounded-pill" style="height: 45px; width: 100%;"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flash-effect {
  background: linear-gradient(90deg, #f0f0f0 25%, #e4e4e4 37%, #f0f0f0 63%);
  background-size: 400% 100%;
  animation: flash 1.4s ease infinite;
  border-radius: 8px;
}
@keyframes flash {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
