import customAxios from './customAxios';

class TransactionService{

    findTransactions(id){
        return customAxios.get("/api/transactions?customer_id="+id);
    }

    createTransaction(transaction){    
        return customAxios.post("/api/transactions", transaction);
    }

    deleteTransaction(id){
        return customAxios.get("/api/transactions?customer_id="+id);
    }
}

export default new TransactionService()
