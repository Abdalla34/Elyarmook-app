<template>
  <div>
    <ProfileDetails />
    <div class="branches-information">
      <div class="container">
        <div class="row">
          <div class="col-8 col-padding">
            <GoPageArrow
              title="help > our branches"
              :showIcon="true"
              backPath="/help"
            />

            <div class="map">
              <!-- <div class="img-map img-offer-card img margin-40px">
                <iframe
                  width="100%"
                  height="400"
                  style="border: 0"
                  loading="lazy"
                  allowfullscreen
                  src="https://www.google.com/maps?q=24.79986631091,46.697413512036&hl=ar&z=14&output=embed"
                >
                </iframe>
              </div> -->
              <div class="scroll-map">
                <div class="details-map" v-for="branch in branches">
                  <div class="raiydah">
                    <h6 class="text-capitalize fw-bold">{{ branch.title }}</h6>
                  </div>
                  <div
                    class="area d-flex align-items-center justify-content-between"
                  >
                    <div>
                      <div class="date d-flex gap-3 align-items-center">
                        <div
                          class="icons-time icons d-flex align-items-center justify-content-center"
                        >
                          <PuplicIconTimeIcon />
                        </div>
                        <div class="day-time">
                          <p class="tme font-p color">
                            {{
                              dayjs(branch.start_time, "h:mm A").format(
                                "h:mm A"
                              )
                            }}
                            -
                            {{
                              dayjs(branch.end_time, "h:mm A").format("h:mm A")
                            }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="location d-flex gap align-items-center">
                      <div
                        class="icons-location icons d-flex align-items-center justify-content-center"
                      >
                        <PuplicIconLocation />
                      </div>
                      <div class="text width-text">
                        <p class="font-p color">
                          {{ branch.map_desc }}
                        </p>
                      </div>
                      <div class="arrow">
                        <PuplicIconArrowLocation />
                      </div>
                    </div>
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

<script setup>
let dayjs = useDayjs();
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

let branches = ref([]);
try {
  let res = await useApi().getBranches();
  branches.value = res.data?.items;
  console.log(branches);
} catch (err) {
  console.log(err);
}
</script>

<style scoped>
@import "@/assets/css/map.css";
</style>
