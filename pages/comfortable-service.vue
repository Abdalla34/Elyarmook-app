<template>
  <div class="order-details">
    <div class="container">
      <div class="row" v-if="skeleton">
        <skeletons-ComfortableSkel />
      </div>
      <div v-else class="row">
        <div class="col-md-8 col-padding">
          <div v-if="showModal" class="modal-overlay">
            <div class="modal-box">
              <p class="fs-5 mb-3">{{ messageShowErr }}</p>
              <button class="btn btn-primary" @click="showModal = false">
                {{ $t("Close") }}
              </button>
            </div>
          </div>
          <h1 data-v-8bcd5751 class="text-capitalize text title-pages">
            {{ $t("services comfortable") }}
          </h1>

          <ButtonCard
            @click="handleClick('/car-brand')"
            v-if="mycars.length <= 0"
            :text-button="isloadBtn ? $t('loading...') : $t('added your car')"
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
            <div class="btn-change" @click="navigateTo(LocalePath('/my-cars'))">
              <button type="button" class="btn btn-secondary">
                {{ $t("change") }}
              </button>
            </div>
          </div>

          <!-- location to receive  -->
          <div
            v-if="address && !showMapPickup"
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
              {{ $t("change") }}
            </div>
          </div>

          <div v-if="!address && !showMapPickup">
            <div
              class="location-receive-car mt-5 mb-2 d-flex align-items-center justify-content-center text-capitalize"
              style="cursor: pointer"
              @click="openMap(false)"
            >
              {{ $t("location to receive car") }}
            </div>
            <span class="text-danger">{{ addressError }}</span>
          </div>

          <!-- Map container - always available when showMapPickup is true -->
          <div
            v-if="showMapPickup"
            class="mt-3"
            style="position: relative; height: 400px; width: 100%"
          >
            <div id="mapPickup" style="height: 100%; width: 100%"></div>

            <!--  btn sure -->
            <button
              @click="confirmLocation(false)"
              class="btn-confirm-location text-capitalize button position-absolute bottom-0 start-50 translate-middle-x mb-3 ps-3 pe-3 pt-1 pb-1"
              style="cursor: pointer"
            >
              {{ $t("Confirm Location") }}
            </button>
          </div>

          <!-- select branch -->
          <div
            class="branch-date mt-3 d-flex align-items-center justify-content-between gap-3"
          >
            <div class="input-barnch position-relative fix d-flex flex-column">
              <label for="" class="label">{{ $t("branch") }}</label>
              <select v-model="branchValue" class="input-style">
                <option disabled value="">{{ $t("Select Branch") }}</option>
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
            <h5 class="label mb-3">{{ $t("choosing time details") }}</h5>

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
                    <span class="option-text">{{ $t("urgent") }}</span>
                  </div>
                  <!-- ساعة 1 تبقى Tag -->
                  <div class="urgent-tag px-3 py-1 rounded-pill">
                    <i class="fa-solid fa-clock me-1"></i>
                    {{ $t("o'clock 1") }}
                  </div>
                </label>

                <div class="urgent-note text-warning mb-2 text-end">
                  <{{
                    $t(
                      "Note: Choosing express shipping will increase the shipping price."
                    )
                  }}
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
                  <span class="option-text">{{ $t("normal") }}</span>
                </label>
              </div>
            </div>
            <!-- select time and date -->
            <div
              class="parent-time w-100 bg-white p-2 mt-2 rounded"
              v-if="typeService === 'normal' && branchValue !== ''"
            >
              <p class="p-color-fs">
                {{
                  $t(
                    "Select an available schedule. Appointments can only be made during this month"
                  )
                }}.
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
              <label class="label">{{ $t("type delivery") }}</label>
              <select
                v-model="typeDelivery"
                class="input-style"
                @change="handleDeliveryChange"
              >
                <option disabled value="">
                  {{ $t("Select type delivery") }}
                </option>
                <option value="oneWay">{{ $t("oneWay") }}</option>
                <option value="twoWay">{{ $t("twoWay") }}</option>
              </select>
              <div class="icon-shape position-absolute">
                <PuplicIconArrowBottom />
              </div>
            </div>
          </div>
          <!-- <div
            class="branch-date type-delivery d-flex align-items-center justify-content-between gap-3"
          >
            <div class="input-barnch position-relative fix d-flex flex-column">
              <label for="" class="label">{{ $t("type delivery") }}</label>
              <select v-model="typeDelivery" class="input-style" @change="handleDeliveryChange">
                <option disabled value="">
                  {{ $t("Select type delivery") }}
                </option>
                <option>{{ $t("oneWay") }}</option>
                <option>{{ $t("twoWay") }}</option>
              </select>
              <div class="icon-shape position-absolute">
                <PuplicIconArrowBottom />
              </div>
            </div>
          </div> -->

          <!-- location to return   -->
          <div
            v-if="
              addressReturn &&
              !showMapReturn &&
              (typeDelivery === 'twoWay' || typeDelivery === 'two_way')
            "
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
              {{ $t("change") }}
            </div>
          </div>

          <div
            v-if="
              !addressReturn &&
              !showMapReturn &&
              (typeDelivery === 'twoWay' || typeDelivery === 'two_way')
            "
          >
            <div
              class="location-receive-car mt-2 mb-2 d-flex align-items-center justify-content-center text-capitalize"
              style="cursor: pointer"
              @click="openMap(true)"
            >
              {{ $t("location to return car") }}
            </div>
          </div>

          <!-- Return Map container - always available when showMapReturn is true -->
          <div
            v-if="showMapReturn"
            class="mt-3"
            style="position: relative; height: 400px; width: 100%"
          >
            <div id="mapReturn" style="height: 100%; width: 100%"></div>

            <!--  btn sure -->
            <button
              @click="confirmLocation(true)"
              class="btn-confirm-location text-capitalize button position-absolute bottom-0 start-50 translate-middle-x mb-3 ps-3 pe-3 pt-1 pb-1"
              style="cursor: pointer"
            >
              {{ $t("Confirm Location") }}
            </button>
          </div>

          <!-- type problem -->
          <div
            class="branch-date d-flex align-items-center justify-content-between gap-3"
          >
            <div class="input-barnch position-relative fix d-flex flex-column">
              <label for="" class="label">{{ $t("type problem") }}</label>
              <select v-model="problem" class="input-style">
                <option disabled value="">
                  {{ $t("Select type problem") }}
                </option>
                <option
                  v-for="value in getProblemss"
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
              <label for="" class="label">{{ $t("more details") }}</label>
              <textarea
                name="description"
                :placeholder="$t('more details')"
                id=""
              ></textarea>
            </div>
          </div>

          <!-- input upload file -->
          <div class="problem-photo">
            <label class="label">{{ $t("problem photo") }}</label>
            <div
              class="upload-box d-flex justify-content-center gap-5 align-items-center"
            >
              <div class="icon-upload mb-3">
                <PuplicIconUploadIcon />
              </div>
              <div>
                <!-- <input id="problem-photo" type="file" accept="image/*" /> -->
                <input
                  id="problem-photo"
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                />
                <label
                  for="problem-photo"
                  class="upload-trigger d-flex justify-content-center"
                >
                  <div class="">{{ $t("Upload from your device") }}</div>
                  <div class="file-name">{{ fileName }}</div>
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
                {{ $t("alyarmook takes a nap to service you better") }}
              </h3>
              <p class="p-color-fs text-capitalize">
                {{ $t("time works from") }}
                {{ getAvailableTimeBranch?.start_time }} {{ $t("to") }}
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
              {{ $t("continue") }}
            </button>
          </form>
        </div>
      </div>
    </div>
    <!-- load component -->
    <LoadingSpinner :is-loading-otp="isLoading" />
  </div>
