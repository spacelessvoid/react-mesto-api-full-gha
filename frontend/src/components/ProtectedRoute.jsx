import { Navigate } from "react-router-dom";
import * as path from "../utils/paths";

function ProtectedRoute({ element: Component, ...props }) {
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to={path.signIn} replace />
  );
}

export default ProtectedRoute;
