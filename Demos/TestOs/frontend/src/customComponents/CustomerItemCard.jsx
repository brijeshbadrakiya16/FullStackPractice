import { formatCurrency } from "../utils/formatters";

const CustomerItemCard = ({ item, onAdd }) => {
  const outOfStock = item.nStock === 0;

  return (
    <div className="item-card">
      <div className="item-card__image-wrap">
        {item.sImageUrl ? (
          <img src={item.sImageUrl} alt={item.sName} className="item-card__image" />
        ) : (
          <div className="item-card__placeholder">🍴</div>
        )}
      </div>
      <div className="item-card__body">
        <h3 className="item-card__name">{item.sName}</h3>
        {item.sDescription && <p className="item-card__desc">{item.sDescription}</p>}
        <div className="item-card__footer">
          <span className="item-card__price">{formatCurrency(item.nSalePrice)}</span>
          <button
            className="btn btn--primary btn--sm"
            onClick={() => onAdd(item)}
            disabled={outOfStock}
          >
            {outOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerItemCard;
