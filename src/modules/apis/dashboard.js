import axios from "./axios";

export const fetchOrderDetails = storeId => {
  return axios.post("/orders_fetch", {
    store_id: storeId
  })
};

export const processOrderBillOrShip = data => {
  return axios.post("/order_status", data)
}