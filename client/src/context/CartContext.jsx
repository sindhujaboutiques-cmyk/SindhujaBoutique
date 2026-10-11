import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const parsePrice = (priceVal) => {
  if (typeof priceVal === 'number') return priceVal;
  if (!priceVal) return 0;
  const cleaned = String(priceVal).replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

export const formatINR = (val) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val || 0);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sinduja_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed reading cart from localStorage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sinduja_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed saving cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product, options = {}) => {
    const {
      size = product.sizes?.[0] || 'Standard / Free Size',
      color = product.colors?.[0] || 'Standard Color',
      quantity = 1,
      customNotes = ''
    } = options;

    const numericPrice = parsePrice(product.price);
    const cartId = `${product.id || product._id || product.slug}_${size}_${color}`;

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.cartId === cartId);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity,
          customNotes: customNotes || updated[existingIdx].customNotes
        };
        return updated;
      }

      const newItem = {
        cartId,
        id: product.id || product._id,
        name: product.name,
        slug: product.slug,
        category: product.category,
        image: product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
        priceDisplay: product.price,
        numericPrice: numericPrice,
        size,
        color,
        quantity,
        customizable: product.customizable,
        customNotes
      };
      return [...prevCart, newItem];
    });

    setLastAddedItem(product.name);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Computed Values
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.numericPrice * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 1999;
  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 99;
  const cartTotal = cartSubtotal + shippingFee;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        shippingFee,
        cartTotal,
        amountNeededForFreeShipping,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        lastAddedItem,
        setLastAddedItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
