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
              v-if="user"
              class="profiel-img d-flex justify-content-between align-items-center margin-bottom-24px"
            >
              <h1 class="margin-bottom-24px text-capitalize personal mb-0">
                personal information
              </h1>
              <div class="box-img position-relative text-center">
                <img
                  @click="ChangeProfile"
                  src="/Ellipse 2.png"
                  alt=""
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

              <div class="row-inputs">
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

          <div @click="logOut" class="log-out width-height border-radius-36px">
            <button class="text-capitalize">log out</button>
          </div>

          <div
            class="button-delete border-radius-36px width-height d-flex justify-content-center margin-bottom-90px"
          >
            <button
              @click="deleteaccount(user)"
              class="text-capitalize color-but d-flex align-items-center gap-3"
            >
              <Trash />
              <span>delete my account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let router = useRouter();
let token = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });

const cookie = useCookie("user", { maxAge: 365 * 24 * 60 * 60 });
const user = computed(() => cookie.value);

let editDone = ref(false);
let profileImg = ref(false);
function ChangeProfile() {
  profileImg.value = !profileImg.value;
}
let logOut = async () => {
  await useApi().logout();
  token.value = null;
  cookie.value = null;
  router.push("/");
};

let allAreas = ref([]);
let allCities = ref([]);
let countryId = ref(null);
let areaId = ref(null);
let cityId = ref(null);

async function toEdit() {
  editDone.value = true;
  let countries = await useApi().getCountries();
  console.log(countries);
  countryId.value = countries?.data?.[0]?.id;
  console.log("countriesId ", countryId);

  let responseArea = await useApi().getAreasByCountry(countryId.value);
  allAreas.value = responseArea?.data;
  areaId.value = allAreas.value?.[0]?.id;
  console.log("responseArea", allAreas);
}

watch(areaId, async (newAreaId) => {
  if (newAreaId) {
    let responseCity = await useApi().getCitiesByArea(areaId.value);
    allCities.value = responseCity?.data;
    cityId.value = allCities.value?.[0]?.id;
    console.log("responseCity", allCities);
  }
});

let editProfile = async () => {
  try {
    let res = await useApi().updateUserProfile({
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      city_id: cityId.value,
    });

    if (res && res.status === false && res.message === "Unauthenticated") {
      return navigateTo("/createaccount");
    }

    cookie.value = res?.data?.user;

    areaId.value = res?.data?.user?.area_id;
    cityId.value = res?.data?.user?.city_id;

    editDone.value = false;
  } catch (err) {
    console.error(err);
  }
};
</script>

<style>
@import "@/assets/css/personalInformation.css";

.msg-error {
  background-color: white;
  box-shadow: 0px 0px 20px 0px #0000000a;
  border-radius: 30px;
  padding: 20px;
  text-align: center;
  width: 100%;
  margin: auto;
  margin-bottom: 300px;
  margin-top: 100px;
}
.goAcc {
  border: none;
  background-color: var(--main-color);
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 20px;
  cursor: pointer;
  font-family: var(--font-main);
  font-weight: 500;
  font-size: 16px;
  color: #040505;
}
.goAcc:hover {
  border: none;
  background-color: var(--main-color);
  box-shadow: 0px 0px 20px 0px var(--main-color);
}

.log-out {
  background-color: aliceblue;
}

.button-delete {
  transition: all 0.3s ease-in-out;
}
.button-delete:hover {
  background-color: #eb5757;
}
.button-delete:hover button {
  color: white;
}
.button-delete:hover svg path {
  stroke: white;
}
.Edit {
  background-color: var(--main-color);
}
</style>
