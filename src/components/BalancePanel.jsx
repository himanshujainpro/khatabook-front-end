import React, { Component } from 'react'
import CustomerService from '../services/CustomerService'

export default class BalancePanel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nb: 0,
            text: "",
            s: "card-body bg-success"
        }
    }

    componentDidMount() {
        CustomerService.getBalance().then(res => {
            this.setState({ nb: res.data });

            if (this.state.nb > 0) {
                this.setState({ text: "You will give" });
                this.setState({ s: "card-body bg-danger" })
            } else {
                this.setState({ text: "You will get" });
                this.setState({ nb: -this.state.nb });
            }
        });

    }


    render() {
        return (
            <div className="col d-flex justify-content-center">
                <div className="card w-25" >
                    <div className={this.state.s} >
                        <h5 className="card-title text-center" id="balText">{this.state.text}</h5>
                        <p className="card-text text-white bg-dark" id="valText">{"₹ " + this.state.nb}</p>
                    </div>
                </div>
            </div>

        )
    }
}
