<template>
  <div class="order-details">
    <div class="container">
      <div class="row">
        <div class="col-8 col-padding">
          <h1 data-v-8bcd5751 class="text-capitalize text title-pages">
            order Details
          </h1>

          <div class="order">
            <ButtonCard
              @click="navigateTo('/car-brand')"
              v-if="mycars.length <= 0"
              text-button="added your car"
            />
            <div v-if="mycars.length > 0" class="input-user position-relative d-flex flex-column">
              <label for="" class="label">my car</label>
              <select v-model="selectedCar" class="input-style">
                <option disabled selected>Ex : {{ user.name }}</option>
                <option v-for="car in mycars" :key="car.id" :value="car.id">
                  {{ car.car_type.title }}
                </option>
              </select>
              <div class="icon-shape position-absolute">
                <icons-order-iconunion />
              </div>
            </div>

            <div
              class="branch-date d-flex align-items-center justify-content-between gap-3"
            >
              <div
                class="input-barnch position-relative fix d-flex flex-column"
              >
                <label for="" class="label">branch</label>
                <select v-model="selectedBranchId" class="input-style">
                  <option disabled value="">Select Branch</option>
                  <option v-for="br in branches" :key="br.id" :value="br.id">
                    {{ br.title }}
                  </option>
                </select>
                <div class="icon-shape position-absolute">
                  <icons-order-iconunion />
                </div>
              </div>

              <div
                class="input-barnch position-relative fix d-flex flex-column"
              >
                <label for="" class="label">date</label>
                <select v-model="selectedDate" class="input-style">
                  <option disabled value="">Select Date & Time</option>
                  <template
                    v-for="dateObj in availableDates"
                    :key="dateObj.date"
                  >
                    <option
                      v-for="slot in dateObj.time_slots"
                      :key="dateObj.date + slot.time"
                      :value="{ date: dateObj.date, time: slot.time }"
                    >
                      {{ dateObj.date }} - {{ slot.time }}
                    </option>
                  </template>
                </select>
                <div class="icon-shape position-absolute">
                  <icons-order-iconunion />
                </div>
              </div>
            </div>

            <div class="details-issues d-flex flex-column">
              <label for="" class="label">details</label>
              <textarea
                name=""
                id=""
                class="textarea"
                placeholder="issues details"
                v-model="note"
              ></textarea>
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
                    <div class="">Upload from your device</div>
                    <div class="file-name">{{ fileName }}</div>
                  </label>
                </div>
              </div>
            </div>

            <div class="buttons-order d-flex justify-content-center gap-2">
              <button
                @click="navigateTo('/services')"
                class="additems text-capitalize label"
              >
                <i class="fa-solid fa-plus"></i>
                add another items
              </button>
              <button
                @click="UpdateOrderDetails"
                class="continue text-capitalize label button"
              >
                continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let dayjs = useDayjs();
let user = useCookie("user").value;
let selectedCar = useState("selectedCar", () => null);
let selectedBranchId = useState("selectedBranchId", () => null);
let selectedDate = useState("selectedDate", () => null);
let note = useState("note", () => "");
let myCart = ref([]);
let resCart = await useApi().getMyCart();
myCart.value = resCart?.data || [];

let mycars = ref([]);
let res = await useApi().getMycars();
mycars.value = res?.data || [];

let branches = ref([]);
let resBranshes = await useApi().getBranches();
branches.value = resBranshes?.data?.items;

let availableDates = ref([]);
watch(selectedBranchId, async (newId) => {
  if (newId) {
    // selectedDate.value = null;
    let resDate = await useApi().getAvailableTimes(newId);
    availableDates.value = resDate?.available_times;
  }
});

let route = useRoute();
let idCart = route.query.id;
let router = useRouter();

let fileName = useState("fileName", () => "");
let problemPhoto = useState("problemPhoto", () => null);
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    problemPhoto.value = file;
    fileName.value = file.name;
  }
  console.log(problemPhoto.value);
  console.log(fileName.value);
}
let UpdateOrderDetails = async () => {
  try {
    let reservationDateTime = null;

    if (selectedDate.value) {
      reservationDateTime = dayjs(
        `${selectedDate.value.date} ${selectedDate.value.time}`,
        "YYYY-MM-DD hh:mm A"
      ).format("YYYY-MM-DD HH:mm:ss");
    }

    let formData = new FormData();
    formData.append("branch_id", selectedBranchId.value);
    formData.append("reservation_time", reservationDateTime);
    formData.append("user_car_id", selectedCar.value);
    formData.append("customer_note", note.value);
    if (problemPhoto.value) {
      formData.append("images[]", problemPhoto.value);
    }

    let response = await useApi().updateCartDetails(idCart, formData);
    if (response && response.data) {
      // router.push({
      //   path: "/cart-update-details",
      //   query: { id: idCart },
      // });
      console.log(response)
    }
  } catch (err) {
    console.log(err);
  }
};
console.log("mycars", mycars.value);
</script>

<style scoped>
@import "@/assets/css/orderDetails.css";
</style>
