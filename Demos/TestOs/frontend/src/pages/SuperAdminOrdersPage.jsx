import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../utils/api";
import { useToast } from "../customHooks/useToast";
import { useDebouncedValue } from "../customHooks/useDebouncedValue";
import { useAsyncAction } from "../customHooks/useAsyncAction";
import { isAdminAuthenticated, clearAdminToken } from "../utils/adminAuth";
import Spinner from "../components/Spinner";
import ErrorState from "../components/ErrorState";
import FormField from "../components/FormField";
import { formatCurrency, formatDate } from "../utils/formatters";

const todayISO = () => new Date().toISOString().slice(0, 10);

const SuperAdminOrdersPage = () => {
  const { showToast } = useToast();
  const { loading, run } = useAsyncAction();
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState("");

  const [sortBy, setSortBy] = useState("latest");
  const [restaurantId, setRestaurantId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [minItems, setMinItems] = useState("");
  const [maxItems, setMaxItems] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const debouncedMin = useDebouncedValue(minItems, 500);
  const debouncedMax = useDebouncedValue(maxItems, 500);

  useEffect(() => {
    return () => {
      if (!window.location.pathname.startsWith("/manage")) clearAdminToken();
    };
  }, []);

  useEffect(() => {
    if (!isAdminAuthenticated()) return;
    const loadMeta = async () => {
      try {
        const [rRes, cRes] = await Promise.all([
          apiGet("/admin/restaurants", true),
          apiGet("/admin/customers", true),
        ]);
        setRestaurants(rRes.data);
        setCustomers(cRes.data);
      } catch (err) {
        showToast(err.message, "error");
      }
    };
    loadMeta();
  }, [showToast]);

  const fetchOrders = useCallback(
    async (pageNum = 1, append = false) => {
      if (!isAdminAuthenticated()) return;
      await run(async () => {
        setError("");
        const params = new URLSearchParams({ sortBy, page: String(pageNum), limit: "20" });
        if (restaurantId) params.set("restaurantId", restaurantId);
        if (customerId) params.set("customerId", customerId);
        if (debouncedMin) params.set("minItems", debouncedMin);
        if (debouncedMax) params.set("maxItems", debouncedMax);
        if (dateFrom) params.set("dateFrom", dateFrom);
        if (dateTo) params.set("dateTo", dateTo);

        const res = await apiGet(`/admin/orders?${params}`, true);
        setOrders((prev) => (append ? [...prev, ...res.data.orders] : res.data.orders));
        setTotal(res.data.total);
        setHasMore(res.data.hasMore);
        setPage(pageNum);
      });
    },
    [sortBy, restaurantId, customerId, debouncedMin, debouncedMax, dateFrom, dateTo, run]
  );

  useEffect(() => {
    fetchOrders(1, false);
  }, [sortBy, restaurantId, customerId, debouncedMin, debouncedMax, dateFrom, dateTo]);

  const maxDate = todayISO();

  const handleDateFromChange = (value) => {
    if (!value) {
      setDateFrom("");
      return;
    }
    if (value > maxDate) {
      showToast("From date cannot be in the future", "error");
      return;
    }
    if (dateTo && value > dateTo) {
      showToast("From date cannot be after To date", "error");
      return;
    }
    setDateFrom(value);
  };

  const handleDateToChange = (value) => {
    if (!value) {
      setDateTo("");
      return;
    }
    if (value > maxDate) {
      showToast("To date cannot be later than today", "error");
      return;
    }
    if (dateFrom && value < dateFrom) {
      showToast("To date cannot be before From date", "error");
      return;
    }
    setDateTo(value);
  };

  const clearDates = () => {
    setDateFrom("");
    setDateTo("");
  };

  const hasDateFilter = Boolean(dateFrom || dateTo);

  if (!isAdminAuthenticated()) {
    return (
      <div className="admin-login">
        <div className="admin-login__card">
          <h1>Session Expired</h1>
          <Link to="/manage" className="btn btn--primary">Back to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page container page-enter">
      <div className="page-header page-header--admin">
        <div>
          <h1 className="page-title">All Orders</h1>
          <p className="page-subtitle">{total} orders across the platform</p>
        </div>
        <div className="admin-page__nav">
          <Link to="/manage" className="btn btn--ghost btn--sm">← Dashboard</Link>
          <button className="btn btn--ghost btn--sm" onClick={() => fetchOrders(1)} disabled={loading}>
            {loading ? "Loading…" : "↻ Refresh"}
          </button>
        </div>
      </div>
    
      <div className="orders-filters-panel">
        <p className="orders-filters-panel__intro">Filter and sort platform orders. Dates are optional and cannot be in the future.</p>
        <select className="form-field__input" value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort orders">
          <option value="latest">Latest first</option>
          <option value="oldest">Oldest first</option>
          <option value="amount_high">Highest amount</option>
          <option value="amount_low">Lowest amount</option>
          <option value="items_high">Most items</option>
          <option value="items_low">Fewest items</option>
          <option value="profit_high">Highest profit</option>
          <option value="profit_low">Lowest profit</option>
          <option value="customer">Customer A–Z</option>
        </select>
        <select className="form-field__input" value={restaurantId} onChange={(e) => setRestaurantId(e.target.value)}>
          <option value="">All restaurants</option>
          {restaurants.map((r) => (
            <option key={r.restaurant._id} value={r.restaurant._id}>{r.restaurant.sName}</option>
          ))}
        </select>
        <select className="form-field__input" value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
          <option value="">All customers</option>
          {customers.map((c) => (
            <option key={c._id} value={c._id}>{c.sName}</option>
          ))}
        </select>
        <input
          type="number"
          className="form-field__input"
          placeholder="Min items"
          value={minItems}
          onChange={(e) => setMinItems(e.target.value)}
          min="0"
        />
        <input
          type="number"
          className="form-field__input"
          placeholder="Max items"
          value={maxItems}
          onChange={(e) => setMaxItems(e.target.value)}
          min="0"
        />
        <br/>
        <FormField
          label="From date"
          hint="Orders on or after this day (leave empty for no start limit)"
          className="filter-date-field"
        >
          <div className="filter-date-field__row">
            <input
              type="date"
              className="form-field__input"
              value={dateFrom}
              max={dateTo || maxDate}
              onChange={(e) => handleDateFromChange(e.target.value)}
              aria-label="From date"
            />
            {dateFrom && (
              <button type="button" className="filter-date-field__clear" onClick={() => setDateFrom("")} aria-label="Clear from date">
                ×
              </button>
            )}
          </div>
        </FormField>
        <FormField
          label="To date"
          hint={`Orders on or before this day (max: today)`}
          className="filter-date-field"
        >
          <div className="filter-date-field__row">
            <input
              type="date"
              className="form-field__input"
              value={dateTo}
              min={dateFrom || undefined}
              max={maxDate}
              onChange={(e) => handleDateToChange(e.target.value)}
              aria-label="To date"
            />
            {dateTo && (
              <button type="button" className="filter-date-field__clear" onClick={() => setDateTo("")} aria-label="Clear to date">
                ×
              </button>
            )}
          </div>
        </FormField>
      </div>

      {hasDateFilter && (
        <div className="active-date-filter">
          <span>
            Showing orders
            {dateFrom && dateTo && ` from ${dateFrom} to ${dateTo}`}
            {dateFrom && !dateTo && ` from ${dateFrom} onward`}
            {!dateFrom && dateTo && ` up to ${dateTo}`}
          </span>
          <button type="button" className="btn btn--ghost btn--sm" onClick={clearDates}>
            Clear date range
          </button>
        </div>
      )}

      {error && <ErrorState message={error} onRetry={() => fetchOrders(1)} />}

      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card order-card--premium">
            <div className="order-card__header">
              <div>
                <strong>{order.restaurant?.sName || "Restaurant"}</strong>
                <span className="order-card__customer"> · {order.customer?.sName}</span>
                <span className={`badge badge--${order.eStatus}`}>{order.eStatus}</span>
              </div>
              <span className="order-card__date">{formatDate(order.dOrderDate)}</span>
            </div>
            <p className="order-card__summary">
              {order.nItemsCount} items · Customer paid {formatCurrency(order.nFinalPrice)} ·
              Platform fee {formatCurrency(order.nPlatformFee ?? order.nChange ?? 0)} ·
              Profit {formatCurrency(order.nProfit ?? 0)}
            </p>
          </div>
        ))}
        {!orders.length && !loading && <p className="empty-state">No orders match filters</p>}
      </div>

      {hasMore && (
        <button className="btn btn--secondary btn--full" onClick={() => fetchOrders(page + 1, true)} disabled={loading}>
          {loading ? "Loading…" : "Load more orders"}
        </button>
      )}

      {loading && !orders.length && <div className="page-loading"><Spinner /></div>}
    </div>
  );
};

export default SuperAdminOrdersPage;
