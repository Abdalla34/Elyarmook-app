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
                <div class="car-detalis d-flex gap-2">
                  <div class="car-img z-index position-relative">
                    <img :src="car.car_type.image" :alt="car.car_type.title" />
                  </div>
                  <div class="car-name z-index position-relative">
                    <p>{{ car.car_type.title }}</p>
                  </div>
                </div>
                <div class="position-relative z-index">
                  <svg
                    width="14"
                    height="4"
                    viewBox="0 0 14 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.66602 2.00065C1.66602 2.17746 1.73625 2.34703 1.86128 2.47206C1.9863 2.59708 2.15587 2.66732 2.33268 2.66732C2.50949 2.66732 2.67906 2.59708 2.80409 2.47206C2.92911 2.34703 2.99935 2.17746 2.99935 2.00065C2.99935 1.82384 2.92911 1.65427 2.80409 1.52925C2.67906 1.40422 2.50949 1.33398 2.33268 1.33398C2.15587 1.33398 1.9863 1.40422 1.86128 1.52925C1.73625 1.65427 1.66602 1.82384 1.66602 2.00065ZM6.33268 2.00065C6.33268 2.17746 6.40292 2.34703 6.52794 2.47206C6.65297 2.59708 6.82254 2.66732 6.99935 2.66732C7.17616 2.66732 7.34573 2.59708 7.47075 2.47206C7.59578 2.34703 7.66602 2.17746 7.66602 2.00065C7.66602 1.82384 7.59578 1.65427 7.47075 1.52925C7.34573 1.40422 7.17616 1.33398 6.99935 1.33398C6.82254 1.33398 6.65297 1.40422 6.52794 1.52925C6.40292 1.65427 6.33268 1.82384 6.33268 2.00065ZM10.9993 2.00065C10.9993 2.17746 11.0696 2.34703 11.1946 2.47206C11.3196 2.59708 11.4892 2.66732 11.666 2.66732C11.8428 2.66732 12.0124 2.59708 12.1374 2.47206C12.2624 2.34703 12.3327 2.17746 12.3327 2.00065C12.3327 1.82384 12.2624 1.65427 12.1374 1.52925C12.0124 1.40422 11.8428 1.33398 11.666 1.33398C11.4892 1.33398 11.3196 1.40422 11.1946 1.52925C11.0696 1.65427 10.9993 1.82384 10.9993 2.00065Z"
                      stroke="#939393"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div
                  v-if="activeCarId === car.id"
                  class="poup-edit text-center mb-3"
                >
                  <h6 class="text-capitalize mb-3">car model</h6>

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

                  <div
                    @click="deleted(car.id)"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let token = useCookie("token").value;
let myCars = ref([]);
let IsNotRegitser = ref(false);

if (!token) {
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
      console.log("car is Deleted");
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

console.log(myCars);
</script>

<style scoped>
@import "@/assets/css/mycars.css";
</style>
