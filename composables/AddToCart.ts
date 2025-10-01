export function useAddToCart() {
  const loadingAddToCart = ref<{ [key: number]: boolean }>({});
  const inCart = ref<{ [key: number]: boolean }>({});
  const allCartGuest = ref<any[]>([]);
  const btnShooping = ref(false);
  const token = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });
  
  // Use centralized cart update function
  const { triggerCartUpdate } = useCartUpdate();

  // Initialize cart state from localStorage
  function initCartFromLocalStorage() {
    const storedCart = JSON.parse(localStorage.getItem("cartGuest") || "[]");
    allCartGuest.value = storedCart;
    storedCart.forEach((item: any) => {
      inCart.value[item.id] = true;
      btnShooping.value = true;
    });
  }

  async function handleAdd(service: any, type: string) {
    if (!token.value) {
      let currentCart: any[] = [];
      try {
        const storedCart = localStorage.getItem("cartGuest");
        currentCart = storedCart ? JSON.parse(storedCart) : [];
      } catch {
        currentCart = [];
      }
      if (!currentCart.some((item) => item.id === service.id)) {
        currentCart.push({ id: service.id, qty: 1, type });
        inCart.value[service.id] = true;
        btnShooping.value = true;
      }
      localStorage.setItem("cartGuest", JSON.stringify(currentCart));
      allCartGuest.value = currentCart;
      triggerCartUpdate(); // Trigger cart update for guest users
    }

    if (token.value) {
      loadingAddToCart.value[service.id] = true;
      try {
        const res: any = await useApi().addToCart(type, service.id, 1);
        if (res.status) {
          service.in_cart = true;
          triggerCartUpdate(); // Trigger cart update for authenticated users
        }
      } catch (err: any) {
        if (err?.response?.status === 401) {
          console.log("User is not authenticated");
        }
      } finally {
        loadingAddToCart.value[service.id] = false;
      }
    }
  }

  function removeFromlocal(service: any) {
    let getLocal = localStorage.getItem("cartGuest");
    let cart = JSON.parse(getLocal || "[]");
    cart = cart.filter((item: any) => item.id !== service.id);
    localStorage.setItem("cartGuest", JSON.stringify(cart));
    allCartGuest.value = cart;
    inCart.value[service.id] = false;

    // Only hide shopping button if cart is empty
    if (cart.length === 0) {
      btnShooping.value = false;
    }
    
    triggerCartUpdate(); // Trigger cart update when removing items
  }

  return {
    loadingAddToCart,
    inCart,
    allCartGuest,
    btnShooping,
    handleAdd,
    removeFromlocal,
    initCartFromLocalStorage,
  };
}
