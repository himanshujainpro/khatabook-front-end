import React, { Component } from 'react'
import TransactionService from '../services/TransactionService';
import 'bootstrap/dist/css/bootstrap.css';
import CustomerService from '../services/CustomerService';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import BalanceText from '../util/BalanceText';

export default class TransactionsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            customer_name: "customer_name",
            customer_phone: "customer_phone",
            customer_balance: 0,
            customer_trans: [],
            show: false,
            editShow: false
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.goToDoTransaction = this.goToDoTransaction.bind(this);
    }

    handleClose() {
        this.setState(
            {
                show: false,
                editShow: false
            }
        );
    }

    handleDelete() {
        this.handleClose();
        CustomerService.deleteCustomer(this.state.id).then((res) => {
            this.props.history.push('/book');
        });
    }

    componentDidMount() {
        TransactionService.findTransactions(this.state.id).then(({ data }) => {
            this.setState({
                customer_name: data.name,
                customer_phone: data.phone,
                customer_balance: data.balance,
                customer_trans: data.transactions
            });
        });
    }

    goToDoTransaction(transactionType) {
        this.props.history.push({
            pathname: `/book/add/${this.state.id}`,
            state: {
                transactionType: transactionType,
                customer_id: this.state.id
            }
        });
    }

    render() {
        return (

            <div>

                <br></br>

                <div className="container-fluid">
                    <div className="card shadow bg-light p-3 mb-5 bg-white rounded">
                        <div className="row justify-content-between">

                            <div className="col">
                                <div className="bg-light">
                                    <p className="fw-bold">{this.state.customer_name}</p>
                                    <p>{this.state.customer_phone}</p>
                                </div>
                            </div>

                            <div className="col">
                                <div className="row bg-light p-3 text-end">

                                    <div className="col text-center">
                                        <img src="https://web.khatabook.com/static/media/dollar.8796da15.svg" class="jss1284" alt="altBalance"></img>
                                    </div>

                                    <div className="col">
                                        <p className="fw-bold">Net balance</p>
                                        <p className="card-title">{BalanceText.handleTType(this.state.customer_balance)}</p>
                                        <p className={BalanceText.handleBalColor(this.state.customer_balance)}>{"₹ " + Math.abs(this.state.customer_balance)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <Dropdown>
                                    <Dropdown.Toggle variant="success">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                        </svg>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={() => {
                                                this.setState({
                                                    editShow: true
                                                })
                                            }}>
                                            Edit Customer
                                        </Dropdown.Item>

                                        <Dropdown.Item className="text-danger"
                                            onClick={() => {
                                                this.setState({
                                                    show: true
                                                })
                                            }}>
                                            Delete Customer
                                        </Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Entry</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-danger">Are really sure?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button className="btn btn-danger" variant="primary" onClick={this.handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.editShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div class="form-group p-3">
                                <label>Customer Name</label>
                                <input type="text" class="form-control" placeholder="Customer Name" required value={this.state.customer_name} />
                            </div>
                            <div class="form-group p-3">
                                <label >Mobile Number</label>
                                <input type="tel" class="form-control" pattern="[0-9]{10}" placeholder="Mobile Number"
                                    value={this.state.customer_phone} required />
                            </div>

                            <div class="form-group p-3">
                                <label >Address</label>
                                <input type="text" class="form-control" placeholder="Address" />
                            </div>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button className="btn btn-primary btn-lg btn-block" variant="primary" onClick={this.handleDelete}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
                <br />


                <br />

                <div className="card bg-light shadow p-3 mb-5 bg-white rounded">
                    <div className="row justify-content-between">

                        <div className="col">
                            <p className="fw-bold">Transactions</p>
                        </div>

                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-danger"
                                        onClick={() => this.goToDoTransaction("debit")}>You gave</button>
                                </div>

                                <div className="col">
                                    <button className="btn btn-success"
                                        onClick={() => this.goToDoTransaction("credit")}>You got</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <table className="table  table-responsive table-hover">

                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Details</th>
                                <th scope="col">Type</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.customer_trans.map(
                                    transaction =>
                                        <tr key={transaction.transaction_id}>
                                            <td> {transaction.transaction_date} </td>
                                            <td> {transaction.details_text} </td>
                                            <td> {transaction.transaction_type} </td>
                                            <td> {transaction.transaction_amount} </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        )
    }
}
