<template>
  <div>
    <ProfileDetails />
    <div class="profile-information">
      <div class="container">
        <div class="row">
          <div class="col-8 col-padding">
            <div
              class="profiel-img d-flex justify-content-between align-items-center margin-bottom-24px"
            >
              <h1 class="margin-bottom-24px text-capitalize title-pages mb-0">
                personal information
              </h1>
              <div class="box-img position-relative text-center">
                <img
                  @click="ChangeProfile"
                  src="/Ellipse 2.png"
                  alt=""
                  class="img-profile"
                />
                <div class="change-profile position-absolute" :class="{ 'd-block': profileImg }">
                  <h6 class="h6 text-capitalize">profile picture</h6>
                  <div
                    class="change box-design d-flex gap-2 justify-content-center align-items-center"
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 17.5V11.5L7.5 13.5"
                        stroke="#040505"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.5 11.5L11.5 13.5"
                        stroke="#040505"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M22.5 10.5V15.5C22.5 20.5 20.5 22.5 15.5 22.5H9.5C4.5 22.5 2.5 20.5 2.5 15.5V9.5C2.5 4.5 4.5 2.5 9.5 2.5H14.5"
                        stroke="#040505"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M22.5 10.5H18.5C15.5 10.5 14.5 9.5 14.5 6.5V2.5L22.5 10.5Z"
                        stroke="#040505"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p class="mb-0 text-capitalize paragraph-change font-p">
                      change
                    </p>
                  </div>
                  <div
                    class="delete box-design d-flex gap-2 justify-content-center align-items-center"
                  >
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 6.48047C17.67 6.15047 14.32 5.98047 10.98 5.98047C9 5.98047 7.02 6.08047 5.04 6.28047L3 6.48047"
                        stroke="#EB5757"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.5 5.47L8.72 4.16C8.88 3.21 9 2.5 10.69 2.5H13.31C15 2.5 15.13 3.25 15.28 4.17L15.5 5.47"
                        stroke="#EB5757"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.8504 9.64062L18.2004 19.7106C18.0904 21.2806 18.0004 22.5006 15.2104 22.5006H8.79039C6.00039 22.5006 5.91039 21.2806 5.80039 19.7106L5.15039 9.64062"
                        stroke="#EB5757"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.3301 17H13.6601"
                        stroke="#EB5757"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.5 13H14.5"
                        stroke="#EB5757"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

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
                  <label class="label" for="">area</label>
                  <input type="text" placeholder="central region" />
                </div>
                <div class="input d-flex flex-column">
                  <label class="label" for="">city</label>
                  <input type="text" placeholder="central region" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="button-save border-radius-36px width-height">
          <button class="text-capitalize">save</button>
        </div>
        <div
          class="button-delete border-radius-36px width-height d-flex justify-content-center margin-bottom-90px"
        >
          <button class="text-capitalize color-but">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.5 6.48047C18.17 6.15047 14.82 5.98047 11.48 5.98047C9.5 5.98047 7.52 6.08047 5.54 6.28047L3.5 6.48047"
                stroke="#EB5757"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 5.47L9.22 4.16C9.38 3.21 9.5 2.5 11.19 2.5H13.81C15.5 2.5 15.63 3.25 15.78 4.17L16 5.47"
                stroke="#EB5757"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.3504 9.64062L18.7004 19.7106C18.5904 21.2806 18.5004 22.5006 15.7104 22.5006H9.29039C6.50039 22.5006 6.41039 21.2806 6.30039 19.7106L5.65039 9.64062"
                stroke="#EB5757"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.8301 17H14.1601"
                stroke="#EB5757"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 13H15"
                stroke="#EB5757"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span>delete my account</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let profileImg = ref(false);
function ChangeProfile() {
  profileImg.value = !profileImg.value;
}
console.log(profileImg.value);
</script>

<style>
.margin-bottom-90px {
  margin-bottom: 90px;
}

.row {
  display: flex;
  justify-content: center;
}

.img-profile {
  width: 80px;
  height: 80px;
  cursor: pointer;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 92px;
}

.row-inputs {
  display: flex;
  gap: 24px;
}

.input {
  flex: 1;
  min-width: 0;
}

.input input {
  border-radius: 12px;
  padding: 12px 16px;
  border: 1px solid #f1f3f9;
}

input::placeholder {
  color: #939393;
  font-size: 16px;
  font-weight: 400;
  font-family: var(--font-main);
}

.color-but {
  color: #eb5757;
}

.box-img {
  position: relative;
  transition: all ease 0.3s;
}

.box-img .h6 {
  margin-bottom: 28px;
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0%;
  color: #333333;
}

.change-profile {
  position: absolute;
  left: -280px;
  top: 86px;
  width: 312px;
  border-top-left-radius: 64px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 64px;
  border-bottom-left-radius: 64px;
  padding: 32px;
  background-color: #ffffff;
  z-index: 10;
  box-shadow: 0px 0px 20px 0px #0000000a;
   display: none;
}

.box-design {
  border-radius: 36px;
  padding-top: 16px;
  padding-bottom: 16px;
  background-color: #ebebeb;
  cursor: pointer;
  transition: all ease 0.1s;
  margin-bottom: 10px;
}

.change {
  background-color: #ebebeb;
}
.delete {
  background-color: #f9cbcb;
}

.color-delete {
  color: #eb5757;
}

.change:hover {
  background-color: var(--main-color);
}

.change:hover svg path {
  stroke: white;
}
.change:hover p {
  color: white;
  font-weight: bold;
}
.delete:hover {
  background-color: #eb5757;
}
.delete:hover p {
  color: white;
  font-weight: bold;
}
.delete:hover svg path {
  stroke: white;
}

.paragraph-change {
  color: var(--color-black);
}

@media (max-width: 768px) {
  .row-inputs {
    display: block;
    margin-bottom: 24px;
  }
}
</style>
