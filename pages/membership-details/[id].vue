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
          <div class="benefits-wrapper p-4 rounded-4">
            <div class="benefits-grid">

              <div v-for="member in memberDetails?.includes?.inspection" :key="member.id"
                class="benefit-item p-2 d-flex align-items-center gap-3">
                <img :src="member.service_icon" class="img" alt="memberIcon">
                <div class="details-member">

                  <p class="benefit-title">{{ member.service_name }}</p>
                  <span class="benefit-time">{{ member.quantity_per_period }} Times</span>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="benefits">
            <div class="title-benefit text-capitalize fw-bold mt-5">the main benefits</div>
            <div class="details-grid">
              <div class="one-row">
                <div class="items d-flex align-items-center justify-content-between">

                </div>
              </div>
              <div class="two-row"></div>
            </div>
           </div> -->
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
  } catch (err) {
    console.log('Error fetching ');
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
</style>
