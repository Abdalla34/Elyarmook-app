import appConfig from "~/app.config";

export const useApi = () => {
  const appConfig = useAppConfig();
  const baseURL = appConfig.baseURL;
  let token = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });

  const headers = {
    Authorization: `Bearer ${token.value}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const resetToken = async () => {
    token.value = null;
  }
  const getToken = async (userToken) => {
    token.value = userToken;
  }
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
  // done
  const getAvailableTimes = async (branch_id: any, type: any) => {
    return await $fetch(`${baseURL}/core/branches/available-times`, {
      method: "GET",
      headers,
      params: { branch_id, type },
    });
  };
  // done
  const getCarTypes = async (idBrand: any) => {
    return await $fetch(`${baseURL}/core/car-types`, {
      method: "GET",
      headers,
      params: { brand_id: idBrand },
    });
  };
  // done
  const getDetailsCar = async (user_car_id: any) => {
    return $fetch(`${baseURL}/car/show/${user_car_id}`, {
      method: "GET",
      headers,
    });
  };
  // done
  const getProblems = async () => {
    return await $fetch(`${baseURL}/core/problems`, {
      method: "GET",
      headers,
    });
  };
  // done
  const getSettings = async () => {
    return await $fetch(`${baseURL}/settings`, {
      method: "GET",
      headers,
    });
  };
  // done
  const getCancelReasons = async () => {
    return await $fetch(`${baseURL}/core/cancel-reasons`, {
      method: "GET",
      headers,
    });
  };
  // done
  const getDeactivatedReasons = async () => {
    return await $fetch(`${baseURL}/core/deactivated-reasons`, {
      method: "GET",
      headers,
    });
  };

  // done
  const getSliders = async (type: any) => {
    return await $fetch(`${baseURL}/core/sliders`, {
      method: "GET",
      headers,
      params: { type },
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

  // const scanImage = async (image: any) => {
  //   return await $fetch(`${baseURL}/core/scan-image`, {
  //     method: "POST",
  //     body: { image },
  //     headers,
  //   });
  // };

  // done

  const getMyCart = async () => {
    let tokens = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });
    return await $fetch(`${baseURL}/marketplace/cart/my-cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.value}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };
  // done
  const changeOrderStatus = async (
    order_id: any,
    status: any,
    cancel_Reason_id: any
  ) => {
    return await $fetch(`${baseURL}/order/orders/change-status/${order_id}`, {
      method: "POST",
      body: { status, cancel_Reason_id },
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
  // done
  const addToCartMulti = async (
    items: { type: any; item_id: any; qty: any },
    token: any
  ) => {
    return await $fetch(`${baseURL}/marketplace/cart/add-to-cart-multi`, {
      method: "POST",
      body: items,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
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
  // done
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
  // done
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
  // done
  const updateCartDetails = async (cart_id: any, formData: any) => {
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
  // done
  const getSpareParts = async (params = {}) => {
    return await $fetch(`${baseURL}/car/spare-parts`, {
      headers,
      params,
    });
  };
  // done
  const getMyOrders = async (page = 1) => {
    // const token = useCookie("token");
    return await $fetch(`${baseURL}/order/orders?page=${page}`, {
      headers,
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
  const getFaqs = async (page: any) => {
    return await $fetch(`${baseURL}/core/faqs?per_page=${page}`, {
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
  const changeCarToDefault = async (id_default: any) => {
    return await $fetch(
      `${baseURL}/customer/change-car-to-default/${id_default}`,
      {
        method: "POST",
        headers,
      }
    );
  };
  // done
  const getWallet = async (page: any) => {
    return await $fetch(`${baseURL}/customer/wallet?page=${page}`, {
      method: "GET",
      headers,
    });
  };
  // done
  const toggleUseWallet = async (order_id: any, response_type: any) => {
    return await $fetch(`${baseURL}/marketplace/order/use_wallet/${order_id}`, {
      method: "POST",
      headers,
      body: { response_type },
    });
  };
  // done
  const ToggleWarranty = async (order_id: any, response_type: any) => {
    return await $fetch(
      `${baseURL}/marketplace/order/pro_warranty/${order_id}`,
      {
        method: "POST",
        headers,
        body: { response_type },
      }
    );
  };
  // done
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
  const redeemPoints = async (points: any) => {
    return await $fetch(`${baseURL}/customer/redeem-points`, {
      method: "POST",
      headers,
      body: { points: points },
    });
  };
  // done
  const pointTransfer = async (points: any, phone: any) => {
    return await $fetch(`${baseURL}/point/transfer`, {
      method: "POST",
      headers,
      body: { points: points, phone: phone },
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
  const deleteaccount = async (deactivated_reason_id: any, fcm_type: any) => {
    return await $fetch(`${baseURL}/customer/delete-account`, {
      method: "POST",
      body: { deactivated_reason_id, fcm_type },
      headers,
    });
  };
  // done
  const usePayment = async (orderId: any, brand: any, wallet_amount: any) => {
    return await $fetch(`${baseURL}/payment/hyper-pay/prepare-checkout`, {
      method: "POST",
      body: { order_id: orderId, brand: brand, wallet_amount: wallet_amount },
      headers,
    });
  };
  const usePaymentMembership = async (membershipId: any, brand: any) => {
    return await $fetch(`${baseURL}/payment/hyper-pay/prepare-checkout`, {
      method: "POST",
      body: { membership_id: membershipId, brand: brand },
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
  // done
  const tamaraPayment = async (payload: {
    order_id?: any;
    membership_id?: any;
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
  // done
  const tabyPayment = async (payload: {
    order_id?: any;
    membership_id?: any;
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
  // done
  const tabbyStatusSuccess = async (id: any) => {
    return await $fetch(`${baseURL}/payment/tabby/success`, {
      method: "GET",
      params: { payment_id: id },
      headers,
    });
  };
  // done
  const tabbyStatusFailure = async (id: any) => {
    return await $fetch(`${baseURL}/payment/tabby/failure`, {
      method: "GET",
      params: { payment_id: id },
      headers,
    });
  };
  // done
  const tabbyStatusCancel = async (id: any) => {
    return await $fetch(`${baseURL}/payment/tabby/cancel`, {
      method: "GET",
      params: { payment_id: id },
      headers,
    });
  };
  const chachOnDelivery = async (order_id: any) => {
    return await $fetch(`${baseURL}/payment/cash-on-delivery/${order_id}`, {
      method: "GET",
      headers,
    });
  };
  // done
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
  // done
  const reversationTime = async (orderId: any, newTime: any) => {
    return await $fetch(
      `${baseURL}/order/orders/change-reservation-time/${orderId}`,
      {
        method: "POST",
        headers,
        body: { reservation_time: newTime },
      }
    );
  };
  // done
  const changeCartToOrder = async (order_id: any) => {
    return $fetch(`${baseURL}/order/orders/change-cart-to-order/${order_id}`, {
      method: "POST",
      headers,
    });
  };
  // done
  const contactUs = async (form: any) => {
    return await $fetch(`${baseURL}/core/contact-us`, {
      method: "POST",
      headers,
      body: form,
    });
  };
  // done
  const getAvailableBrnchesTime = async (branch_id: any, type: any) => {
    return $fetch(`${baseURL}/core/branches/check-available-now`, {
      method: "GET",
      params: { branch_id: branch_id, type: type },
    });
  };
  // done All Vouchers
  const getAvailableVouchers = async () => {
    return $fetch(`${baseURL}/vouchers/available`, {
      method: "GET",
      headers,
    });
  };
  // done
  const getUsedVouhcers = async () => {
    return $fetch(`${baseURL}/vouchers/used`, {
      method: "GET",
      headers,
    });
  };
  // done
  const getExVouhcers = async () => {
    return $fetch(`${baseURL}/vouchers/expired`, {
      method: "GET",
      headers,
    });
  };
  // done
  const editCar = async (form: any, car_type_id: any) => {
    return await $fetch(`${baseURL}/customer/edit-car/${car_type_id}`, {
      method: "POST",
      body: form,
      headers,
    });
  };
  // done
  const memberShips = async () => {
    return $fetch(`${baseURL}/membership/memberships`, {
      method: "GET",
      headers,
    });
  };
  // done
  const memberShipDetails = async (membership_id: any) => {
    return $fetch(`${baseURL}/membership/memberships/${membership_id}`, {
      method: "GET",
      headers,
    });
  };

  const getWenchInCart = async () => {
    return $fetch(`${baseURL}/order/wench-cart`, {
      method: "GET",
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
    // scanImage,
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
    usePaymentMembership,
    getOfferSingle,
    getCarBrands,
    getDetailsCar,
    getAvailableBrnchesTime,
    cartypes,
    createCar,
    deleteCar,
    changeCarToDefault,
    getWallet,
    getStatusorders,
    getPoints,
    redeemPoints,
    pointTransfer,
    gethome,
    deleteaccount,
    usePayment,
    getHyperpayStatus,
    tamaraPayment,
    tabyPayment,
    tabbyStatusSuccess,
    tabbyStatusFailure,
    tabbyStatusCancel,
    chachOnDelivery,
    updateUserProfile,
    toggleUseWallet,
    ToggleWarranty,
    changeOrderStatus,
    reversationTime,
    changeCartToOrder,
    contactUs,
    getAvailableVouchers,
    getUsedVouhcers,
    getExVouhcers,
    editCar,
    memberShips,
    memberShipDetails,
    getWenchInCart,
    resetToken,
    getToken,
  };
};
