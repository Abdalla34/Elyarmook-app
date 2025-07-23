<template>
  <div class="add-car">
    <div class="container">
      
      <div class="row justify-content-center" v-if="step == 0">
        <div
          class="col-6 col-md-4 col-lg-2 brand-card me-3 mb-4"
          v-for="car in carBrands"
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

      <div class="row justify-content-center">
        <div class="col-lg-7 col-md-6 parent-types" v-if="step == 1">
          <div
            v-for="model in modelsCar"
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

const carForm = ref({
  brand_id: null,
  car_type_id: null,
  manufacture_year: null,
  chassis_number: null,
});

let modelsCar = ref([]);
const carTypes = async (item) => {
  carForm.value.brand_id = item.id;
  let resTypes = (await useApi().cartypes(item.id)) ?? [];
  modelsCar.value = resTypes?.data?.items;
  step.value = 1;
  console.log(`car Brnad id : ${item.id}`);
};

const selecteCarType = (car_type_id) => {
  carForm.value.car_type_id = car_type_id;
  step.value = 2;
  console.log(`car Type id : ${car_type_id}`);
};

const selectYear = (year) => {
  carForm.value.manufacture_year = year;
  console.log(year);
  step.value = 3;
};

// const startYear = 1970;
// const endYear = new Date().getFullYear();
// const years = Array.from({ length: endYear - startYear + 1 }, (_, i) =>
//   (endYear - i).toString()
// );

// const step = ref(0);
// const carForm = ref({
//   brand_id: null,
//   car_type_id: null,
//   chassis_number: "",
//   manufacture_year: null,
//   is_default: 0,
// });

// let carsBrand = ref([]);
// let res = await useApi().getCarBrands();
// carsBrand.value = res?.data?.items;

// const models = ref([]);
// const carBrand = async (item) => {
//   carForm.value.brand_id = item.id;
//   models.value = (await useApi().cartypes(item.id)) ?? [];
//   step.value = 1;
// };

// const selectCarType = (car_type_id) => {
//   carForm.value.car_type_id = car_type_id;
//   step.value = 2;
//   console.log(car_type_id)
// };

// const selectYear = (year) => {
//   carForm.value.manufacture_year = year;
//   step.value = 3;
//   console.log(year)
// };
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
