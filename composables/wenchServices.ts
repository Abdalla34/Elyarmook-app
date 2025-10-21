export function useWenchServices() {
  const appConfig = useAppConfig();
  const baseURL = appConfig.baseURL;
  const token = useCookie("token");
  const headers = {
    Authorization: `Bearer ${token.value}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  const problems = async () => {
    return await $fetch(`${baseURL}/core/problems`, {
      method: "GET",
    });
  };

  const createWenchOrder = async (payload: any, type: any) => {
    return await $fetch(`${baseURL}/order/orders`, {
      method: "POST",
      body: {
        ...payload,
        type,
      },
      headers,
    });
  };

  const updateWenchOrder = async (orderId: any, payload: any) => {
    return await $fetch(`${baseURL}/order/orders/${orderId}`, {
      method: "PUT",
      headers,
      body: payload, 
    });
  };
  // const updateWenchOrder = async (
  //   orderId: any,
  //   branch_id: any,
  //   delivery_direction: any,
  //   problem_id: any,
  //   reservation_time: any,
  //   address: any,
  //   lat: any,
  //   lng: any,
  //   user_car_id: any,
  //   address_return: any,
  //   lat_return: any,
  //   lng_return: any,
  //   is_booking_now: any,
  //   in_cart: any
  // ) => {
  //   return await $fetch(`${baseURL}/order/orders/${orderId}`, {
  //     method: "PUT",
  //     headers,
  //     body: {
  //       branch_id,
  //       delivery_direction,
  //       problem_id,
  //       reservation_time,
  //       address,
  //       lat,
  //       lng,
  //       user_car_id,
  //       address_return,
  //       lat_return,
  //       lng_return,
  //       is_booking_now,
  //       in_cart,
  //     },
  //   });
  // };

  const getWenchInCart = async () => {
    return $fetch(`${baseURL}/order/wench-cart`, {
      method: "GET",
      headers,
    });
  };

  return {
    problems,
    createWenchOrder,
    getWenchInCart,
    updateWenchOrder,
  };
}
