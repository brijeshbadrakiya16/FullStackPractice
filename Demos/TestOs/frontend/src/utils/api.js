import { apiActivityStart, apiActivityEnd } from "./apiActivity";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const getAdminToken = () => {
  const stored = localStorage.getItem("adminToken");
  if (stored) return stored;
  const match = document.cookie.match(/(?:^|;\s*)adminToken=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
};

const getAuthHeaders = (useAdmin = false) => {
  const token = useAdmin ? getAdminToken() : localStorage.getItem("token");
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export class ApiError extends Error {
  constructor(message, statusCode, errors) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

const handleResponse = async (response) => {
  let data = null;
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      (response.status === 401
        ? "Session expired. Please log in again."
        : response.status === 403
          ? "You do not have permission to perform this action."
          : response.status === 404
            ? "The requested resource was not found."
            : response.status >= 500
              ? "Server error. Please try again later."
              : `Request failed (${response.status})`);

    throw new ApiError(message, response.status, data?.errors);
  }

  return data;
};

const withActivity = async (requestFn) => {
  apiActivityStart();
  try {
    return await requestFn();
  } finally {
    apiActivityEnd();
  }
};

export const apiGet = (endpoint, useAdmin = false) =>
  withActivity(async () => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: { ...getAuthHeaders(useAdmin) },
    });
    return handleResponse(response);
  });

export const apiPost = (endpoint, body, useAdmin = false) =>
  withActivity(async () => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders(useAdmin) },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  });

export const apiPatch = (endpoint, body, useAdmin = false) =>
  withActivity(async () => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...getAuthHeaders(useAdmin) },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  });

export const apiDelete = (endpoint, useAdmin = false) =>
  withActivity(async () => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "DELETE",
      headers: { ...getAuthHeaders(useAdmin) },
    });
    return handleResponse(response);
  });

export const apiPostForm = (endpoint, formData, useAdmin = false) =>
  withActivity(async () => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { ...getAuthHeaders(useAdmin) },
      body: formData,
    });
    return handleResponse(response);
  });

export const apiPatchForm = (endpoint, formData, useAdmin = false) =>
  withActivity(async () => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "PATCH",
      headers: { ...getAuthHeaders(useAdmin) },
      body: formData,
    });
    return handleResponse(response);
  });
