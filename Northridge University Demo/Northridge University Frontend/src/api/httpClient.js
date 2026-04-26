const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

async function request(path, options = {}) {
  const token = JSON.parse(sessionStorage.getItem("north_ridge_auth") || "{}")?.token;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "API request failed.");
  }

  return data;
}

export const httpClient = {
  get: (path) => request(path),
  post: (path, body) =>
    request(path, {
      method: "POST",
      body: JSON.stringify(body)
    }),
  put: (path, body) =>
    request(path, {
      method: "PUT",
      body: JSON.stringify(body)
    }),
  delete: (path) =>
    request(path, {
      method: "DELETE"
    })
};
