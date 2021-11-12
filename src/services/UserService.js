import customAxios from "./customAxios";

class UserService{
    getUserId(phone){
        return customAxios.get(`/api/users/uid?phone=${phone}`);
    }

    createUser(user){  
        return customAxios.post("/api/users", user);
    }
}

export default new UserService();