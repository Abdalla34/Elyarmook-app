<template>
  <div class="order-details">
    <div class="container">
      <div class="row">
        <div class="col-8 col-padding">
          <h1 data-v-8bcd5751 class="text-capitalize text title-pages">
            order Details
          </h1>

          <div class="order">
            <div class="input-user position-relative d-flex flex-column">
              <label for="" class="label">my car</label>
              <select v-model="selectedCar" class="input-style">
                <option disabled selected>Ex : {{ user.name }}</option>
                <option v-for="car in mycars" :key="car.id" :value="car.id">
                  {{ car.car_type.title }}
                </option>
              </select>
              <div class="icon-shape position-absolute">
                <icons-order-iconunion />
              </div>
            </div>

            <div
              class="branch-date d-flex align-items-center justify-content-between gap-3"
            >
              <div
                class="input-barnch position-relative fix d-flex flex-column"
              >
                <label for="" class="label">branch</label>
                <select
                  @click="branshshow"
                  v-model="selectedBranch"
                  class="input-style"
                >
                  <option disabled value="">Select Branch</option>
                  <option v-for="br in branches" :key="br.id" :value="br.id">
                    {{ br.title }}
                  </option>
                </select>
                <div class="icon-shape position-absolute">
                  <icons-order-iconunion />
                </div>
              </div>

              <div class="input-date position-relative fix d-flex flex-column">
                <label class="label">Date</label>

                <div class="datepicker-wrapper position-relative w-100">
                  <datepicker
                    v-model="selectedDate"
                    placeholder="select date"
                    class="input-style w-100"
                  />

                  <div class="icon-shape position-absolute data-picker-icon">
                    <icons-order-iconunion />
                  </div>
                </div>
              </div>
            </div>

            <div class="details-issues d-flex flex-column">
              <label for="" class="label">details</label>
              <textarea
                name=""
                id=""
                class="textarea"
                placeholder="issues details"
                v-model="note"
              ></textarea>
            </div>

            <div class="problem-photo d-flex flex-column position-relative">
              <label for="" class="label">problem photo</label>

              <div class="position-relative">
                <svg
                  class="svg-position position-absolute"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.5188 6.7002C19.2622 5.17522 18.5071 3.78349 17.3523 2.72735C16.0691 1.55276 14.401 0.90625 12.6638 0.90625C11.3214 0.90625 10.0136 1.2912 8.89328 2.01668C7.96052 2.61877 7.18569 3.43308 6.63788 4.39052C6.40099 4.3461 6.15422 4.32143 5.90746 4.32143C3.80999 4.32143 2.10241 6.02901 2.10241 8.12648C2.10241 8.39792 2.13202 8.65949 2.18137 8.91612C0.824183 9.90316 0 11.4923 0 13.1851C0 14.5521 0.508328 15.8797 1.43615 16.9309C2.38865 18.0068 3.64713 18.6434 4.98951 18.7175C5.00432 18.7175 5.01419 18.7175 5.02899 18.7175H9.27329C9.64343 18.7175 9.93954 18.4214 9.93954 18.0512C9.93954 17.6811 9.64343 17.385 9.27329 17.385H5.04874C3.03023 17.2616 1.33251 15.3418 1.33251 13.1802C1.33251 11.7835 2.08266 10.4806 3.29179 9.77485C3.5731 9.61199 3.69155 9.27146 3.58297 8.96547C3.48427 8.69897 3.43492 8.41766 3.43492 8.11661C3.43492 6.75449 4.54534 5.64407 5.90746 5.64407C6.19864 5.64407 6.48489 5.69342 6.75139 5.79212C7.07711 5.91057 7.43738 5.76251 7.58544 5.45159C8.50833 3.49231 10.5022 2.22889 12.6687 2.22889C15.5805 2.22889 17.984 4.41026 18.2603 7.3023C18.2899 7.60335 18.517 7.84518 18.8131 7.89453C21.0093 8.26961 22.6675 10.298 22.6675 12.6126C22.6675 15.0654 20.7378 17.1974 18.359 17.38H14.7218C14.3516 17.38 14.0555 17.6761 14.0555 18.0463C14.0555 18.4164 14.3516 18.7125 14.7218 18.7125H18.3837C18.3985 18.7125 18.4133 18.7125 18.4331 18.7125C19.9383 18.604 21.3448 17.913 22.3911 16.7582C23.4324 15.6132 24 14.1425 24 12.6126C23.9951 9.84394 22.1049 7.38127 19.5188 6.7002Z"
                    fill="#3D3D3D"
                  />
                  <path
                    d="M15.9998 13.8172C16.2614 13.5556 16.2614 13.1361 15.9998 12.8745L12.4712 9.34585C12.3478 9.22247 12.175 9.14844 12.0023 9.14844C11.8296 9.14844 11.6568 9.21753 11.5335 9.34585L8.00477 12.8745C7.7432 13.1361 7.7432 13.5556 8.00477 13.8172C8.13309 13.9455 8.30582 14.0146 8.47362 14.0146C8.64141 14.0146 8.81415 13.9504 8.94246 13.8172L11.3361 11.4236V22.4242C11.3361 22.7943 11.6322 23.0904 12.0023 23.0904C12.3725 23.0904 12.6686 22.7943 12.6686 22.4242V11.4236L15.0622 13.8172C15.3188 14.0787 15.7383 14.0787 15.9998 13.8172Z"
                    fill="#3D3D3D"
                  />
                </svg>

                <input
                  class="text-center w-100"
                  type=""
                  placeholder="upload a file from your device"
                />
              </div>
            </div>

            <div class="buttons-order d-flex justify-content-center gap-2">
              <button
                @click="navigateTo('/services')"
                class="additems text-capitalize label"
              >
                <i class="fa-solid fa-plus"></i>
                add another items
              </button>
              <button
                @click="UpdateOrderDetails"
                class="continue text-capitalize label button"
              >
                continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Datepicker from "vue3-datepicker";
import { format } from "date-fns";
import dayjs from "#build/dayjs.imports.mjs";

let selectedCar = ref(null);
let selectedBranch = ref(null);
let selectedDate = ref(null);
let note = ref("");

let mycars = ref([]);
let res = await useApi().getMycars();
mycars.value = res?.data || [];

let branches = ref([]);
let resBranshes = await useApi().getBranches();
branches.value = resBranshes?.data?.items;
let user = useCookie("user").value;

let route = useRoute();
let idCart = route.query.id;
let router = useRouter();
let UpdateOrderDetails = async () => {
  try {
    let response = await useApi().updateCartDetails(idCart, {
      branch_id: selectedBranch.value,
      reservation_time: dayjs(selectedDate.value).format("YYYY-MM-DD HH:mm:ss"),
      user_car_id: selectedCar.value,
      customer_note: note.value,
    });
    if (response && response.data) {
      await useApi().getMyCart();
      router.push({
        path: "/cart-update-details",
        query: {
          id: idCart,
        },
      });
    }
    console.log(response);
  } catch (err) {
    if (response?.status === 404) {
      console.log(err);
    }
  }
};

console.log(idCart);
</script>

<style scoped>
@import "@/assets/css/orderDetails.css";
.icon-shape {
  right: 10px;
  top: 50%;
  pointer-events: none;
}
select {
  appearance: none;
}
.data-picker-icon {
  top: 50%;
  transform: translateY(-80%);
}
.selected {
  color: #7e7e7e;
}
.input-style {
  cursor: pointer;
}
</style>
