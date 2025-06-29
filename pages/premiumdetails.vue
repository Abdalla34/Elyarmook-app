<template>
  <div class="prem-details position-relative">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-sm-12">
          <GoPageArrow title="offer Details" backPath="/premium" />

          <div class="mb">
            <box-img-features
              img="/Diamond.png"
              title="Save With an ALyarmook One Membership For 1 Year"
              price="5000"
              enddate="des,3,2024"
              oldDes="80"
            />
          </div>

          <imgTapy />

          <div class="details">
            <h1 class="about-title">About Membership</h1>
            <p>
              Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, Lorem ipsum
              dolor sit amet,Lorem ipsumLorem ipsum dolor sit amet,Lorem ipsum
              dolor sit amet, em ipsum Lorem ipsum dolor sit amet,Lorem ipsum
              dolor sit amet, Lorem ipsum dolor sit
            </p>
          </div>

          <div class="our-feature">
            <h3>our features</h3>
            <BoxesFeatures
              desfirstbox="Discount on all services"
              dessecoundbox="Discount on all services"
              salefirstbox="%20"
              salesecoundbox="%20"
            />
          </div>

          <div class="poup position-absolute border-radius-36px text-center">
            <div class="img-logo">
              <img src="/newimglogo.png" alt="" />
            </div>
            <h2 class="item-name text-center mt-4 mb-2">
              chose payment method
            </h2>
            <p class="p-color-fs fw">
              Kindly fill in your details below to create an account
            </p>

            <div class="input-method">
              <div
                class="box-input mb-3 d-flex align-items-center justify-content-between"
                v-for="(item, index) in itemsCard"
                :key="index"
                :class="{ 'active-box': selectedBox === index }"
              >
                <div class="img-payment d-flex gap-2 align-items-center">
                  <img :src="item.imgCard" alt="" />
                  <p class="text-capitalize">{{ item.nameBank }}</p>
                </div>
                <input
                  type="checkbox"
                  class="custom-checkbox"
                  :checked="selectedBox === index"
                  @change="toggleSelected(index)"
                />
              </div>
              <div class="button-accept">
                <div>
                  <ButtonCard textButton="accept and pay" />

                  <div class="test">By using this website means your acceptance of Policy and Terms of use</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let itemsCard = ref([
  {
    imgCard: "visa.png",
    nameBank: "pay with visa",
  },
  {
    imgCard: "masterCard.png",
    nameBank: "master Card",
  },
  {
    imgCard: "with tabby.png",
    nameBank: "pay with tabby ",
  },
  {
    imgCard: "cach.png",
    nameBank: "cach",
  },
  {
    imgCard: "with tamara.png",
    nameBank: "pay with tamara ",
  },
]);
let selectedBox = ref(null);

function toggleSelected(index) {
  if (selectedBox.value === index) {
    selectedBox.value = null;
  } else {
    selectedBox.value = index;
  }
}
</script>

<style scoped>
@import "./assets/css/premiumdetails.css";

.active-box {
  background-color: #fffcea;
  border: 3px solid var(--main-color);
}

.test{
  width: 300px;
}
</style>
