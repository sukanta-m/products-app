import { Auth } from "aws-amplify";
import { Hub } from "aws-amplify";
import { get } from "lodash";
import store from "./store";
import {
  SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGOUT
} from "./modules/constants";

Hub.listen('auth', (data) => {
  switch (data.payload.event) {
    case 'signIn':
       Auth.currentSession().then(({idToken}) => store.dispatch({ type: SIGNIN_SUCCESS, payload: get(idToken, "payload")}));
      break;
    case 'signIn_failure':
      store.dispatch({type: SIGNIN_FAILURE, payload: get(data, "payload.data")});
      break;
    case 'signUp':
      console.log('user signed up' + data.payload.data.codeDeliveryDetails.Destination);
      //TODO Code here to insert into Database
      break;
    case 'confirmSignUp':
      console.log('Confirmed sign up')
      break;
    case 'signOut':
      store.dispatch({type: LOGOUT});
      break;
    case 'signUp_failure':
      console.log('user sign in failed');
      break;
    case 'configured':
      console.log('the Auth module is configured');
      break;
    case "storage":
      console.log(data)
      break;
    default:
      console.log("data", data)
      break;
  }
});