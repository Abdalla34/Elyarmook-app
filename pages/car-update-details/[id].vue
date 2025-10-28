<template>
  <div class="car-update-details">
    <div class="container mt-5">
      <div>
        <div class="row justify-content-center">
          <div class="col-lg-7 col-md-6 parent-types">
            <div>
              <div>
                <!-- types brand -->
                <div v-if="step === 1" class="row justify-content-center">
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
                <!-- years && chassis -->
                <div v-if="step === 2" class="row justify-content-center">
                  <!-- years -->
                  <div
                    @click="showYears = true"
                    class="years rounded gap-2 ps-3 pe-3 pt-3 pb-3 d-flex align-items-center justify-content-between"
                  >
                    <input
                      type="text"
                      :placeholder="$t('Manufacture Year:')"
                      class="form-control border-0 shadow-none"
                      style="flex: 1"
                      v-model="carForm.manufacture_year"
                      readonly
                    />
                    <div class="icon"><puplic-icon-arrow-bottom /></div>
                  </div>
                  <!-- error message -->
                  <span
                    v-if="errors.manufacture_year"
                    class="text-danger small text-capitalize"
                  >
                    {{ errors.manufacture_year }}
                  </span>
                  <!-- chassis  -->
                  <div
                    class="chassis-num rounded ps-3 pe-3 pt-2 pb-2 d-flex align-items-center mt-3 justify-content-between border"
                  >
                    <input
                      type="text"
                      :placeholder="$t('chassis Number:')"
                      class="form-control border-0 shadow-none"
                      style="flex: 1"
                      v-model="carForm.chassis_number"
                    />
                    <div class="ms-2">
                      <span class="p-color-fs">{{ $t("optional") }}</span>
                    </div>
                  </div>
                </div>
                <!-- modal years -->
                <div v-if="showYears" class="modal-overlay">
                  <div class="modal-box position-relative" @click.stop>
                    <button
                      class="btn-close position-absolute top-0 end-0 m-3"
                      @click="showYears = false"
                    ></button>

                    <h1 class="label mb-3">{{ $t("Manufacture Year:") }}</h1>
                    <div class="all-years">
                      <div
                        v-for="year in years"
                        @click="selecteYears(year)"
                        class="box-year mb-2 rounded ps-2 pe-2 pt-1 pb-1"
                        style="cursor: pointer;"
                      >
                        {{ year }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- button continue -->
                <div
                  v-if="step === 2"
                  @click="sendDataCar"
                  class="btn-continue mt-4"
                >
                  <button-card :text-button="$t('continue')" />
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
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const { getDetailsCar, getCarTypes, editCar } = useApi();
let startYear = 1900;
let endYear = new Date().getFullYear();
let years = Array.from(
  { length: endYear - startYear + 1 },
  (_, i) => endYear - i
);

const schema = yup.object({
  manufacture_year: yup
    .number()
    .typeError("من فضلك اختر سنة صحيحة")
    .required("this input is required"),
});
const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});
const { value: manufacture_year } = useField("manufacture_year");

let carForm = reactive({
  brand_id: null,
  car_type_id: null,
  manufacture_year: null,
  chassis_number: null,
  is_default: null,
});

const carTypes = ref([]);
const route = useRoute();
const id = route.params.id;
const getCar = await getDetailsCar(id);
const res = await getCarTypes(getCar.data.brand.id);
carTypes.value = res?.data?.items || [];
const step = ref(1);
const showYears = ref(false);

function selecteTypeID(carId) {
  carForm.car_type_id = carId.id;
  step.value = 2;
}

let selecteYears = (year) => {
  carForm.manufacture_year = year;
  manufacture_year.value = carForm.manufacture_year;
  showYears.value = false;
  carForm.brand_id = getCar.data.brand.id;
};

const sendDataCar = handleSubmit(async (values) => {
  try {
    const responseSendData = await editCar(
      {
        brand_id: carForm.brand_id,
        car_type_id: carForm.car_type_id,
        manufacture_year: values.manufacture_year,
        chassis_number: carForm.chassis_number,
      },
      getCar.data.id
    );

    if (responseSendData?.status) {
      navigateTo("/my-cars");
    }
  } catch (error) {
    console.error("❌ Error sending car data:", error?.data || error);
    // عشان تشوف الرسالة اللي جاية من السيرفر
    if (error?.data?.errors) {
      console.table(error.data.errors);
    }
  }
});
</script>

<style scoped>
@import "@/assets/css/carbrand.css";
.image {
  width: 40px;
}
.chassis-num,
.years {
  background-color: var(--color-secound-main);
}
</style>
