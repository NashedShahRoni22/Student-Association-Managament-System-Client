import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import LoadingSpinner from "../components/Spinners/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if(loading){
    return <LoadingSpinner/>
  }
  if (user && user?.uid ) {
    return children;
  }
  return <Navigate to="/sign-in" state={{ from: location }} replace/>;
};

export default PrivateRoute;
