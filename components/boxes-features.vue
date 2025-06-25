<template>
  <div>
    <div class="boxes d-flex align-items-center gap-3 mb-4">
      <div class="box">
        <div class="desc-all-serv d-flex align-items-center gap-3">
          <img src="/Framedesc.png" alt="" />
          <div class="name-desc">
            <h3 class="mb-0 mt-0 fw-bold">{{ desfirstbox }}</h3>
            <p class="sale mb-0">{{ salefirstbox }}</p>
          </div>
        </div>
      </div>

      <div class="box">
        <div class="desc-all-serv d-flex align-items-center gap-3">
          <img src="/Framedesc.png" alt="" />
          <div class="name-desc">
            <h3 class="mb-0 mt-0 fw-bold">{{ dessecoundbox }}</h3>
            <p class="sale mb-0">{{ salesecoundbox }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  desfirstbox: String,
  dessecoundbox: String,
  salefirstbox: [Number , String],
  salesecoundbox: [Number , String],
});
</script>

<style scoped>
.box {
  background-color: #f7f7fc;
  border-radius: 24px;
  padding: 16px 12px;
  width: 50%;
}

.box .name-desc h3 {
  font-family: var(--font-main);
  font-size: 13px;
  line-height: 100%;
  letter-spacing: 0%;
}

.box .name-desc .sale {
  font-family: var(--font-main);
  font-size: 13px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #c71f45;
  font-weight: 600;
  margin-top: 10px;
}
@media(max-width:768px){
    .boxes{
        flex-direction: column;
    }
    .box{
        width: 100%;
    }
}
</style>
