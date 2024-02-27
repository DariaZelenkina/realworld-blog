/* eslint-disable react/prop-types */
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function RequireAuth({ children }) {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
