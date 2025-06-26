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
              <div class="box-input d-flex align-items-center justify-content-between">
                <div class="img-payment d-flex gap-2">
                  <img src="/visa.png" alt="" />
                  <p class="text-capitalize">pay with visa</p>
                </div>
                <input type="checkbox" class="custom-checkbox">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "./assets/css/premiumdetails.css";

.mb {
  margin-bottom: 50px;
}

.poup {
  background-color: #ffffff;
  box-shadow: 0px 0px 15px 0px #0000000d;

  padding: 60px 80px;
  left: 50%;
  top: 0%;
  transform: translateX(-50%);
}
.fw {
  font-weight: 400;
}
.input-method {
  margin-top: 30px;
}
.box-input {
  width: 100%;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 40px;
  border: 1px solid  #eaecf0;
}

.box-input .custom-checkbox {
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #eaecf0;
  height: 24px;
  width: 24px;
  appearance: none;
  position: relative;
  cursor: pointer;
}

.custom-checkbox:checked::after {
  content: "✔";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--main-color);
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

/* ✅ إزالة البوردر اللي بيظهر عند الضغط */
.custom-checkbox:focus {
  outline: none;
  box-shadow: none;
  border: 1px solid var(--main-color);
}
</style>
