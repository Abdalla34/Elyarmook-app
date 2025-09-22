<template>
  <div class="order-details">
    <div class="container">
      <div class="row">
        <div class="col-8 col-padding">
          <h1 data-v-8bcd5751 class="text-capitalize text title-pages">
            services comfortable
          </h1>

          <ButtonCard
            @click="navigateTo('/car-brand')"
            v-if="mycars.length <= 0"
            text-button="added your car"
          />
          <div
            v-if="mycars.length >= 1"
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

          <!-- location to receive  -->
          <div
            v-if="address"
            class="box-car mt-3 d-flex align-items-center justify-content-between mb-3 pt-1 pb-1 pe-3 ps-3"
          >
            <div
              class="car-details d-flex align-items-center text-capitalize label"
            >
              {{ address }}
            </div>
            <!--  btn change -->
            <div
              class="btn btn-warning"
              style="cursor: pointer"
              @click="openMap(false)"
            >
              change
            </div>
          </div>

          <div v-else>
            <div
              class="location-receive-car mt-5 mb-2 d-flex align-items-center justify-content-center text-capitalize"
              style="cursor: pointer"
              @click="openMap(false)"
            >
              location to receive car
            </div>
            <span class="text-danger">{{ addressError }}</span>

            <div
              v-if="showMapPickup"
              style="position: relative; height: 400px; width: 100%"
            >
              <div id="mapPickup" style="height: 100%; width: 100%"></div>

              <!--  btn sure -->
              <button
                @click="confirmLocation(false)"
                class="btn-confirm-location text-capitalize button position-absolute bottom-0 start-50 translate-middle-x mb-3 ps-3 pe-3 pt-1 pb-1"
                style="cursor: pointer"
              >
                Confirm Location
              </button>
            </div>
          </div>

          <!-- select branch -->
          <div
            class="branch-date mt-3 d-flex align-items-center justify-content-between gap-3"
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
          <span class="text-danger">{{ branchError }}</span>

          <!-- select details time -->
          <div class="select-details-time mt-3 box-car p-3">
            <h5 class="label mb-3">اختر تفاصيل الوقت</h5>

            <div class="time-options mt-3">
              <div class="time-option-group">
                <!-- urgent -->
                <label
                  class="time-option d-flex gap-2 align-items-center p-2 rounded mb-2"
                  :class="{ active: typeService === 'urgent' }"
                >
                  <div class="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="timeOption"
                      value="urgent"
                      v-model="typeService"
                      class="custom-radio"
                    />
                    <span class="option-text">urgent</span>
                  </div>
                  <!-- ساعة 1 تبقى Tag -->
                  <div class="urgent-tag px-3 py-1 rounded-pill">
                    <i class="fa-solid fa-clock me-1"></i>
                    o'clock 1
                  </div>
                </label>

                <div class="urgent-note text-warning mb-2 text-end">
                  %ملاحظة: عند اختيار مستعجل سوف يرتفع سعر النقل 20
                  <i class="fa-solid fa-circle-info me-1"></i>
                </div>

                <!-- normal -->
                <label
                  class="time-option d-flex align-items-center gap-3 p-2 rounded"
                  :class="{
                    active: typeService === 'normal' && branchValue !== '',
                    opacity: branchValue === '',
                  }"
                  :disabled="branchValue === ''"
                >
                  <input
                    type="radio"
                    name="timeOption"
                    value="normal"
                    v-model="typeService"
                    class="custom-radio"
                    :disabled="branchValue === ''"
                  />
                  <span class="option-text">normal</span>
                </label>
              </div>
            </div>
            <!-- select time and date -->
            <div
              class="parent-time w-100 bg-white p-2 mt-2 rounded"
              v-if="typeService === 'normal' && branchValue !== ''"
            >
              <p class="p-color-fs">
                Select an available schedule. Appointments can only be made
                during this month.
              </p>
              <div class="time-available gap-3 mt-3 d-flex">
                <div class="d-flex gap-3 mt-3">
                  <div
                    class="time-date lay-out-box"
                    v-for="valuetime in availableDates"
                    :key="valuetime.date"
                    :class="{ active: selectedDate === valuetime.date }"
                    @click="selectedDate = valuetime.date"
                  >
                    {{ dayjs(valuetime.date).format("ddd D") }}
                  </div>
                </div>
              </div>
              <div
                class="overflow-x-auto overflow-hidden d-flex justify-content-center align-items-center mt-3 gap-2"
              >
                <div
                  class="time-slot lay-out-box"
                  v-for="slot in availableDates.find(
                    (d) => d.date === selectedDate
                  )?.time_slots"
                  :key="slot.time"
                  :class="{ active: selectedTimeSlot === slot.time }"
                  @click="selectedTimeSlot = slot.time"
                >
                  {{
                    dayjs(`${selectedDate} ${slot.time}`, [
                      "YYYY-MM-DD HH:mm",
                      "YYYY-MM-DD hh:mm A",
                    ]).format("hh:mm A")
                  }}
                </div>
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

          <!-- location to return   -->
          <div
            v-if="addressReturn"
            class="box-car mt-3 d-flex align-items-center justify-content-between mb-3 pt-1 pb-1 pe-3 ps-3"
          >
            <div
              class="car-details d-flex align-items-center text-capitalize label"
            >
              {{ addressReturn }}
            </div>
            <!--  btn change -->
            <div
              class="btn btn-warning"
              style="cursor: pointer"
              @click="openMap(true)"
            >
              change
            </div>
          </div>

          <div v-else-if="typeDelivery === 'twoWay'">
            <div
              class="location-receive-car mt-2 mb-2 d-flex align-items-center justify-content-center text-capitalize"
              style="cursor: pointer"
              @click="openMap(true)"
            >
              location to return car
            </div>

            <div
              v-if="showMapReturn"
              style="position: relative; height: 400px; width: 100%"
            >
              <div id="mapReturn" style="height: 100%; width: 100%"></div>

              <!--  btn sure -->
              <button
                @click="confirmLocation(true)"
                class="btn-confirm-location text-capitalize button position-absolute bottom-0 start-50 translate-middle-x mb-3 ps-3 pe-3 pt-1 pb-1"
                style="cursor: pointer"
              >
                Confirm Location
              </button>
            </div>
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
          <span class="text-danger">{{ problemError }}</span>

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

          <!-- input upload file -->
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
          <!-- modal nap -->
          <div
            v-if="showUnavailableModal"
            class="modal-overlay position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
            @click="showUnavailableModal = false"
          >
            <div
              class="modal-content position-relative p-4 bg-white rounded d-flex flex-column align-items-center justify-content-center text-center"
              @click.stop
              style="max-width: 600px; width: 90%"
            >
              <button
                type="button"
                class="btn-close position-absolute top-0 end-0 m-3"
                aria-label="Close"
                @click="showUnavailableModal = false"
              ></button>

              <div
                class="image-urgent mb-3 d-flex align-items-center justify-content-center"
              >
                <img src="/car-fix.png" alt="car fix" class="img-fluid" />
              </div>

              <h3 class="label mb-2">
                alyarmook takes a nap to service you better
              </h3>
              <p class="p-color-fs text-capitalize">
                time works from {{ getAvailableTimeBranch?.start_time }} to
                {{ getAvailableTimeBranch?.end_time }}
              </p>
            </div>
          </div>

          <!-- submit button -->
          <form
            class="buttons-order d-flex justify-content-center gap-2"
            @submit.prevent="onSubmit"
          >
            <button
              type="submit"
              class="continue text-capitalize label"
              :disabled="!isBranchAvailable"
            >
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
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
const schema = yup.object({
  branchValue: yup.string().required("you should selected branch"),
  problem: yup.string().required("you should selected type porblem "),
  address: yup.string().required(" address required"),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: branchValue, errorMessage: branchError } =
  useField("branchValue");
const { value: problem, errorMessage: problemError } = useField("problem");
const { value: address, errorMessage: addressError } = useField("address");

const dayjs = useDayjs();
const branches = ref([]);

const typeDelivery = ref("");
const mycars = ref([]);

const reservationTime = ref(null);
const rescar = await useApi().getMycars();
mycars.value = rescar?.data || [];
const getProblems = ref([]);

const typeService = ref("urgent");
const selectedDate = ref(null);
const selectedTimeSlot = ref(null);

const defaultCar = computed(
  () => mycars.value.find((car) => car.is_default) || null
);

const availableDates = ref([]);
const isBranchAvailable = ref(false);
const showUnavailableModal = ref(false);
const getAvailableTimeBranch = ref(null);

watch(branchValue, async (newId) => {
  if (newId) {
    let resDate = await useApi().getAvailableTimes(newId);
    availableDates.value = resDate?.available_times;

    const responseAvailable = await useApi().getAvailableBrnchesTime(newId);
    getAvailableTimeBranch.value = responseAvailable?.data || null;

    if (getAvailableTimeBranch.value?.is_available_now) {
      isBranchAvailable.value = true;
      showUnavailableModal.value = false;
    } else {
      isBranchAvailable.value = false;
      showUnavailableModal.value = true;
    }
  }
});
watch([selectedDate, selectedTimeSlot], ([newDate, newSlot]) => {
  if (newDate && newSlot) {
    const fullDateTime = dayjs(`${newDate} ${newSlot}`, [
      "YYYY-MM-DD HH:mm",
      "YYYY-MM-DD hh:mm A",
    ]);

    if (fullDateTime.isValid()) {
      reservationTime.value = fullDateTime.format("YYYY-MM-DD HH:mm:ss");
    } else {
      console.error("Invalid Date:", newDate, newSlot);
    }
  }
});
watch(typeService, (newVal) => {
  if (newVal === "urgent") {
    reservationTime.value = "";
    isBookingNow.value = true;
  } else {
    isBookingNow.value = false;
  }
});

onMounted(async () => {
  try {
    const resbranch = await useApi().getBranches();
    branches.value = resbranch.data?.items || [];
    const resProblems = await useApi().getProblems();
    getProblems.value = resProblems.data?.items || [];
  } catch (e) {
    console.error("Error fetching my cars:", e);
  }
});

const showMapPickup = ref(false);
const showMapReturn = ref(false);

const maps = {
  pickup: ref(null),
  return: ref(null),
};
const markers = {
  pickup: ref(null),
  return: ref(null),
};

const currentLatLng = ref({ lat: null, lng: null });
const returnLatLng = ref({ lat: null, lng: null });
const addressReturn = ref("");

const openMap = (returnMode = false) => {
  if (returnMode) {
    showMapReturn.value = true;
  } else {
    showMapPickup.value = true;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const startPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        const mapId = returnMode ? "mapReturn" : "mapPickup";

        maps[returnMode ? "return" : "pickup"].value = new google.maps.Map(
          document.getElementById(mapId),
          {
            center: startPosition,
            zoom: 15,
          }
        );

        markers[returnMode ? "return" : "pickup"].value =
          new google.maps.Marker({
            position: startPosition,
            map: maps[returnMode ? "return" : "pickup"].value,
            draggable: true,
          });
      },
      (err) => {
        alert("Error: " + err.message);
      }
    );
  }
};

