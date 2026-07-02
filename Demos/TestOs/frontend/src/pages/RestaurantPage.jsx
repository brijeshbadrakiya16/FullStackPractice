import { useState, useEffect, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { apiGet, apiPost, apiPatch, apiDelete, apiPostForm, apiPatchForm } from "../utils/api";
import { useAuth } from "../customHooks/useAuth";
import { useCart } from "../customHooks/useCart";
import { useToast } from "../customHooks/useToast";
import { usePolling } from "../customHooks/usePolling";
import { useAsyncAction } from "../customHooks/useAsyncAction";
import { downloadImageFromUrl } from "../utils/download";
import Spinner from "../components/Spinner";
import StatCard from "../components/StatCard";
import Modal from "../components/Modal";
import FormField from "../components/FormField";
import ConfirmDialog from "../components/ConfirmDialog";
import MenuBrowser from "../customComponents/MenuBrowser";
import CartDrawer from "../customComponents/CartDrawer";
import { formatCurrency, formatDate } from "../utils/formatters";

const TABS = { DASHBOARD: "dashboard", MENU: "menu", ORDERS: "orders", QR: "qr" };
const platformFee = (order) => order.nPlatformFee ?? order.nChange ?? 0;

const RestaurantPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  const { addToCart, itemCount } = useCart();
  const { showToast } = useToast();
  const { loading: actionLoading, run } = useAsyncAction();

  const isRestaurant = user?.sRole === "restaurant" && String(user?.id) === id;
  const isCustomer = user?.sRole === "customer";
  const accessDenied = user?.sRole === "restaurant" && String(user?.id) !== id;

  const [loading, setLoading] = useState(true);
  const [menuData, setMenuData] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersProfit, setOrdersProfit] = useState(0);
  const [discountInput, setDiscountInput] = useState("");
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [activeTab, setActiveTab] = useState(
    location.state?.tab || (isRestaurant ? TABS.DASHBOARD : TABS.MENU)
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderFilter, setOrderFilter] = useState("due");
  const [orderSortBy, setOrderSortBy] = useState("latest");
  const [orderCustomerId, setOrderCustomerId] = useState("");
  const [orderCustomers, setOrderCustomers] = useState([]);
  const [itemModal, setItemModal] = useState({ open: false, item: null, isEdit: false });
  const [categoryModal, setCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [itemForm, setItemForm] = useState({});
  const [downloadingQr, setDownloadingQr] = useState(false);

  const fetchMenu = useCallback(async () => {
    const res = await apiGet(`/restaurant/${id}/menu`);
    setMenuData(res.data);
    if (res.data.categories?.length) {
      setSelectedCategory((prev) => {
        const exists = res.data.categories.some((c) => c._id === prev);
        return exists ? prev : res.data.categories[0]._id;
      });
    }
    return res.data;
  }, [id]);

  const fetchDashboard = useCallback(async () => {
    const res = await apiGet(`/restaurant/${id}/dashboard`);
    setDashboard(res.data);
    setDiscountInput(String(res.data.nDiscountPercentage ?? 0));
  }, [id]);

  const fetchOrders = useCallback(
    async (status, sort = orderSortBy, customerId = orderCustomerId) => {
      const params = new URLSearchParams({ eStatus: status, sortBy: sort });
      if (customerId) params.set("customerId", customerId);
      const res = await apiGet(`/restaurant/${id}/orders?${params}`);
      setOrders(res.data.orders || []);
      setOrdersProfit(res.data.nTotalProfit || 0);
      if (!customerId) {
        const seen = new Map();
        (res.data.orders || []).forEach((o) => {
          if (o.customer?._id) seen.set(o.customer._id, o.customer.sName);
        });
        setOrderCustomers([...seen.entries()].map(([cid, name]) => ({ id: cid, name })));
      }
    },
    [id, orderSortBy, orderCustomerId]
  );

  const fetchRestaurantInfo = useCallback(async () => {
    try {
      const res = await apiGet(`/public/restaurant/${id}`);
      setRestaurantInfo(res.data);
    } catch {
      setRestaurantInfo(null);
    }
  }, [id]);

  const refreshAll = useCallback(async () => {
    try {
      await fetchMenu();
      if (isRestaurant) {
        await Promise.all([
          fetchDashboard(),
          fetchOrders(orderFilter),
          fetchRestaurantInfo(),
        ]);
      } else {
        await fetchRestaurantInfo();
      }
    } catch (err) {
      showToast(err.message, "error");
    }
  }, [fetchMenu, fetchDashboard, fetchOrders, fetchRestaurantInfo, isRestaurant, orderFilter, showToast]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setSelectedCategory(null);
      try {
        await refreshAll();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [id, isRestaurant]);

  useEffect(() => {
    if (location.state?.tab) setActiveTab(location.state.tab);
  }, [location.state?.tab]);

  usePolling(refreshAll, 25000, !loading && (isRestaurant || isCustomer));

  const handleSaveDiscount = () =>
    run(async () => {
      await apiPatch(`/restaurant/${id}/settings`, { nDiscountPercentage: Number(discountInput) });
      showToast("Discount updated!");
      await fetchDashboard();
      await fetchMenu();
      await fetchRestaurantInfo();
    }, { onError: (err) => showToast(err.message, "error") });

  const handleAddCategory = () =>
    run(async () => {
      await apiPost(`/restaurant/${id}/category`, { sName: categoryName });
      showToast("Category added!");
      setCategoryModal(false);
      setCategoryName("");
      await fetchMenu();
    }, { onError: (err) => showToast(err.message, "error") });

  const openItemModal = (item = null) => {
    setItemForm(
      item
        ? { ...item, iCategoryId: item.iCategoryId }
        : { sName: "", iCategoryId: selectedCategory, nStock: 0, nOriginalPrice: 0, nSalePrice: 0, bAvailable: true }
    );
    setItemModal({ open: true, item, isEdit: !!item });
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    run(async () => {
      if (itemModal.isEdit) {
        await apiPatchForm(`/restaurant/${id}/item/${itemModal.item._id}`, formData);
        showToast("Item updated!");
      } else {
        await apiPostForm(`/restaurant/${id}/item`, formData);
        showToast("Item added!");
      }
      setItemModal({ open: false, item: null, isEdit: false });
      await fetchMenu();
    }, { onError: (err) => showToast(err.message, "error") });
  };

  const handleDeleteItem = () =>
    run(async () => {
      await apiDelete(`/restaurant/${id}/item/${deleteTarget._id}`);
      showToast("Item deleted");
      setDeleteTarget(null);
      await fetchMenu();
    }, { onError: (err) => showToast(err.message, "error") });

  const handleToggleAvailability = (item) =>
    run(async () => {
      const formData = new FormData();
      formData.append("bAvailable", !item.bAvailable);
      await apiPatchForm(`/restaurant/${id}/item/${item._id}`, formData);
      await fetchMenu();
    }, { onError: (err) => showToast(err.message, "error") });

  const handleFinishOrder = (orderId) =>
    run(async () => {
      await apiPatch(`/restaurant/${id}/orders/${orderId}`, {});
      showToast("Order marked as finished!");
      await fetchOrders(orderFilter);
      await fetchDashboard();
    }, { onError: (err) => showToast(err.message, "error") });

  const downloadQr = async () => {
    const qrUrl = menuData?.restaurant?.sQrUrl || restaurantInfo?.sQrUrl;
    if (!qrUrl || downloadingQr) return;
    setDownloadingQr(true);
    try {
      await downloadImageFromUrl(qrUrl, `${restaurantInfo?.sName || "restaurant"}-qr.png`);
      showToast("QR code downloaded!");
    } catch {
      showToast("Download failed. Try again.", "error");
    } finally {
      setDownloadingQr(false);
    }
  };

  const manage = menuData?.manage;
  const categories = menuData?.categories || [];
  const permissions = {
    bAddProduct: manage?.bAddProduct,
    bUpdateProduct: manage?.bUpdateProduct,
    bRemoveProduct: manage?.bRemoveProduct,
  };

  if (accessDenied) {
    return (
      <div className="unavailable container">
        <h1>Access Denied</h1>
        <p>You can only manage your own restaurant.</p>
      </div>
    );
  }

  if (loading) return <div className="page-loading"><Spinner /></div>;

  if (isCustomer && !manage?.bService) {
    return (
      <div className="unavailable container">
        <h1>Restaurant Not Available</h1>
        <p>This restaurant is currently not accepting orders. Please check back later.</p>
      </div>
    );
  }

  if (isRestaurant && !manage?.bService) {
    return (
      <div className="unavailable container page-enter">
        <div className="pending-card">
          <div className="pending-card__icon">⏳</div>
          <h1>Awaiting Activation</h1>
          <p>Your restaurant is registered but not yet live. SuperAdmin must approve and enable service before you can access the dashboard.</p>
          <span className="pending-card__status">Service status: Inactive</span>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-page">
      {isCustomer && restaurantInfo && (
        <header className="restaurant-header">
          <div className="container">
            <h1>{restaurantInfo.sName}</h1>
            <p>{restaurantInfo.sAddress}</p>
            {restaurantInfo.nDiscountPercentage > 0 && (
              <span className="discount-badge">{restaurantInfo.nDiscountPercentage}% OFF</span>
            )}
          </div>
        </header>
      )}

      {isRestaurant && (
        <div className="restaurant-tabs container">
          {Object.values(TABS).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`restaurant-tabs__btn ${activeTab === tab ? "restaurant-tabs__btn--active" : ""}`}
              onClick={() => {
                setActiveTab(tab);
                if (tab === TABS.ORDERS) fetchOrders(orderFilter);
                if (tab === TABS.DASHBOARD) fetchDashboard();
                if (tab === TABS.MENU) fetchMenu();
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="container restaurant-content">
        {isCustomer && selectedCategory && (
          <>
            <MenuBrowser
              restaurantId={id}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              isRestaurant={false}
              onAddToCart={(i) => addToCart(id, i)}
            />
            {itemCount > 0 && (
              <button type="button" className="fab" onClick={() => setCartOpen(true)}>
                🛒
                <span className="fab__badge">{itemCount}</span>
              </button>
            )}
            <CartDrawer
              isOpen={cartOpen}
              onClose={() => setCartOpen(false)}
              restaurantId={id}
              nDiscountPercentage={restaurantInfo?.nDiscountPercentage || 0}
            />
          </>
        )}

        {isRestaurant && activeTab === TABS.DASHBOARD && dashboard && (
          <div className="restaurant-dashboard page-enter">
            <div className="page-header page-header--compact">
              <h2 className="page-title page-title--sm">Business Overview</h2>
              <p className="page-subtitle">Revenue, orders, and performance at a glance</p>
            </div>
            <div className="dashboard-hero">
              <div className="dashboard-hero__main">
                <span className="dashboard-hero__label">Net Profit</span>
                <span className="dashboard-hero__value">{formatCurrency(dashboard.nTotalProfit)}</span>
                <span className="dashboard-hero__meta">After platform fees & item costs</span>
              </div>
              <div className="dashboard-hero__breakdown">
                <div className="breakdown-item">
                  <span>Customer Collection</span>
                  <strong>{formatCurrency(dashboard.nTotalCollected)}</strong>
                </div>
                <div className="breakdown-item breakdown-item--fee">
                  <span>Platform Fees</span>
                  <strong>−{formatCurrency(dashboard.nTotalPlatformFees)}</strong>
                </div>
                <div className="breakdown-item">
                  <span>Net Revenue</span>
                  <strong>{formatCurrency(dashboard.nRevenue)}</strong>
                </div>
              </div>
            </div>

            <div className="stats-grid-premium stats-grid-premium--dashboard">
              <StatCard label="Finished Orders" value={dashboard.nTotalOrdersFinished} delay={0} />
              <StatCard label="Due Orders" value={dashboard.nDueOrders} delay={60} highlight={dashboard.nDueOrders > 0} />
              <StatCard label="Customers" value={dashboard.nDistinctCustomers} delay={120} />
              <StatCard label="Items Served" value={dashboard.nTotalItemsServed} delay={180} />
              <StatCard label="Avg Order Value" value={dashboard.nAvgOrderValue} isCurrency delay={240} sub="Customer pays" />
              <StatCard label="Net Profit" value={dashboard.nTotalProfit} isCurrency delay={300} highlight />
            </div>

            {dashboard.topCustomerOfMonth && (
              <div className="insight-card">
                <span className="insight-card__icon">⭐</span>
                <div>
                  <strong>Top customer this month:</strong> {dashboard.topCustomerOfMonth.sName} — {dashboard.topCustomerOfMonth.nOrderCount} orders
                </div>
              </div>
            )}

            <div className="settings-card">
              <h3>Discount Settings</h3>
              <p className="settings-card__desc">Percentage deducted from the bill at checkout — customers pay the discounted total</p>
              <div className="settings-card__row settings-card__row--aligned">
                <FormField
                  label="Discount Percentage"
                  hint="0–100%. Example: 10% off a ₹500 bill = customer pays ₹450"
                  className="settings-card__field"
                >
                  <div className="settings-card__input-wrap">
                    <input
                      id="discountPercentage"
                      type="number"
                      min="0"
                      max="100"
                      value={discountInput}
                      onChange={(e) => setDiscountInput(e.target.value)}
                      className="settings-card__input form-field__input"
                    />
                    <span className="settings-card__suffix">%</span>
                  </div>
                </FormField>
                <button
                  type="button"
                  className="btn btn--primary btn--sm settings-card__submit"
                  onClick={handleSaveDiscount}
                  disabled={actionLoading}
                >
                  {actionLoading ? "Saving..." : "Update Discount"}
                </button>
              </div>
            </div>
          </div>
        )}

        {isRestaurant && activeTab === TABS.MENU && selectedCategory && (
          <div className="menu-management">
            <div className="menu-management__header">
              {permissions.bAddProduct && (
                <>
                  <button type="button" className="btn btn--outline btn--sm" onClick={() => setCategoryModal(true)} disabled={actionLoading}>
                    Add Category
                  </button>
                  <button type="button" className="btn btn--primary btn--sm" onClick={() => openItemModal()} disabled={actionLoading}>
                    Add Item
                  </button>
                </>
              )}
            </div>
            <MenuBrowser
              restaurantId={id}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              isRestaurant
              permissions={permissions}
              onEditItem={openItemModal}
              onDeleteItem={setDeleteTarget}
              onToggleAvailability={handleToggleAvailability}
            />
          </div>
        )}

        {isRestaurant && activeTab === TABS.ORDERS && (
          <div className="orders-section page-enter">
            <div className="orders-section__header">
              <div className="order-filters">
                <button
                  type="button"
                  className={`btn btn--sm ${orderFilter === "due" ? "btn--primary" : "btn--ghost"}`}
                  onClick={() => { setOrderFilter("due"); fetchOrders("due", orderSortBy, orderCustomerId); }}
                  disabled={actionLoading}
                >
                  Due Orders
                </button>
                <button
                  type="button"
                  className={`btn btn--sm ${orderFilter === "finished" ? "btn--primary" : "btn--ghost"}`}
                  onClick={() => { setOrderFilter("finished"); fetchOrders("finished", orderSortBy, orderCustomerId); }}
                  disabled={actionLoading}
                >
                  Finished Orders
                </button>
              </div>
              {orders.length > 0 && (
                <div className="orders-profit-summary">
                  <span>Total Profit ({orderFilter})</span>
                  <strong className="text-profit">{formatCurrency(ordersProfit)}</strong>
                </div>
              )}
            </div>

            <div className="orders-filters-panel">
              <select
                className="form-field__input"
                value={orderSortBy}
                onChange={(e) => {
                  setOrderSortBy(e.target.value);
                  fetchOrders(orderFilter, e.target.value, orderCustomerId);
                }}
                disabled={actionLoading}
              >
                <option value="latest">Latest first</option>
                <option value="oldest">Oldest first</option>
                <option value="amount_high">Bill: high to low</option>
                <option value="amount_low">Bill: low to high</option>
                <option value="items_high">Items: most first</option>
                <option value="items_low">Items: fewest first</option>
                <option value="profit_high">Profit: high to low</option>
                <option value="profit_low">Profit: low to high</option>
                <option value="customer">Customer name A–Z</option>
              </select>
              <select
                className="form-field__input"
                value={orderCustomerId}
                onChange={(e) => {
                  setOrderCustomerId(e.target.value);
                  fetchOrders(orderFilter, orderSortBy, e.target.value);
                }}
                disabled={actionLoading}
              >
                <option value="">All customers</option>
                {orderCustomers.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="order-list">
              {orders.map((order) => (
                <div key={order._id} className="order-card order-card--premium">
                  <div className="order-card__header">
                    <div>
                      <strong>{order.customer?.sName}</strong>
                      <span className={`badge badge--${order.eStatus}`}>{order.eStatus}</span>
                    </div>
                    <span className="order-card__date">{formatDate(order.dOrderDate)}</span>
                  </div>
                  <ul className="order-card__items">
                    {order.aItems?.map((ai, idx) => (
                      <li key={idx}>
                        {ai.item?.sName} × {ai.count}
                        <span className="order-card__item-cost">cost {formatCurrency((ai.item?.nOriginalPrice || 0) * ai.count)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="order-card__totals order-card__totals--grid">
                    <span>Customer Paid: {formatCurrency(order.nFinalPrice)}</span>
                    <span className="text-fee">Platform Fee: −{formatCurrency(platformFee(order))}</span>
                    <span>Net Collection: {formatCurrency(order.nRestaurantNet ?? (order.nFinalPrice - platformFee(order)))}</span>
                    <span>Item Cost: {formatCurrency(order.nCostAmount || 0)}</span>
                    <span className="text-profit">Profit: {formatCurrency(order.nProfit || 0)}</span>
                  </div>
                  {order.eStatus === "due" && (
                    <button type="button" className="btn btn--primary btn--sm" onClick={() => handleFinishOrder(order._id)} disabled={actionLoading}>
                      Mark Finished
                    </button>
                  )}
                </div>
              ))}
              {!orders.length && <p className="empty-state">No {orderFilter} orders</p>}
            </div>
          </div>
        )}

        {isRestaurant && activeTab === TABS.QR && (
          <div className="qr-section">
            {(menuData?.restaurant?.sQrUrl || restaurantInfo?.sQrUrl) ? (
              <>
                <img
                  src={menuData?.restaurant?.sQrUrl || restaurantInfo?.sQrUrl}
                  alt="Restaurant QR Code"
                  className="qr-section__image"
                />
                <button type="button" className="btn btn--primary" onClick={downloadQr} disabled={downloadingQr}>
                  {downloadingQr ? "Downloading..." : "Download QR as PNG"}
                </button>
              </>
            ) : (
              <Spinner />
            )}
          </div>
        )}
      </div>

      <Modal isOpen={categoryModal} onClose={() => setCategoryModal(false)} title="Add Category" size="sm">
        <FormField
          label="Category Name"
          hint="Groups items on your menu — e.g. Starters, Main Course, Drinks"
          name="categoryName"
          placeholder="e.g. Appetizers"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <button type="button" className="btn btn--primary btn--full" onClick={handleAddCategory} disabled={actionLoading}>
          Add Category
        </button>
      </Modal>

      <Modal
        isOpen={itemModal.open}
        onClose={() => setItemModal({ open: false, item: null, isEdit: false })}
        title={itemModal.isEdit ? "Update Item" : "Add Item"}
      >
        <form onSubmit={handleSaveItem} className="item-form">
          <FormField label="Item Name" hint="Name shown to customers on the menu" name="sName" defaultValue={itemForm.sName} placeholder="e.g. Margherita Pizza" required />
          <FormField label="Category" hint="Which menu section this item belongs to" name="iCategoryId" required>
            <select name="iCategoryId" defaultValue={itemForm.iCategoryId} className="form-field__input" required>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.sName}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Description" hint="Short description of ingredients or serving size" name="sDescription">
            <textarea name="sDescription" defaultValue={itemForm.sDescription} placeholder="e.g. Classic tomato, mozzarella, fresh basil" className="form-field__input" rows={3} />
          </FormField>
          <FormField label="Cost Price" hint="Your purchase/preparation cost per unit" name="nOriginalPrice" type="number" step="0.01" defaultValue={itemForm.nOriginalPrice} placeholder="e.g. 120" required />
          <FormField label="Sale Price" hint="Price customers pay per unit" name="nSalePrice" type="number" step="0.01" defaultValue={itemForm.nSalePrice} placeholder="e.g. 249" required />
          <FormField label="Stock Quantity" hint="Available units" name="nStock" type="number" defaultValue={itemForm.nStock} placeholder="e.g. 50" required />
          <label className="toggle">
            <input type="checkbox" name="bAvailable" defaultChecked={itemForm.bAvailable !== false} value="true" />
            Available for ordering
          </label>
          <FormField label="Item Photo" hint="Optional — JPG or PNG" name="image">
            <input name="image" type="file" accept="image/*" className="form-field__file" />
          </FormField>
          <button className="btn btn--primary btn--full" type="submit" disabled={actionLoading}>
            {itemModal.isEdit ? "Update Item" : "Add Item"}
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteItem}
        title="Delete Item"
        message={`Are you sure you want to delete "${deleteTarget?.sName}"?`}
      />
    </div>
  );
};

export default RestaurantPage;
