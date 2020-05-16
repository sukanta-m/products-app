import React from 'react';
import { Route, Link } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import logo from './logo.svg';
import './App.css';
import Header from "./pages/sharedComponents/header";
import 'antd/dist/antd.css'

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

export default App;
