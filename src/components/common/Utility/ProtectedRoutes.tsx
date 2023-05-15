import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../../../utils/firebase";

interface ProtectedRouteInterface {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteInterface) => {
  const [user] = useAuthState(auth);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
