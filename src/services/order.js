import api from "./api";

export const fetchOrders = (params = {}) => api.get("/orders", { params });

export const addOrder = (formData) =>
  api.post("/orders", formData, {
    headers: { "Content-Type": "application/json" },
  });
export const updateOrderStatus = (orderId, status) => {
  return api.put(`/orders/${orderId}`, { status });
};
