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
              <h1 class="margin-bottom-24px text-capitalize title-pages">
                personal information
              </h1>
              <div>
                <img src="/Ellipse 2.png" alt="" class="img" />
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

<style>
.margin-bottom-90px {
  margin-bottom: 90px;
}

.row {
  display: flex;
  justify-content: center;
}

.img {
  width: 80px;
  height: 80px;
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

@media (max-width: 768px) {
  .row-inputs {
    display: block;
    margin-bottom: 24px;
  }
}
</style>
