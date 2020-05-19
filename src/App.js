import React from 'react';
import { Route} from 'react-router-dom'
import { get } from "lodash";
import Dashboard from './pages/dashboard'
import logo from './logo.svg';
import './App.css';
import Header from "./pages/sharedComponents/header";
import 'antd/dist/antd.css'
import { withAuthenticator } from "@aws-amplify/ui-react";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./awsconfig";
import "./auth";
import store from "./store";
import { SIGNIN_SUCCESS } from "./modules/constants";

Amplify.configure(awsconfig());
Auth.currentSession().then(({idToken}) => store.dispatch({ type: SIGNIN_SUCCESS, payload: get(idToken, "payload")}));

function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Route exact path="/" component={Dashboard} />
      </main>
    </div>
  );
}

export default withAuthenticator(App);
