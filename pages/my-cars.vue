<template>
  <div>
    <ProfileDetails v-if="!IsNotRegister" />
    <div class="mycars-information">
      <div class="container">
        <NotRegister
          :IsNotRegitser="IsNotRegister"
          :message="$t('your cars Empty you must create account')"
        />
        <div class="row" v-if="skeleton">
          <SkeletonsCarSkeleton />
        </div>
        <div v-else class="row">
          <div class="col-md-8 col-padding">
            <GoPageArrow
              title="my cars"
              :showIcon="false"
              v-if="myCars.length === 0 && token"
            />

            <div class="cars margin-bottom-24px position-relative">
              <div
                class="car-box d-flex justify-content-between box-main"
                v-for="car in myCars"
                :key="car.id"
                @click="toggleEdit(car.id)"
              >
                <!-- car name && image -->
                <div class="car-detalis d-flex gap-2">
                  <div class="car-img z-index position-relative">
                    <img :src="car.car_type.image" :alt="car.car_type.title" />
                  </div>
                  <div class="car-name z-index position-relative">
                    <p>
                      {{ car.car_type.title }}
                      <span
                        class="p-color-fs ps-2 pe-2 rounded bg text-capitalize"
                        v-if="car.is_default"
                        style="background-color: var(--main-color)"
                      >
                        {{ $t("default") }}
                      </span>
                    </p>
                  </div>
                </div>

                <!-- icon toogle && delete -->
                <div
                  class="position-relative d-flex gap-4 align-items-center z-index"
                >
                  <div>
                    <PuplicIconDoted />
                  </div>

                  <div class="btn-details" @click.stop="goToCarDetails(car.id)">
                    <p v-if="loadingId !== car.id" class="fs text-danger">
                      {{ $t("car details") }}
                    </p>

                    <span
                      v-else
                      class="spinner-border spinner-border-sm text-warning"
                      role="status"
                    ></span>
                  </div>
                </div>

                <!-- car only id -->
                <div
                  v-if="activeCarId === car.id"
                  class="poup-edit text-center mb-3"
                >
                  <h6 class="text-capitalize mb-3">{{ $t("car model") }}</h6>

                  <!-- car toogle default -->
                  <div
                    class="default box-main-color box-btn d-flex align-items-center gap-2 justify-content-center mb-3"
                    :class="{ isDefault: car.is_default }"
                    @click.stop="setDefault(car.id)"
                  >
                    <input
                      class="set-default"
                      type="checkbox"
                      :id="`car-${car.id}`"
                      :checked="car.is_default"
                      :disabled="car.is_default"
                      @click.stop
                    />
                    <label
                      :for="`car-${car.id}`"
                      class="text-capitalize label-cursor"
                    >
                      {{ $t("set as default") }}
                    </label>
                  </div>

                  <!-- delete -->
                  <div
                    @click.stop="deleted(car.id)"
                    class="delete box-btn d-flex align-items-center gap-2 justify-content-center"
                  >
                    <div>
                      <Trash class="trash-icon" />
                    </div>
                    <h6 class="text-capitalize">{{ $t("delete") }}</h6>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="myCars.length === 0 && token"
              class="empty-message text-center p-4 mb-2"
            >
              <p class="text-muted fs-5">
                {{ $t("There are no cars added currently") }}
              </p>
              <p class="text-secondary">
                {{ $t("Add your car to display here") }}
              </p>
            </div>

            <div
              v-if="token"
              class="button-save border-radius-36px width-height"
              @click="goToAddCar"
            >
              <button class="text-capitalize">
                <!-- <i class="fa-solid fa-plus"></i> -->
                <span v-if="!loadingIdAddCar">{{ $t("add new car") }}</span>
                <span v-else class="spinner-border spinner-border-sm text-success" role="status"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getMycars } = useApi();
const skeleton = ref(true);
const token = useCookie("token");
let myCars = ref([]);
let IsNotRegister = ref(false);
const timeEndCach = 12 * 60 * 60 * 1000;

async function loadMyCars() {
  const currentTime = Date.now();
  if (!token.value) {
    IsNotRegister.value = true;
    skeleton.value = false;
    return;
  }

  const cacheData = localStorage.getItem("myCarsCache");
  if (cacheData) {
    const parsedData = JSON.parse(cacheData);
    if (currentTime - parsedData.timestamp < timeEndCach) {
      myCars.value = parsedData.cars;
      skeleton.value = false;
    }
  }

  const res = await getMycars();
  myCars.value = res?.data || [];
  skeleton.value = false;

  if (res && res.status === false && res.message === "unauthenticated") {
    IsNotRegister.value = true;
  }

  localStorage.setItem(
    "myCarsCache",
    JSON.stringify({
      cars: myCars.value,
      timestamp: currentTime,
    })
  );
}
onMounted(() => {
  loadMyCars();
});

let activeCarId = ref(null);
function toggleEdit(carId) {
  activeCarId.value = activeCarId.value === carId ? null : carId;
}

async function deleted(id) {
  try {
    let carIsDefault = myCars.value.find((car) => car.id === id);

    let resDeleted = await useApi().deleteCar(id);
    if (resDeleted?.status) {
      myCars.value = myCars.value.filter((carid) => carid.id !== id);
      if (carIsDefault?.is_default && myCars.value.length > 0) {
        let newDefaultCar = myCars.value[0];
        let resDefault = await useApi().changeCarToDefault(newDefaultCar.id);
        if (resDefault?.status) {
          let updatedCars = await useApi().getMycars();
          myCars.value = updatedCars?.data || [];
        }
      }
    }
  } catch (err) {
    console.log("Error fetching");
  }
}

async function setDefault(carId) {
  try {
    let res = await useApi().changeCarToDefault(carId);
    if (res?.status) {
      let updatedCars = await useApi().getMycars();
      myCars.value = updatedCars?.data || [];
    }
  } catch (err) {
    console.error("فشل تعيين السيارة كافتراضية");
  }
}

const router = useRouter();
const localePath = useLocalePath();
const loadingId = ref(null);
const goToCarDetails = (id) => {
  loadingId.value = id;
  router.push(localePath(`/car-details/${id}`));
};
const loadingIdAddCar = ref(false);
const goToAddCar = () => {
  loadingIdAddCar.value = true;
 navigateTo(localePath('car-brand'))
};
</script>

<style scoped>
@import "@/assets/css/mycars.css";
.fs {
  font-size: 12px;
  transition: all 0.3s;
}
.fs:hover {
  background-color: var(--main-color);
  padding: 0px 7px 0px 7px;
  border-radius: 10px;
}
</style>
