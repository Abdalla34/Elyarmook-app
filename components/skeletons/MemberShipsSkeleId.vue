<template>
  <div class="col-lg-8 col-md-6 col-sm-12">
    <div class="parent">
      <!-- image skeleton -->
      <div class="image-details text-center mb-4">
        <div
          class="placeholder-glow d-inline-block rounded-3"
          style="
            width: 100%;
            max-width: 350px;
            height: 220px;
            background-color: #e9ecef;
          "
        ></div>
      </div>

      <!-- date skeleton -->
      <div class="date d-flex gap-3 align-items-center mb-4">
        <div class="placeholder-glow w-50">
          <span class="placeholder col-6"></span>
        </div>
        <div
          class="placeholder-glow rounded-pill"
          style="width: 120px; height: 30px; background-color: #e9ecef"
        ></div>
      </div>

      <!-- name & price skeleton -->
      <div class="name price discount mb-4">
        <h1 class="placeholder-glow mb-3">
          <span class="placeholder col-6"></span>
        </h1>
        <div class="price-des d-flex gap-3 align-items-center mt-2">
          <span class="placeholder col-3"></span>
          <span class="placeholder col-3"></span>
        </div>
        <hr />
      </div>

      <!-- includes skeleton -->
      <div class="member-includes mb-4">
        <h1 class="placeholder-glow mb-3">
          <span class="placeholder col-5"></span>
        </h1>
        <div v-for="n in 3" :key="n" class="items">
          <div class="title d-flex align-items-center gap-3 mb-3">
            <div
              class="placeholder-glow rounded p-1 flex-shrink-0"
              style="width: 45px; height: 45px; background-color: #e9ecef"
            ></div>
            <div class="text flex-grow-1">
              <h4 class="placeholder-glow mb-2">
                <span class="placeholder col-md-8"></span>
              </h4>
              <p class="placeholder-glow mb-0">
                <span class="placeholder col-4"></span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- button skeleton -->
      <div class="btn-get text-center pt-3 pb-3 border-radius-36px">
        <div
          class="placeholder-glow d-inline-block rounded-pill"
          style="width: 220px; height: 45px; background-color: #e9ecef"
        ></div>
      </div>
    </div>
  </div>
</template>