const confirmLocation = (returnMode = false) => {
  const marker = markers[returnMode ? "return" : "pickup"].value;
  const position = marker.getPosition();
  const lat = position.lat();
  const lng = position.lng();

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: { lat, lng } }, (results, status) => {
    if (status === "OK" && results[0]) {
      if (returnMode) {
        returnLatLng.value = { lat, lng };
        addressReturn.value = results[0].formatted_address;
        showMapReturn.value = false;
      } else {
        currentLatLng.value = { lat, lng };
        address.value = results[0].formatted_address;
        showMapPickup.value = false;
      }
    } else {
      alert("لم أستطع جلب العنوان");
    }
  });
};

const isBookingNow = ref(null);
const service_id = ref([]);
const spare_part_id = ref([]);
const payload = computed(() => ({
  branch_id: branchValue.value || null,
  delivery_direction: typeDelivery.value || null,
  problem_id: problem.value || null,
  reservation_time: reservationTime.value,
  address: address.value || null,
  lat: currentLatLng.value.lat ? String(currentLatLng.value.lat) : null,
  lng: currentLatLng.value.lng ? String(currentLatLng.value.lng) : null,
  user_car_id: defaultCar.value ? defaultCar.value.id : null,
  address_return: addressReturn.value ? String(addressReturn.value) : null,
  lat_return: returnLatLng.value.lat ? String(returnLatLng.value.lat) : null,
  lng_return: returnLatLng.value.lng ? String(returnLatLng.value.lng) : null,
  is_booking_now: isBookingNow.value,
  in_cart: true,
  service_id: service_id.value || null,
  spare_part_id: spare_part_id.value || null,
}));