</template>

<script setup>
import { tr } from "date-fns/locale";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const skeleton = ref(true);
const { getAvailableTimes, getAvailableBrnchesTime, getBranches, getProblems } =
  useApi();
const { createWenchOrder, updateWenchOrder } = useWenchServices();
const LocalePath = useLocalePath();

const schema = yup.object({
  branchValue: yup.string().required("you should select a branch"),
  problem: yup.string().required("you should select a problem type"),
  address: yup.string().required("address is required"),
});

const showModal = ref(false);
const branchValue = useState("branchValue", () => "");
const problem = useState("problem", () => "");
const address = useState("address", () => "");

const branchError = useState("branchError", () => "");
const problemError = useState("problemError", () => "");
const addressError = useState("addressError", () => "");

const dayjs = useDayjs();
const branches = ref([]);

const typeDelivery = useState("typeDelivery", () => "oneWay");
const mycars = ref([]);

const reservationTime = useState("reservationTime", () => null);
const problemPhoto = useState("problemPhoto", () => null);
const rescar = await useApi().getMycars();
mycars.value = rescar?.data || [];

const getProblemss = ref([]);

const typeService = ref("urgent");
const selectedDate = ref(null);
const selectedTimeSlot = ref(null);

const defaultCar = computed(
  () => mycars.value.find((car) => car.is_default) || null
);

