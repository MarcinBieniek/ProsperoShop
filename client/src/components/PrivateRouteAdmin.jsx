import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRouteAdmin = () => {

  const { currentUser } = useSelector((state) => state.user);

  return currentUser && currentUser.status === 'admin' ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRouteAdmin
