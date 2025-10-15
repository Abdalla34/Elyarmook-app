<template>
  <div>
    <ProfileDetails v-if="user" />
    <div class="personal-information">
      <div class="container">
        <NotRegister
          :IsNotRegitser="!user"
          message="not Information you must create account"
        />
        <div class="row">
          <div class="col-8 col-padding">
            <div
              v-if="user && !editDone"
              class="profiel-img d-flex justify-content-between align-items-center margin-bottom-24px"
            >
              <h1 class="margin-bottom-24px text-capitalize personal mb-0">
                personal information
              </h1>
              <!-- <div class="box-img position-relative text-center">
                <img disabled src="/Ellipse 2.png" alt="" class="img-profile" />
                <i class="fa-solid fa-user fa-2x"></i>
              </div> -->
            </div>
          </div>

          <div class="col-8 col-padding margin-bottom-24px" v-if="!editDone">
            <div v-if="user" class="inputs">
              <div class="row-inputs">
                <div class="input d-flex flex-column">
                  <label class="label">first name</label>
                  <input v-model="user.first_name" type="text" disabled />
                </div>

                <div class="input d-flex flex-column">
                  <label class="label">last name</label>
                  <input type="text" disabled v-model="user.last_name" />
                </div>
              </div>

              <div class="row-inputs">
                <div class="input d-flex flex-column">
                  <label class="label">phone Number</label>
                  <input type="text" disabled v-model="user.phone" />
                </div>
              </div>

              <div class="row-inputs" v-if="user.area && user.city">
                <div class="input d-flex flex-column">
                  <label class="label" for="area">area</label>
                  <input type="text" disabled v-model="user.area.title" />
                </div>

                <div class="input d-flex flex-column">
                  <label class="label" for="city">city</label>
                  <input type="text" disabled v-model="user.city.title" />
                </div>
              </div>
            </div>
          </div>
          <!-- edit image profile -->
          <div class="col-8 col-padding">
            <div
              v-if="user && editDone"
              class="profiel-img d-flex justify-content-between align-items-center margin-bottom-24px"
            >
              <h1 class="margin-bottom-24px text-capitalize personal mb-0">
                personal information
              </h1>
              <div class="box-img position-relative text-center">
                <img
                  @click="ChangeProfile"
                  src="/Ellipse 2.png"
                  alt="profile"
                  class="img-profile"
                />
                <div
                  class="change-profile position-absolute"
                  :class="{ 'd-block': profileImg }"
                >
                  <h6 class="h6 text-capitalize">profile picture</h6>
                  <div
                    class="change box-design d-flex gap-2 justify-content-center align-items-center"
                  >
                    <PresonalIconsChange />

                    <p class="mb-0 text-capitalize paragraph-change font-p">
                      change
                    </p>
                  </div>
                  <div
                    class="delete box-design d-flex gap-2 justify-content-center align-items-center"
                  >
                    <PresonalIconsIconDeleted />

                    <p class="mb-0 text-capitalize font-p color-delete">
                      delete
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-8 col-padding margin-bottom-24px" v-if="editDone">
            <div v-if="user" class="inputs">
              <div class="row-inputs">
                <div class="input d-flex flex-column">
                  <label class="label">first name</label>
                  <input
                    v-model="user.first_name"
                    type="text"
                    placeholder="your name"
                  />
                </div>

                <div class="input d-flex flex-column">
                  <label class="label">last name</label>
                  <input
                    type="text"
                    placeholder="your name"
                    v-model="user.last_name"
                  />
                </div>
              </div>

              <div class="row-inputs">
                <div class="input d-flex flex-column">
                  <label class="label">phone Number</label>
                  <input
                    type="text"
                    placeholder="your phone"
                    v-model="user.phone"
                  />
                </div>
              </div>

              <div class="row-inputs">
                <div class="input d-flex flex-column">
                  <label class="label" for="area">area</label>
                  <select id="area" class="select" v-model="areaId">
                    <option value="" disabled>Select area</option>
                    <option
                      v-for="areaItem in allAreas"
                      :key="areaItem.id"
                      :value="areaItem.id"
                    >
                      {{ areaItem.title }}
                    </option>
                  </select>
                </div>

                <div class="input d-flex flex-column">
                  <label class="label" for="city">city</label>
                  <select id="city" class="select" v-model="cityId">
                    <option value="" disabled>Select city</option>
                    <option
                      v-for="cityItem in allCities"
                      :key="cityItem.id"
                      :value="cityItem.id"
                    >
                      {{ cityItem.title }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div
              @click="editProfile"
              class="width-height border-radius-36px Edit"
            >
              <button class="text-capitalize">continue</button>
            </div>
          </div>
        </div>

        <div v-if="user && !editDone">
          <div @click="toEdit" class="width-height border-radius-36px Edit">
            <button class="text-capitalize">edit profile</button>
          </div>

          <div
            v-if="showmodalsignOut"
            class="modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
            @click="test = false"
          >
            >
            <div
              class="modal-content position-relative p-4 bg-white rounded"
              @click.stop
            >
              <button
                type="button"
                class="btn-close position-absolute top-0 end-0 m-3"
                aria-label="Close"
                @click="showmodalsignOut = false"
              ></button>

              <h3 class="label text-center">sign out from application ?</h3>
              <p class="p-color-fs text-capitalize text-center mt-3">
                are you sure to exit application ?
              </p>
              <button
                @click.prevent="logOut"
                type="button"
                class="btn btn-danger mt-3"
              >
                sign out
              </button>
            </div>
          </div>

          <div
            @click="showmodalsignOut = true"
            class="log-out width-height border-radius-36px"
          >
            <button class="text-capitalize">log out</button>
          </div>

          <div
            class="button-delete border-radius-36px width-height d-flex justify-content-center margin-bottom-90px"
          >
            <button
              @click="deleteAccount(user)"
              class="text-capitalize color-but d-flex align-items-center gap-3"
            >
              <Trash />
              <span>delete my account</span>
            </button>
          </div>
        </div>
      </div>
      <div v-if="showDeactivateModal" class="modal-overlay">
        <div class="modal-content">
          <h3 class="mb-4">Why are you leaving us?</h3>
          <form @submit.prevent="confirmDelete">
            <div class="deactivate-reasons">
              <div
                v-for="reason in resDeactivated?.data"
                :key="reason.id"
                class="reason-item"
              >
                <input
                  type="radio"
                  :id="reason.id"
                  :value="reason.id"
                  v-model="selectedReason"
                  name="deactivateReason"
                />
                <label :for="reason.id">{{ reason.title }}</label>
              </div>
            </div>
            <div class="modal-actions">
              <button
                type="button"
                class="btn-cancel me-2"
                @click="showDeactivateModal = false"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn-confirm"
                :disabled="!selectedReason"
              >
                Confirm Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <LoadingSpinner :is-loading-otp="isLoading" />
  </div>
</template>

<script setup>
const isLoading = ref(false);
const test = ref(true);
let router = useRouter();
let token = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });

