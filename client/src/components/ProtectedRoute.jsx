import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
  const getToken = () => {
    const localToken = window.localStorage.getItem("token");
    return localToken;
  };
  return getToken() ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
