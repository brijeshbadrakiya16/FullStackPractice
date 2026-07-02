import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiPost, apiPatch, apiDelete, ApiError } from "../utils/api";
import { useToast } from "../customHooks/useToast";
import { usePolling } from "../customHooks/usePolling";
import { useAsyncAction } from "../customHooks/useAsyncAction";
import { isAdminAuthenticated, setAdminToken, clearAdminToken } from "../utils/adminAuth";
import Spinner from "../components/Spinner";
import ErrorState from "../components/ErrorState";
import StatCard from "../components/StatCard";
import TogglePill from "../components/TogglePill";
import ScrollReveal from "../components/ScrollReveal";
import Modal from "../components/Modal";
import FormField from "../components/FormField";
import ConfirmDialog from "../components/ConfirmDialog";
import OrderHistoryModal from "../customComponents/OrderHistoryModal";
import { formatCurrency, formatDate } from "../utils/formatters";

const SuperAdminPage = () => {
  const { showToast } = useToast();
  const { loading: actionLoading, run } = useAsyncAction();
  const [authenticated, setAuthenticated] = useState(isAdminAuthenticated());
  const [entityView, setEntityView] = useState("restaurants");
  const [loginForm, setLoginForm] = useState({ sEmail: "", sPassword: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [customerOrders, setCustomerOrders] = useState([]);
  const [ordersModalOpen, setOrdersModalOpen] = useState(false);
  const [deleteCustomerTarget, setDeleteCustomerTarget] = useState(null);
  const [deleteRestaurantTarget, setDeleteRestaurantTarget] = useState(null);
  const [credentialsModal, setCredentialsModal] = useState({ open: false, restaurantId: null });
  const [credForm, setCredForm] = useState({ sEmail: "", sPassword: "" });

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setFetchError("");
    try {
      const [statsRes, restRes, custRes] = await Promise.all([
        apiGet("/admin/stats", true),
        apiGet("/admin/restaurants", true),
        apiGet("/admin/customers", true),
      ]);
      setStats(statsRes.data);
      setRestaurants(restRes.data);
      setCustomers(custRes.data);
    } catch (err) {
      const message = err.message || "Failed to load admin data";
      setFetchError(message);
      showToast(message, "error");
      if (err instanceof ApiError && err.statusCode === 401) {
        clearAdminToken();
        setAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (authenticated) fetchAll();
  }, [authenticated, fetchAll]);

  useEffect(() => {
    return () => {
      if (!window.location.pathname.startsWith("/manage")) clearAdminToken();
    };
  }, []);

  usePolling(fetchAll, 30000, authenticated && !!stats);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await apiPost("/auth/admin/login", loginForm);
      setAdminToken(res.token);
      setAuthenticated(true);
      showToast("Welcome, SuperAdmin!");
    } catch (err) {
      setLoginError(err.message);
      showToast(err.message, "error");
    } finally {
      setLoginLoading(false);
    }
  };

  const updateManage = (restaurantId, updates) =>
    run(async () => {
      await apiPatch(`/admin/manage/${restaurantId}`, updates, true);
      showToast("Updated successfully");
      await fetchAll();
    }, { onError: (err) => showToast(err.message, "error") });

  const handleApprove = (restaurantId) => {
    updateManage(restaurantId, { bInProgress: false, bService: true });
  };

  const handleViewCustomerOrders = async (customerId) => {
    try {
      const res = await apiGet(`/admin/customer/${customerId}/orders`, true);
      setCustomerOrders(res.data);
      setOrdersModalOpen(true);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleToggleCustomer = async (customerId, bActive) => {
    try {
      await apiPatch(`/admin/customer/${customerId}`, { bActive: !bActive }, true);
      showToast("Customer updated");
      fetchAll();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      await apiDelete(`/admin/customer/${deleteCustomerTarget._id}`, true);
      showToast("Customer deleted");
      setDeleteCustomerTarget(null);
      fetchAll();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleDeleteRestaurant = async () => {
    try {
      await apiDelete(`/admin/restaurant/${deleteRestaurantTarget.restaurant._id}`, true);
      showToast("Restaurant deleted");
      setDeleteRestaurantTarget(null);
      fetchAll();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleUpdateCredentials = async (e) => {
    e.preventDefault();
    try {
      await apiPatch(`/admin/restaurant/${credentialsModal.restaurantId}/credentials`, credForm, true);
      showToast("Credentials updated");
      setCredentialsModal({ open: false, restaurantId: null });
      setCredForm({ sEmail: "", sPassword: "" });
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  if (!authenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login__bg" />
        <div className="admin-login__card admin-login__card--premium">
          <div className="admin-login__badge">👑 SuperAdmin</div>
          <h1>Command Center</h1>
          <p className="admin-login__sub">Restricted access — IP verified server-side</p>
          {loginError && (
            <div className="inline-error" role="alert">
              {loginError}
            </div>
          )}
          <form className="auth-form" onSubmit={handleLogin}>
            <FormField
              label="Admin Email"
              hint="SuperAdmin email configured in server environment"
              name="sEmail"
              type="email"
              placeholder="admin@saas.com"
              value={loginForm.sEmail}
              onChange={(e) => setLoginForm({ ...loginForm, sEmail: e.target.value })}
              required
            />
            <FormField
              label="Password"
              hint="Your SuperAdmin password"
              name="sPassword"
              type="password"
              placeholder="••••••••"
              value={loginForm.sPassword}
              onChange={(e) => setLoginForm({ ...loginForm, sPassword: e.target.value })}
              required
            />
            <button className="btn btn--primary btn--full" type="submit" disabled={loginLoading}>
              {loginLoading ? "Authenticating..." : "Enter Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading && !stats) return <div className="page-loading"><Spinner /></div>;
  if (fetchError && !stats) return <ErrorState message={fetchError} onRetry={fetchAll} />;

  const inProgressRestaurants = restaurants.filter((r) => !r.manage.bService);
  const topByRevenue = restaurants[0];

  return (
    <div className="admin-page container page-enter">
      <div className="page-header page-header--admin">
        <div>
          <h1 className="page-title">SuperAdmin Command Center</h1>
          <p className="page-subtitle">Platform overview, approvals, and tenant management</p>
        </div>
        <div className="admin-page__nav">
          <Link to="/manage/orders" className="btn btn--ghost btn--sm">All Orders</Link>
          <button type="button" className="btn btn--ghost btn--sm" onClick={fetchAll} disabled={loading || actionLoading}>
            {loading ? "Refreshing..." : "↻ Refresh"}
          </button>
        </div>
      </div>

      {stats && (
        <>
          <div className="highlight-banner">
            <div className="highlight-banner__content">
              <span className="highlight-banner__label">Platform Revenue</span>
              <span className="highlight-banner__value">{formatCurrency(stats.nTotalPlatformRevenue)}</span>
              {stats.topRestaurantOfMonth && (
                <span className="highlight-banner__meta">
                  🏆 Top this month: <strong>{stats.topRestaurantOfMonth.sName}</strong> — {stats.topRestaurantOfMonth.nOrderCount} orders
                </span>
              )}
            </div>
          </div>

          <div className="stats-grid-premium stats-grid-premium--dashboard">
            <StatCard label="Active Restaurants" value={stats.nActiveRestaurants} delay={0} />
            <StatCard label="Active Customers" value={stats.nActiveCustomers} delay={60} />
            <StatCard label="Total Orders" value={stats.nTotalOrders} delay={120} highlight />
            <StatCard label="Items Served" value={stats.nTotalItemsServed} delay={180} />
            <StatCard label="Platform Revenue" value={stats.nTotalPlatformRevenue} isCurrency delay={240} highlight sub="From per-order fees" />
          </div>
        </>
      )}

      {inProgressRestaurants.length > 0 && (
        <section className="admin-section admin-section--pending">
          <h2 className="section-heading">
            <span className="section-heading__icon">⏳</span>
            Pending Approval
            <span className="section-heading__count">{inProgressRestaurants.length}</span>
          </h2>
          <div className="admin-list">
            {inProgressRestaurants.map((r) => (
              <div key={r.restaurant._id} className="admin-list__item admin-list__item--pending">
                <div>
                  <strong>{r.restaurant.sName}</strong>
                  <span className="admin-list__meta">{r.restaurant.sEmail}</span>
                </div>
                <button className="btn btn--primary btn--sm" onClick={() => handleApprove(r.restaurant._id)}>
                  ✓ Approve & Go Live
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {topByRevenue && topByRevenue.manage.bService && (
        <div className="insight-card">
          <span className="insight-card__icon">📈</span>
          <div>
            <strong>Top earner:</strong> {topByRevenue.restaurant.sName} — {formatCurrency(topByRevenue.manage.nProfit)} from {topByRevenue.manage.nOrders} orders
          </div>
        </div>
      )}

      <div className="admin-entity-toggle">
        <button
          type="button"
          className={`auth-tabs__btn ${entityView === "restaurants" ? "auth-tabs__btn--active" : ""}`}
          onClick={() => setEntityView("restaurants")}
        >
          Restaurants
        </button>
        <button
          type="button"
          className={`auth-tabs__btn ${entityView === "customers" ? "auth-tabs__btn--active" : ""}`}
          onClick={() => setEntityView("customers")}
        >
          Customers
        </button>
      </div>

      {entityView === "restaurants" && (
      <section className="admin-section">
        <h2 className="section-heading">
          <span className="section-heading__icon">🏪</span>
          Restaurant Revenue
        </h2>
        <div className="admin-table-wrap">
          <table className="admin-table admin-table--premium">
            <thead>
              <tr>
                <th>Restaurant</th>
                <th>Orders</th>
                <th>Fees Collected</th>
                <th>Platform Fee</th>
                <th>Permissions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((r) => (
                <tr key={r.restaurant._id}>
                  <td>
                    <strong>{r.restaurant.sName}</strong>
                    {!r.manage.bService && <span className="table-tag">Inactive</span>}
                  </td>
                  <td>{r.manage.nOrders}</td>
                  <td className="text-profit" title="Total platform fees from all orders">
                    {formatCurrency(r.manage.nProfit)}
                  </td>
                  <td>
                    <input
                      type="number"
                      className="admin-input--sm"
                      title="Platform fee charged per order"
                      defaultValue={r.manage.nChange}
                      onBlur={(e) => updateManage(r.restaurant._id, { nChange: Number(e.target.value) })}
                    />
                  </td>
                  <td>
                    <div className="permission-pills">
                      {["bAddProduct", "bUpdateProduct", "bRemoveProduct", "bService"].map((perm) => (
                        <TogglePill
                          key={perm}
                          name={perm}
                          active={r.manage[perm]}
                          onToggle={(_, val) => updateManage(r.restaurant._id, { [perm]: val })}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="admin-table__actions">
                    <button
                      className="btn btn--secondary btn--sm"
                      onClick={() => setCredentialsModal({ open: true, restaurantId: r.restaurant._id })}
                    >
                      Credentials
                    </button>
                    <button className="btn btn--danger btn--sm" onClick={() => setDeleteRestaurantTarget(r)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      )}

      {entityView === "customers" && (
      <section className="admin-section">
        <h2 className="section-heading">
          <span className="section-heading__icon">👥</span>
          Customer Manager
        </h2>
        <div className="admin-table-wrap">
          <table className="admin-table admin-table--premium">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Orders</th>
                <th>Last Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c._id}>
                  <td>{c.sName}</td>
                  <td>{c.sEmail}</td>
                  <td>{c.nTotalOrders}</td>
                  <td>{c.dLastOrderDate ? formatDate(c.dLastOrderDate) : "—"}</td>
                  <td>
                    <span className={`badge ${c.bActive ? "badge--finished" : "badge--due"}`}>
                      {c.bActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="admin-table__actions">
                    <button className="btn btn--secondary btn--sm" onClick={() => handleViewCustomerOrders(c._id)}>
                      History
                    </button>
                    <button className="btn btn--ghost btn--sm" onClick={() => handleToggleCustomer(c._id, c.bActive)}>
                      {c.bActive ? "Deactivate" : "Activate"}
                    </button>
                    <button className="btn btn--danger btn--sm" onClick={() => setDeleteCustomerTarget(c)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      )}

      <Modal
        isOpen={credentialsModal.open}
        onClose={() => setCredentialsModal({ open: false, restaurantId: null })}
        title="Update Restaurant Credentials"
        size="sm"
      >
        <form className="auth-form" onSubmit={handleUpdateCredentials}>
          <FormField
            label="New Email"
            hint="Restaurant owner's login email"
            name="sEmail"
            type="email"
            placeholder="owner@restaurant.com"
            value={credForm.sEmail}
            onChange={(e) => setCredForm({ ...credForm, sEmail: e.target.value })}
          />
          <FormField
            label="New Password"
            hint="Leave blank to keep current password"
            name="sPassword"
            type="password"
            placeholder="••••••••"
            value={credForm.sPassword}
            onChange={(e) => setCredForm({ ...credForm, sPassword: e.target.value })}
          />
          <button className="btn btn--primary btn--full" type="submit">
            Update Credentials
          </button>
        </form>
      </Modal>

      <OrderHistoryModal isOpen={ordersModalOpen} onClose={() => setOrdersModalOpen(false)} orders={customerOrders} title="Customer Order History" />

      <ConfirmDialog
        isOpen={!!deleteCustomerTarget}
        onClose={() => setDeleteCustomerTarget(null)}
        onConfirm={handleDeleteCustomer}
        title="Delete Customer"
        message={`Delete customer "${deleteCustomerTarget?.sName}" and all their orders?`}
      />

      <ConfirmDialog
        isOpen={!!deleteRestaurantTarget}
        onClose={() => setDeleteRestaurantTarget(null)}
        onConfirm={handleDeleteRestaurant}
        title="Delete Restaurant"
        message={`Delete "${deleteRestaurantTarget?.restaurant?.sName}" and all associated data?`}
      />
    </div>
  );
};

export default SuperAdminPage;
