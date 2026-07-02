import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import { useFetch } from "../customHooks/useFetch";
import AuthModal from "../customComponents/AuthModal";
import StatCard from "../components/StatCard";
import ScrollReveal from "../components/ScrollReveal";
import ErrorState from "../components/ErrorState";
import Skeleton from "../components/Skeleton";

const features = [
  { title: "QR Digital Menus", desc: "Customers scan and order instantly — no app required", accent: "cyan" },
  { title: "Order Management", desc: "Track live orders, fulfillment status, and kitchen workflow", accent: "blue" },
  { title: "Profit Analytics", desc: "Revenue breakdown with platform fees, costs, and net profit per order", accent: "teal" },
  { title: "Multi-Tenant Control", desc: "SuperAdmin governance, permissions, and per-restaurant billing", accent: "indigo" },
];

const steps = [
  { step: "01", title: "Register", desc: "Restaurant signs up and receives a unique QR code" },
  { step: "02", title: "Build Menu", desc: "Add categories, items, pricing, and images" },
  { step: "03", title: "Get Approved", desc: "SuperAdmin activates service — then you go live" },
  { step: "04", title: "Earn", desc: "Customers order, you fulfill, platform handles the rest" },
];

const LandingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("customer-login");

  const { data, loading, error, refetch } = useFetch(() => apiGet("/public/stats"));

  useEffect(() => {
    const auth = searchParams.get("auth");
    if (auth) {
      setAuthMode(auth);
      setAuthOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const stats = data?.data;

  return (
    <div className="landing">
      <section className="hero hero--premium">
        <div className="hero__mesh" />
        <div className="container hero__inner">
          <ScrollReveal className="hero__content" direction="left">
            <p className="hero__eyebrow">Restaurant Operations Platform</p>
            <h1 className="hero__title">
              Run your restaurant.<br />
              <span className="hero__highlight">Not your software.</span>
            </h1>
            <p className="hero__subtitle">
              QR menus, real-time orders, and profit analytics — built for operators who need clarity, not complexity.
            </p>
            <div className="hero__cta">
              <button className="btn btn--primary btn--lg" onClick={() => { setAuthMode("restaurant-register"); setAuthOpen(true); }}>
                Start as Restaurant
              </button>
              <button className="btn btn--outline btn--lg" onClick={() => { setAuthMode("customer-login"); setAuthOpen(true); }}>
                Customer Sign In
              </button>
            </div>
          </ScrollReveal>
          <ScrollReveal className="hero__visual" direction="right" delay={120}>
            <div className="hero__metrics-card">
              <div className="hero__metrics-row">
                <span>Live Restaurants</span>
                <strong>{loading ? "—" : stats?.nActiveRestaurants ?? 0}</strong>
              </div>
              <div className="hero__metrics-row">
                <span>Orders Processed</span>
                <strong>{loading ? "—" : stats?.nTotalOrders ?? 0}</strong>
              </div>
              <div className="hero__metrics-row">
                <span>Customers Served</span>
                <strong>{loading ? "—" : stats?.nTotalCustomers ?? 0}</strong>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section section--stats">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <p className="section-eyebrow">Platform Metrics</p>
              <h2 className="section__title">Live platform metrics</h2>
            </div>
          </ScrollReveal>
          {loading ? (
            <div className="stats-grid-premium">
              {[1, 2, 3, 4].map((i) => <Skeleton key={i} height="120px" />)}
            </div>
          ) : error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : (
            <div className="stats-grid-premium">
              <ScrollReveal delay={0}><StatCard label="Active Restaurants" value={stats.nActiveRestaurants} highlight /></ScrollReveal>
              <ScrollReveal delay={80}><StatCard label="Customers" value={stats.nTotalCustomers} /></ScrollReveal>
              <ScrollReveal delay={160}><StatCard label="Orders Processed" value={stats.nTotalOrders} /></ScrollReveal>
              <ScrollReveal delay={240}><StatCard label="Items Ordered" value={stats.nTotalItemsServed} sub="Units sold platform-wide" /></ScrollReveal>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <p className="section-eyebrow">How It Works</p>
              <h2 className="section__title">From signup to revenue in four steps</h2>
            </div>
          </ScrollReveal>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 80}>
                <div className="step-card-pro">
                  <span className="step-card-pro__num">{s.step}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <p className="section-eyebrow">Capabilities</p>
              <h2 className="section__title">Everything you need to operate digitally</h2>
            </div>
          </ScrollReveal>
          <div className="features-grid-pro">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 70}>
                <div className={`feature-card-pro feature-card-pro--${f.accent}`}>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="cta-section">
          <div className="container cta-section__inner">
            <h2>Ready to go digital?</h2>
            <p>Join restaurants already running on TastOs.</p>
            <button className="btn btn--primary btn--lg" onClick={() => { setAuthMode("restaurant-register"); setAuthOpen(true); }}>
              Register Your Restaurant
            </button>
          </div>
        </section>
      </ScrollReveal>

      <footer className="footer footer--premium">
        <div className="container footer__inner">
          <div className="footer__brand">
            <span className="footer__name">TastOs</span>
            <span className="footer__tagline">Restaurant operations, simplified.</span>
          </div>
          <span className="footer__copy">© 2026 TastOs</span>
        </div>
      </footer>

      <AuthModal key={`${authMode}-${authOpen}`} isOpen={authOpen} onClose={() => setAuthOpen(false)} mode={authMode} />
    </div>
  );
};

export default LandingPage;
