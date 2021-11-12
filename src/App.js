import React from "react";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import HeaderComponent from './components/HeaderComponent';
import CustomerListComponent from './components/CustomerListComponent';
import { Route, Switch } from 'react-router-dom';
import AddCustomerComponent from './components/AddCustomerComponent';
import TransactionsComponent from './components/TransactionsComponent';
import DoTransaction from './components/DoTransaction';
import ErrorComponent from './components/ErrorComponent';
import RegisterUser from "./components/RegisterUser";
import LoginComponent from "./components/LoginComponent";

function App() {
  return (
    <div>
      <main>
        
        <HeaderComponent />

        <div className="container">
          <Switch>
            <Route path="/" exact component={LoginComponent}></Route>

            <Route path="/book" exact component={CustomerListComponent}></Route>
            <Route path="/addCustomer" exact component={AddCustomerComponent}></Route>
            <Route path="/transactions/:id" exact component={TransactionsComponent}></Route>
            <Route path="/book/add/:id" exact component={DoTransaction}></Route>

            <Route path="/register" exact component={RegisterUser}></Route>
            <Route path="/login" exact component={LoginComponent}></Route>
            
            <Route component={ErrorComponent}></Route>
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default App;
