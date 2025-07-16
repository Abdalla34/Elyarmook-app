<template>
  <div class="personal-information">
    <div class="container">
      <div class="row">
        <div class="col-8 col-padding">
          <div
            class="profiel-img d-flex justify-content-between align-items-center margin-bottom-24px"
          >
            <h1 class="margin-bottom-24px text-capitalize personal mb-0">
              register information
            </h1>
            <div class="box-img position-relative text-center">
              <img
                @click="ChangeProfile"
                src="/Ellipse 2.png"
                alt=""
                class="img-profile"
              />
            </div>
          </div>
        </div>

        <div class="col-8 col-padding margin-bottom-24px">
          <form @submit.prevent="onSubmit">
            <div class="inputs">
              <div class="row-inputs">
                <div class="input d-flex flex-column">
                  <label class="label">first name</label>
                  <input
                    type="text"
                    placeholder="your name"
                    v-model="firstName"
                    class="text-capitalize"
                  />
                  <span
                    class="text-danger text-capitalize mt-2"
                    v-if="errors.firstName"
                    >{{ errors.firstName }}</span
                  >
                </div>

                <div class="input d-flex flex-column">
                  <label class="label">last name</label>
                  <input
                    type="text"
                    placeholder="your name"
                    v-model="lastName"
                    class="text-capitalize"
                  />
                  <span
                    class="text-danger text-capitalize mt-2"
                    v-if="errors.lastName"
                    >{{ errors.lastName }}</span
                  >
                </div>
              </div>

              <div class="row-inputs">
                <div class="input d-flex flex-column">
                  <label class="label">phone Number</label>
                  <input
                    type="text"
                    placeholder="your phone"
                    v-model="phoneNumber"
                  />
                  <span
                    class="text-danger text-capitalize mt-2"
                    v-if="errors.phoneNumber"
                    >{{ errors.phoneNumber }}</span
                  >
                </div>
              </div>

              <div class="row-inputs">
                <div class="input d-flex flex-column">
                  <label class="label" for="area">area</label>
                  <select id="area" class="select" v-model="area">
                    <option value="" disabled>Select area</option>
                    <option
                      v-for="areaItem in allAreas"
                      :key="areaItem.id"
                      :value="areaItem.id"
                    >
                      {{ areaItem.title }}
                    </option>
                  </select>

                  <span
                    class="text-danger text-capitalize mt-2"
                    v-if="errors.area"
                    >{{ errors.area }}</span
                  >
                </div>

                <div class="input d-flex flex-column">
                  <label class="label" for="city">city</label>
                  <select id="city" class="select" v-model="city">
                    <option value="" disabled>Select city</option>
                    <option
                      v-for="cityItem in allCities"
                      :key="cityItem.id"
                      :value="cityItem.id"
                    >
                      {{ cityItem.title }}
                    </option>
                  </select>
                  <span
                    class="text-danger text-capitalize mt-2"
                    v-if="errors.city"
                    >{{ errors.city }}</span
                  >
                </div>
              </div>
            </div>

            <button
              class="text-capitalize text-center btn-register button border-radius-36px d-flex justify-content-center"
              type="submit"
            >
              save
            </button>
          </form>

          <div
            class="button-delete border-radius-36px width-height d-flex justify-content-center margin-bottom-90px mt-3"
          >
            <button
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
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

let allAreas = ref([]);
let countryId = ref(null);
let allCities = ref([]);

const schema = yup.object({
  firstName: yup.string().required("please enter your name").min(3),
  lastName: yup.string().required("please enter your last name").min(3),
  phoneNumber: yup
    .string()
    .required("please enter your phone number")
    .min(11)
    .matches(/^\d+$/, "digits only"),
  city: yup.string().required("please enter your city"),
  area: yup.string().required("please enter your area"),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: firstName } = useField("firstName");
const { value: lastName } = useField("lastName");
const { value: phoneNumber } = useField("phoneNumber");
const { value: area } = useField("area");
const { value: city } = useField("city");

onMounted(async () => {
  let countries = await useApi().getCountries();
  countryId.value = countries?.data?.[0]?.id;

  if (countryId.value) {
    let res = await useApi().getAreasByCountry(countryId.value);
    allAreas.value = res?.data || [];
  }
});

watch(area, async (newAreaId) => {
  if (newAreaId) {
    let res = await useApi().getCitiesByArea(newAreaId);
    allCities.value = res?.data || [];
  } else {
    allCities.value = [];
  }
});

let router = useRouter();
let route = useRoute();
let phone = route.query.phone;
let registered = route.query.registered === "true";
let otp = route.query.otp_code;

let onSubmit = handleSubmit(async (values) => {
  let res = await useApi().loginOrRegister({
    first_name: values.firstName,
    last_name: values.lastName,
    area_id: values.area,
    city_id: values.city,
    phone: phone,
    registered: registered,
    otp_code: otp,
  });

  if (res && res.status && res.data.token && res.data.user) {
    const token = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });
    const user = useCookie("user", { maxAge: 365 * 24 * 60 * 60 });
    token.value = res.data.token;
    user.value = JSON.stringify(res.data.user);
  }
  router.push("/services");
});
</script>

<style>
@import "@/assets/css/personalInformation.css";
</style>
