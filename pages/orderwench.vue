<template>
  <div class="order-details">
    <div class="container">
      <div class="row">
        <!-- <NotRegister
          :IsNotRegitser="msgError"
          message="your orders is Empty you must create account"
        /> -->

        <div class="col-8 col-padding">
          <h1 data-v-8bcd5751 class="text-capitalize text title-pages">
            services comfortable
          </h1>

          <div
            class="box-car d-flex align-items-center justify-content-between mb-3 pt-1 pb-1 pe-3 ps-3"
          >
            <div
              v-if="defaultCar"
              class="car-details d-flex align-items-center gap-3"
            >
              <img :src="defaultCar.brand?.image" alt="" />

              {{ defaultCar.brand?.title }} - {{ defaultCar.car_type?.title }}
            </div>
            <div class="btn-change" @click="navigateTo('/my-cars')">
              <button type="button" class="btn btn-secondary">change</button>
            </div>
          </div>

          <div
            class="location-receive-car mt-5 mb-5 d-flex align-items-center justify-content-center text-capitalize"
            style="cursor: pointer"
          >
            location to receive car
          </div>

          <!-- <div class="select-details-time box-car pt-1 pb-1 pe-3 ps-3">
            <p class="label">select details time</p>
            <div class="box-input p-2">
              <div class="input d-flex align-items-center gap-3">
                <input type="checkbox" name="car" class="rounded-circle" />
                <p class="p-colo-fs prag p-2 bg-danger text-light">1 o'clock</p>
              </div>
            </div>
          </div> -->
          <!-- select branch -->
          <div
            class="branch-date d-flex align-items-center justify-content-between gap-3"
          >
            <div class="input-barnch position-relative fix d-flex flex-column">
              <label for="" class="label">branch</label>
              <select v-model="branchValue" class="input-style">
                <option disabled value="">Select Branch</option>
                <option v-for="br in branches" :key="br.id" :value="br.id">
                  {{ br.title }}
                </option>
              </select>
              <div class="icon-shape position-absolute">
                <PuplicIconArrowBottom />
              </div>
            </div>
          </div>
          <!-- type delivery -->
          <div
            class="branch-date type-delivery d-flex align-items-center justify-content-between gap-3"
          >
            <div class="input-barnch position-relative fix d-flex flex-column">
              <label for="" class="label">type delivery</label>
              <select v-model="typeDelivery" class="input-style">
                <option disabled value="">Select type delivery</option>
                <option>oneWay</option>
                <option>twoWay</option>
              </select>
              <div class="icon-shape position-absolute">
                <PuplicIconArrowBottom />
              </div>
            </div>
          </div>
          <!-- location to return car -->
          <div
            v-if="typeDelivery === 'twoWay'"
            class="location-receive-car mt-2 mb-2 d-flex align-items-center justify-content-center text-capitalize"
            style="cursor: pointer"
          >
            location to return car
          </div>
          <!-- type problem -->
          <div
            class="branch-date d-flex align-items-center justify-content-between gap-3"
          >
            <div class="input-barnch position-relative fix d-flex flex-column">
              <label for="" class="label">type problem</label>
              <select v-model="problem" class="input-style">
                <option disabled value="">Select type problem</option>
                <option
                  v-for="value in getProblems"
                  :key="value.id"
                  :value="value.id"
                >
                  {{ value.title }}
                </option>
              </select>
              <div class="icon-shape position-absolute">
                <PuplicIconArrowBottom />
              </div>
            </div>
          </div>
          <!-- text area  -->
          <div
            class="branch-date d-flex align-items-center justify-content-between gap-3"
          >
            <div class="input-barnch position-relative fix d-flex flex-column">
              <label for="" class="label">more details</label>
              <textarea
                name="description"
                placeholder="more details"
                id=""
              ></textarea>
            </div>
          </div>

          <div class="problem-photo">
            <label class="label">problem photo</label>
            <div
              class="upload-box d-flex justify-content-center gap-5 align-items-center"
            >
              <div class="icon-upload mb-3">
                <PuplicIconUploadIcon />
              </div>
              <div>
                <input id="problem-photo" type="file" accept="image/*" />
                <label
                  for="problem-photo"
                  class="upload-trigger d-flex justify-content-center"
                >
                  <div class="">Upload from your device</div>
                  <div class="file-name"></div>
                </label>
              </div>
            </div>
          </div>

          <form
            class="buttons-order d-flex justify-content-center gap-2"
            @submit.prevent="createOrderWench('wench')"
          >
            <button type="submit" class="continue text-capitalize label button">
              continue
            </button>
          </form>
        </div>
      </div>
    </div>
    <!-- load component -->
    <!-- <LoadingSpinner :is-loading-otp="isLoadingOtp" /> -->
  </div>
</template>

<script setup>
const branches = ref([]);
const branchValue = ref("");
const typeDelivery = ref("");
const problem = ref("");
const mycars = ref([]);

const defaultCar = computed(
  () => mycars.value.find((car) => car.is_default) || null
);
const payload = computed(() => ({
  branch_id: branchValue.value || null,
  delivery_direction: typeDelivery.value || null,
  problem_id: problem.value || null,
  brand_id: defaultCar.value ? defaultCar.value.id : null,
  reservation_time: null,
  address: null,
  lat: null,
  lng: null,
  user_car_id: defaultCar.value ? defaultCar.value.id : null,
}));

console.log(defaultCar.value);

function createOrderWench(type) {
  // return useWenchServices().createWenchOrder(payload, type);
  console.log(payload.value);
}
const getProblems = ref([]);

onMounted(async () => {
  try {
    const rescar = await useApi().getMycars();
    mycars.value = rescar?.data || [];
    const resbranch = await useApi().getBranches();
    branches.value = resbranch.data?.items || [];
    const resProblems = await useApi().getProblems();
    getProblems.value = resProblems.data?.items || [];
  } catch (e) {
    console.error("Error fetching my cars:", e);
  }
});
</script>

<style scoped>
@import "@/assets/css/orderDetails.css";
.box-input {
  background-color: #f9cbcb;
  border: 1px solid #e58484;
  border-radius: 20px;
}

.box-car {
  border-radius: 20px;
  background-color: var(--color-secound-main);
}
.branch-date select,
.branch-date textarea {
  background-color: var(--color-secound-main);
}
.btn-secondary {
  transition: box-shadow 0.3s ease;
}
.btn-secondary:hover {
  box-shadow: 0px 4px 12px #222020;
}
.car-details img {
  width: 60px;
}
.location-receive-car {
  height: 50px;
  background-color: #f9cbcb;
  border-radius: 20px;
  transition: box-shadow 0.3s ease;
}
.location-receive-car:hover {
  box-shadow: 0px 4px 12px #dba4a4;
}
.prag {
  background-color: #f9cbcb;
  width: fit-content;
  border-radius: 15px;
}
</style>
