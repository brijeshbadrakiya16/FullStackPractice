import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../customHooks/useAuth";
import { useTheme } from "../customHooks/useTheme";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 14.5A8.5 8.5 0 1114.5 3a6.5 6.5 0 006.5 11.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
};

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isManage = location.pathname.startsWith("/manage");
  const isLanding = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/?auth=customer-login");
  };

  const role = user?.sRole;

  return (
    <nav className={`navbar navbar--${isManage ? "admin" : isAuthenticated ? role : "guest"}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand">
          <span className="navbar__mark">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <rect x="16" y="16" width="4" height="4" fill="currentColor" />
            </svg>
          </span>
          <span className="navbar__wordmark">
            <span className="navbar__name">TastOs</span>
            {isManage && <span className="navbar__badge navbar__badge--admin">Admin</span>}
            {role === "restaurant" && !isManage && (
              <span className="navbar__badge navbar__badge--restaurant">Restaurant</span>
            )}
            {role === "customer" && !isManage && (
              <span className="navbar__badge navbar__badge--customer">Customer</span>
            )}
          </span>
        </Link>

        <div className="navbar__actions">
          <ThemeToggle />

          {isManage ? (
            <div className="navbar__cluster">
              <span className="navbar__status navbar__status--admin">SuperAdmin Panel</span>
              <Link to="/manage/orders" className="navbar__link">Orders</Link>
              <Link to="/" className="navbar__link">← Public Site</Link>
            </div>
          ) : !isAuthenticated ? (
            <div className="navbar__cluster">
              {isLanding && (
                <a href="#features" className="navbar__link navbar__link--muted">Features</a>
              )}
              <Link to="/?auth=customer-login" className="navbar__link">Sign In</Link>
              <Link to="/?auth=restaurant-register" className="btn btn--primary btn--sm">
                Get Started
              </Link>
            </div>
          ) : role === "customer" ? (
            <div className="navbar__cluster">
              <Link
                to="/profile"
                className={`navbar__link ${location.pathname === "/profile" ? "navbar__link--active" : ""}`}
              >
                Profile
              </Link>
              <div className="navbar__user-chip">
                <span className="navbar__avatar">{user.sName?.[0]}</span>
                <span className="navbar__user-name">{user.sName}</span>
              </div>
              <button type="button" className="btn btn--ghost btn--sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : role === "restaurant" ? (
            <div className="navbar__cluster">
              <Link
                to={`/restaurant/${user.id}`}
                className={`navbar__link ${location.pathname.includes("/restaurant/") ? "navbar__link--active" : ""}`}
              >
                Dashboard
              </Link>
              <Link
                to={`/restaurant/${user.id}`}
                className="navbar__link navbar__link--muted"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/restaurant/${user.id}`, { state: { tab: "menu" } });
                }}
              >
                Menu
              </Link>
              <div className="navbar__user-chip navbar__user-chip--restaurant">
                <span className="navbar__avatar">{user.sName?.[0]}</span>
                <span className="navbar__user-name">{user.sName}</span>
              </div>
              <button type="button" className="btn btn--ghost btn--sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
