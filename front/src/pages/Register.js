import React from "react";
import { Link, Navigate } from "react-router-dom";
import FormInput from "./components/FormInput";
import CTA from "./components/CTA";
import Prompt from "./components/Prompt";
import ConfirmPasswordInput from "./components/ConfirmPasswordInput";
import Error from "./components/Error";
import useForm from "./../hooks/useForm";
import useAuth from "./../hooks/useAuth";
export default function RegisterPage() {
  const { values, handleChange } = useForm({
    initialValues: {
      name: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const { registerUser, error } = useAuth();
  const handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(values);
  };
  return (
    <div className="page" style={{ justifyContent: "center" }}>
      <div className="inlineForm">
        <h3>Register</h3>
        <div className="inlineForm__notif">
          {error && <Error error={error.messages} />}
        </div>
        <form onSubmit={handleRegister}>
          <FormInput
            type={"text"}
            placeholder={"Name"}
            name={"name"}
            value={values.name}
            handleChange={handleChange}
          />
          <FormInput
            type={"text"}
            placeholder={"Username"}
            name={"username"}
            value={values.username}
            handleChange={handleChange}
          />
          <ConfirmPasswordInput
            type={"password"}
            placeholder={"Password"}
            placeholderConfirm={"Confirm Password"}
            name={"password"}
            value={values.password}
            handleChange={handleChange}
          />
          <div className="inlineForm__submit">
            <Link to="/login">
              <Prompt prompt={"Existing account? Log in."} />
            </Link>
            <CTA name={"register"} type={"submit"} />
          </div>
        </form>
      </div>
    </div>
  );
}
