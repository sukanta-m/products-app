import { fetchOrderDetails, processOrderBillOrShip } from "../apis/dashboard";
import {
  FTECH_ORDER_REQUEST, FTECH_ORDER_REQUEST_SUCCESS, FTECH_ORDER_REQUEST_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_REQUEST_SUCCESS, UPDATE_ORDER_STATUS_REQUEST_FAILURE,
  CLEAR_DASHBOARD_ERROR
 } from "../constants";
 
export const fetchOrder = (storeId) => {
  return dispatch => {
    dispatch({ type: FTECH_ORDER_REQUEST })
    return fetchOrderDetails(storeId)
    .then(response => dispatch({type: FTECH_ORDER_REQUEST_SUCCESS, payload: response}))
    .catch(error => dispatch({type: FTECH_ORDER_REQUEST_FAILURE, error}));
  }
}

export const updateOrderStatus = (payload) => {
  return dispatch => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST })
    return processOrderBillOrShip(payload)
    .then(response => dispatch({type: UPDATE_ORDER_STATUS_REQUEST_SUCCESS, payload: response}))
    .catch(error => dispatch({type: UPDATE_ORDER_STATUS_REQUEST_FAILURE, error}));
  }
}

export const clearError = () => ({type: CLEAR_DASHBOARD_ERROR})