import React, { Component } from 'react'
import CustomerService from '../services/CustomerService'
import BalancePanel from './BalancePanel';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import BalanceText from '../util/BalanceText';
import { Link } from 'react-router-dom';

export default class CustomerListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customers: [],
            show: false,
            curr_customer_id: 0,
            editShow: false
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.goToTransComponent = this.goToTransComponent.bind(this);
    }

    componentDidMount() {
        CustomerService.getCustomers(localStorage.getItem("uid")).then((res) => {
            this.setState({ customers: res.data });
        });
    }


    goToTransComponent(customer_id) {
        console.log(customer_id);
        this.props.history.push(`/transactions/${customer_id}`);
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

        console.log(this.state.curr_customer_id);
        CustomerService.deleteCustomer(this.state.curr_customer_id).then((res) => {
            this.setState({
                customers: this.state.customers.filter(customer => customer.customer_id !== this.state.curr_customer_id)
            });
        });
    }


    render() {
        return (
            <div>
                <BalancePanel />
                <br />
                <br />
                <div>
                    <div className="card bg-light shadow p-3 mb-5 bg-white rounded">
                        <div className="row justify-content-between">
                            <div className="col">
                                <p className="fw-bold">Customers</p>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <Link to="/addCustomer" className="btn btn-primary align">Add Customer</Link>
                                </div>
                            </div>
                        </div>
                        <br />

                        <table className="table  table-responsive table-hover">
                            <thead>
                                <tr >
                                    <th scope="col">Customer</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Balance</th>
                                    <th scope="col" ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.customers.map(
                                        customer =>
                                            <tr key={customer.customer_id}>
                                                <td onClick={() => this.goToTransComponent(customer.customer_id)}> {customer.name} </td>
                                                <td className={BalanceText.handleTTypeColor(customer.balance)}>{BalanceText.handleTType(customer.balance)}</td>
                                                <td className={BalanceText.handleBalColor(customer.balance)}
                                                    onClick={() => this.goToTransComponent(customer.customer_id)}> {"₹ " + Math.abs(customer.balance)}</td>
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="success">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                            </svg>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item onClick={() => {
                                                                this.setState({
                                                                    editShow: true
                                                                })
                                                            }}>
                                                                Edit Customer
                                                            </Dropdown.Item>

                                                            <Dropdown.Item className="text-danger"
                                                                onClick={() => {
                                                                    this.setState({
                                                                        show: true,
                                                                        curr_customer_id: customer.customer_id
                                                                    })
                                                                }}>
                                                                Delete Customer
                                                            </Dropdown.Item>

                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Customer</Modal.Title>
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

                <h2 className="text-center">Please click on particular customer to check details</h2>
            </div>
        )
    }
}
