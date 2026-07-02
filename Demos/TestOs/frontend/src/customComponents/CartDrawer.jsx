import { useState } from "react";
import { useCart } from "../customHooks/useCart";
import { useToast } from "../customHooks/useToast";
import { apiPost } from "../utils/api";
import { formatCurrency } from "../utils/formatters";

const CartDrawer = ({ isOpen, onClose, restaurantId, nDiscountPercentage }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { showToast } = useToast();
  const [placing, setPlacing] = useState(false);

  const subtotal = cart.items.reduce((sum, i) => sum + i.nSalePrice * i.count, 0);
  const discount = subtotal * (nDiscountPercentage / 100);
  const finalPrice = subtotal - discount;

  const handlePlaceOrder = async () => {
    if (!cart.items.length) return;
    setPlacing(true);
    try {
      await apiPost("/order", {
        iRestaurantId: restaurantId,
        aItems: cart.items.map((i) => ({ iItemId: i._id, count: i.count })),
      });
      showToast("Order placed successfully!");
      clearCart();
      onClose();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className={`cart-drawer ${isOpen ? "cart-drawer--open" : ""}`}>
      <div className="cart-drawer__overlay" onClick={onClose} />
      <div className="cart-drawer__panel">
        <div className="cart-drawer__header">
          <h2>Your Order</h2>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        {!cart.items.length ? (
          <p className="empty-state">Your cart is empty</p>
        ) : (
          <>
            <div className="cart-drawer__items">
              {cart.items.map((item) => (
                <div key={item._id} className="cart-item">
                  {item.sImageUrl && (
                    <img src={item.sImageUrl} alt={item.sName} className="cart-item__img" />
                  )}
                  <div className="cart-item__info">
                    <h4>{item.sName}</h4>
                    <span>{formatCurrency(item.nSalePrice)}</span>
                    <div className="cart-item__qty">
                      <button type="button" disabled={placing} onClick={() => updateQuantity(item._id, item.count - 1, item.nStock)} aria-label="Decrease quantity">−</button>
                      <span>{item.count}</span>
                      <button type="button" disabled={placing || item.count >= item.nStock} onClick={() => updateQuantity(item._id, item.count + 1, item.nStock)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                  <button type="button" className="cart-item__remove" onClick={() => removeFromCart(item._id)}>&times;</button>
                </div>
              ))}
            </div>

            <div className="cart-drawer__summary">
              <div className="cart-summary__row">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {nDiscountPercentage > 0 && (
                <div className="cart-summary__row cart-summary__row--discount">
                  <span>Discount ({nDiscountPercentage}%)</span>
                  <span>−{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="cart-summary__row cart-summary__row--total">
                <strong>You Pay</strong>
                <strong>{formatCurrency(finalPrice)}</strong>
              </div>
            </div>

            <button className="btn btn--primary btn--full" onClick={handlePlaceOrder} disabled={placing}>
              {placing ? "Placing Order..." : `Pay ${formatCurrency(finalPrice)}`}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
