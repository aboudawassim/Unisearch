import React from "react";
import { Link } from "react-router-dom";
import FormInput from "./components/FormInput";
import CTA from "./components/CTA";
import Prompt from "./components/Prompt";
import Error from "./components/Error";
import useForm from "../hooks/useForm";
import useAuth from "../hooks/useAuth";
import useToggle from "../hooks/useToggle";
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri";
export default function LoginPage() {
  let fail = false;
  const { newState, handleToggle } = useToggle(false);
  const { values, handleChange } = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });
  const { loginUser } = useAuth();
  const handleRegister = async (e) => {
    e.preventDefault();
    await loginUser(values);
  };
  return (
    <div className="page" style={{ justifyContent: "center" }}>
      <div className="inlineForm">
        <h3>Login</h3>
        <form onSubmit={handleRegister}>
          <FormInput
            type={"text"}
            placeholder={"Username"}
            name={"username"}
            value={values.username}
            handleChange={handleChange}
          />
          <div className="flex column padBottomThree">
            <div className="input__pass">
              <input
                type={newState ? "text" : "password"}
                className={`input ${fail ? "input--fail" : null} `}
                placeholder={"Password"}
                name={"password"}
                value={values.password}
                onChange={handleChange}
              />
              <span className="showPasswordButton" onClick={handleToggle}>
                {newState ? (
                  <RiEyeFill className="icon" />
                ) : (
                  <RiEyeCloseLine className="icon" />
                )}
              </span>
            </div>
          </div>
          <div className="inlineForm__submit">
            <Link to="/register">
              <Prompt prompt={"Don't have an account? Register."} />
            </Link>
            <CTA name={"Login"} type={"submit"} />
          </div>
        </form>
      </div>
    </div>
  );
}
