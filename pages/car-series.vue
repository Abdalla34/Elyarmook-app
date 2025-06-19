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
.add-car {
  margin-top: 70px;
}

.title-page {
  width: 90%;
  margin: auto;
}

.search-input {
  width: 90%;
  margin: auto;
  margin-bottom: 40px;
}

.search-input .search {
  width: 100%;
  border-radius: 36px;
  border: 2px solid #f1f3f9;
  padding: 20px;
  margin-top: 20px;
}

.search-input .search:focus {
  outline: none;
  border: 2px solid var(--main-color);
  box-shadow: 0px 1px 10px var(--main-color);
}

.inputs input {
  width: 100%;
  border-radius: 12px;
}

.bmw-img {
  position: absolute;
  left: 20px;
  top: 20%;
}

.name-car {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0%;
  color: #6e7191;
}

@media (max-width: 768px) {
  .add-car {
    padding: 100px 0px;
  }
}
</style>