const router = useRouter();
async function createOrderWench() {
  const rawPayload = payload.value;

  if (!rawPayload.reservation_time) {
    isBookingNow.value = true;
    reservationTime.value = dayjs()
      .add(2, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  } else {
    isBookingNow.value = false;
  }

  const cleanedPayload = Object.fromEntries(
    Object.entries(payload.value).filter(([_, v]) => v !== null && v !== "")
  );

  const res = await useWenchServices().createWenchOrder(
    cleanedPayload,
    "wench"
  );
  if (res && res.status) {
    navigateTo(`/cart`);
    console.log(res?.data?.id);
  } else {
    console.log("Failed to create order: " + (res?.message || "Unknown error"));
  }
}

const onSubmit = handleSubmit(async () => {
  await createOrderWench();
});
</script>

<style scoped>
@import "@/assets/css/orderDetails.css";
@import "@/assets/css/orderWench.css";
.opacity {
  opacity: 0.5;
  cursor: not-allowed;
}
.time-available {
  background-color: #ffffff;
  box-shadow: 0px 0px 20px 0px #0000000a;
  border-radius: 6px;
  padding: 1rem;
  /* cursor: pointer; */
  position: relative;
  overflow-x: auto;
  z-index: 1;
  scroll-behavior: smooth;
}

.lay-out-box {
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  /* text-align: center; */
  width: 100px;
}

.lay-out-box:hover {
  background-color: var(--main-color);
  cursor: pointer;
  border: 1px solid var(--main-color);
}
.lay-out-box.active {
  background-color: var(--main-color);
  border-color: var(--main-color);
}

.image-urgent {
  width: 80px;
  height: 80px;
  background-color: antiquewhite;
  border-radius: 50%;
}
.image-urgent img {
  width: 60px;
}
.continue:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #ccc;
}
</style>
