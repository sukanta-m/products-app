import { fetchOrderDetails } from "../apis/dashboard";
import { FTECH_ORDER_REQUEST, FTECH_ORDER_REQUEST_SUCCESS, FTECH_ORDER_REQUEST_FAILURE } from "../constants";
 
export const fetchOrder = (storeId) => {
  return dispatch => {
    dispatch({ type: FTECH_ORDER_REQUEST })
    return fetchOrderDetails(storeId)
    .then(response => dispatch({type: FTECH_ORDER_REQUEST_SUCCESS, payload: response}))
    .catch(error => dispatch({type: FTECH_ORDER_REQUEST_FAILURE, error}));
  }
}