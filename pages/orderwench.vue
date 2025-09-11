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

          <!-- select details time -->
          <div class="select-details-time box-car p-3">
            <h5 class="label mb-3">اختر تفاصيل الوقت</h5>

            <div class="time-options mt-3">
              <div class="time-option-group">
                <!-- urgent -->
                <label
                  class="time-option d-flex gap-2 align-items-center p-2 rounded mb-2"
                  :class="{ active: selectedTime === 'urgent' }"
                >
                  <div class="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="timeOption"
                      value="urgent"
                      v-model="selectedTime"
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
                  <i class="fa-solid fa-circle-info me-1"></i>
                  ملاحظة: عند اختيار مستعجل سوف يرتفع سعر النقل 20%
                </div>

                <!-- normal -->
                <label
                  class="time-option d-flex align-items-center gap-3 p-2 rounded"
                  :class="{ active: selectedTime === 'normal' }"
                >
                  <input
                    type="radio"
                    name="timeOption"
                    value="normal"
                    v-model="selectedTime"
                    class="custom-radio"
                    :disabled="branchValue === ''"
                  />
                  <span class="option-text">normal</span>
                </label>
              </div>
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
// const isLoadingOtp = ref(false);
const branches = ref([]);
const branchValue = ref("");
const typeDelivery = ref("");
const problem = ref("");
const mycars = ref([]);
const reservationTime = ref(null);
const rescar = await useApi().getMycars();
mycars.value = rescar?.data || [];
const getProblems = ref([]);
const selectedTime = ref("");

const defaultCar = computed(
  () => mycars.value.find((car) => car.is_default) || null
);

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
  lat: currentLatLng.value.lat,
  lng: currentLatLng.value.lng,
  user_car_id: defaultCar.value ? defaultCar.value.id : null,
  address_return: addressReturn.value || null,
  lat_return: returnLatLng.value.lat || null,
  lng_return: returnLatLng.value.lng || null,
}));

function createOrderWench(type) {
  // return useWenchServices().createWenchOrder(payload, type);
  console.log(payload.value);
}
</script>

<style scoped>
@import "@/assets/css/orderDetails.css";
@import "@/assets/css/orderWench.css";
</style>
