import { useState } from "react";
import axios from "../helpers/axios";
// import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  let navigate = useNavigate();
  //const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  //set user
  const setUserContext = async (response) => {
    console.log(response);
    if (response.data && response.data.data.user.username) {
      //setUser(response.data.data.user);
      localStorage.setItem("authUser", JSON.stringify(response.data.data.user));
      localStorage.setItem("authToken", JSON.stringify(response.data.token));
      navigate("/home");
    } else setError("Unable to find user");
  };

  //register user
  const registerUser = async (data) => {
    const { name, username, password, passwordConfirm } = data;
    return axios
      .post(`/auth/register`, {
        name,
        username,
        password,
        passwordConfirm,
      })
      .then(async (response) => {
        await setUserContext(response);
      })
      .catch((err) => {
        return setError(err);
      });
  };

  //login user
  const loginUser = async (data) => {
    const { username, password } = data;
    return axios
      .post("auth/login", {
        username,
        password,
      })
      .then(async (response) => {
        await setUserContext(response);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  return {
    registerUser,
    loginUser,
    error,
  };
}
