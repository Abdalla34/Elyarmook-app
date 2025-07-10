export const useApi = () => {
  const appConfig = useAppConfig();
  const baseURL = appConfig.baseURL;
  const token = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });

  const headers = {
    Authorization: `Bearer ${token.value}`,
    "Content-Type": "application/json",
  };

  const sendOTP = async (phone) => {
    return await $fetch(`${baseURL}/auth/send-otp`, {
      method: "POST",
      body: { phone },
    });
  };

  const checkOTP = async (phone, code) => {
    return await $fetch(`${baseURL}/auth/check-code`, {
      method: "POST",
      body: { phone, code },
    });
  };

  const loginOrRegister = async (form) => {
    return await $fetch(`${baseURL}/auth/login-or-register`, {
      method: "POST",
      body: form,
    });
  };

  const getCountries = async () => {
    return await $fetch(`${baseURL}/core/countries`, {
      method: "GET",
      headers,
    });
  };

  const getAreasByCountry = async (countryId) => {
    return await $fetch(`${baseURL}/core/countries/${countryId}/areas`, {
      method: "GET",
      headers,
    });
  };

  const getCitiesByArea = async (areaId) => {
    return await $fetch(`${baseURL}/core/countries/${areaId}/cities`, {
      method: "GET",
      headers,
    });
  };

  const getBranches = async () => {
    return await $fetch(`${baseURL}/core/branches`, {
      method: "GET",
      headers,
    });
  };

  const getAvailableTimes = async () => {
    return await $fetch(`${baseURL}/core/branches/available-times`, {
      method: "GET",
      headers,
    });
  };

  const getCarTypes = async () => {
    return await $fetch(`${baseURL}/core/car-types`, {
      method: "GET",
      headers,
    });
  };

  const getProblems = async () => {
    return await $fetch(`${baseURL}/core/problems`, {
      method: "GET",
      headers,
    });
  };

  const getSettings = async () => {
    return await $fetch(`${baseURL}/settings`, {
      method: "GET",
      headers,
    });
  };

  const getCancelReasons = async () => {
    return await $fetch(`${baseURL}/core/cancel-reasons`, {
      method: "GET",
      headers,
    });
  };

  const getDeactivatedReasons = async () => {
    return await $fetch(`${baseURL}/core/deactivated-reasons`, {
      method: "GET",
      headers,
    });
  };

  const getFAQs = async () => {
    return await $fetch(`${baseURL}/core/faqs`, {
      method: "GET",
      headers,
    });
  };

  const getSliders = async () => {
    return await $fetch(`${baseURL}/core/sliders`, {
      method: "GET",
      headers,
    });
  };

  const rateBranch = async (branchId, rating, comment) => {
    return await $fetch(`${baseURL}/core/branch/rate/${branchId}`, {
      method: "POST",
      body: { rating, comment },
      headers,
    });
  };

  const rateAppAndBranch = async (form) => {
    return await $fetch(`${baseURL}/core/app/branch/rate`, {
      method: "POST",
      body: form,
      headers,
    });
  };

  const scanImage = async (image) => {
    return await $fetch(`${baseURL}/core/scan-image`, {
      method: "POST",
      body: { image },
      headers,
    });
  };

  const getMyCart = async () => {
    return await $fetch(`${baseURL}/marketplace/cart/my-cart`, {
      method: "GET",
      headers,
    });
  };

  const addToCart = async (type, item_id, qty) => {
    return await $fetch(`${baseURL}/marketplace/cart/add-to-cart`, {
      method: "POST",
      body: { type, item_id, qty },
      headers,
    });
  };

  const addToCartMulti = async (items) => {
    return await $fetch(`${baseURL}/marketplace/cart/add-to-cart-multi`, {
      method: "POST",
      body: { items },
      headers,
    });
  };

  const updateCartItemQuantity = async (type, order_id, cart_item_id, qty) => {
    return await $fetch(`${baseURL}/marketplace/cart/update-quantity-cart`, {
      method: "POST",
      body: { type, order_id, cart_item_id, qty },
      headers,
    });
  };

  const deleteItemFromCart = async (type, order_id, cart_item_id) => {
    return await $fetch(`${baseURL}/marketplace/cart/delete-item-from-cart`, {
      method: "POST",
      body: { type, order_id, cart_item_id },
      headers,
    });
  };

  const applyVoucherToCart = async (cart_id, promo_code_id) => {
    return await $fetch(
      `${baseURL}/marketplace/cart/apply-voucher/${cart_id}`,
      {
        method: "POST",
        body: { promo_code_id },
        headers,
      }
    );
  };

  const deleteVoucherFromCart = async (cart_id) => {
    return await $fetch(
      `${baseURL}/marketplace/cart/delete-voucher/${cart_id}`,
      {
        method: "POST",
        body: {},
        headers,
      }
    );
  };

  const updateCartDetails = async (cart_id, details) => {
    return await $fetch(`${baseURL}/marketplace/cart/cart-details/${cart_id}`, {
      method: "POST",
      body: details,
      headers,
    });
  };

  const getServices = async (params = {}) => {
    return await $fetch(`${baseURL}/car/services`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      params,
    });
  };

  const getSpareParts = async (params = {}) => {
    return await $fetch(`${baseURL}/car/spare-parts`, {
      headers,
      params,
    });
  };

  const getMyOrders = async () => {
    return await $fetch(`${baseURL}/order/orders`, {
      headers,
    });
  };

  const getSingleOrder = async (order_id) => {
    return await $fetch(`${baseURL}/order/orders/${order_id}`, {
      headers,
    });
  };

  const getOffers = async () => {
    return await $fetch(`${baseURL}/offer/offers`, {
      headers,
    });
  };

  const getOfferSingle = async (id) => {
    return await $fetch(`${baseURL}/offer/offers/${id}`, {
      headers,
    });
  };

  return {
    sendOTP,
    checkOTP,
    loginOrRegister,
    getCountries,
    getAreasByCountry,
    getCitiesByArea,
    getBranches,
    getAvailableTimes,
    getCarTypes,
    getProblems,
    getSettings,
    getCancelReasons,
    getDeactivatedReasons,
    getFAQs,
    getSliders,
    rateBranch,
    rateAppAndBranch,
    scanImage,
    getMyCart,
    addToCart,
    addToCartMulti,
    updateCartItemQuantity,
    deleteItemFromCart,
    applyVoucherToCart,
    deleteVoucherFromCart,
    updateCartDetails,
    getServices,
    getSpareParts,
    getMyOrders,
    getSingleOrder,
    getOffers,
    getOfferSingle,
  };
};
