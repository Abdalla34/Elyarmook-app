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
              <div id="google-map" style="width: 100%; height: 400px"></div>
              <div class="scroll-map">
                <div style="cursor: pointer"
                  class="details-map"
                  v-for="(branch, index) in branches"
                  :key="branch.id"
                  @click="focusBranch(branch.id)"
                >
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
                        <p class="font-p color">{{ branch.map_desc }}</p>
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
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

let branches = ref([]);
let map = null;
let markers = [];
let infoWindows = [];

try {
  const res = await useApi().getBranches();
  branches.value = res.data?.items || [];
} catch (err) {
  console.error(err);
}


onMounted(() => {
  if (!window.google) {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBJfohIso1D_UllVzMFdpckDQVC5SkuEjk&libraries=places";
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);
  } else {
    initMap();
  }
});

function initMap() {
  if (!branches.value.length) return;

  map = new google.maps.Map(document.getElementById("google-map"), {
    center: {
      lat: branches.value[0].lat,
      lng: branches.value[0].lng,
    },
    zoom: 12,
  });

  branches.value.forEach((branch) => {
    const marker = new google.maps.Marker({
      position: { lat: branch.lat, lng: branch.lng },
      map,
      title: branch.title,
    });
    markers.push(marker);

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div>
          <h6>${branch.title}</h6>
          <p>${branch.map_desc}</p>
          <p>${dayjs(branch.start_time, "h:mm A").format("h:mm A")} - ${dayjs(
        branch.end_time,
        "h:mm A"
      ).format("h:mm A")}</p>
        </div>
      `,
    });
    infoWindows.push(infoWindow);

    marker.addListener("click", () => {
      infoWindows.forEach((iw) => iw.close());
      infoWindow.open(map, marker);
    });
  });
}


function focusBranch(branchId) {
  const branch = branches.value.find(b => b.id === branchId);
  const marker = markers[branches.value.indexOf(branch)];
  const infoWindow = infoWindows[branches.value.indexOf(branch)];

  map.panTo({ lat: branch.lat, lng: branch.lng });
  map.setZoom(14);
  infoWindows.forEach((iw) => iw.close());
  infoWindow.open(map, marker);
}
</script>

<style scoped>
@import "@/assets/css/map.css";
</style>
