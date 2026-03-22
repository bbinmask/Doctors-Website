import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ children, allowedRoles }) => {
  const userInfo = useSelector((store) => store.user);

  const isAllowed = allowedRoles.includes(userInfo?.role);

  const accessibleRoute =
    userInfo?.token && isAllowed ? (
      children
    ) : (
      <Navigate to={"/login"} replace={true} />
    );

  return accessibleRoute;
};

export default ProtectedRoutes;
