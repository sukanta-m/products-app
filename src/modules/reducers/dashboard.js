import {
  FTECH_ORDER_REQUEST, FTECH_ORDER_REQUEST_SUCCESS, FTECH_ORDER_REQUEST_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_REQUEST_SUCCESS, UPDATE_ORDER_STATUS_REQUEST_FAILURE,
  CLEAR_DASHBOARD_ERROR
} from "../constants";
import orderMockData from "../mockData/order";

const initialState = {
  fetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FTECH_ORDER_REQUEST:
      return {
        ...state,
        fetching: true,
        updatingStatus: false
      }

    case FTECH_ORDER_REQUEST_SUCCESS:
      const order = action.payload.data.map(d => {
        const items = JSON.parse(d.items);
        return { ...d, items };
      })
      return {
        ...state,
        order,
        fetching: false
      }

    case FTECH_ORDER_REQUEST_FAILURE:
      let orderData = [];
      if (process.env.NODE_ENV === "development") {
        orderData = orderMockData.orders.map(d => {
          const items = JSON.parse(d.items);
          return { ...d, items };
        });
      }
      return {
        ...state,
        fetching: false,
        error: action.error,
        order: orderData
      }

    case UPDATE_ORDER_STATUS_REQUEST:
      return {
        ...state,
        updatingStatus: true
      };
    
    case UPDATE_ORDER_STATUS_REQUEST_SUCCESS:
      return {
        ...state,
        updatingStatus: false
      }
    case UPDATE_ORDER_STATUS_REQUEST_FAILURE:
      return {
        ...state,
        updatingStatus: false,
        updateError: action.error
      }
    case CLEAR_DASHBOARD_ERROR:
      return {
        ...state,
        error: "",
        updateError: ""
      }
    default:
      return state
  }
}

