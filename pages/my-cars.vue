<template>
  <div>
    <ProfileDetails v-if="!IsNotRegitser" />
    <div class="mycars-information">
      <div class="container">
        <NotRegister
          :IsNotRegitser="IsNotRegitser"
          message="your cars Empty you must create account "
        />
        <div class="row">
          <div class="col-8 col-padding">
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
                    <p>{{ car.car_type.title }}</p>
                  </div>
                </div>

                <!-- icon toogle && delete -->
                <div
                  class="position-relative d-flex gap-4 align-items-center z-index"
                >
                  <div>
                    <PuplicIconDoted />
                  </div>
                  <div @click.stop="getCarDetails(car.id)" class="btn-details">
                    <p class="fs text-danger">show car details</p>
                  </div>
                </div>

                <!-- car only id -->
                <div
                  v-if="activeCarId === car.id"
                  class="poup-edit text-center mb-3"
                >
                  <h6 class="text-capitalize mb-3">car model</h6>

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
                      set as default
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
                    <h6 class="text-capitalize">delete</h6>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="myCars.length === 0 && token"
              class="empty-message text-center p-4 mb-2"
            >
              <p class="text-muted fs-5">🚗 لا توجد سيارات مضافة حاليًا</p>
              <p class="text-secondary">قم بإضافة سيارتك لعرضها هنا.</p>
            </div>

            <div
              v-if="token"
              class="button-save border-radius-36px width-height margin-bottom-287px"
              @click="navigateTo('car-brand')"
            >
              <button class="text-capitalize">
                <i class="fa-solid fa-plus"></i>
                add new car
              </button>
            </div>

            <!-- <div>
              <div
                v-if="!guest"
                class="button-save border-radius-36px width-height margin-bottom-287px"
                @click="navigateTo('car-brand')"
              >
                <button class="text-capitalize">
                  <i class="fa-solid fa-plus"></i>
                  add new car
                </button>
              </div>
              <div class="" v-else>
                <ButtonCard
                  text-button="go to home"
                  @click="navigateTo('/order-update-details')"
                />
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let token = useCookie("token");
let myCars = ref([]);
let IsNotRegitser = ref(false);

if (!token.value) {
  IsNotRegitser.value = true;
} else {
  let res = await useApi().getMycars();
  myCars.value = res?.data;
  if (res && res.status === false && res.message === "unauthenticated") {
    IsNotRegitser.value = true;
  }
}

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
    console.log(err);
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
    console.error("فشل تعيين السيارة كافتراضية", err);
  }
}
const router = useRouter();
const getCarDetails = async (id) => {
  router.push(`/car-details/${id}`);
};
function handleClickOutside(e) {
  if (!e.target.closest(".car-box")) {
    activeCarId.value = null;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
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
