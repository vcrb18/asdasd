import React from "react";
import { getCurrentUser } from "../../service/auth.service";
import Login from "../views/Login";
import { loginPageButtons } from "../../utils/routingPropConsts";
import Unauthorized from "./Unauthorized";

interface ProtectedRouteProps {
  children: React.ReactElement;
  roles: string[];
}

const RequireAuth: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const user = getCurrentUser();
  if (!user) {
    return <Login buttons={loginPageButtons} />;
  } else if (roles.includes(user.role)) {
    return children;
  } else{
    return (
      <Unauthorized/>
    );
  }
};

export default RequireAuth;
