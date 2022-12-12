import React, { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import Loading from "./components/Loading";
export default function PrivateRoute(props) {
  // const { user, isLoading } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(getAuthenticatedUser, [user]);

  function getAuthenticatedUser() {
    console.log("Getting auth user ...");
    setIsLoading(true);
    const authUser = localStorage.getItem("authUser");
    setUser(authUser);
    setIsLoading(false);
  }

  const { component: Component, ...rest } = props;
  if (isLoading) {
    return <Loading />;
  }
  if (user === undefined) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
