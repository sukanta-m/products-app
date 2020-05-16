import { FTECH_ORDER_REQUEST, FTECH_ORDER_REQUEST_SUCCESS, FTECH_ORDER_REQUEST_FAILURE } from "../constants";

const initialState = {
  fetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FTECH_ORDER_REQUEST:
      return {
        ...state,
        fetching: true
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
      return {
        ...state,
        fetching: false,
        error: action.error
      }

    default:
      return state
  }
}

