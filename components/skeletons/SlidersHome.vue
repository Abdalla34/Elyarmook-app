<template>
  <div class="container my-4 parent-swiper">
    <!-- Skeleton Slide 1 -->
    <div class="row justify-content-center mb-3">
      <div class="col-md-10 col-sm-12">
        <div
          class="d-flex justify-content-center align-items-center slide-content"
        >
          <div
            class="placeholder-glow height-media w-100 rounded-4"
            style="height: 300px;"
          >
            <span
              class="placeholder col-12 bg-secondary"
              style="height: 100%; display: block"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@media (max-width: 768px) {
  .height-media {
    height: 150px !important;
    border-radius: 60px;
  }
}
</style>