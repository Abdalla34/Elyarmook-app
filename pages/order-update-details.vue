<template>
  <div class="order-details">
    <div class="container">
      <!-- <div class="row justify-content-center" v-if="isSkeleton">
       
      </div> -->
      <div class="row">
        <NotRegister
          :IsNotRegitser="msgError"
          message="your orders is Empty you must create account"
        />

        <div class="col-md-8 col-padding">
          <h1 data-v-8bcd5751 class="text-capitalize text title-pages">
            {{ $t("Order Details") }}
          </h1>

          <div class="order">
            <ButtonCard
              @click="handleClick('/car-brand')"
              v-if="mycars.length <= 0"
              :text-button="isloadBtn ? $t('loading...') : $t('added your car')"
            />
            <!-- car -->
            <div
              v-if="mycars.length > 0"
              class="input-user position-relative d-flex flex-column"
            >
              <label for="" class="label">{{ $t("my cars") }}</label>
              <select v-model="carValue" class="input-style">
                <option disabled value="">Ex : {{ user.name }}</option>
                <option v-for="car in mycars" :key="car.id" :value="car.id">
                  {{ car.car_type.title }}
                </option>
              </select>
              <div class="icon-shape position-absolute">
                <icons-order-iconunion />
              </div>
            </div>
            <!-- bracnh && time -->
            <div
              class="branch-date d-flex align-items-center justify-content-between gap-3"
            >
              <div
                class="input-barnch position-relative fix d-flex flex-column"
              >
                <label for="" class="label">{{ $t("branch") }}</label>
                <select v-model="branchValue" class="input-style">
                  <option disabled value="">{{ $t("Select Branch") }}</option>
                  <option v-for="br in branches" :key="br.id" :value="br.id">
                    {{ br.title }}
                  </option>
                </select>
                <div class="icon-shape position-absolute">
                  <icons-order-iconunion />
                </div>
              </div>
              <!-- time -->
              <div
                class="input-barnch position-relative fix d-flex flex-column"
              >
                <label for="" class="label">{{ $t("date") }}</label>
                <select v-model="dateValue" class="input-style">
                  <option disabled value="">
                    {{ $t("Select Date & Time") }}
                  </option>
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
              <label for="" class="label">{{ $t("details") }}</label>
              <textarea
                name=""
                id=""
                class="textarea"
                :placeholder="$t('issues details')"
                v-model="note"
              ></textarea>
            </div>

            <div class="problem-photo">
              <label class="label">{{ $t("problem photo") }}</label>
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
                    <div class="">{{ $t("Upload from your device") }}</div>
                    <div class="file-name">{{ fileName }}</div>
                  </label>
                </div>
              </div>
            </div>

            <form
              @submit.prevent="onSubmit"
              class="buttons-order d-flex justify-content-center gap-2"
            >
              <button
                @click="navigateTo('/services')"
                class="additems text-capitalize label"
              >
                <i class="fa-solid fa-plus"></i>
                {{ $t("add another items") }}
              </button>
              <button
                type="submit"
                class="continue text-capitalize label button"
                :disabled="!carValue || !branchValue || !dateValue"
              >
                {{ $t("continue") }}
              </button>
            </form>
          </div>
        </div>
      </div>
      <!-- load component -->
      <LoadingSpinner :is-loading-otp="isLoadingOtp" />
    </div>
    <div class=""></div>
  </div>
</template>

<script setup>
const { getMycars, getBranches, getAvailableTimes, updateCartDetails } =
  useApi();
const carValue = useState("carValue", () => {});
const branchValue = useState("branchValue", () => "");
const dateValue = useState("dateValue", () => {});
const note = useState("note", () => "");
const isLoadingOtp = ref(true);

const { handleClick, isloadBtn } = loadBtn();

const dayjs = useDayjs();
const user = useCookie("user").value;
const route = useRoute();
const idRoute = route.query.id;
const msgError = ref(false);

const mycars = ref([]);

const branches = ref([]);

const availableDates = ref([]);
watch(branchValue, async (newId) => {
  if (newId) {
    let resDate = await getAvailableTimes(newId);
    availableDates.value = resDate?.available_times;
  }
});

const router = useRouter();

const fileName = useState("fileName", () => "");
const problemPhoto = useState("problemPhoto", () => null);

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    problemPhoto.value = file;
    fileName.value = file.name;
  }
}

const localePath = useLocalePath();
const onSubmit = async () => {
  isLoadingOtp.value = true;
  try {
    let reservationDateTime = null;

    if (dateValue.value) {
      reservationDateTime = dayjs(
        `${dateValue.value.date} ${dateValue.value.time}`,
        "YYYY-MM-DD hh:mm A"
      ).format("YYYY-MM-DD HH:mm:ss");
    }

    let formData = new FormData();
    formData.append("branch_id", branchValue.value);
    formData.append("reservation_time", reservationDateTime);
    formData.append("user_car_id", carValue.value);
    formData.append("customer_note", note.value);
    if (problemPhoto.value) {
      formData.append("images[]", problemPhoto.value);
    }

    await updateCartDetails(idRoute, formData);
    router.push({
      path: localePath("/cart-update-details"),
      query: { id: idRoute },
    });
  } catch (err) {
    console.log('Error fetching');
  } finally {
    isLoadingOtp.value = false;
  }
};

onMounted(async () => {
  const res = await getMycars();
  mycars.value = res?.data || [];
  const resBranshes = await getBranches();
  branches.value = resBranshes?.data?.items;
  isLoadingOtp.value = false;
  if (branchValue.value) {
    let resDate = await getAvailableTimes(branchValue.value);
    availableDates.value = resDate?.available_times;
  }
});
</script>

<style scoped>
@import "@/assets/css/orderDetails.css";
.continue:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
