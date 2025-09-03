<template>
  <div class="add-car">
    <div class="container mt-5">
      <div v-if="step == 0">
        <div class="text-center search d-block mb-4">
          <input
            type="search"
            placeholder="Search for car brand"
            class="form-control search-input"
            v-model="searchInBrands"
          />
        </div>
        <div class="row justify-content-center">
          <div
            class="col-md-4 col-lg-2 brand-card me-3 mb-4"
            v-for="brand in filterBrands"
            :key="brand.id"
            @click="carTypes(brand)"
          >
            <div class="img-brand">
              <img :src="brand.image" alt="brand" />
            </div>
            <div class="title-brand">
              <h6>{{ brand.title }}</h6>
            </div>
          </div>
        </div>
      </div>

      <div v-if="step == 1">
        <div class="text-center search d-block mb-4">
          <input
            type="search"
            placeholder="Search for car model"
            class="form-control search-input"
            v-model="searchInTypes"
          />
        </div>
        <div class="row justify-content-center">
          <div
            class="col-lg-7 col-md-6 parent-types"
            v-for="model in filterTypes"
            :key="model.id"
            @click="selecteCarType(model)"
          >
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

      <div class="row justify-content-center" v-if="step == 2">
        <div
          class="col-lg-7 col-md-6 parent-types"
          v-for="year in years"
          :key="year"
          @click="selecteYears(year)"
        >
          <div class="d-flex align-items-center gap-3 box-hover">
            <div class="title-car">{{ year }}</div>
          </div>
        </div>
      </div>

      <div class="chassis" v-if="step == 3">
        <form @submit.prevent="validateAndSend" class="chassis-form">
          <label class="chassis-label text-capitalize" for="chassisNumber">
            chassis number
          </label>
          <input
            id="chassisNumber"
            type="text"
            placeholder="write chassis Number"
            class="chassis-input"
            v-model="carForm.chassis_number"
            @input="chassisError = ''"
          />
          <span v-if="chassisError" class="error-message">{{
            chassisError
          }}</span>
          <button-card
            :disabled="!carForm.chassis_number"
            text-button="add car"
            class="mt-4"
            type="submit"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
let startYear = 2000;
let endYear = new Date().getFullYear();
let years = Array.from(
  { length: endYear - startYear + 1 },
  (_, i) => endYear - i
);

let step = ref(0);
let carBrands = ref([]);
let resBrands = await useApi().getCarBrands();
carBrands.value = resBrands?.data?.items;
let searchInBrands = ref("");
let filterBrands = computed(() => {
  if (!searchInBrands.value) return carBrands.value;
  return carBrands.value.filter((car) => {
    return car?.title
      .toLowerCase()
      .includes(searchInBrands.value.toLowerCase());
  });
});

let carForm = reactive({
  brand_id: null,
  car_type_id: null,
  manufacture_year: null,
  chassis_number: null,
  is_default: null,
});

let searchInTypes = ref("");
let carModels = ref([]);
let carTypes = async (barnd) => {
  carForm.brand_id = barnd.id;
  let res = await useApi().cartypes(barnd.id);
  carModels.value = res?.data?.items;
  step.value = 1;
  console.log(`car brand id ${carForm.brand_id}`);
};
let filterTypes = computed(() => {
  if (!searchInTypes.value) carModels.value;
  return carModels.value.filter((carType) => {
    return carType?.title
      .toLowerCase()
      .includes(searchInTypes.value.toLowerCase());
  });
});

let selecteCarType = async (car_Type) => {
  carForm.car_type_id = car_Type.id;
  step.value = 2;
  console.log(`car Type ${carForm.car_type_id}`);
};
let selecteYears = async (year) => {
  carForm.manufacture_year = year;
  step.value = 3;
  console.log(`made in ${carForm.manufacture_year}`);
};

async function SendData() {
  try {
    let resAllCar = await useApi().getMycars();
    let isFirst = resAllCar?.data.length === 0;
    let res = await useApi().createCar({
      brand_id: carForm.brand_id,
      car_type_id: carForm.car_type_id,
      manufacture_year: carForm.manufacture_year,
      chassis_number: carForm.chassis_number,
      is_default: isFirst ? true : false,
    });
    navigateTo("/mycars");
    console.log(res);
  } catch (err) {
    if (err?.response?.status === 401) {
      return navigateTo("/createaccount");
    } else {
      console.log("send data", err);
    }
  }
}
let chassisError = ref("");

const validateAndSend = async () => {
  if (!carForm.chassis_number || carForm.chassis_number.trim() === "") {
    chassisError.value = "Please enter chassis number";
    return;
  }
  await SendData();
};
</script>

<style scoped>
@import "@/assets/css/carbrand.css";
.search .search-input::placeholder {
  color: #7e7e7e;
  font-size: 14px;
  font-family: var(--font-main);
}
.error-message {
  color: #eb5757;
  font-size: 14px;
  margin-top: 8px;
  display: block;
}

.chassis-input.error {
  border-color: #eb5757;
}
</style>
