import { useState, useEffect, useCallback, useRef } from "react";
import { apiGet } from "../utils/api";
import { useDebouncedValue } from "../customHooks/useDebouncedValue";
import { throttle } from "../utils/throttle";
import Spinner from "../components/Spinner";
import CustomerItemCard from "./CustomerItemCard";
import RestaurantItemCard from "./RestaurantItemCard";

const MenuBrowser = ({
  restaurantId,
  categories,
  selectedCategory,
  onCategoryChange,
  isRestaurant,
  permissions,
  onAddToCart,
  onEditItem,
  onDeleteItem,
  onToggleAvailability,
}) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const sentinelRef = useRef(null);
  const debouncedSearch = useDebouncedValue(search, 450);

  const fetchItems = useCallback(
    async (pageNum, append = false) => {
      if (!selectedCategory) return;
      setLoading(true);
      try {
        const params = new URLSearchParams({
          categoryId: selectedCategory,
          sort,
          page: String(pageNum),
          limit: "12",
        });
        if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());

        const res = await apiGet(`/restaurant/${restaurantId}/menu/items?${params}`);
        const newItems = res.data.items || [];
        setItems((prev) => (append ? [...prev, ...newItems] : newItems));
        setHasMore(res.data.hasMore);
        setTotal(res.data.total);
        setPage(pageNum);
      } catch {
        if (!append) setItems([]);
      } finally {
        setLoading(false);
      }
    },
    [restaurantId, selectedCategory, sort, debouncedSearch]
  );

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    fetchItems(1, false);
  }, [selectedCategory, sort, debouncedSearch, fetchItems]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore || loading) return undefined;

    const observer = new IntersectionObserver(
      throttle((entries) => {
        if (entries[0]?.isIntersecting && hasMore && !loading) {
          fetchItems(page + 1, true);
        }
      }, 500),
      { rootMargin: "120px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loading, page, fetchItems]);

  return (
    <div className="menu-browser">
      <div className="menu-browser__toolbar">
        <input
          type="search"
          className="form-field__input menu-browser__search"
          placeholder="Search menu items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-field__input menu-browser__sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="name">Name A–Z</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          {isRestaurant && <option value="stock">Stock</option>}
        </select>
        <span className="menu-browser__count">{total} item{total !== 1 ? "s" : ""}</span>
      </div>

      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat._id}
            type="button"
            className={`category-tabs__btn ${selectedCategory === cat._id ? "category-tabs__btn--active" : ""}`}
            onClick={() => onCategoryChange(cat._id)}
          >
            {cat.sName}
          </button>
        ))}
      </div>

      <div className="items-grid">
        {items.map((item) =>
          isRestaurant ? (
            <RestaurantItemCard
              key={item._id}
              item={item}
              permissions={permissions}
              onEdit={onEditItem}
              onDelete={onDeleteItem}
              onToggleAvailability={onToggleAvailability}
            />
          ) : (
            <CustomerItemCard key={item._id} item={item} onAdd={onAddToCart} />
          )
        )}
      </div>

      {!items.length && !loading && <p className="empty-state">No items match your filters</p>}

      <div ref={sentinelRef} className="menu-browser__sentinel">
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default MenuBrowser;
