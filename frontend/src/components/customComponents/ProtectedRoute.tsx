import React from "react";
import { getCurrentUser } from "../../service/auth.service";
import Login from "../views/Login";
import { loginPageButtons } from "../../utils/routingPropConsts";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const RequireAuth: React.FC<ProtectedRouteProps> = ({ children }) => {
  // CAMBIAR
  const userIsLogged = getCurrentUser();
  console.log("userIsLogged");
  console.log(userIsLogged);

  if (!userIsLogged) {
    return <Login buttons={loginPageButtons} />;
  }
  return children;
};

export default RequireAuth;
