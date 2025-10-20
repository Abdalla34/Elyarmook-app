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

  const getLastOrder = async () => {
    return $fetch(`${baseURL}/order/last-order`, {
      method: "GET",
      headers,
    });
  };

  const updateWenchOrder = async (orderId: any, payload: any) => {
    return await $fetch(`${baseURL}/order/orders/${orderId}`, {
      method: "PUT",
      headers,
      body: {
        payload,
      },
    });
  };

  return {
    problems,
    createWenchOrder,
    getLastOrder,
    updateWenchOrder,
  };
}
