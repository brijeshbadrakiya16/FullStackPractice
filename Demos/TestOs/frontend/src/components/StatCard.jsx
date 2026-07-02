import AnimatedCounter from "./AnimatedCounter";
import { formatCurrency } from "../utils/formatters";

const StatCard = ({ label, value, highlight, isCurrency = false, delay = 0, sub, trend }) => {
  return (
    <div
      className={`stat-card-premium ${highlight ? "stat-card-premium--highlight" : ""}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {trend && <span className="stat-card-premium__trend">{trend}</span>}
      <div className="stat-card-premium__value">
        {isCurrency ? (
          <span className="stat-card-premium__currency">{formatCurrency(value)}</span>
        ) : (
          <AnimatedCounter value={Number(value) || 0} />
        )}
      </div>
      <div className="stat-card-premium__label">{label}</div>
      {sub && <div className="stat-card-premium__sub">{sub}</div>}
    </div>
  );
};

export default StatCard;
