import React, { useState, useEffect } from "react";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import HeaderComponent from './components/HeaderComponent';
import CustomerListComponent from './components/CustomerListComponent';
import { Route, Switch } from 'react-router-dom';
import AddCustomerComponent from './components/AddCustomerComponent';
import TransactionsComponent from './components/TransactionsComponent';
import DoTransaction from './components/DoTransaction';
import ErrorComponent from './components/ErrorComponent';
import UserService from "./services/UserService";

function App() {

  const [phone, setPhone] = useState("9104425268");
  const [error, setError] = useState("");
  const [user,setUser]=useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("uid");
    console.log(loggedInUser);
    setUser(false);
    if(localStorage.getItem("uid")===null)  setUser(true);
    console.log(user);
    document.getElementById("phone").innerHTML="9104425268";
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await UserService.getUserId(phone).then().catch(err => {
      setError(err.response.data);
    });

    console.log(response.data);
    localStorage.setItem("uid", JSON.stringify(response.data));
    window.location.reload();
  };

  if (user) {
    return (

      <div className="container p-4">

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Mobile number</label>
            <input type="tel" className="form-control" id="phone" placeholder="Enter Mobile"
            value={phone}
              onChange={({ target }) => setPhone(target.value)} pattern="[0-9]{10}" required />
          </div>
          <button type="submit" className="btn btn-primary m-2">Enter</button>
        </form>

        <div>
          <h1>{error}</h1>
        </div>

        <div>
          <h1>Enter 9104425268 for demo account</h1>
        </div>

      </div>
    )
  }

  return (
    <div>
      <main>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={CustomerListComponent}></Route>
            <Route path="/book" exact component={CustomerListComponent}></Route>
            <Route path="/addCustomer" component={AddCustomerComponent}></Route>
            <Route path="/transactions/:id" component={TransactionsComponent}></Route>
            <Route path="/book/add/:id" component={DoTransaction}></Route>
            <Route component={ErrorComponent}></Route>
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default App;
