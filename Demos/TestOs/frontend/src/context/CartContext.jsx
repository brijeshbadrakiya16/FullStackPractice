import { createContext, useState, useCallback, useEffect } from "react";

export const CartContext = createContext(null);

const loadCart = () => {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : { restaurantId: null, items: [] };
  } catch {
    return { restaurantId: null, items: [] };
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((restaurantId, item) => {
    setCart((prev) => {
      if (prev.restaurantId && prev.restaurantId !== restaurantId) {
        return { restaurantId, items: [{ ...item, count: 1 }] };
      }
      const existing = prev.items.find((i) => i._id === item._id);
      if (existing) {
        return {
          restaurantId,
          items: prev.items.map((i) =>
            i._id === item._id ? { ...i, count: Math.min(i.count + 1, item.nStock) } : i
          ),
        };
      }
      return { restaurantId, items: [...prev.items, { ...item, count: 1 }] };
    });
  }, []);

  const updateQuantity = useCallback((itemId, count, maxStock) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items
        .map((i) => (i._id === itemId ? { ...i, count: Math.min(Math.max(1, count), maxStock) } : i))
        .filter((i) => i.count > 0),
    }));
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i._id !== itemId),
    }));
  }, []);

  const clearCart = useCallback(() => {
    setCart({ restaurantId: null, items: [] });
  }, []);

  const itemCount = cart.items.reduce((sum, i) => sum + i.count, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
