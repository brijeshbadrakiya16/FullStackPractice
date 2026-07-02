import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import FormField from "../components/FormField";
import { useAuth } from "../customHooks/useAuth";
import { useToast } from "../customHooks/useToast";
import { useNavigate } from "react-router-dom";
import { useAsyncAction } from "../customHooks/useAsyncAction";
import {
  validateEmail,
  validatePassword,
  validateContact,
  validateName,
  validateRequired,
} from "../utils/validation";

const EMPTY_FORM = { sName: "", sEmail: "", sPassword: "", sContactNumber: "", sAddress: "" };

const AuthModal = ({ isOpen, onClose, mode = "customer-login" }) => {
  const [activeMode, setActiveMode] = useState(mode);
  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const { login, register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { loading, run } = useAsyncAction();

  const isCustomer = activeMode.startsWith("customer");
  const isLogin = activeMode.endsWith("login");

  useEffect(() => {
    if (isOpen) {
      setActiveMode(mode);
      setForm(EMPTY_FORM);
      setFieldErrors({});
    }
  }, [mode, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateClient = () => {
    const errors = {};
    if (!isLogin) {
      const nameErr = validateName(form.sName, isCustomer ? "Full name" : "Restaurant name");
      if (nameErr) errors.sName = nameErr;
      const contactErr = validateContact(form.sContactNumber);
      if (contactErr) errors.sContactNumber = contactErr;
      if (!isCustomer) {
        const addrErr = validateRequired(form.sAddress, "Address");
        if (addrErr) errors.sAddress = addrErr;
      }
    }
    const emailErr = validateEmail(form.sEmail);
    if (emailErr) errors.sEmail = emailErr;
    const passErr = validatePassword(form.sPassword);
    if (passErr) errors.sPassword = passErr;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateClient()) return;

    await run(async () => {
      const role = isCustomer ? "customer" : "restaurant";
      const action = isLogin ? "login" : "register";
      const endpoint = `/auth/${role}/${action}`;
      const fn = isLogin ? login : register;
      try {
        const res = await fn(endpoint, form);
        showToast(`Welcome${isLogin ? " back" : ""}, ${res.user.sName}!`);
        onClose();
        if (role === "restaurant") {
          navigate(`/restaurant/${res.user.id}`);
        } else {
          navigate("/profile");
        }
      } catch (err) {
        if (err.errors?.length) {
          const mapped = {};
          err.errors.forEach((item) => {
            mapped[item.field] = item.message;
          });
          setFieldErrors(mapped);
        }
        showToast(err.message, "error");
      }
    });
  };

  const switchMode = (newMode) => {
    setActiveMode(newMode);
    setForm(EMPTY_FORM);
    setFieldErrors({});
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isLogin ? "Login" : "Register"}
      size="sm"
    >
      <p className="auth-mode-hint">
        {isCustomer
          ? "Order food from restaurants via QR menus"
          : "Manage your menu, orders, and restaurant dashboard"}
      </p>

      <div className="auth-tabs" role="tablist" aria-label="Account type">
        <button
          type="button"
          role="tab"
          aria-selected={isCustomer}
          className={`auth-tabs__btn ${isCustomer ? "auth-tabs__btn--active" : ""}`}
          onClick={() => switchMode(isCustomer ? activeMode : "customer-login")}
        >
          Customer
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!isCustomer}
          className={`auth-tabs__btn ${!isCustomer ? "auth-tabs__btn--active" : ""}`}
          onClick={() => switchMode(!isCustomer ? activeMode : "restaurant-login")}
        >
          Restaurant
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            {isCustomer ? (
              <FormField
                label="Full Name"
                hint="Your name as it appears on orders"
                name="sName"
                placeholder="e.g. Alex Johnson"
                required
                value={form.sName}
                onChange={handleChange}
                error={fieldErrors.sName}
              />
            ) : (
              <>
                <FormField
                  label="Restaurant Name"
                  hint="The public name customers will see"
                  name="sName"
                  placeholder="e.g. Spice Garden Bistro"
                  required
                  value={form.sName}
                  onChange={handleChange}
                  error={fieldErrors.sName}
                />
                <FormField
                  label="Restaurant Address"
                  hint="Full street address for your location"
                  name="sAddress"
                  placeholder="e.g. 42 Main Street, Mumbai"
                  required
                  value={form.sAddress}
                  onChange={handleChange}
                  error={fieldErrors.sAddress}
                />
              </>
            )}
            <FormField
              label="Contact Number"
              hint="10-digit mobile number for account verification"
              name="sContactNumber"
              type="tel"
              placeholder="e.g. 9876543210"
              required
              value={form.sContactNumber}
              onChange={handleChange}
              error={fieldErrors.sContactNumber}
            />
          </>
        )}
        <FormField
          label="Email Address"
          hint="Used to sign in to your account"
          name="sEmail"
          type="email"
          placeholder="you@example.com"
          required
          value={form.sEmail}
          onChange={handleChange}
          error={fieldErrors.sEmail}
        />
        <FormField
          label="Password"
          hint={isLogin ? "Enter your account password" : "Minimum 6 characters"}
          name="sPassword"
          type="password"
          placeholder="••••••••"
          required
          value={form.sPassword}
          onChange={handleChange}
          error={fieldErrors.sPassword}
        />
        <button className="btn btn--primary btn--full" type="submit" disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
        </button>
      </form>

      <p className="auth-switch">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          className="auth-switch__link"
          onClick={() =>
            switchMode(
              isLogin
                ? isCustomer
                  ? "customer-register"
                  : "restaurant-register"
                : isCustomer
                  ? "customer-login"
                  : "restaurant-login"
            )
          }
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </Modal>
  );
};

export default AuthModal;