const cookie = useCookie("user", { maxAge: 365 * 24 * 60 * 60 });
let user = ref(cookie.value);

let editDone = ref(false);
let profileImg = ref(false);
function ChangeProfile() {
  profileImg.value = !profileImg.value;
}

const showmodalsignOut = ref(false);
let logOut = async () => {
  try {
    isLoading.value = true;
    await useApi().logout();
    token.value = null;
    cookie.value = null;
    await useApi().resetToken();
    await useAddToCart().initCartFromLocalStorage();
    router.push("/");
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

let allAreas = ref([]);
let allCities = ref([]);
let countryId = ref(null);
let areaId = ref(null);
let cityId = ref(null);

async function toEdit() {
  editDone.value = true;
  let countries = await useApi().getCountries();
  countryId.value = countries?.data?.[0]?.id;

  let responseArea = await useApi().getAreasByCountry(countryId.value);
  allAreas.value = responseArea?.data;
  areaId.value = allAreas.value?.[0]?.id;
}

watch(areaId, async (newAreaId) => {
  if (newAreaId) {
    let responseCity = await useApi().getCitiesByArea(areaId.value);
    allCities.value = responseCity?.data;
    cityId.value = allCities.value?.[0]?.id;
  }
});

let editProfile = async () => {
  try {
    let res = await useApi().updateUserProfile({
      first_name: user.value.first_name,
      last_name: user.value.last_name,
      phone: user.value.phone,
      city_id: cityId.value,
      area_id: areaId.value,
      avatar: user.avatar,
    });

    if (res && res.status === false && res.message === "Unauthenticated") {
      return navigateTo("/createaccount");
    }

    cookie.value = res.data.user;
    user.value = res.data.user;

    areaId.value = res.data.user.area_id;
    cityId.value = res.data.user.city_id;

    editDone.value = false;
  } catch (err) {
    console.error(err);
  }
};

const resDeactivated = await useApi().getDeactivatedReasons();

const showDeactivateModal = ref(false);
const selectedReason = ref(null);

const deleteAccount = async () => {
  showDeactivateModal.value = true;
};

const confirmDelete = async () => {
  try {
    if (!selectedReason.value) return;
    const res = await useApi().deleteaccount(selectedReason.value, "web");
    if (res?.status === false) {
      if (res.message === "Unauthenticated") {
        token.value = null;
        cookie.value = null;
        return navigateTo("/createaccount");
      }
    }
    token.value = null;
    cookie.value = null;
    user.value = null;
    showDeactivateModal.value = false;
    router.push("/");
  } catch (err) {
    console.error("Error deleting account:", err);
  }
};
</script>

<style>
@import "@/assets/css/personalInformation.css";
</style>
