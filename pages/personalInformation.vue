<template>
  <div>
    <ProfileDetails />
    <div class="personal-information">
      <div class="container">
        <div class="row">
          <div class="col-8 col-padding">
            <div
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

          <div class="col-8 col-padding margin-bottom-24px">
            <div class="inputs">
              <div class="row-inputs">
                <div class="input d-flex flex-column">
                  <label class="label">first name</label>
                  <input
                    v-model="user.first_name"
                    type="text"
                    placeholder="your name"
                    disabled
                  />
                </div>

                <div class="input d-flex flex-column">
                  <label class="label">last name</label>
                  <input
                    type="text"
                    placeholder="your name"
                    v-model="user.last_name"
                    disabled
                  />
                </div>
              </div>

              <div class="row-inputs">
                <div class="input d-flex flex-column">
                  <label class="label">phone Number</label>
                  <input type="text" placeholder="your phone"  v-model="user.phone" disabled />
                </div>
                <div class="input d-flex flex-column">
                  <label class="label">email addrees</label>
                  <input type="text" placeholder="your email" />
                </div>
              </div>

              <div class="row-inputs">
                <div class="input d-flex flex-column">
                  <label class="label" for="">area</label>
                  <input type="text" placeholder="central region" v-model="user.area.title" disabled />
                </div>
                <div class="input d-flex flex-column">
                  <label class="label" for="">city</label>
                  <input type="text" placeholder="central region" v-model="user.city.title" disabled/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="button-save border-radius-36px width-height">
          <button class="text-capitalize">continue</button>
        </div>

        <div
          class="button-delete border-radius-36px width-height d-flex justify-content-center margin-bottom-90px"
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
</template>

<script setup>
const user = useCookie("user", { maxAge: 365 * 24 * 60 * 60 });

let profileImg = ref(false);
function ChangeProfile() {
  profileImg.value = !profileImg.value;
}

console.log(user);
</script>

<style>
@import "@/assets/css/personalInformation.css";
</style>
