<template>
  <div>
    <ProfileDetails />
    <div class="language">
      <div class="container">
        <div class="row">
          <div class="col-8 col-padding">
            <h1 class="margin-bottom-24px text-capitalize title-pages">
              Language
            </h1>

            <div class="lang margin-bottom-24px box-pages">
              <div class="lang-box">
                <div
                  class="lang-detalis d-flex justify-content-between align-items-center"
                >
                  <div class="d-flex align-items-center gap-2">
                    <SoudiaIcon />
                    <h5 class="arabic">Arabic</h5>
                  </div>
                  <div class="input-check">
                    <input type="checkbox" />
                  </div>
                </div>
              </div>
            </div>
            <div class="lang margin-bottom-24px box-pages">
              <div class="lang-box">
                <div
                  class="lang-detalis d-flex justify-content-between align-items-center"
                >
                  <div class="d-flex align-items-center gap-2">
                    <USA />
                    <h5 class="english">English</h5>
                  </div>
                  <div class="input-check">
                    <input type="checkbox" />
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
.language {
  margin-bottom: 482px;
}

.arabic,
.english {
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #3d3d3d;
}

.lang-box {
  border-radius: 12px;
}

.input-check {
  position: relative;
  width: 36px;
  height: 36px;
}

.input-check input {
  width: 100%;
  height: 100%;
  appearance: none;
  border: 3px solid var(--main-color);
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  background-color: white;
  padding: 0;
  margin: 0;
}

.input-check input:checked::after {
  content: "✔";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--main-color);
  color: black;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.input-check input:focus {
  border: none;
}

@media(max-width:576px) {
  
}
</style>
