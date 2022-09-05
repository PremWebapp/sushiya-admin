import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { userData: { token } } = useSelector(state => state.auth)
  return token ? <Outlet /> : <Navigate to="/" />;
  // return  <Outlet /> 
};

export default PrivateRoute;