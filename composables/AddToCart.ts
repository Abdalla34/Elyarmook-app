export function useAddToCart() {
  // const { syncCartCount, getMyCart } = useCart();
  const { addToCart, getMyCart } = useApi();
  const loadingAddToCart = ref<{ [key: number]: boolean }>({});
  const inCart = ref<{ [key: number]: boolean }>({});
  const allCartGuest = ref<any[]>([]);
  const btnShooping = ref(false);
  const token = useCookie("token", { maxAge: 365 * 24 * 60 * 60 });
  const cartCount = useState("cartCount", () => 0);

  // Initialize cart state from localStorage
  async function initCartFromLocalStorage() {
    if (token.value) return;
    const storedCart = JSON.parse(localStorage.getItem("cartGuest") || "[]");
    allCartGuest.value = storedCart;
    storedCart.forEach((item: any) => {
      inCart.value[item.id] = true;
      btnShooping.value = true;
    });

    cartCount.value = allCartGuest.value.length;
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
      cartCount.value = allCartGuest.value.length;
    }

    if (token.value) {
      btnShooping.value = false;
      loadingAddToCart.value[service.id] = true;
      try {
        const res: any = await addToCart(type, service.id, 1);
        if (res.status) {
          service.in_cart = true;
          cartCount.value = cartCount.value + 1;
          // await getMyCart();
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
    inCart.value = { ...inCart.value };
    cartCount.value = allCartGuest.value.length;

    // Only hide shopping button if cart is empty
    if (cart.length === 0) {
      btnShooping.value = false;
    }
  }

  return {
    loadingAddToCart,
    inCart,
    allCartGuest,
    btnShooping,
    handleAdd,
    cartCount,
    removeFromlocal,
    initCartFromLocalStorage,
  };
}