const availableDates = useState("availableDates", () => []);
const isBranchAvailable = ref(false);
const showUnavailableModal = ref(false);
const getAvailableTimeBranch = useState("getAvailableTimeBranch", () => null);

watch(branchValue, async (newId) => {
  if (!newId || skeleton.value) return;
  if (newId) {
    let resDate = await getAvailableTimes(newId);
    availableDates.value = resDate?.available_times;

    const responseAvailable = await getAvailableBrnchesTime(newId);
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
      console.error("Invalid Date:");
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
  skeleton.value = true;
  try {
    const CACHE_KEY_BRANCHES = "branches";
    const CACHE_KEY_PROBLEMS = "problems";
    const CACHE_TIME_KEY = "cacheTime";
    const CACHE_EXPIRY_HOURS = 12;

    const lastCacheTime = localStorage.getItem(CACHE_TIME_KEY);
    const isCacheValid =
      lastCacheTime &&
      dayjs().diff(dayjs(lastCacheTime), "hour") < CACHE_EXPIRY_HOURS;

    if (isCacheValid) {
      const cachedBranches = localStorage.getItem(CACHE_KEY_BRANCHES);
      const cachedProblems = localStorage.getItem(CACHE_KEY_PROBLEMS);

      if (cachedBranches && cachedProblems) {
        branches.value = JSON.parse(cachedBranches);
        getProblemss.value = JSON.parse(cachedProblems);
      }
    } else {
      const [resbranch, resProblems] = await Promise.all([
        getBranches(),
        getProblems(),
      ]);

      branches.value = resbranch.data?.items || [];
      getProblemss.value = resProblems.data?.items || [];

      localStorage.setItem(CACHE_KEY_BRANCHES, JSON.stringify(branches.value));
      localStorage.setItem(
        CACHE_KEY_PROBLEMS,
        JSON.stringify(getProblemss.value)
      );
      localStorage.setItem(CACHE_TIME_KEY, dayjs().toISOString());
    }
  } catch (e) {
    console.error("Error fetching data:");
  } finally {
    skeleton.value = false;
  }
});
const { handleClick, isloadBtn } = loadBtn();

// Cleanup map instances when component is unmounted
onUnmounted(() => {
  if (maps.pickup.value) {
    maps.pickup.value = null;
  }
  if (maps.return.value) {
    maps.return.value = null;
  }
  if (markers.pickup.value) {
    markers.pickup.value = null;
  }
  if (markers.return.value) {
    markers.return.value = null;
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
const returnLatLng = useState("returnLatLng", () => ({ lat: null, lng: null }));
const addressReturn = useState("addressReturn", () => "");

const openMap = (returnMode = false) => {
  // Clean up existing map instances first
  const mapType = returnMode ? "return" : "pickup";
  if (maps[mapType].value) {
    maps[mapType].value = null;
  }
  if (markers[mapType].value) {
    markers[mapType].value = null;
  }

  if (returnMode) {
    showMapReturn.value = true;
  } else {
    showMapPickup.value = true;
  }

  // Wait for DOM to update and then initialize map
  nextTick(() => {
    // Add a small delay to ensure DOM is fully rendered
    setTimeout(() => {
      initializeMap(returnMode);
    }, 100);
  });
};

function loadGoogleMapsScript() {
  return new Promise((resolve, reject) => {
    if (document.getElementById("google-maps-script")) return resolve();

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_KEY`;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

const initializeMap = async (returnMode = false) => {
  if (!window.google) {
    await loadGoogleMapsScript();
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const startPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        const mapType = returnMode ? "return" : "pickup";
        const mapId = returnMode ? "mapReturn" : "mapPickup";

        let retryCount = 0;
        const maxRetries = 20; // Maximum 20 retries (1 second total wait)

        // Wait for element to be available
        const checkElement = () => {
          const mapElement = document.getElementById(mapId);

          if (mapElement) {
            try {
              maps[mapType].value = new google.maps.Map(mapElement, {
                center: startPosition,
                zoom: 15,
              });

              markers[mapType].value = new google.maps.Marker({
                position: startPosition,
                map: maps[mapType].value,
                draggable: true,
              });
            } catch (error) {
              console.error(`Error initializing map: ${error.message}`);
            }
          } else if (retryCount < maxRetries) {
            // If element not found and we haven't exceeded max retries, try again
            retryCount++;
            console.log(
              `Waiting for map element ${mapId}... (attempt ${retryCount}/${maxRetries})`
            );
            setTimeout(checkElement, 50);
          } else {
            console.error(
              `Map element ${mapId} not found after ${maxRetries} attempts`
            );
          }
        };

        checkElement();
      },
      (err) => {
        alert("Error: " + err.message);
      }
    );
  }
};

const confirmLocation = (returnMode = false) => {
  const mapType = returnMode ? "return" : "pickup";
  const marker = markers[mapType].value;

  if (!marker) {
    alert("No marker found. Please try again.");
    return;
  }

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

      // Clean up map instances after confirmation
      if (maps[mapType].value) {
        maps[mapType].value = null;
      }
      if (markers[mapType].value) {
        markers[mapType].value = null;
      }
    } else {
      alert("لم أستطع جلب العنوان");
    }
  });
};

const isBookingNow = useState("isBookingNow", () => null);
const service_id = useState("service_id", () => []);
const spare_part_id = useState("spare_part_id", () => []);
const fileName = useState("fileName", () => "");

const payload = computed(() => ({
  branch_id: branchValue.value || null,
  delivery_direction: typeDelivery.value || null,
  problem_id: problem.value || null,
  reservation_time: reservationTime.value,
  address: address.value || null,
  lat: currentLatLng.value.lat ? String(currentLatLng.value.lat) : "0",
  lng: currentLatLng.value.lng ? String(currentLatLng.value.lng) : "0",
  user_car_id: defaultCar.value?.id || mycars.value[0]?.id || null,
  address_return: addressReturn.value ? String(addressReturn.value) : "0",
  lat_return: returnLatLng.value.lat ? String(returnLatLng.value.lat) : "0",
  lng_return: returnLatLng.value.lng ? String(returnLatLng.value.lng) : "0",
  is_booking_now: isBookingNow.value,
  in_cart: true,
  service_id: service_id.value || null,
  spare_part_id: spare_part_id.value || null,
  problems: problemPhoto.value || "",
}));

const isLoading = ref(false);
const updateOrderId = useState("updateOrderId", () => null);

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    problemPhoto.value = file;
    fileName.value = file.name;
  }
}
const messageShowErr = ref("");

const handleDeliveryChange = (event) => {
  // لو المستخدم اختار oneWay أو twoWay من الترجمة
  const value = event.target.value;
  if (value === "oneWay") typeDelivery.value = "oneWay";
  else if (value === "twoWay") typeDelivery.value = "twoWay";
};

async function createOrderWench() {
  try {
    isLoading.value = true;
    const rawPayload = payload.value;

    // if (!rawPayload.reservation_time) {
    //   isBookingNow.value = true;
    //   reservationTime.value = dayjs()
    //     .add(2, "hour")
    //     .format("YYYY-MM-DD HH:mm:ss");
    // } else {
    //   isBookingNow.value = false;
    // }
    if (!rawPayload.reservation_time) {
      isBookingNow.value = true;
      reservationTime.value = dayjs()
        .add(2, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
    } else {
      const nowPlus2Hours = dayjs().add(2, "hour");
      if (dayjs(rawPayload.reservation_time).isBefore(nowPlus2Hours)) {
        reservationTime.value = nowPlus2Hours.format("YYYY-MM-DD HH:mm:ss");
      }
    }

    const cleanedPayload = Object.fromEntries(
      Object.entries(payload.value).filter(([_, v]) => v !== null && v !== "")
    );

    const res = await createWenchOrder(cleanedPayload, "wench");
    const localePath = useLocalePath();
    if (res && res.status) {
      navigateTo(localePath(`/cart-comfortable-service/${res?.data?.id}`));
      updateOrderId.value = res?.data?.id;
    } else {
      messageShowErr.value = res?.message || "حدث خطأ أثناء إنشاء الطلب";
    }
  } catch (error) {
    const data = error?.data || error?.response?.data;
    if (data?.message) {
      messageShowErr.value = data.message;
      showModal.value = true;
    } else if (data?.errors) {
      const firstError =
        Object.values(data.errors)?.[0]?.[0] || "حدث خطأ أثناء إنشاء الطلب";
      messageShowErr.value = firstError;
      showModal.value = true;
    } else {
      messageShowErr.value = error?.message || "حدث خطأ أثناء إنشاء الطلب";
      showModal.value = true;
    }
  } finally {
    isLoading.value = false;
  }
}

const onSubmit = async () => {
  const isValid = await schema.isValid({
    branchValue: branchValue.value,
    problem: problem.value,
    address: address.value,
  });
  if (updateOrderId.value) {
    let res = await updateWenchOrder(updateOrderId.value, payload.value);
    if (res && res.status) {
      // navigateTo(`/cart-comfortable-service/${res?.data?.id}`);
      navigateTo(LocalePath(`/cart-comfortable-service/${res?.data?.id}`));
    }
  } else {
    await createOrderWench();
  }
};
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
