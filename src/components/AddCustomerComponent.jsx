import React, { Component } from 'react'
import CustomerService from '../services/CustomerService';

export default class AddCustomerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: "",
            name: "",
            error:""
        }

        this.changeNameHandler=this.changeNameHandler.bind(this);

        this.changePhoneHandler=this.changePhoneHandler.bind(this);
        this.createCustomer=this.createCustomer.bind(this);
    }

    
    createCustomer(e){
        e.preventDefault(); 
        let customer={user_id:1,name:this.state.name,phone:this.state.phone};
        console.log(customer);

        CustomerService.createCustomer(customer).then(response=>{
            console.log(response);
            this.props.history.push('/book');
        }).catch(err=>{
            this.setState({error:err.response.data});
        });
    }


    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    changePhoneHandler = (event) => {
        this.setState({ phone: event.target.value });
    }
    render() {
        return (
            <div className="container">

                <div>
                    <h1>Add Customer</h1>
                </div>
                
                <form onSubmit={this.createCustomer}>
                    <div className="form-group">
                    <label >Mobile Number</label>
                        <input type="tel" className="form-control" id="customerMobile" placeholder="Enter Mobile"
                            value={this.state.phone} onChange={this.changePhoneHandler} pattern="[0-9]{10}" required/>
                    </div>
                    <div className="form-group">
                    <label>Customer Name</label>
                        <input type="text" className="form-control" id="customerName" placeholder="Enter customer's name"
                        value={this.state.name} onChange={this.changeNameHandler} required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                <div>
                    <h1>{this.state.error}</h1>
                </div>

            </div>
        )
    }
}

