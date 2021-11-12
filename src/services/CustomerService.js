import customAxios from './customAxios';

class CustomerService{

    createCustomer(customer){  
        return customAxios.post("/api/customers", customer);
    }
    
    deleteCustomer(id){
        return customAxios.delete(`/api/customers?customer_id=${id}`);
    }
    
    getCustomers(uid){
        return customAxios.get(`/api/users/customers?userId=${uid}`);
    }

    getBalance(uid){
        return customAxios.get(`/api/users/balance?userId=${uid}`);
    }

    getBName(uid){
        return customAxios.get(`/api/users/business-name?userId=${uid}`);
    }

    getCustomerName(id){
        return customAxios.get(`/api/customers/name?customer_id=${id}`);
    }
}

export default new CustomerService()

