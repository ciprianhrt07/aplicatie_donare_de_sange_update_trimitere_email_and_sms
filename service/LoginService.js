import axios from "axios";

const USER_LOGIN_URL = "http://localhost:8080/login";

class LoginService {
  login(user) {
    return axios.post(USER_LOGIN_URL , user, {responseType :'text'})
  }
}

export default new LoginService();