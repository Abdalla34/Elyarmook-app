
const myCars = ref<any[]>([]);
const isLoaded = ref(false);
export function useMyCars() {
  const defaultCar = computed(
    () => myCars.value.find((car) => car.is_default) || null
  );
  const fetchMyCars = async () => {
    try {
      let token = useCookie("token").value;
      if (!token) {
        myCars.value = [];
        return;
      }
      let res = await useApi().getMycars();
      myCars.value = res?.data || [];
      isLoaded.value = true;
    } catch (err) {
      console.log("error fetch cars", err);
    }
  };
  const addCar = (car: any) => {
    myCars.value.push(car);
  };
  return { myCars, defaultCar, isLoaded, fetchMyCars, addCar };
}
