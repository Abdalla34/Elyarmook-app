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
                  />
                  <span v-if="errors.firstName">{{ errors.firstName }}</span>
                </div>

                <div class="input d-flex flex-column">
                  <label class="label">last name</label>
                  <input
                    type="text"
                    placeholder="your name"
                    v-model="lastName"
                  />
                  <span v-if="errors.lastName">{{ errors.lastName }}</span>
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
                  <span v-if="errors.phoneNumber">{{
                    errors.phoneNumber
                  }}</span>
                </div>
              </div>

              <div class="row-inputs">
                <div class="input d-flex flex-column">
                  <label class="label" for="area">area</label>
                  <select id="area" class="select" v-model="area">
                    <option value="" disabled selected class="option">
                      Select area
                    </option>
                    <option
                      v-for="areaItem in areas"
                      :key="areaItem.id"
                      :value="areaItem"
                      class="option"
                    >
                      {{ areaItem.title }}
                    </option>
                  </select>
                  <span v-if="errors.area">{{ errors.area }}</span>
                </div>

                <div class="input d-flex flex-column">
                  <label class="label" for="city">city</label>
                  <select id="city" class="select" v-model="city">
                    <option value="" disabled selected class="option">
                      Select city
                    </option>
                    <option
                      v-for="cityItem in cities"
                      :key="cityItem.id"
                      :value="cityItem"
                    >
                      {{ cityItem.title }}
                    </option>
                  </select>
                  <span v-if="errors.city">{{ errors.city }}</span>
                </div>
              </div>
              
            </div>

            <div class="text-center btn-register button border-radius-36px">
              <button class="text-capitalize" type="submit">save</button>
            </div>
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


const schema = yup.object({
  firstName: yup.string().required("please enter your name").min(3),
  lastName: yup.string().required("please enter your last name").min(3),
  phoneNumber: yup
    .string()
    .required("please enter your phone number")
    .min(11)
    .matches(/^\d+$/, "digits only"),
  area: yup.object().required("please select your area"),
  city: yup.object().required("please select your city"),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: firstName } = useField("firstName");
const { value: lastName } = useField("lastName");
const { value: phoneNumber } = useField("phoneNumber");
const { value: area } = useField("area");
const { value: city } = useField("city");
</script>

<style>
@import "@/assets/css/personalInformation.css";
.select {
  border-radius: 12px;
  padding: 12px 16px;
  border: 1px solid #f1f3f9;
}
.select:focus {
  outline: 2px solid #ffe654;
}
.option {
  color: #040505;
  font-size: 16px;
  font-weight: 400;
  font-family: var(--font-main);
}
.btn-register {
  background-color: #ffe654;
  width: 50%;
  margin: auto;
  padding: 16px 0;
  cursor: pointer;
}
.btn-register button {
  border: none;
  background-color: transparent;
  font-family: var(--font-main);
  font-weight: 500;
  color: #040505;
}
</style>
