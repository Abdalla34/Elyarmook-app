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

          <div class="col-8 col-padding margin-bottom-24px">
            <!-- <div v-if="!user">
              <div
                class="msg-error text-center text-capitalize alert alert-warning"
              >
                <p class="text-danger">
                  You must create an account to continue
                </p>
                <button
                  class="goAcc mt-4"
                  @click="navigateTo('/createaccount')"
                >
                  Go To Create Account
                </button>
              </div>
            </div> -->

            <div v-if="user" class="inputs">
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
                  <input
                    type="text"
                    placeholder="your phone"
                    v-model="user.phone"
                    disabled
                  />
                </div>
                <!-- <div class="input d-flex flex-column">
                  <label class="label">email addrees</label>
                  <input v-model="" type="text" placeholder="your email" />
                </div> -->
              </div>

              <div class="row-inputs">
                <div class="input d-flex flex-column">
                  <label class="label" for="">area</label>
                  <input
                    type="text"
                    placeholder="central region"
                    v-model="user.area.title"
                    disabled
                  />
                </div>
                <div class="input d-flex flex-column">
                  <label class="label" for="">city</label>
                  <input
                    type="text"
                    placeholder="central region"
                    v-model="user.city.title"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="user">
          <div class="button-save border-radius-36px width-height">
            <button class="text-capitalize">continue</button>
          </div>

          <div @click="logOut" class="log-out width-height border-radius-36px">
            <button class="text-capitalize">log out</button>
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
  </div>
</template>

<script setup>
let router = useRouter();
let token = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });

const cookie = useCookie("user", { maxAge: 365 * 24 * 60 * 60 });
const user = cookie.value;

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
</style>
