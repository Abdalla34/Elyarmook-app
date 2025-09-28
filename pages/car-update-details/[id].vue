<template>
  <div class="car-update-details">
    <div class="container mt-5">
      <div>
        <div class="row justify-content-center">
          <div class="col-lg-7 col-md-6 parent-types">
            <div class="d-flex align-items-center gap-3 box-hover">
              <div class="img-car">
                <!-- <img :src="carTypes?." alt="" /> -->
              </div>
              <div class="title-car">
                <h1></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const carTypes = ref([]);
const route = useRoute();
const id = route.params.id;

const res = await useApi().getCarTypes(id);
carTypes.value = res?.data?.items || [];

// const carBrand = ref([]);
// const resBrand = await useApi().getDetailsCar(id);
// console.log('brandddd',resBrand)
// 201021336699
</script>
