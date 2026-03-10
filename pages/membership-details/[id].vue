<template>
  <div class="details-member">
    <div class="container">
      <div v-if="isSkeleton" class="row justify-content-center">
        <SkeletonsMemberShipsSkeleId />
      </div>
      <div v-else class="row justify-content-center">
        <div class="col-lg-8 col-md-6 col-sm-12">
          <!-- box-car  -->
          <div v-if="mycars.length >= 1" class="box-car-handle mb-3 pt-2 pb-2 pe-3 ps-3">
            <div v-if="defaultCar" class="car-details d-flex align-items-center gap-3 ">
              <div>
                <img :src="defaultCar.brand?.image" alt="" />
              </div>
              <div class="note">
                <h1 class="title-boxsm ">
                  {{ defaultCar.brand?.title }} - {{ defaultCar.car_type?.title }}
                </h1>
                <p class="mt-1" style="font-size: 12px;">🔒 Membership applies to this vehicle only</p>
              </div>
            </div>
            <!-- member details -->
          </div>
          <!-- memberShip image and subDetails -->
          <div class="membership-details" v-if="memberDetails">
            <img :src="memberDetails.image" alt="memershipdetails" class="image">
            <div class="tags d-flex align-items-center gap-2 mt-3">
              <div class="box-tag px-4 py-1 bg-box rounded-4 fw-bold">{{ memberDetails?.includes?.inspection?.length }}
                {{ $t('services') }}</div>
              <div class="box-tag px-4 py-1 rounded-4 bg-benefits fw-bold">{{ memberDetails?.exclusive_benefits?.length
              }} {{ $t('benefits') }}
              </div>
            </div>
            <h1 class="fs-5 mt-3 fw-bold">{{ $t('Save With an ALyarmook One Membership For 1 Year') }}</h1>
          </div>
          <!-- price and discount -->
          <div class="price-disc mt-3 d-flex align-items-center justify-content-between">
            <div class="price-member fw-bold"> <img src="/SAcurrency.png" alt=""> {{ memberDetails?.price_after_discount
            }}
            </div>
          </div>
          <!-- the main benefits -->
          <h1 class="text-capitalize fw-bold fs-6 mt-3 mb-2">the main benefits :</h1>
          <div v-if="memberDetails?.includes?.inspection.length > 0" class="benefits-wrapper p-4 rounded-4">
            <div class="benefits-grid">
              <div v-for="member in memberDetails?.includes?.inspection" :key="member.id"
                class="benefit-item p-2 d-flex align-items-center gap-3">
                <img :src="member.service_icon" class="img" alt="memberIcon"
                  @error="e => { e.target.onerror = null; e.target.src = '/placeholder.jpeg' }">
                <div class="details-member">

                  <p class="benefit-title">{{ member.service_name }}</p>
                  <span class="benefit-time">{{ member.quantity_per_period }} Times</span>
                </div>
              </div>
            </div>
          </div>

          <!-- the main exclusive -->
          <h1 class="text-capitalize fw-bold fs-6 mt-3 mb-2">exclusive benefits :</h1>
          <div class="benefits-wrapper p-4 rounded-4">
            <div class="benefits-grid">
              <div v-for="exclusive in memberDetails?.exclusive_benefits" :key="exclusive.id"
                class="benefit-item p-2 d-flex align-items-center gap-3">
                <img v-if="exclusive.icon" :src="exclusive.icon" class="img" alt="Icon"
                  @error="e => { e.target.onerror = null; e.target.src = '/fix-serv.png' }">
                <div class="details-member">

                  <p class="benefit-title">{{ exclusive.title }}</p>
                  <span class="benefit-time">{{ memberDetails?.points.display }} </span>
                </div>
              </div>
            </div>
          </div>

          <!-- memberShip Details -->
          <div class="duration w-80">
            <h1 class="text-capitalize fw-bold fs-6 mt-3 mb-2">memberShip Details :</h1>
            <div class="border p-3 rounded-4 d-flex align-items-center justify-content-between">
              <div class="Subscription type">Subscription type <p class="text-capitalize fw-bold text-center">annually
                </p>
              </div>
              <div class="fees text-center">fees <p class="text-capitalize fw-bold text-center"><img
                    src="/currencyBlack.png" alt=""> {{ memberDetails?.price_after_discount }}
                </p>
              </div>
            </div>
          </div>

          <!-- faq -->
          <div class="faqs">
            <h1 class="text-capitalize fw-bold fs-6 mt-3 mb-2">faq :</h1>
            <div class="box-main-faq  p-3 rounded-3 mt-3  d-flex align-items-center justify-content-between"
              v-for="faq in memberDetails?.faqs" :key="faq.id" @click="toggleIcon(faq.id)">

              <div class="detalis position-relative z-index">
                <h6 class="text-capitalize font-p fw-bold">
                  {{ faq.question }}
                </h6>
                <transition name="fade-slide">
                  <p v-if="activeId[faq.id]" class="font-p mt-1 display-paragraph d-block">
                    {{ faq.answer }}
                  </p>
                </transition>
              </div>

              <div class="icon-arrow position-relative z-index">
                <div class="arrow-bottom" :class="{ 'd-none': activeId[faq.id] }">
                  <svg class="font-icon" width="12" height="8" viewBox="0 0 12 8" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#7E7E7E" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </div>

                <div class="arrow-top" v-if="activeId[faq.id]">
                  <svg class="font-icon" width="12" height="8" viewBox="0 0 12 8" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 6.5L6 1.5L1 6.5" stroke="#7E7E7E" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <!-- Payments Images -->
          <div class="img-pay text-center mt-4">
            <p class="fs-6 text-capitalize fw-bold">you can pay with</p>
            <img src="/Payment.png" alt="paymentsimg" class="pay-img mt-3">
          </div>
          <hr>
          <div class="agree text-center w-80 mx-auto">
            <p class="text-capitalize" style="color:  #7e7e7e;">By sumbiting the membership you agree on <span
                class="fw-bold text-capitalize text-black"> Terms and conditions</span></p>
          </div>
          <hr>
          <div class="buy mt-3 d-flex align-items-center gap-3 justify-content-between">
            <div class="fw-bold" style="color: #C71F45;">{{ memberDetails?.price_after_discount }} <img
                src="/SAcurrency.png" alt=""> <span class="before-disc">{{ memberDetails?.price_before_discount }} <img
                  src="/currencyBlack.png" alt=""></span></div>
            <div>
              <ButtonCard text-button="buy it now" @click="
                navigateTo({
                  path: $localePath('/payment'),
                  query: { membership: idMember },
                })
                " />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const idMember = route.params.id;
