<template>
  <div class="col-md-8 col-padding">
    <div class="placeholder-wave">
      <!-- العنوان -->
      <div class="placeholder col-6 mb-3"></div>

      <!-- 3 عناصر تمثل النقاط -->
      <div class="card mb-3" v-for="n in 3" :key="n">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span class="placeholder col-4 mb-2"></span>
              <span class="placeholder col-md-8 mb-1"></span>
              <span class="placeholder col-6"></span>
            </div>
            <div class="placeholder col-2"></div>
          </div>
        </div>
      </div>

      <!-- زر أو رابط -->
      <div class="placeholder col-3 mt-3"></div>
    </div>
  </div>
</template>
