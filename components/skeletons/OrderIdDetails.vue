<template>
  <div class="col-7 pb-4 mt-2 mb-4 background">
  <div>
    <!-- order title -->
    <div class="pt-5 d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center gap-4">
        <span class="placeholder-wave rounded-circle" style="width:70px; height:70px;"></span>
        <div>
          <span class="placeholder-wave col-6 mb-2"></span>
          <span class="placeholder-wave col-4"></span>
        </div>
      </div>
      <span class="placeholder-wave col-2 rounded-pill"></span>
    </div>

    <!-- car model -->
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-5">
      <span class="placeholder-wave col-5" style="height:70px; border-radius:12px;"></span>
      <span class="placeholder-wave col-5" style="height:70px; border-radius:12px;"></span>
    </div>

    <!-- time & location -->
    <div class="d-flex justify-content-between gap-3 mt-4">
      <span class="placeholder-wave col-5" style="height:90px; border-radius:36px;"></span>
      <span class="placeholder-wave col-5" style="height:90px; border-radius:36px;"></span>
    </div>

    <!-- steps -->
    <div class="d-flex justify-content-center align-items-center gap-3 mt-5 overflow-auto">
      <div v-for="i in 7" :key="i" class="text-center">
        <span class="placeholder-wave rounded-circle mb-2" style="width:50px; height:50px;"></span>
        <span class="placeholder-wave col-6"></span>
      </div>
    </div>

    <!-- invoice button -->
    <div class="mt-4">
      <span class="placeholder-wave col-3" style="height:40px; border-radius:10px;"></span>
    </div>

    <!-- items -->
    <div class="mt-5">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <span class="placeholder-wave col-3"></span>
        <span class="placeholder-wave col-2"></span>
      </div>
      <div v-for="i in 3" :key="'item'+i" class="d-flex align-items-center justify-content-between mb-3">
        <div class="d-flex align-items-center gap-3">
          <span class="placeholder-wave rounded" style="width:40px; height:40px;"></span>
          <span class="placeholder-wave col-6"></span>
        </div>
        <span class="placeholder-wave col-2"></span>
      </div>
    </div>

    <!-- total -->
    <div class="d-flex justify-content-between mt-4">
      <span class="placeholder-wave col-3"></span>
      <span class="placeholder-wave col-2"></span>
    </div>

    <!-- cancel button -->
    <div class="mt-4">
      <span class="placeholder-wave col-3" style="height:40px; border-radius:10px;"></span>
    </div>
  </div>
</div>

</template>

