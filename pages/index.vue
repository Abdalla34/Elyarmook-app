<template>
  <div class="parent">
    <Header />
    <Views />
    <div class="container">
      <!-- start swiper home -->
      <SwiperSlideHome />
      <!-- end swiper home -->

      <!-- start services section -->
      <!-- <div class="services-section border-radius-20px">
        <div class="services-container container position-relative">
          <div class="services-header">
            <span
              class="soon-badge text-capitalize ps-3 pe-3 pt-1 pb-1 position-absolute border-radius-20px"
              >Soon</span
            >
          </div>
          <div class="row">
            <div
              class="col-lg-4 col-md-4 col-sm-12"
              v-for="(service, index) in soonGifts"
              :key="index"
            >
              <div class="service-card text-center mb-3">
                <div class="service-icon-wrapper">
                  <div class="service-icon">
                    <img
                      class="img"
                      :src="service.imageSoon"
                      :alt="service.title"
                    />
                  </div>
                </div>
                <div class="service-content">
                  <h3 class="service-title">{{ service.title }}</h3>
                  <p class="color-parag">{{ service.des }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <Serv-Section-Card />
      <!-- end services section -->

      <!-- start to-card -->
      <swiper-card-slider />
      <!-- end to-card -->

      <!-- start qr code -->
      <qr-code-slider />
      <!-- end qr code -->
    </div>
    <Footer />
  </div>
</template>


