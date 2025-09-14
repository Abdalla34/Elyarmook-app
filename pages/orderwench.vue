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

          <!-- location receive car -->
          <div>
            <div
              class="location-receive-car mt-5 mb-5 d-flex align-items-center justify-content-center text-capitalize"
              style="cursor: pointer"
              @click="openMap(false)"
            >
              location to receive car
            </div>

            <!-- container map -->
            <div
              v-if="showMap"
              style="position: relative; height: 400px; width: 100%"
            >
              <div id="map" style="height: 100%; width: 100%"></div>

              <!-- btn-confirm location -->
              <button
                @click="confirmLocation"
                class="btn-confirm-location text-capitalize button position-absolute bottom-0 start-50 translate-middle-x mb-3 ps-3 pe-3 pt-1 pb-1"
                style="cursor: pointer"
              >
                Confirm Location
              </button>
            </div>
          </div>

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

          <!-- select details time -->
          <div class="select-details-time box-car p-3">
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
                    class="time-slot"
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
                  class="time-slot"
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
          <!-- location to return car -->
          <div
            v-if="typeDelivery === 'twoWay'"
            class="location-receive-car mt-2 mb-2 d-flex align-items-center justify-content-center text-capitalize"
            style="cursor: pointer"
            @click="openMap(true)"
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

          <!-- submit button -->
          <form
            class="buttons-order d-flex justify-content-center gap-2"
            @submit.prevent="createOrderWench"
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
// import dayjs from "#build/dayjs.imports.mjs";
const dayjs = useDayjs();

const branches = ref([]);
const branchValue = ref("");
const typeDelivery = ref("");
const problem = ref("");
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
watch(branchValue, async (newId) => {
  if (newId) {
    let resDate = await useApi().getAvailableTimes(newId);
    availableDates.value = resDate?.available_times;
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

const showMap = ref(false);
const map = ref(null);
const marker = ref(null);
const currentLatLng = ref({ lat: null, lng: null });
const address = ref("");
const isReturn = ref(false);
const returnLatLng = ref({ lat: null, lng: null });
const addressReturn = ref("");

const openMap = (returnMode = false) => {
  showMap.value = true;
  isReturn.value = returnMode;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const startPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        map.value = new google.maps.Map(document.getElementById("map"), {
          center: startPosition,
          zoom: 15,
        });

        marker.value = new google.maps.Marker({
          position: startPosition,
          map: map.value,
          draggable: true,
        });
      },
      (err) => {
        alert("Error: " + err.message);
      }
    );
  }
};

const confirmLocation = () => {
  const position = marker.value.getPosition();
  const lat = position.lat();
  const lng = position.lng();

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: { lat, lng } }, (results, status) => {
    if (status === "OK" && results[0]) {
      if (isReturn.value) {
        // حفظ مكان الإرجاع
        returnLatLng.value = { lat, lng };
        addressReturn.value = results[0].formatted_address;
        alert(`تم اختيار مكان الإرجاع: ${addressReturn.value}`);
      } else {
        // حفظ مكان الاستلام
        currentLatLng.value = { lat, lng };
        address.value = results[0].formatted_address;
        alert(`تم اختيار مكان الاستلام: ${address.value}`);
      }
    } else {
      alert("لم أستطع جلب العنوان");
    }
  });
};

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
}));

function createOrderWench() {
  const rawPayload = payload.value;
 if (!rawPayload.reservation_time) {
  rawPayload.reservation_time = dayjs()
    .add(2, "hour")
    .format("YYYY-MM-DD HH:mm:ss");
}

  const cleanedPayload = Object.fromEntries(
    Object.entries(rawPayload).filter(([_, v]) => v !== null && v !== "")
  );

  const res = useWenchServices().createWenchOrder(cleanedPayload, "wench");
  if (res && res.status) {
    alert("Order created successfully!");
    // Optionally, redirect or reset form here
  } else {
    console.log("Failed to create order: " + (res?.message || "Unknown error"));
  }
}
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

.time-slot {
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  /* text-align: center; */
  width: 100px;
}

.time-slot:hover {
  background-color: var(--main-color);
  cursor: pointer;
  border: 1px solid var(--main-color);
}
.time-slot.active {
  background-color: var(--main-color);
  border-color: var(--main-color);
}
</style>
