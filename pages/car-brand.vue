<template>
  <div class="add-car">
    <div class="container">
      <div class="row">
        <!-- <div class="search-input">
          <input type="search" />
        </div> -->
        <div
          class="col-6 col-md-4 col-lg-3 mb-4"
          v-for="brand in carsBrand"
          :key="brand.id"
          @click="goToCarBrand(brand)"
        >
          <div class="brand-card text-center">
            <div class="img-brand">
              <img :src="brand.image" alt="brand" />
            </div>
            <div class="title-brand">
              <h6>{{ brand.title }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let carsBrand = ref([]);
let res = await useApi().getCarBrands();
carsBrand.value = res?.data?.items;
const goToCarBrand = (item) => {
  navigateTo(`/cartypes/${item.id}`);
  localStorage.setItem("idbrand", JSON.stringify(item.id));
};
</script>

<style scoped>
.brand-card {
  height: 200px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
}

.brand-card:hover {
  transform: scale(1.03);
  cursor: pointer;
}

.img-brand {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.img-brand img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
