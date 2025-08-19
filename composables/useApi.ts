import appConfig from "~/app.config";

export const useApi = () => {
  const appConfig = useAppConfig();
  const baseURL = appConfig.baseURL;
  const token = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });

  const headers = {
    Authorization: `Bearer ${token.value}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  // done
  const sendOTP = async (phone: any) => {
    return await $fetch(`${baseURL}/auth/send-otp`, {
      method: "POST",
      body: { phone },
    });
  };
  // done
  const checkOTP = async (phone: any, code: any) => {
    return await $fetch(`${baseURL}/auth/check-code`, {
      method: "POST",
      body: { phone, code },
    });
  };
  // done
  const loginOrRegister = async (form: any) => {
    return await $fetch(`${baseURL}/auth/login-or-register`, {
      method: "POST",
      headers: {
        "user-type": "user",
      },
      body: form,
    });
  };
  // done
  const getCountries = async () => {
    return await $fetch(`${baseURL}/core/countries`, {
      method: "GET",
      headers,
    });
  };
  // done
  const getAreasByCountry = async (countryId: any) => {
    return await $fetch(`${baseURL}/core/countries/${countryId}/areas`, {
      method: "GET",
      headers,
    });
  };
  // done
  const getCitiesByArea = async (areaId: any) => {
    return await $fetch(`${baseURL}/core/countries/${areaId}/cities`, {
      method: "GET",
      headers,
    });
  };
  // done
  const getBranches = async () => {
    return await $fetch(`${baseURL}/core/branches`, {
      method: "GET",
      headers,
    });
  };

  const getAvailableTimes = async (branch_id: any, type: any) => {
    return await $fetch(`${baseURL}/core/branches/available-times`, {
      method: "GET",
      headers,
      params: { branch_id, type },
    });
  };
  // done
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

  // done
  const getSliders = async () => {
    return await $fetch(`${baseURL}/core/sliders`, {
      method: "GET",
      headers,
    });
  };

  const rateBranch = async (branchId: any, rating: any, comment: any) => {
    return await $fetch(`${baseURL}/core/branch/rate/${branchId}`, {
      method: "POST",
      body: { rating, comment },
      headers,
    });
  };

  const rateAppAndBranch = async (form: any) => {
    return await $fetch(`${baseURL}/core/app/branch/rate`, {
      method: "POST",
      body: form,
      headers,
    });
  };

  const scanImage = async (image: any) => {
    return await $fetch(`${baseURL}/core/scan-image`, {
      method: "POST",
      body: { image },
      headers,
    });
  };

  // done
  const getMyCart = async () => {
    return await $fetch(`${baseURL}/marketplace/cart/my-cart`, {
      method: "GET",
      headers,
    });
  };
  // done
  const addToCart = async (type: any, item_id: any, qty: any) => {
    return await $fetch(`${baseURL}/marketplace/cart/add-to-cart`, {
      method: "POST",
      body: { type, item_id, qty },
      headers,
    });
  };

  const addToCartMulti = async (items: any) => {
    return await $fetch(`${baseURL}/marketplace/cart/add-to-cart-multi`, {
      method: "POST",
      body: { items },
      headers,
    });
  };

  // done
  const updateCartItemQuantity = async (
    type: any,
    order_id: any,
    cart_item_id: any,
    qty: any
  ) => {
    return await $fetch(`${baseURL}/marketplace/cart/update-quantity-cart`, {
      method: "POST",
      body: { type, order_id, cart_item_id, qty },
      headers,
    });
  };
  // done
  const deleteItemFromCart = async (
    type: any,
    order_id: any,
    cart_item_id: any
  ) => {
    return await $fetch(`${baseURL}/marketplace/cart/delete-item-from-cart`, {
      method: "POST",
      body: { type, order_id, cart_item_id },
      headers,
    });
  };

  const applyVoucherToCart = async (cart_id: any, promo_code_id: any) => {
    return await $fetch(
      `${baseURL}/marketplace/cart/apply-voucher/${cart_id}`,
      {
        method: "POST",
        body: { promo_code_id },
        headers,
      }
    );
  };

  const deleteVoucherFromCart = async (cart_id: any) => {
    return await $fetch(
      `${baseURL}/marketplace/cart/delete-voucher/${cart_id}`,
      {
        method: "POST",
        body: {},
        headers,
      }
    );
  };

  const updateCartDetails = async (
    cart_id: any,
    formData: any
  ) => {
    return await $fetch(`${baseURL}/marketplace/cart/cart-details/${cart_id}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
  };
  
  // done
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
  // done
  const getMyOrders = async () => {
    const token = useCookie("token");
    return await $fetch(`${baseURL}/order/orders`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };
  // done
  const getSingleOrder = async (order_id: any) => {
    return await $fetch(`${baseURL}/order/orders/${order_id}`, {
      headers,
    });
  };
  // done
  const getOffers = async () => {
    return await $fetch(`${baseURL}/offer/offers`, {
      headers,
    });
  };
  // done
  const getOfferSingle = async (id: any) => {
    return await $fetch(`${baseURL}/offer/offers/${id}`, {
      headers,
    });
  };
  // done
  const getCarBrands = async () => {
    return await $fetch(`${baseURL}/core/brands`, {
      method: "GET",
      headers,
    });
  };
  // done
  const logout = async () => {
    await $fetch(`${baseURL}/auth/logout`, {
      method: "POST",
      headers,
    });
  };
  // done
  const cartypes = async (brandId: any) => {
    return await $fetch(`${baseURL}/core/car-types`, {
      method: "GET",
      headers,
      params: {
        per_page: 15,
        brand_id: brandId,
      },
    });
  };
  // done
  const getFaqs = async () => {
    return await $fetch(`${baseURL}/core/faqs`, {
      method: "GET",
      headers,
      params: {
        per_page: 15,
      },
    });
  };
  // done
  const createCar = async (form: any) => {
    return await $fetch(`${baseURL}/customer/create-car`, {
      method: "POST",
      body: form,
      headers,
    });
  };
  // done
  const getMycars = async () => {
    return await $fetch(`${baseURL}/customer/cars`, {
      method: "GET",
      headers,
    });
  };
  // done
  const deleteCar = async (car_id: any) => {
    return $fetch(`${baseURL}/customer/delete-car/${car_id}`, {
      method: "POST",
      headers,
      body: car_id,
    });
  };
  // done
  const toDefault = async (id_default: any) => {
    return await $fetch(
      `${baseURL}/customer/change-car-to-default/${id_default}`,
      {
        method: "POST",
        headers,
      }
    );
  };
  // done
  const getWallet = async () => {
    return await $fetch(`${baseURL}/customer/wallet`, {
      method: "GET",
      headers,
    });
  };

  const getStatusorders = async () => {
    return await $fetch(`${baseURL}/core/all-available-order-statuses`, {
      method: "GET",
      headers,
    });
  };
  // done
  const getPoints = async () => {
    return await $fetch(`${baseURL}/customer/points-history`, {
      method: "GET",
      headers,
    });
  };
  // done
  const gethome = async () => {
    return await $fetch(`${baseURL}/home`, {
      method: "GET",
      params: {
        slider_type: "website",
      },
    });
  };
  // done
  const deleteaccount = async (idAcc: any) => {
    return await $fetch(`${baseURL}/customer/delete-account`, {
      method: "POST",
      body: idAcc,
    });
  };
  // done
  const usePayment = async (orderId: any, brand: any) => {
    return await $fetch(`${baseURL}/payment/hyper-pay/prepare-checkout`, {
      method: "POST",
      body: { order_id: orderId, brand: brand },
      headers,
    });
  };
  // done
  const getHyperpayStatus = async (id: any) => {
    return await $fetch(`${baseURL}/payment/hyper-pay/check-status`, {
      method: "GET",
      params: { id },
      headers,
    });
  };

  const tamaraPayment = async (payload: {
    order_id: any;
    success_url: any;
    failure_url: any;
    cancel_url: any;
  }) => {
    return await $fetch(`${baseURL}/payment/tamara/prepare-checkout`, {
      method: "POST",
      headers,
      body: payload,
    });
  };

  const tabyPayment = async (payload: {
    order_id: any;
    success_url: any;
    failure_url: any;
    cancel_url: any;
  }) => {
    return await $fetch(`${baseURL}/payment/tabby/prepare-checkout`, {
      method: "POST",
      headers,
      body: payload,
    });
  };

  const tabbyStatusSuccess = async (id: any) => {
    return await $fetch(`${baseURL}/payment/tabby/success`, {
      method: "GET",
      params: { payment_id: id },
      headers,
    });
  };
  const tabbyStatusFailure = async (id: any) => {
    return await $fetch(`${baseURL}/payment/tabby/failure`, {
      method: "GET",
      params: { payment_id: id },
      headers,
    });
  };
  const tabbyStatusCancel = async (id: any) => {
    return await $fetch(`${baseURL}/payment/tabby/cancel`, {
      method: "GET",
      params: { payment_id: id },
      headers,
    });
  };

  const updateUserProfile = async (userData: {
    first_name: any;
    last_name: any;
    phone: any;
    city_id: any;
  }) => {
    return await $fetch(`${baseURL}/customer/edit-profile`, {
      method: "POST",
      body: userData,
      headers,
    });
  };

  return {
    sendOTP,
    checkOTP,
    loginOrRegister,
    logout,
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
    getFaqs,
    getSliders,
    rateBranch,
    rateAppAndBranch,
    scanImage,
    getMyCart,
    getMycars,
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
    getCarBrands,
    cartypes,
    createCar,
    deleteCar,
    toDefault,
    getWallet,
    getStatusorders,
    getPoints,
    gethome,
    deleteaccount,
    usePayment,
    getHyperpayStatus,
    tamaraPayment,
    tabyPayment,
    tabbyStatusSuccess,
    tabbyStatusFailure,
    tabbyStatusCancel,
    updateUserProfile,
  };

  // 4111111111111111
};
