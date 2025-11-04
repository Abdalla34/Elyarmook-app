<template>
  <div class="card shadow-sm mb-4 overflow-hidden border-0" style="max-width: 400px; background-color: #f0f0f0;">
    <!-- صورة -->
    <div class="flash-effect w-100 mb-3" style="height: 200px;"></div>

    <div class="card-body">
      <!-- عنوان -->
      <div class="flash-effect mb-3" style="height: 20px; width: 70%;"></div>

      <!-- السعر والخصم -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="flash-effect" style="height: 18px; width: 35%;"></div>
        <div class="flash-effect" style="height: 18px; width: 25%; border-radius: 12px;"></div>
      </div>

      <!-- تاريخ -->
      <div class="flash-effect mb-3" style="height: 14px; width: 50%;"></div>

      <!-- وصف -->
      <div class="flash-effect mb-2" style="height: 14px; width: 90%;"></div>
      <div class="flash-effect mb-2" style="height: 14px; width: 80%;"></div>
      <div class="flash-effect mb-2" style="height: 14px; width: 70%;"></div>
      <div class="flash-effect mb-2" style="height: 14px; width: 60%;"></div>
    </div>
  </div>
</template>

<style scoped>
.flash-effect {
  position: relative;
  overflow: hidden;
  background-color: #b3b3b3; /* 💪 رمادي غامق وواضح */
  border-radius: 8px;
}

/* تأثير الفلاش */
.flash-effect::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: flashMove 1.5s infinite linear;
}

/* حركة الفلاش */
@keyframes flashMove {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
