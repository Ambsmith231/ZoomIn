const BASE_URL = "http://localhost:5000/api";

// Helper function
async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    ...(options.headers || {}),
  };

  // Add JWT if available
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Don't set Content-Type for FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data;

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || data.error || "Request failed");
  }

  return data;
}

export const api = {
  // AUTH
  register(userData) {
    return request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  login(credentials) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  // PRODUCTS
  getProducts() {
    return request("/products");
  },

  getProduct(id) {
    return request(`/products/${id}`);
  },

  createProduct(formData) {
    return request("/products", {
      method: "POST",
      body: formData,
    });
  },

  archiveProduct(id) {
    return request(`/products/archive/${id}`, {
      method: "PUT",
    });
  },

  // ORDERS
  createOrder(orderData) {
    return request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  },
};

export const auth = {
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },

  getToken() {
    return localStorage.getItem("token");
  },
  getProduct(id) {
    return request(`/products/${id}`);
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  isLoggedIn() {
    return !!localStorage.getItem("token");
  },

  isAdmin() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.role === "admin";
  },
};

export default api;
