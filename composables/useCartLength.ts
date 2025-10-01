export function useCartLength() {
  const cartLength = ref(0);
  const token = useCookie("token");
  
  // Calculate cart length for guest users (localStorage)
  const calculateGuestCartLength = () => {
    try {
      const storedCart = localStorage.getItem("cartGuest");
      const cart = storedCart ? JSON.parse(storedCart) : [];
      return cart.reduce((total: number, item: any) => total + (item.qty || 1), 0);
    } catch {
      return 0;
    }
  };

  // Calculate cart length for authenticated users (API)
  const calculateAuthCartLength = async () => {
    try {
      const res = await useApi().getMyCart();
      if (res?.data) {
        const services = res.data.services || [];
        const offers = res.data.offers || [];
        const spareParts = res.data.spare_parts || [];
        
        const servicesCount = services.reduce((total: number, item: any) => total + (item.qty || 1), 0);
        const offersCount = offers.length; // Offers typically don't have quantities
        const sparePartsCount = spareParts.reduce((total: number, item: any) => total + (item.qty || 1), 0);
        
        return servicesCount + offersCount + sparePartsCount;
      }
      return 0;
    } catch {
      return 0;
    }
  };

  // Update cart length based on authentication status
  const updateCartLength = async () => {
    if (token.value) {
      cartLength.value = await calculateAuthCartLength();
    } else {
      cartLength.value = calculateGuestCartLength();
    }
  };

  // Initialize cart length on mount
  onMounted(() => {
    updateCartLength();
    
    // Listen for localStorage changes (for guest cart)
    if (process.client) {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'cartGuest' && !token.value) {
          cartLength.value = calculateGuestCartLength();
        }
      };

      const handleCartUpdate = () => {
        updateCartLength();
      };

      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('cart-updated', handleCartUpdate);

      // Cleanup listeners
      onUnmounted(() => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('cart-updated', handleCartUpdate);
      });
    }
  });

  // Watch for token changes
  watch(token, () => {
    updateCartLength();
  });

  // Manually refresh cart length (useful after cart operations)
  const refreshCartLength = () => {
    updateCartLength();
  };

  return {
    cartLength: readonly(cartLength),
    refreshCartLength,
    updateCartLength
  };
}