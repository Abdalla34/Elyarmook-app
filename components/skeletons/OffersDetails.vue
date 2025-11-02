<template>
  <div class="offer-box margin-bottom-24px">
    <!-- العنوان -->
    <div class="mb-3">
      <div
        class="placeholder col-6 rounded bg-secondary bg-opacity-25"
        style="height: 24px"
      ></div>
    </div>

    <!-- الصورة -->
    <div class="img-offer-card position-relative margin-bottom-24px">
      <div
        class="placeholder bg-secondary bg-opacity-25 rounded w-100"
        style="height: 300px"
      ></div>
      <span
        class="placeholder bg-secondary bg-opacity-25 position-absolute"
        style="
          top: 15px;
          right: 15px;
          width: 80px;
          height: 30px;
          border-radius: 20px;
        "
      ></span>
    </div>

    <!-- العنوان والسعر -->
    <div
      class="d-flex align-items-start justify-content-between flex-wrap mb-3"
    >
      <div
        class="placeholder bg-secondary bg-opacity-25 rounded col-6"
        style="height: 24px"
      ></div>
      <div
        class="placeholder bg-secondary bg-opacity-25 rounded col-3"
        style="height: 20px"
      ></div>
    </div>

    <!-- تاريخ الانتهاء -->
    <div class="d-flex justify-content-between flex-wrap mb-4">
      <div class="col-6">
        <div
          class="placeholder bg-secondary bg-opacity-25 rounded col-8 mb-2"
          style="height: 16px"
        ></div>
        <div
          class="placeholder bg-secondary bg-opacity-25 rounded col-6"
          style="height: 16px"
        ></div>
      </div>
      <div
        class="placeholder bg-secondary bg-opacity-25 rounded col-3"
        style="height: 18px"
      ></div>
    </div>

    <!-- tabby box -->
    <div
      class="learn-more-box margin-bottom-24px d-flex flex-column flex-md-row justify-content-between align-items-center gap-2"
    >
      <div class="d-flex align-items-center gap-3 w-100">
        <div
          class="placeholder bg-secondary bg-opacity-25 rounded"
          style="width: 60px; height: 40px"
        ></div>
        <div class="w-100">
          <div
            class="placeholder bg-secondary bg-opacity-25 rounded col-10 mb-2"
            style="height: 14px"
          ></div>
          <div
            class="placeholder bg-secondary bg-opacity-25 rounded col-8"
            style="height: 14px"
          ></div>
        </div>
      </div>
      <div
        class="placeholder bg-secondary bg-opacity-25 rounded col-3"
        style="height: 22px"
      ></div>
    </div>

    <!-- offer features -->
    <div class="offer-features">
      <div
        class="placeholder bg-secondary bg-opacity-25 rounded col-5 mb-3"
        style="height: 20px"
      ></div>

      <div v-for="n in 3" :key="n" class="d-flex align-items-center gap-2 mb-2">
        <div
          class="placeholder bg-secondary bg-opacity-25 rounded col-1"
          style="height: 16px"
        ></div>
        <div
          class="placeholder bg-secondary bg-opacity-25 rounded col-8"
          style="height: 16px"
        ></div>
      </div>
    </div>
  </div>
</template>
