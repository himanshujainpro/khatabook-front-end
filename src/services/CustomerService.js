import customAxios from './customAxios';

class CustomerService{

    uid=localStorage.getItem("uid");
    
    createCustomer(customer){  
        return customAxios.post("/api/customers", customer);
    }
    
    deleteCustomer(id){
        return customAxios.delete(`/api/customers?customer_id=${id}`);
    }
    
    getCustomers(){
        return customAxios.get(`/api/users/customers?userId=${this.uid}`);
    }

    getBalance(){
        return customAxios.get(`/api/users/balance?userId=${this.uid}`);
    }

    getBName(){
        return customAxios.get(`/api/users/business-name?userId=${this.uid}`);
    }

    getCustomerName(id){
        return customAxios.get(`/api/customers/name?customer_id=${id}`);
    }
}

export default new CustomerService()

