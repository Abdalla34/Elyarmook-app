<template>
  <div class="add-car">
    <div class="container mt-5">
      <div v-if="step == 0">
        <div class="text-center search d-block mb-4">
          <input
            type="search"
            placeholder="Search for car brand"
            v-model="searchInBrands"
            class="form-control search-input"
          />
        </div>
        <div class="row justify-content-center">
          <div
            class="col-md-4 col-lg-2 brand-card me-3 mb-4"
            v-for="car in filterBrands"
            :key="car.id"
            @click="carTypes(car)"
          >
            <div class="img-brand">
              <img :src="car.image" alt="brand" />
            </div>
            <div class="title-brand">
              <h6>{{ car.title }}</h6>
            </div>
          </div>
        </div>
      </div>

      <div v-if="step == 1">
        <div class="text-center search d-block mb-4">
          <input
            type="search"
            placeholder="Search for car model"
            v-model="searchInTypes"
            class="form-control search-input"
          />
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-7 col-md-6 parent-types">
            <div
              v-for="model in filterTypesCar"
              :key="model.id"
              class="d-flex align-items-center gap-3 box-hover"
              @click.prevent="selecteCarType(model.id)"
            >
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
          @click="selectYear(year)"
        >
          <div class="d-flex align-items-center gap-3 box-hover">
            <div class="title-car">{{ year }}</div>
          </div>
        </div>
      </div>

      <div class="chassis" v-if="step == 3">
        <form @submit.prevent="onSubmit" class="chassis-form">
          <label class="chassis-label text-capitalize" for="chassisNumber">
            chassis number</label
          >
          <input
            id="chassisNumber"
            type="text"
            placeholder="write chassis Number"
            class="chassis-input"
            v-model="carForm.chassis_number"
          />
          <button-card text-button="add car" class="mt-4" type="submit" />
        </form>
      </div>

      <!-- <div class="row" v-if="step == 0">
        
        <div
          class="col-6 col-md-4 col-lg-3 mb-4"
          v-for="brand in carsBrand"
          :key="brand.id"
          @click="carBrand(brand)"
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

      </div> -->

      <!-- <div
        class="parent"
        v-if="step == 1"
        v-for="model in models?.data?.items"
        :key="model.id"
        @click.prevent="selectCarType(model.id)"
      >
        <div class="d-flex align-items-center gap-3 box-hover">
          <div class="img-car">
            <img :src="model.image" alt="" />
          </div>
          q
          <div class="title-car">
            <h1>{{ model.title }}</h1>
          </div>
        </div>
      </div>

      <div
        class="parent"
        v-if="step == 2"
        v-for="year in years"
        :key="year"
        @click.prevent="selectYear(year)"
      >
        <div class="d-flex align-items-center gap-3 box-hover">
          <div class="title-car">
            <h1>{{ year }}</h1>
          </div>
        </div>
      </div>

      <div v-if="step == 3">
        step 3
        <button>
          submit
        </button>
      </div> -->
    </div>
  </div>
</template>

<script setup>
let startYear = 2000;
let endYear = new Date().getFullYear();
let years = Array.from({ length: endYear - startYear + 1 }, (_, i) =>
  (endYear - i).toString()
);

const router = useRouter();
let step = ref(0);
let carBrands = ref([]);
let resBrands = await useApi().getCarBrands();
carBrands.value = resBrands?.data?.items;

const carForm = reactive({
  brand_id: null,
  car_type_id: null,
  manufacture_year: null,
  chassis_number: null,
});

let modelsCar = ref([]);
const carTypes = async (item) => {
  carForm.brand_id = item.id;
  let resTypes = (await useApi().cartypes(item.id)) ?? [];
  modelsCar.value = resTypes?.data?.items;
  step.value = 1;
  console.log(`car Brnad id : ${item.id}`);
};

const selecteCarType = (car_type_id) => {
  carForm.car_type_id = car_type_id;
  step.value = 2;
  console.log(`car Type id : ${car_type_id}`);
};

const selectYear = (year) => {
  carForm.manufacture_year = year;
  console.log(year);
  step.value = 3;
};
const onSubmit = () => {
  console.log("carForm submitted:", carForm);
};

let searchInBrands = ref("");
let filterBrands = computed(() => {
  if (!searchInBrands.value) return carBrands.value;
  return carBrands.value.filter((car) => {
    return car.title
      ?.toLowerCase()
      .includes(searchInBrands.value.toLowerCase());
  });
});

let searchInTypes = ref("");
let filterTypesCar = computed(() => {
  if (!searchInTypes.value) return modelsCar.value;
  return modelsCar.value.filter((carType) => {
    return carType.title
      ?.toLowerCase()
      .includes(searchInTypes.value.toLowerCase());
  });
});
</script>

<style scoped>
@import "@/assets/css/carbrand.css"
</style>
