import axios  from "axios";

class UserService{
    getUserId(phone){
        return axios.get(`/api/users/uid?phone=${phone}`);
    }
}

export default new UserService();