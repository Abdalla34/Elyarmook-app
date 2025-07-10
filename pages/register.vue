<template>
  <div>
    <!-- <ProfileDetails /> -->
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
                <!-- <div
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
                </div> -->
              </div>
            </div>
          </div>

          <div class="col-8 col-padding margin-bottom-24px">
            <form @submit.prevent="onSubmit">
              <div class="inputs">
                <div class="row-inputs">
                  <div class="input d-flex flex-column">
                    <label class="label">first name</label>
                    <input type="text" placeholder="your name" />
                  </div>

                  <div class="input d-flex flex-column">
                    <label class="label">last name</label>
                    <input type="text" placeholder="your name" />
                  </div>
                </div>

                <div class="row-inputs">
                  <div class="input d-flex flex-column">
                    <label class="label">phone Number</label>
                    <input type="text" placeholder="your phone" />
                  </div>
                  <div class="input d-flex flex-column">
                    <label class="label">email addrees</label>
                    <input type="text" placeholder="your email" />
                  </div>
                </div>

                <div class="row-inputs">
                  <div class="input d-flex flex-column">
                    <label class="label" for="area">area</label>
                    <select id="area" class="select">
                      <option
                        value=""
                        disabled
                        selected
                        class="option"
                      ></option>
                      <option value="central" class="option">
                        Central Region
                      </option>
                      <option value="north" class="option">North Region</option>
                      <option value="south" class="option">South Region</option>
                    </select>
                  </div>

                  <div class="input d-flex flex-column">
                    <label class="label" for="city">city</label>
                    <select id="city" class="select">
                      <option
                        value=""
                        disabled
                        selected
                        class="option"
                      ></option>
                      <option value="riyadh" class="option">Riyadh</option>
                      <option value="dammam" class="option">Dammam</option>
                      <option value="khopr" class="option">Khopr</option>
                    </select>
                  </div>
                </div>
              </div>
              <div
                @click="navigateTo('/mycars')"
                class="text-center btn-register button border-radius-36px"
              >
                <button class="text-capitalize" type="submit">save</button>
              </div>

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
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useForm, useField } from 'vee-validate'
// import * as yup from 'yup'

// const schema = yup.object({
//   firstName: yup
//     .string()
//     .required("please enter your name")
//     .min(3, "name must be at least 3 characters"),
//   lastName: yup
//     .string()
//     .required("please enter your last name")
//     .min(3, "name must be at least 3 characters"),
//   phoneNumber: yup
//     .string()
//     .required("please enter your phone number")
//     .min(11, "phone number must be 11 digits")
//     .matches(/^\d+$/, "phone number must be digits only"),
//   area: yup.string().required("please select your area"),
//   city: yup.string().required("please select your city"),
// })

// const { handleSubmit, errors } = useForm({
//   validationSchema: schema,
// })

// const { value: firstName } = useField('firstName')
// const { value: lastName } = useField('lastName')
// const { value: phoneNumber } = useField('phoneNumber')
// const { value: area } = useField('area')
// const { value: city } = useField('city')

// const onSubmit = handleSubmit((values) => {
//   console.log('Form submitted!', values)
// })
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
