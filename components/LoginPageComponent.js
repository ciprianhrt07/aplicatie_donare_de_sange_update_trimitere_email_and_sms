import { useNavigate } from "react-router-dom";
import LoginService from "../service/LoginService";
import React, { useState } from "react";

function LoginPageComponent() {
  //redirectionare spre o pagina anume cand se doreste
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;

    setUser({ ...user, [e.target.name]: value });
  };

  const loginUser = (e) => {
    e.preventDefault();
    LoginService.login(user)
      .then((response) => {
        
        if(response.data === "0"){
           navigate("/");
        }else
        if(response.data ==="1"){
          navigate("/admin");
       }else
       if(response.data ==="2"){
        navigate("/donator/"+ user.username);
       }else
        navigate("/doctor/"+ user.username);


      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="text-center"> Login Page</h1>

      <br />

      <form className="text-center">
        <form>
          <label> UserName: </label>
          <input
            name="username"
            value={user.username}
            type="text"
            className="text-center"
            onChange={(e) => handleChange(e)}
          />
        </form>

        <form>
          <label> Password: </label>
          <input
            type="password"
            className="text-center"
            name="password"
            value={user.password}
            onChange={(e) => handleChange(e)}
          />
        </form>

        <form>
          <button type="button" class="btn btn-info" onClick={loginUser}>
            Send 
          </button>

          <button
            type="button"
            class="btn btn-warning"
            onClick={() => navigate("/register")}
          >
            {" "}
            Register{" "}
          </button>
        </form>
      </form>
    </div>
  );
}

export default LoginPageComponent;
