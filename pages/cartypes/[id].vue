<template>
  <div>
    <div>
      <div class="add-car">
        <div class="container">
          <div class="row">
            <div class="col-8 col-padding">
                <!-- <h1>{{ brandName }}</h1> -->
              <div class="parent" v-for="model in models" :key="model.id">
                <div class="d-flex align-items-center gap-3 box-hover">
                  <div class="img-car">
                    <img :src="model.image" alt="" />
                  </div>
                  <div class="title-car">
                    <h1>{{ model.title }}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const brandId = route.params.id;
let brandName = ref("");

const models = ref([]);
const res = await useApi().cartypes(brandId);
models.value = res?.data?.items ?? [];
brandName.value = res?.data?.items.title ?? [];




</script>

<style scoped>
.box-hover {
  border: 1px solid #ebebeb;
  border-radius: 12px;
  padding: 20px 16px;
  cursor: pointer;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: transform 0.3s ease, background-color 0.4s ease;
}

.box-hover::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(247, 242, 244, 1);
  z-index: -1;
  transform: translateY(100%);
  transition: transform 0.4s ease;
}

.box-hover:hover::before {
  transform: translateY(0%);
}
.img-car img {
  width: 30px;
}
h1 {
  font-family: var(--font-main);
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0%;
  color: #96a0b6;
}
.box-hover:hover h1 {
  color: #040505;
}
</style>
