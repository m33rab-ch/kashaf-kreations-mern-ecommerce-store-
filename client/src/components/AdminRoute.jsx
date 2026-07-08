import { Navigate } from "react-router-dom";

// Protects admin pages — redirects to login if no token
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("kashaf_admin_token");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

export default AdminRoute;
