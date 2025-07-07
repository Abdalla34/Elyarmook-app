<template>
  <div>
    <div>
      <div class="add-car">
        <div class="container">
          <div class="row">
            <div class="col-8 col-padding">
              <TitlePageCars namePage="BMW" back-path="/carBrand" />

              <div class="search-input">
                <input class="search" type="text" placeholder="search" />
              </div>

              <div class="inputs">
                <div class="label-car position-relative">
                  <input class="input-brand" type="text" />

                  <div class="position-absolute bmw-img d-flex gap-2">
                    <img class="h-100" src="/public/BMW.png" alt="" />
                    <h1 class="name-car">1M</h1>
                  </div>
                </div>
                <div class="label-car position-relative">
                  <input class="input-brand" type="text" />

                  <div class="position-absolute bmw-img d-flex gap-2">
                    <img class="h-100" src="/public/BMW.png" alt="" />
                    <h1 class="name-car">1M</h1>
                  </div>
                </div>
                <div class="label-car position-relative">
                  <input class="input-brand" type="text" />

                  <div class="position-absolute bmw-img d-flex gap-2">
                    <img class="h-100" src="/public/BMW.png" alt="" />
                    <h1 class="name-car">1M</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/css/carseries.css";
</style>
