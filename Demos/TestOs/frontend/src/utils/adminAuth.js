const ADMIN_TOKEN_KEY = "adminToken";
const COOKIE_MAX_AGE = 12 * 60 * 60;

export const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_KEY);

export const setAdminToken = (token) => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
  document.cookie = `${ADMIN_TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Strict`;
};

export const clearAdminToken = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  document.cookie = `${ADMIN_TOKEN_KEY}=; path=/; max-age=0; SameSite=Strict`;
};

export const isAdminAuthenticated = () => !!getAdminToken();
