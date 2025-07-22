<template>
  <div>
    <ProfileDetails />
    <div class="mycars-information">
      <div class="container">
        <div class="row">
          <div class="col-8 col-padding">
            <GoPageArrow title="my cars" :showIcon="false" />

            <div class="cars margin-bottom-24px position-relative">
              <div class="car-box d-flex justify-content-between box-main">
                <div class="position-absolute bg-hover"></div>
                <div class="car-detalis d-flex gap-2">
                  <div class="car-img z-index position-relative">
                    <!-- <img :src="item.carLogo" alt="" /> -->
                  </div>
                  <div class="car-name z-index position-relative">
                    <p>item.carNAme</p>
                  </div>
                </div>
                <div class="position-relative z-index" @click="toggleEdit">
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
              </div>
              <div v-if="boxEdit" class="poup-edit text-center">
                <h6 class="text-capitalize mb-3">car model</h6>

                <div
                  class="default box-main-color box-btn d-flex align-items-center gap-2 justify-content-center mb-3"
                >
                  <input class="set-default" type="checkbox" id="setDefault" />
                  <label for="setDefault" class="text-capitalize label-cursor"
                    >set as default</label
                  >
                </div>

                <div
                  class="edit box-main-color box-btn d-flex align-items-center gap-2 justify-content-center mb-2"
                >
                  <div><IconsOrderEdit /></div>
                  <h6 class="text-capitalize">edit</h6>
                </div>

                <div
                  class="delete box-btn d-flex align-items-center gap-2 justify-content-center"
                >
                  <div>
                    <Trash />
                  </div>
                  <h6 class="text-capitalize">delete</h6>
                </div>
              </div>
            </div>

            <div
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
let carsBrand = ref([]);
let res = await useApi().getCarBrands();
carsBrand.value = res?.data?.items;
let boxEdit = ref(false);
function toggleEdit() {
  boxEdit.value = !boxEdit.value;
}
</script>

<style scoped>
@import "@/assets/css/mycars.css";
.poup-edit {
  position: absolute;
  right: 13px;
  top: 45px;
  width: 300px;
  z-index: 10;
  padding: 32px;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px 0px #0000000a;
  border-top-left-radius: 64px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 64px;
  border-bottom-right-radius: 64px;
}
.box-btn {
  border: 1px solid #d4d4d4;
  padding: 21px;
  border-radius: 36px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  font-family: var(--font-main);
  font-weight: 500;
  font-size: 16px;
}

.delete {
  border: 1px solid #f9cbcb;
  background-color: #f9cbcb;
  color: #eb5757;
}
.delete:hover {
  color: white;
  background-color: #eb5757;
}
.delete:hover .trash-icon path {
  stroke: white;
  fill: white;
}

.box-main-color:hover {
  background-color: var(--main-color);
  border: 1px solid var(--main-color);
}

.set-default {
  appearance: none;
  -webkit-appearance: none;
  border-radius: 4px;
  border: 1px solid var(--main-color);
  width: 18px;
  height: 18px;
  background-color: transparent;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
  position: relative;
}
.label-cursor {
  cursor: pointer;
}
.set-default:hover {
  border-color: black;
}
.default:hover .set-default {
  border-color: black;
}
.set-default:checked {
  border-color: var(--main-color);
  background-color: var(--main-color);
}
.set-default:checked::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid black;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  display: block;
}
</style>
