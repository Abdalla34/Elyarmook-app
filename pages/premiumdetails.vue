<template>
  <Views />
  <div class="prem-details">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-sm-12">
          <GoPageArrow title="offer Details" backPath="/premium" />

          <div
            class="daimond-img d-flex align-items-center justify-content-center"
          >
            <img src="/Diamond.png" alt="" />
          </div>

          <div class="mt">
            <div class="d-flex align-items-center justify-content-between">
              <h1 class="item-name">Periodic maintenance</h1>
              <p class="price-value size-font mb-0">
                50
                <span class="font-size-currency text-uppercase span">
                  sar
                </span>
              </p>
            </div>
            <p class="text-end sale">80 SAR</p>
            <div class="date-end d-flex justify-content-between mt-3">
              <div>
                <span class="text-capitalize date">End date: </span>
                <span class="text-capitalize date-end ms-2">des,4,2020 </span>
              </div>
              <p class="text-line"></p>
            </div>
          </div>

          <div class="details">
            <h1 class="about-title">Offer Features</h1>
            <p>
              Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, Lorem ipsum
              dolor sit amet,Lorem ipsumLorem ipsum dolor sit amet,Lorem ipsum
              dolor sit amet,  em ipsum Lorem ipsum dolor sit amet,Lorem ipsum
              dolor sit amet, Lorem ipsum dolor sit
            </p>
          </div>

          <div>
            <h3>our features</h3>
            <BoxesFeatures
              desfirstbox="Discount on all services"
              dessecoundbox="Discount on all services"
              salefirstbox="%20"
              salesecoundbox="%20"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "./assets/css/premiumdetails.css"
</style>
