// Add interfaces for API types
interface SendOTPResponse {
  status: boolean;
  data: {
    registered: boolean;
  };
  message: string;
}

interface LoginForm {
  phone: string;
  name?: string;
  email?: string;
  code?: string;
  registered?: boolean;
  otp_code?: string;
}

interface RatingForm {
  branch_id: number;
  app_rating: number;
  branch_rating: number;
  comment?: string;
}

export const useApi = () => {
  const appConfig = useAppConfig();
  const baseURL = appConfig.baseURL;
  const token: any = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });

  // Common headers configuration
  const headers = {
    'Authorization': `Bearer ${token.value}`,
    'Content-Type': 'application/json',
  };

  /**
   * Function to call sendOTP endpoint
   * @param {phone: string}
   * @returns Promise<SendOTPResponse>
   */
  const sendOTP = async (phone: string): Promise<SendOTPResponse> => {
    return await $fetch<SendOTPResponse>(`${baseURL}/auth/send-otp`, {
      method: 'POST',
      body: { phone },
    });
  };

  /**
   * Function to call checkOTP endpoint
   * @param {phone: string}, {code: string}
   * @returns Promise<any>
   */
  const checkOTP = async (phone: string, code: string): Promise<any> => {
    return await $fetch<any>(`${baseURL}/auth/check-code`, {
      method: 'POST',
      body: { phone, code },
    });
  };

  /**
   * Function to call loginOrRegister endpoint
   * @returns Promise<any>
   */
  const loginOrRegister = async (form: LoginForm): Promise<any> => {
    return await $fetch<any>(`${baseURL}/auth/login-or-register`, {
      method: 'POST',
      body: form,
    });
  };

  /**
   * Function to call getCountries endpoint
   * @returns Promise<any>
   */
  const getCountries = async (): Promise<any> => {
    return await $fetch<any>(`${baseURL}/core/countries`, {
      method: 'GET',
      headers,
    });
  };

  /**
   * Function to call getAreasByCountry endpoint
   * @returns Promise<any>
   */
  const getAreasByCountry = async (countryId: number): Promise<any> => {
    return await $fetch<any>(`${baseURL}/core/countries/${countryId}/areas`, {
      method: 'GET',
      headers,
    });
  };

  /**
   * Function to call getCitiesByArea endpoint
   * @returns Promise<any>
   */
  const getCitiesByArea = async (areaId: number): Promise<any> => {
    return await $fetch<any>(`${baseURL}/core/countries/${areaId}/cities`, {
      method: 'GET',
      headers,
    });
  };

  /**
   * Function to call getBranches endpoint
   * @returns Promise<any>
   */
  const getBranches = async (): Promise<any> => {
    return await $fetch<any>(`${baseURL}/core/branches`, {
      method: 'GET',
      headers,
    });
  };

  /**
   * Function to call getAvailableTimes endpoint
   * @returns Promise<any>
   */
  const getAvailableTimes = async (): Promise<any> => {
    return await $fetch<any>(`${baseURL}/core/branches/available-times`, {
      method: 'GET',
      headers,
    });
  };

  /**
   * Function to call getCarTypes endpoint
   * @returns Promise<any>
   */
  const getCarTypes = async (): Promise<any> => {
    return await $fetch<any>(`${baseURL}/core/car-types`, {
      method: 'GET',
      headers,
    });
  };

  /**
   * Function to call getProblems endpoint
   * @returns Promise<any>
   */
  const getProblems = async (): Promise<any> => {
    return await $fetch<any>(`${baseURL}/core/problems`, {
      method: 'GET',
      headers,
    });
  };

  /**
   * Function to call getSettings endpoint
   * @returns Promise<any>
   */
  const getSettings = async (): Promise<any> => {
    return await $fetch<any>(`${baseURL}/settings`, {
      method: 'GET',
      headers,
    });
  };

  /**
   * Function to call getCancelReasons endpoint
   * @returns Promise<any>
   */
  const getCancelReasons = async (): Promise<any> => {
    return await $fetch<any>(`${baseURL}/core/cancel-reasons`, {
      method: 'GET',
      headers,
    });
  };

  /**
   * Function to call getDeactivatedReasons endpoint
   * @returns Promise<any>
   */
  const getDeactivatedReasons = async (): Promise<any> => {
    return await $fetch<any>(`${baseURL}/core/deactivated-reasons`, {
      method: 'GET',
      headers,
    });
  };

  /**
   * Function to call getFAQs endpoint
   * @returns Promise<any>
   */
  const getFAQs = async (): Promise<any> => {
    return await $fetch<any>(`${baseURL}/core/faqs`, {
      method: 'GET',
      headers,
    });
  };

  /**
   * Function to call getSliders endpoint
   * @returns Promise<any>
   */
  const getSliders = async (): Promise<any> => {
    return await $fetch<any>(`${baseURL}/core/sliders`, {
      method: 'GET',
      headers,
    });
  };

  /**
   * Function to call rateBranch endpoint
   * @param {rating: number}, {comment: string}
   * @returns Promise<any>
   */
  const rateBranch = async (branchId: number, rating: number, comment?: string): Promise<any> => {
    return await $fetch<any>(`${baseURL}/core/branch/rate/${branchId}`, {
      method: 'POST',
      body: { rating, comment },
      headers,
    });
  };

  /**
   * Function to call rateAppAndBranch endpoint
   * @returns Promise<any>
   */
  const rateAppAndBranch = async (form: RatingForm): Promise<any> => {
    return await $fetch<any>(`${baseURL}/core/app/branch/rate`, {
      method: 'POST',
      body: form,
      headers,
    });
  };

  /**
   * Function to call scanImage endpoint
   * @param {image: file}
   * @returns Promise<any>
   */
  const scanImage = async (image: File): Promise<any> => {
    return await $fetch<any>(`${baseURL}/core/scan-image`, {
      method: 'POST',
      body: { image },
      headers,
    });
  };

  /**
   * Function to get the current user's cart
   * @returns Promise<any>
   */
  const getMyCart = async (): Promise<any> => {
    return await $fetch<any>(`${baseURL}/marketplace/cart/my-cart`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    });
  };

  /**
   * Function to add a single item to the cart
   * @param {type: string, item_id: number, qty: number}
   * @returns Promise<any>
   */
  const addToCart = async (type: string, item_id: number, qty: number): Promise<any> => {
    return await $fetch<any>(`${baseURL}/marketplace/cart/add-to-cart`, {
      method: 'POST',
      body: { type, item_id, qty },
      headers,
    });
  };

  /**
   * Function to add multiple items to the cart
   * @param {items: Array<{type: string, item_id: number, qty: number}>}
   * @returns Promise<any>
   */
  const addToCartMulti = async (items: Array<{type: string, item_id: number, qty: number}>): Promise<any> => {
    return await $fetch<any>(`${baseURL}/marketplace/cart/add-to-cart-multi`, {
      method: 'POST',
      body: { items },
      headers,
    });
  };

  /**
   * Function to update the quantity of a cart item
   * @param {type: string, order_id: number, cart_item_id: number, qty: number}
   * @returns Promise<any>
   */
  const updateCartItemQuantity = async (type: string, order_id: number, cart_item_id: number, qty: number): Promise<any> => {
    return await $fetch<any>(`${baseURL}/marketplace/cart/update-quantity-cart`, {
      method: 'POST',
      body: { type, order_id, cart_item_id, qty },
      headers,
    });
  };

  /**
   * Function to delete an item from the cart
   * @param {type: string, order_id: number, cart_item_id: number}
   * @returns Promise<any>
   */
  const deleteItemFromCart = async (type: string, order_id: number, cart_item_id: number): Promise<any> => {
    return await $fetch<any>(`${baseURL}/marketplace/cart/delete-item-from-cart`, {
      method: 'POST',
      body: { type, order_id, cart_item_id },
      headers,
    });
  };

  /**
   * Function to apply a voucher to the cart
   * @param {cart_id: number, promo_code_id: string}
   * @returns Promise<any>
   */
  const applyVoucherToCart = async (cart_id: number, promo_code_id: string): Promise<any> => {
    return await $fetch<any>(`${baseURL}/marketplace/cart/apply-voucher/${cart_id}`, {
      method: 'POST',
      body: { promo_code_id },
      headers,
    });
  };

  /**
   * Function to delete a voucher from the cart
   * @param {cart_id: number}
   * @returns Promise<any>
   */
  const deleteVoucherFromCart = async (cart_id: number): Promise<any> => {
    return await $fetch<any>(`${baseURL}/marketplace/cart/delete-voucher/${cart_id}`, {
      method: 'POST',
      body: {},
      headers,
    });
  };

  /**
   * Function to update cart details
   * @param {cart_id: number, details: Record<string, any>}
   * @returns Promise<any>
   */
  const updateCartDetails = async (cart_id: number, details: Record<string, any>): Promise<any> => {
    return await $fetch<any>(`${baseURL}/marketplace/cart/cart-details/${cart_id}`, {
      method: 'POST',
      body: details,
      headers,
    });
  };

  /**
   * Function to get car services
   * @param {Object} params - Optional query params (per_page, keyword, etc.)
   * @returns Promise<any>
   */
  const getServices = async (params: Record<string, any> = {}): Promise<any> => {
    return await $fetch<any>(`${baseURL}/car/services`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      params,
    });
  };

  /**
   * Function to get spare parts
   * @param {Object} params - Optional query params (per_page, keyword, brand_ids[], car_type_ids[])
   * @returns Promise<any>
   */
  const getSpareParts = async (params: Record<string, any> = {}): Promise<any> => {
    return await $fetch<any>(`${baseURL}/car/spare-parts`, {
      method: 'GET',
      headers,
      params,
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
    // Cart flow
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
  };
};