const memberDetails = ref({});
const isSkeleton = ref(false);

onMounted(async () => {
  try {
    isSkeleton.value = true;
    const res = await useApi().memberShipDetails(idMember);
    memberDetails.value = res?.data;


    memberDetails.value?.faqs?.forEach(faq => {
      activeIndexes.value[faq.id] = false;
    });

  } catch (err) {
    console.log('Error fetching ', err);
  } finally {
    isSkeleton.value = false;
  }
});


const mycars = ref([]);
const rescar = await useApi().getMycars();
mycars.value = rescar?.data || [];

const defaultCar = computed(
  () => mycars.value.find((car) => car.is_default) || null
);


const activeId = ref({});

function toggleIcon(id) {
  activeId.value[id] = !activeId.value[id];
}
</script>

<style scoped>
.image {
  max-height: 200px;
  cursor: pointer;
  width: 100%;
  margin: auto;
}

.bg-box {
  background-color: #ECFAF2;
}

.bg-benefits {
  background-color: rgba(255, 249, 212, 1);
}

.price-member {
  color: #C71F45;
  font-size: 24px;
}

@media (max-width:768px) {
  .image {
    width: 100%;
  }
}

.benefits-wrapper {
  background: #fff;
  border: 1px solid #eee;
  overflow-x: auto;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  gap: 16px;
  min-width: 200px;
}

.benefit-title {
  font-weight: 600;
  font-size: 15px;
}

.benefit-time {
  color: #7a7a9d;
  font-size: 14px;
}

/* scrollbar */
.benefits-wrapper::-webkit-scrollbar {
  height: 6px;
}

.benefits-wrapper::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.img {
  width: 40px;
}

.box-main-faq {
  background-color: #F7F7FC;
  cursor: pointer;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
  max-height: 0;
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 200px;
}

.pay-img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.before-disc {
  text-decoration: line-through;
  color: #7a7a9d;
  font-size: 16px;
}
</style>
