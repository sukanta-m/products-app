import {
  SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGOUT
} from "../constants";

const initialState = {
  fetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}