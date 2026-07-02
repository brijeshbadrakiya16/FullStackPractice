import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ApiActivityProvider } from "./context/ApiActivityContext";
import Navbar from "./components/Navbar";
import ApiActivityBar from "./components/ApiActivityBar";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import RestaurantPage from "./pages/RestaurantPage";
import SuperAdminPage from "./pages/SuperAdminPage";
import SuperAdminOrdersPage from "./pages/SuperAdminOrdersPage";
import { clearAdminToken } from "./utils/adminAuth";

const AdminTokenGuard = () => {
  const location = useLocation();
  useEffect(() => {
    if (!location.pathname.startsWith("/manage")) {
      clearAdminToken();
    }
  }, [location.pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ApiActivityProvider>
          <AuthProvider>
            <CartProvider>
              <ToastProvider>
                <AdminTokenGuard />
                <ApiActivityBar />
                <div className="app">
                  <Navbar />
                  <main className="app__main">
                    <Routes>
                      <Route path="/" element={<LandingPage />} />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute allowedRoles={["customer"]}>
                            <ProfilePage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/restaurant/:id"
                        element={
                          <ProtectedRoute allowedRoles={["customer", "restaurant"]}>
                            <RestaurantPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="/manage" element={<SuperAdminPage />} />
                      <Route path="/manage/orders" element={<SuperAdminOrdersPage />} />
                    </Routes>
                  </main>
                </div>
              </ToastProvider>
            </CartProvider>
          </AuthProvider>
        </ApiActivityProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
