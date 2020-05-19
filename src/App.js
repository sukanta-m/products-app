import React, { useEffect } from 'react';
import { Route} from 'react-router-dom'
import { get } from "lodash";
import Dashboard from './pages/dashboard'
import './App.css';
import Header from "./pages/sharedComponents/header";
import 'antd/dist/antd.css'
import '@aws-amplify/ui/dist/style.css';

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./awsconfig";
import "./auth";
import store from "./store";
import { SIGNIN_SUCCESS } from "./modules/constants";
import { withAuthenticator, SignIn, SignUp, ForgotPassword, RequireNewPassword, VerifyContact } from 'aws-amplify-react';

class CustomNoSignUp extends SignUp {
  render() {
    console.log(this.props.authState)
    if (this.props.authState !== 'signUp') { return null; }
    return (<div>Please check with your administrator to create a user</div>);
  }
}

Amplify.configure(awsconfig());
Auth.currentSession().then(({idToken}) => store.dispatch({ type: SIGNIN_SUCCESS, payload: get(idToken, "payload")}));

function App() {
  return (
    <div className="App">
      <Header/>
      <Authenticator/>
    </div>
  );
}

const Router = () => {
  return  <main>
  <Route exact path="/" component={Dashboard} />
  </main>
};

const Authenticator = withAuthenticator(Router, true,
  [
    <SignIn />,
    <CustomNoSignUp/>,
    <ForgotPassword/>,
    <RequireNewPassword/>,
    <VerifyContact/>
  ]
);

export default App;
