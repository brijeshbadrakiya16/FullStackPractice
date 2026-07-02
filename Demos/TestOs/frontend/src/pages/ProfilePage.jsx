import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPatch } from "../utils/api";
import { useFetch } from "../customHooks/useFetch";
import { useAuth } from "../customHooks/useAuth";
import { useToast } from "../customHooks/useToast";
import Spinner from "../components/Spinner";
import ErrorState from "../components/ErrorState";
import FormField from "../components/FormField";
import OrderHistoryModal from "../customComponents/OrderHistoryModal";
import QrScanner from "../customComponents/QrScanner";
import { usePolling } from "../customHooks/usePolling";
import { useAsyncAction } from "../customHooks/useAsyncAction";
import { formatCurrency, formatDate } from "../utils/formatters";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ sName: "", sContactNumber: "" });
  const [historyOpen, setHistoryOpen] = useState(false);
  const [dueOpen, setDueOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const { loading: actionLoading, run } = useAsyncAction();
  const [orders, setOrders] = useState([]);
  const [dueOrders, setDueOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  const { data: profileData, loading, error, refetch } = useFetch(() => apiGet("/customer/profile"));

  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true);
    setOrdersError(null);
    try {
      const [allRes, dueRes] = await Promise.all([
        apiGet("/customer/orders"),
        apiGet("/customer/orders/due"),
      ]);
      setOrders(allRes.data || []);
      setDueOrders(dueRes.data || []);
    } catch (err) {
      setOrdersError(err.message);
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  usePolling(fetchOrders, 30000, true);

  const profile = profileData?.data;
  const hasDueOrders = dueOrders.length > 0;
  const recentOrders = orders.slice(0, 3);

  const startEdit = () => {
    setForm({ sName: profile?.sName || user.sName, sContactNumber: profile?.sContactNumber || "" });
    setEditing(true);
  };

  const handleSave = () =>
    run(async () => {
      const res = await apiPatch("/customer/profile", form);
      updateUser({ sName: res.data.sName });
      showToast("Profile updated!");
      setEditing(false);
      refetch();
    }, { onError: (err) => showToast(err.message, "error") });

  const handleOpenHistory = async () => {
    setHistoryOpen(true);
    await fetchOrders();
  };

  const handleOpenDue = async () => {
    setDueOpen(true);
    await fetchOrders();
  };

  const handleQrSuccess = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  if (loading) return <div className="page-loading"><Spinner /></div>;
  if (error) return <ErrorState message={error} onRetry={refetch} title="Could not load profile" />;

  return (
    <div className="profile-page container page-enter">
      <div className="page-header">
        <h1 className="page-title">My Dashboard</h1>
        <p className="page-subtitle">Track orders, manage your profile, and scan restaurant QR codes</p>
      </div>

      <div className="profile-layout">
        <div className="profile-card profile-card--premium">
          <div className="profile-card__avatar">{profile?.sName?.[0] || "?"}</div>
          {editing ? (
            <div className="profile-card__edit">
              <FormField
                label="Display Name"
                hint="Your name as shown on orders and receipts"
                name="sName"
                placeholder="e.g. Alex Johnson"
                value={form.sName}
                onChange={(e) => setForm({ ...form, sName: e.target.value })}
                required
              />
              <FormField
                label="Contact Number"
                hint="10-digit mobile number for order updates"
                name="sContactNumber"
                type="tel"
                placeholder="e.g. 9876543210"
                value={form.sContactNumber}
                onChange={(e) => setForm({ ...form, sContactNumber: e.target.value })}
              />
              <div className="profile-card__edit-actions">
                <button type="button" className="btn btn--primary btn--sm" onClick={handleSave} disabled={actionLoading}>
                  {actionLoading ? "Saving..." : "Save Changes"}
                </button>
                <button className="btn btn--ghost btn--sm" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-card__info">
              <h2>{profile?.sName}</h2>
              <p className="profile-card__email">{profile?.sEmail}</p>
              <p>{profile?.sContactNumber || "No contact number added"}</p>
              <span className="badge badge--role">{profile?.sRole}</span>
              <button className="btn btn--secondary btn--sm" onClick={startEdit}>
                Edit Profile
              </button>
            </div>
          )}
        </div>

        <div className="profile-quick-stats">
          <div className="quick-stat">
            <span className="quick-stat__value">{ordersLoading ? "…" : orders.length}</span>
            <span className="quick-stat__label">Total Orders</span>
          </div>
          <div className="quick-stat quick-stat--accent">
            <span className="quick-stat__value">{ordersLoading ? "…" : dueOrders.length}</span>
            <span className="quick-stat__label">On The Way</span>
          </div>
          <button className="btn btn--ghost btn--sm quick-stat__refresh" onClick={fetchOrders} disabled={ordersLoading}>
            {ordersLoading ? "Loading…" : "↻ Refresh"}
          </button>
        </div>
      </div>

      <div className="profile-actions">
        <button className="btn btn--primary" onClick={handleOpenHistory}>
          📋 Purchase History
        </button>
        <button className="btn btn--secondary" onClick={() => setQrOpen(true)}>
          Scan QR Code
        </button>
      </div>

      <section className="profile-section">
        <div className="profile-section__header">
          <h2 className="profile-section__title">Recent Orders</h2>
          {orders.length > 3 && (
            <button className="btn btn--ghost btn--sm" onClick={handleOpenHistory}>
              View all
            </button>
          )}
        </div>

        {ordersLoading && !orders.length ? (
          <div className="profile-section__loading"><Spinner /></div>
        ) : ordersError && !orders.length ? (
          <ErrorState message={ordersError} onRetry={fetchOrders} title="Could not load orders" />
        ) : !recentOrders.length ? (
          <div className="empty-state-card">
            <span className="empty-state-card__icon">🛒</span>
            <p>No orders yet. Scan a restaurant QR code to place your first order.</p>
            <button className="btn btn--primary btn--sm" onClick={() => setQrOpen(true)}>
              Scan QR Code
            </button>
          </div>
        ) : (
          <div className="order-list order-list--compact">
            {recentOrders.map((order) => (
              <div key={order._id} className="order-card order-card--compact">
                <div className="order-card__header">
                  <div>
                    <strong>{order.restaurant?.sName || "Restaurant"}</strong>
                    <span className={`badge badge--${order.eStatus}`}>{order.eStatus}</span>
                  </div>
                  <span className="order-card__date">{formatDate(order.dOrderDate)}</span>
                </div>
                <p className="order-card__summary">
                  {order.nItemsCount} item{order.nItemsCount !== 1 ? "s" : ""} · Paid {formatCurrency(order.nFinalPrice)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {hasDueOrders && (
        <button className="fab fab--due" onClick={handleOpenDue}>
          On The Way Orders
          <span className="fab__badge">{dueOrders.length}</span>
        </button>
      )}

      <OrderHistoryModal
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        orders={orders}
        loading={ordersLoading}
        error={ordersError}
        onRetry={fetchOrders}
        title="Purchase History"
      />
      <OrderHistoryModal
        isOpen={dueOpen}
        onClose={() => setDueOpen(false)}
        orders={dueOrders}
        loading={ordersLoading}
        error={ordersError}
        onRetry={fetchOrders}
        title="On The Way Orders"
      />
      <QrScanner isOpen={qrOpen} onClose={() => setQrOpen(false)} onScan={handleQrSuccess} />
    </div>
  );
};

export default ProfilePage;
