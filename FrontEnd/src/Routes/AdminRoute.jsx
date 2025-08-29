import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    alert("Accès interdit: Not an admin");
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default AdminRoute;