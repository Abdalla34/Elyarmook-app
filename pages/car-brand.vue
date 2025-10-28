<template>
  <div class="add-car">
    <div class="container mt-5">
      <div v-if="step == 0">
        <div class="text-center search d-block mb-4">
          <input
            type="search"
            :placeholder="$t('Search for car brand')"
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
            :placeholder="$t('Search for car model')"
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

      <div class="chassis" v-if="step == 2">
        <form @submit.prevent="SendData" class="chassis-form">
          <!-- choose year -->
          <label class="chassis-label text-capitalize" for="">
            {{$t("Manufacture Year:")}}
          </label>
          <!-- input years -->
          <div
            @click="showYears = true"
            class="years rounded gap-2 ps-3 pe-3 pt-3 pb-3 d-flex align-items-center justify-content-between"
            style="cursor: pointer"
          >
            <input
              id="amnufactureYaer"
              type="text"
              :placeholder="$t('Manfacture Year')"
              class="form-control border-0 shadow-none"
              style="flex: 1; cursor: pointer"
              v-model="carForm.manufacture_year"
              readonly
            />
            <div class="icon"><puplic-icon-arrow-bottom /></div>
          </div>

          <label class="chassis-label text-capitalize" for="chassisNumber">
            {{ $t("chassis number:") }}
          </label>
          <input
            id="chassisNumber"
            type="text"
            :placeholder="$t('chassis Number:')"
            class="chassis-input"
            v-model="carForm.chassis_number"
            @input="chassisError = ''"
          />
          <span v-if="chassisError" class="error-message">{{
            chassisError
          }}</span>
          <button-card
            :disabled="!carForm.chassis_number || !carForm.manufacture_year"
            :text-button="isloadCar ? 'loading...' : 'add car'"
            class="mt-4"
            type="submit"
          />
        </form>
      </div>
      <!-- popup -->
      <div v-if="showYears" class="modal-overlay">
        <div class="modal-box position-relative">
          <button
            class="btn-close position-absolute top-0 end-0 m-3"
            @click.self="showYears = false"
          ></button>

          <h1 class="label mb-3">{{ "Manfacture Year" }}</h1>
          <div class="all-years">
            <div
              style="cursor: pointer"
              v-for="year in years"
              @click="selecteYears(year)"
              class="box-year mb-2 rounded ps-2 pe-2 pt-1 pb-1"
            >
              {{ year }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <LoadingSpinner :isLoadingOtp="isAddCar" />
  </div>
</template>

<script setup>
const { getMycars, createCar, getCarBrands, cartypes } = useApi();
let startYear = 2000;
let endYear = new Date().getFullYear();
let years = Array.from(
  { length: endYear - startYear + 1 },
  (_, i) => endYear - i
);
const showYears = ref(false);
const isAddCar = ref(false);
const isloadCar = ref(false);

let step = ref(0);
let carBrands = ref([]);
let resBrands = await getCarBrands();
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
  let res = await cartypes(barnd.id);
  carModels.value = res?.data?.items;
  step.value = 1;
  console.log(`car brand id ${carForm.brand_id}`);
};
let filterTypes = computed(() => {
  if (!searchInTypes.value) return carModels.value;
  return carModels.value.filter((carType) => {
    return carType?.title
      .toLowerCase()
      .includes(searchInTypes.value.toLowerCase());
  });
});

let selecteCarType = async (car_Type) => {
  carForm.car_type_id = car_Type.id;
  step.value = 2;
};

let selecteYears = async (year) => {
  carForm.manufacture_year = year;
  showYears.value = false;
};

const { addCar, fetchMyCars } = useMyCars();
const localePaht = useLocalePath();
async function SendData() {
  try {
    isloadCar.value = true;
    isAddCar.value = true;
    let resAllCar = await getMycars();
    let isFirst = resAllCar?.data.length === 0;

    let res = await createCar({
      brand_id: carForm.brand_id,
      car_type_id: carForm.car_type_id,
      manufacture_year: carForm.manufacture_year,
      chassis_number: carForm.chassis_number,
      is_default: isFirst ? true : false,
    });
    console.log(carForm.value);

    addCar(carForm.value);
    addCar(res?.data);

    navigateTo(localePaht("/my-cars"));
  } catch (err) {
    if (err?.response?.status === 401) {
      return navigateTo(localePaht("/createaccount"));
    } else {
      console.log("send data", err);
    }
    isAddCar.value = false;
  } finally {
  }
}

let chassisError = ref("");
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

.years {
  border: 2px solid var(--main-color);
}
.chassis-input.error {
  border-color: #eb5757;
}
.chassis:deep(button):disabled {
  background-color: #7e7e7e;
  cursor: not-allowed;
}
.years {
  background-color: var(--color-secound-main);
}
</style>
