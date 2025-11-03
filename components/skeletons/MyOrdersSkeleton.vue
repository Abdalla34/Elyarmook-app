<template>
  <div class="row justify-content-center">
    <div class="col-lg-7 col-md-10 col-sm-12">
      <!-- نعرض 5 عناصر كهيكل تحميل -->
      <div
        v-for="n in 10"
        :key="n"
        class="box-orders border rounded-4 d-flex align-items-center justify-content-between position-relative mb-3 p-3 placeholder-glow bg-white shadow-sm"
      >
        <!-- تفاصيل الطلب -->
        <div class="details-title d-flex align-items-center gap-3">
          <!-- صورة دائرية -->
          <div
            class="placeholder rounded-circle bg-secondary"
            style="width: 60px; height: 60px"
          ></div>

          <!-- عنوان الطلب والسعر -->
          <div class="name price w-100">
            <h4 class="placeholder col-6 mb-2"></h4>
            <p class="placeholder col-4 mb-0"></p>
          </div>
        </div>

        <!-- وقت الطلب -->
        <div class="time-branch text-end">
          <p class="placeholder col-6 mb-2"></p>
          <p class="placeholder col-4"></p>
        </div>
      </div>
    </div>
  </div>
</template>
