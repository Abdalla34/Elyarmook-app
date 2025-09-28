<template>
  <div class="car-update-details">
    <div class="container mt-5">
      <div>
        <div class="row justify-content-center">
          <div class="col-lg-7 col-md-6 parent-types">
            <div>
              <div>
                <!-- types brand -->
                <div class="row justify-content-center">
                  <div
                    class="col-lg-12 col-md-6 parent-types"
                    v-for="model in carTypes"
                    :key="model.id"
                    @click="selecteTypeID(model)"
                  >
                    <div class="d-flex align-items-center gap-3 box-hover">
                      <div class="img-car">
                        <img :src="model.image" class="image" alt="" />
                      </div>
                      <div class="title-car">
                        <h1>{{ model.title }}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- years modal -->
                <div v-if="step === 2" class="row justify-content-center">
                  <div
                    class="col-lg-12 col-md-6 parent-types"
                    v-for="year in years"
                    :key="year"
                    @click="selecteYears(year)"
                  >
                    <div class="d-flex align-items-center gap-3 box-hover">
                      <div class="title-car">{{ year }}</div>
                    </div>
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
let startYear = 1900;
let endYear = new Date().getFullYear();
let years = Array.from(
  { length: endYear - startYear + 1 },
  (_, i) => endYear - i
);

const carTypes = ref([]);
const route = useRoute();
const id = route.params.id;
const res = await useApi().getCarTypes(id);
carTypes.value = res?.data?.items || [];
const step = ref(null);

// const carBrand = ref([]);
// try {
//   const responseCarDetails = await useApi().getDetailsCar(id);
//   carBrand.value = responseCarDetails?.data || {};
//   console.log(carBrand);
// } catch (err) {
//   console.error("❌ حصل خطأ:", err);
// }

let carForm = reactive({
  brand_id: null,
  car_type_id: null,
  manufacture_year: null,
  chassis_number: null,
  is_default: null,
});

function selecteTypeID(carId) {
  carForm.car_type_id = carId.id;
  step.value = 2;
  console.log(`car Type ${carForm.car_type_id}`);
  console.log(step.value);
}

let selecteYears = async (year) => {
  carForm.manufacture_year = year;
  step.value = 3;
  console.log(`made in ${carForm.manufacture_year}`);
};

// const brandId = ref(null);
// const carTypeId = ref(null);
// const manufactureYear = ref(null);
// const chassisNumber = ref(null);
// const isDefault = ref(null);

// const sendDataCar = async () => {
//   // const responseSendData = await useApi().editCar({
//   //   brand_id: brandId.value,
//   //   car_type_id: carTypeId.value,
//   //   manufacture_year: manufactureYear.value,
//   //   chassis_number: chassisNumber.value,
//   //   is_default: isDefault.value,
//   // });

//   console.log(brandId.value);
//   console.log(carTypeId.value);
//   console.log(manufactureYear.value);
//   console.log(chassisNumber.value);
//   console.log(isDefault.value);
// };
</script>
<style scoped>
@import "@/assets/css/carbrand.css";
.image {
  width: 40px;
}
</style>
