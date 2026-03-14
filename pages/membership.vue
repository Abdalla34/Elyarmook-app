<template>
  <div class="membership">
    <div class="container">
      <div v-if="isSkele" class="row justify-content-center">
        <skeletons-member-ships />
      </div>
      <div v-else class="row justify-content-center">
        <div class="col-lg-8 col-md-5 col-sm-12">
          <h1 class="fs-4 fw-bold mb-4" v-if="allMemberShip.length > 0">Available Membership</h1>

          <div v-if="!token"
            class="box-car d-flex align-items-center gap-3 justify-content-between mb-3 pt-1 pb-1 pe-3 ps-3">
            <div class="car-details d-flex align-items-center gap-3">
              <img src="/car-add.png" alt="" class="w" />
              <!-- <PuplicIconCarIcon /> -->
            </div>
            <div class="btn-change" @click="navigateTo(localePath('/my-cars'))">
              <button type="button" class="btn btn-change text-white text-capitalize">
                {{ $t("add car") }}
              </button>
            </div>
          </div>


          <!-- car user -->
          <div v-if="mycars.length >= 1"
            class="box-car d-flex align-items-center gap-3 justify-content-between mb-3 pt-1 pb-1 pe-3 ps-3">
            <div v-if="defaultCar" class="car-details d-flex align-items-center gap-3">
              <img :src="defaultCar.brand?.image" alt="" />

              <h1 class="title-boxsm ">
                {{ defaultCar.brand?.title }} - {{ defaultCar.car_type?.title }}
              </h1>
            </div>
            <div class="btn-change" @click="navigateTo(localePath('/my-cars'))">
              <button type="button" class="btn btn-change text-white">
                {{ $t("change") }}
              </button>
            </div>
          </div>
          <!-- if no active memberships -->
          <div class="text-center" v-if="allMemberShip.length === 0 || !token">
            <img class="mb-2" src="/Group.png" alt="">
            <h3>No Active Memberships Yet</h3>
            <p>Once you subscribe or earn one, it will appear here.</p>
          </div>
          <!-- all memberships -->
          <h1 class="fs-6 fw-bold mb-3 mt-3" v-if="allMemberShip.length > 0">All Memberships</h1>
          <div v-for="member in allMemberShip" :key="member.id" class="d-flex">
            <img class="mb-3 image" v-if="member.image" :src="member.image" alt="membershipimage"
              @click="navigateTo(localePath(`/membership-details/${member.id}`))">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const isSkele = ref(true);
const allMemberShip = ref([]);
const localePath = useLocalePath();
const { memberShips, memberShipSubscriptions } = useApi();
const endTimeCach = 12 * 60 * 60 * 1000;
async function cachMemebr() {
  try {
    if (token.value) {
    const rescar = await useApi().getMycars();
    mycars.value = rescar?.data || [];
    // const response = await memberShipSubscriptions();
    // console.log(response);
  }else{
    localStorage.removeItem("memberShips");
    allMemberShip.value = [];
    isSkele.value = false;
  }
    const getLocal = localStorage.getItem("memberShips");
    const currentDate = Date.now();
    if (getLocal) {
      const Parse = JSON.parse(getLocal);
      if (currentDate - Parse.timestamp < endTimeCach) {
        allMemberShip.value = Parse.memberShips;
        isSkele.value = false;
      }
    }

    const response = await memberShips(defaultCar.value.id);
    allMemberShip.value = response?.data;
    isSkele.value = false;
    localStorage.setItem(
      "memberShips",
      JSON.stringify({
        memberShips: allMemberShip.value,
        timestamp: currentDate,
      })
    );
  } catch (err) {
    console.log('Error fetching');
  } finally {
    isSkele.value = false;
  }
}
const mycars = ref([]);
const defaultCar = computed(
  () => mycars.value.find((car) => car.is_default) || null
);
const token = useCookie("token");


onMounted(async () => {
cachMemebr();

});
</script>

<style scoped>
.image {
  max-height: 200px;
  cursor: pointer;
  width: 100%;
  margin: auto;
}

.box-car {
  border-radius: 10px;
  background-color: var(--color-secound-main);
}

.box-car img {
  max-width: 40px;
}

@media (max-width:768px) {
  .image {
    width: 100%;
  }
}
</style>
