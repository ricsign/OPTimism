import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/userContext";

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ component: Component }) => {
  const { user } = useContext(UserContext);

  console.log(user)

  if (!user) {
    return <Component />;
  }

  return <Navigate to="/home" />;
};

export default PublicRoute;
