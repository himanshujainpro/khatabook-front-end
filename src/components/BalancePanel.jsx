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
                <div className="card" >
                    <div className={this.state.s} >
                        <p className="fw-bold text-center" id="balText">{this.state.text}</p>
                        <p className="text-white text-center bg-dark" id="valText">{"₹ " + this.state.nb}</p>
                    </div>
                </div>
            </div>

        )
    }
}
