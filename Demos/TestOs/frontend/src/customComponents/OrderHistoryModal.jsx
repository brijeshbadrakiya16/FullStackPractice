import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import ErrorState from "../components/ErrorState";
import { formatCurrency, formatDate } from "../utils/formatters";

const OrderHistoryModal = ({
  isOpen,
  onClose,
  orders,
  title = "Order History",
  loading = false,
  error = null,
  onRetry,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      {loading ? (
        <div className="modal-loading"><Spinner /></div>
      ) : error ? (
        <ErrorState message={error} onRetry={onRetry} title="Could not load orders" />
      ) : !orders?.length ? (
        <div className="empty-state-card">
          <span className="empty-state-card__icon">📋</span>
          <p>No orders yet. Visit a restaurant and place an order to see it here.</p>
        </div>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card order-card--premium">
              <div className="order-card__header">
                <span className="order-card__date">{formatDate(order.dOrderDate)}</span>
                <span className={`badge badge--${order.eStatus}`}>{order.eStatus}</span>
              </div>
              {order.restaurant && (
                <p className="order-card__restaurant">{order.restaurant.sName}</p>
              )}
              <ul className="order-card__items">
                {order.aItems?.map((ai, idx) => (
                  <li key={idx}>
                    {ai.item?.sName || "Item"} × {ai.count}
                  </li>
                ))}
              </ul>
              <div className="order-card__totals">
                <span>Bill: {formatCurrency(order.nBillAmount)}</span>
                <span>Discount: −{formatCurrency(order.nDiscount)}</span>
                <strong>You Paid: {formatCurrency(order.nFinalPrice)}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default OrderHistoryModal;
