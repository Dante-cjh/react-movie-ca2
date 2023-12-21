import React, {useContext, useEffect} from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from './contexts/authContext'

const ProtectedRoutes = () => {

  const context = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!context.isAuthenticated) {
      context.setRedirect(location.pathname);
    }
  }, [context.isAuthenticated, location, context.setRedirect]);

  return context.isAuthenticated === true ? (
    <Outlet /> 
  ) : (
    <Navigate to='/login' replace state={{ from: location }}/>
  );
};

export default ProtectedRoutes;