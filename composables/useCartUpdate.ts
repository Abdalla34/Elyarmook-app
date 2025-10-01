// Cart update utility
export const triggerCartUpdate = () => {
  if (process.client) {
    window.dispatchEvent(new CustomEvent('cart-updated'));
  }
};

// Composable for easy access to cart update trigger
export const useCartUpdate = () => {
  return {
    triggerCartUpdate
  };
};