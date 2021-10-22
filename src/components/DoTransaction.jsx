import React, { Component } from 'react'
import CustomerService from '../services/CustomerService';
import TransactionService from '../services/TransactionService';

export default class DoTransaction extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customer_name: "",
            amount: 0,
            details: "",
            date: new Date(),
            transaction_type: "",
        }

        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeDeatails = this.onChangeDeatails.bind(this);
        this.createTransaction = this.createTransaction.bind(this);
    }


    componentDidMount() {

        CustomerService.getCustomerName(this.props.match.params.id).then(res => {

            this.setState({ customer_name: res.data });

            if (this.props.location.state.transactionType === "debit") {
                this.setState({  transaction_type: "DEBIT" });
                document.getElementById("h1").innerHTML = "You gave to: " + this.state.customer_name;
            } else {
                this.setState({  transaction_type: "CREDIT" });
                document.getElementById("h1").innerHTML = "You got from: " + this.state.customer_name;
            }
        });
    }

    createTransaction(e){
        e.preventDefault();

        let transaction={
            details_text:this.state.details,
            transaction_type:this.state.transaction_type,
            transaction_amount:this.state.amount,
            customer_id:this.props.location.state.customer_id
        };

        console.log(transaction);

        TransactionService.createTransaction(transaction).then(res=>{
            this.props.history.push(`/transactions/${this.props.location.state.customer_id}`);
        });
    }

    onChangeAmount = (event) => {
        this.setState({ amount: event.target.value });
    }

    onChangeDeatails = (event) => {
        this.setState({ details: event.target.value });
    }



    render() {
        return (
            <div>
                <div className="container">

                    <div>
                        <h1 id="h1">You gave to:</h1>
                    </div>

                    <form onSubmit={this.createTransaction}>
                        <div className="mb-3 mt-3" >
                            <label htmlFor="amount" className="form-label">Enter Amount:</label>
                            <input type="number" className="form-control" id="transactionAmount" placeholder="Amount"
                                value={this.state.amount} onChange={this.onChangeAmount}
                                pattern="[0-9]{10}" required />
                        </div>
                        <div className="mb-3 mt-3">
                            <label htmlFor="details" className="form-label">Enter Details:</label>
                            <input type="text" className="form-control" id="details" placeholder="Enter Details"
                                value={this.state.details}
                                onChange={this.onChangeDeatails} />
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>



                </div>
            </div>
        )
    }
}
