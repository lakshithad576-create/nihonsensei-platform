// src/config/api.js
const API_URL = import.meta.env.VITE_API_URL || "/api";

async function parseResponse(res) {
  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return res.json();
  }

  const text = await res.text();

  return {
    message: text.trim().startsWith("<!DOCTYPE")
      ? "The API returned HTML instead of JSON. Check the deployed backend URL and Firebase rewrite rules."
      : text || "Request failed"
  };
}

export async function apiRequest(path, options = {}) {
  const token = sessionStorage.getItem('token');
  const hasFormDataBody = typeof FormData !== "undefined" && options.body instanceof FormData;
  const hasBody = options.body !== undefined && options.body !== null;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(hasBody && !hasFormDataBody ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const data = await parseResponse(res);

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}