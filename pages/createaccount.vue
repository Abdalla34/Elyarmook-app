<template>
  <div class="parent-create">
    <div class="create-acc text-center">
      <div class="logo">
        <img src="/newLogo.png" />
        <h1 class="text-capitalize">create an account</h1>
        <p>Kindly fill in your details below to create an account</p>
      </div>

      <div class="phone-number d-flex flex-column">
        <label class="label" for="phone-number">Phone Number</label>
        <input type="text" class="input-phone" placeholder="+966 XX XXX XXXX" />
      </div>

      <div class="btn-continue w-100">
        <ButtonCard textButton="continue" />
      </div>

      <div class="position-relative or-divider">
        <span
          class="position-absolute top-50 start-50 translate-middle span-position text-capitalize"
          >or</span
        >
      </div>

      <div class="parent-boxes d-flex justify-content-between gap-2">
        <div
          class="visit-box box-soon d-flex align-items-center justify-content-center gap-2"
        >
          <div class="icon">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2.5V5.5"
                stroke="#040505"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 2.5V5.5"
                stroke="#040505"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.5 9.58984H20.5"
                stroke="#040505"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.2091 16.2683L15.6691 19.8083C15.5291 19.9483 15.3991 20.2083 15.3691 20.3983L15.1791 21.7483C15.1091 22.2383 15.4491 22.5783 15.9391 22.5083L17.2891 22.3183C17.4791 22.2883 17.7491 22.1583 17.8791 22.0183L21.4191 18.4783C22.0291 17.8683 22.3191 17.1583 21.4191 16.2583C20.5291 15.3683 19.8191 15.6583 19.2091 16.2683Z"
                stroke="#040505"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.6992 16.7773C18.9992 17.8573 19.8392 18.6973 20.9192 18.9973"
                stroke="#040505"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 22.5H8C4.5 22.5 3 20.5 3 17.5V9C3 6 4.5 4 8 4H16C19.5 4 21 6 21 9V12.5"
                stroke="#040505"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.9945 14.1992H12.0035"
                stroke="#040505"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.29529 14.1992H8.30427"
                stroke="#040505"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.29529 17.1992H8.30427"
                stroke="#040505"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1>Fast Scheduling Order</h1>
          </div>
          <span class="position-absolute text-capitalize">soon</span>
        </div>

        <div
          class="visit-box d-flex align-items-center justify-content-center gap-2"
        >
          <div class="icon"><ProfileIcon /></div>
          <div>
            <h1>Fast Scheduling Order</h1>
          </div>
        </div>
      </div>

      <div>
        <p class="using">By using this website means your acceptance of</p>
        <p class="policy">Policy and Terms of use</p>
      </div>
    </div>
  </div>
</template>

<script setup>

// let appconfig = useAppConfig();
// let baseUrl = appconfig.baseURL;
// const { data } = await useFetch(`${baseUrl}/auth/send-otp`, {
//   method: "POST",
//   headers: {
//     Authorization: `Bearer`,
//   },
//   body: {
//     phone: "01000000000",
//   },
// });
</script>

<style scoped>
.parent-create {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.create-acc {
  background-color: #ffffff;
  box-shadow: 0px 0px 15px 0px #0000000d;
  width: fit-content;
  padding: 60px 40px;
  border-radius: 50px;
}
.create-acc h1 {
  font-family: var(--font-main);
  font-weight: 700;
  font-style: Bold;
  font-size: 24px;
  text-align: center;
  color: #262338;
  margin-top: 28px;
  margin-bottom: 8px;
}
.create-acc p {
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 16px;
  color: #6c757d;
}

.phone-number {
  margin-top: 60px;
  margin-bottom: 40px;
}
.phone-number label {
  text-align: left;
}
.input-phone {
  width: 100%;
  border: 1px solid #f1f3f9;
  border-radius: 5px;
  padding: 12px 16px;
  border-radius: 12px;
}
.input-phone::placeholder {
  font-weight: 400;
  font-size: 16px;
  color: #7e7e7e;
}

.or-divider {
  width: 100%;
  height: 1px;
  background-color: #cbcad7;
  margin-top: 32px;
}
.span-position {
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #686677;
  font-size: 18px;
}

.parent-boxes {
  margin-top: 32px;
}
.visit-box {
  background-color: #ebebeb;
  padding: 21px 23px;
  border-radius: 36px;
}
.visit-box h1 {
  display: flex;
  align-items: center;
  margin: 0;
  font-weight: 500;
  font-size: 18px;
  color: #040505;
}

.box-soon {
  position: relative;
}
.box-soon span {
  background-color: #f9cbcb;
  top: -20px;
  right: 0%;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #eb5757;
}

.using {
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  margin-top: 32px;
  margin-bottom: 15px;
  color: #7e7e7e;
}
.policy {
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 12px;

  color: #49475a !important;
}
</style>
