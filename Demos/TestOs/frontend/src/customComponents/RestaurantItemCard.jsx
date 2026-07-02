import { formatCurrency } from "../utils/formatters";

const RestaurantItemCard = ({ item, permissions, onEdit, onDelete, onToggleAvailability }) => {
  return (
    <div className="item-card item-card--restaurant">
      <div className="item-card__image-wrap">
        {item.sImageUrl ? (
          <img src={item.sImageUrl} alt={item.sName} className="item-card__image" />
        ) : (
          <div className="item-card__placeholder">🍴</div>
        )}
      </div>
      <div className="item-card__body">
        <h3 className="item-card__name">{item.sName}</h3>
        <div className="item-card__meta">
          <span>Original: {formatCurrency(item.nOriginalPrice)}</span>
          <span>Sale: {formatCurrency(item.nSalePrice)}</span>
          <span>Stock: {item.nStock}</span>
        </div>
        <label className="toggle">
          <input
            type="checkbox"
            checked={item.bAvailable}
            onChange={() => onToggleAvailability(item)}
            disabled={!permissions.bUpdateProduct}
          />
          <span>Available</span>
        </label>
        <div className="item-card__actions">
          {permissions.bUpdateProduct && (
            <button className="btn btn--secondary btn--sm" onClick={() => onEdit(item)}>
              Update
            </button>
          )}
          {permissions.bRemoveProduct && (
            <button className="btn btn--danger btn--sm" onClick={() => onDelete(item)}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantItemCard;
