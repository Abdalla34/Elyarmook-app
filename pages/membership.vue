<template>
  <div class="membership">
    <div class="container">
      <div v-if="isSkele" class="row justify-content-center">
        <skeletons-member-ships />
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-5 col-sm-12">
          <div
            class="card mb-3 shadow rounded overflow-hidden"
            v-for="value in allMemberShip"
            :key="value.id"
            style="cursor: pointer"
            @click="navigateTo(localePath(`/membership-details/${value.id}`))"
          >
            <img
            v-if="value.image"
              :src="value.image"
              class="card-img-top image-member"
              :alt="value.descrption"
            />
            <h1 class="label ps-2 text-start">{{ value.name }}</h1>
            <div class="card-body d-flex justify-content-between">
              <div class="price-month d-flex align-items-center gap-2">
                <p class="price">
                  {{ value.price_after_discount }}
                  <span class="text-uppercase">{{ $t("sar") }}</span>
                </p>
                <p>
                  | {{ value.plan_duration }}
                  <span class="month"
                    ><i class="fa-solid fa-calendar-days"></i
                  ></span>
                </p>
              </div>
              <div class="subscripe" style="cursor: pointer">
                <p class="text-capitalize text-danger label">
                  {{ $t("subscripe now") }} >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { tr } from "date-fns/locale";

const isSkele = ref(true);
const allMemberShip = ref([]);
const localePath = useLocalePath();
const { memberShips } = useApi();
const endTimeCach = 12 * 60 * 60 * 1000;
async function cachMemebr() {
  try {
    const getLocal = localStorage.getItem("memberShips");
    const currentDate = Date.now();
    if (getLocal) {
      const Parse = JSON.parse(getLocal);
      if (currentDate - Parse.timestamp < endTimeCach) {
        allMemberShip.value = Parse.memberShips;
        isSkele.value = false;
      }
    }
    const response = await memberShips();
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

onMounted(async () => {
  cachMemebr();
});
</script>

<style scoped>
.card:hover {
  opacity: 0.7;
}
.month i {
  color: var(--main-color);
}
</style>
