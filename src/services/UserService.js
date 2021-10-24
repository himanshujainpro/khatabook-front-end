import customAxios from "./customAxios";

class UserService{
    getUserId(phone){
        return customAxios.get(`/api/users/uid?phone=${phone}`);
    }
}

export default new UserService();