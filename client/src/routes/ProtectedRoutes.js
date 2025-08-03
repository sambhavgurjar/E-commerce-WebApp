import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, userRole }) {
  const navigate = useNavigate();
  const [role, setRole] = useState(undefined);

  useEffect(() => {
    let auth = JSON.parse(sessionStorage.getItem("auth"));
    if(auth)auth = jwtDecode(auth.token);


    if (!auth) {
      navigate("/");
    } else {
      setRole(auth.role);
    }
  }, [navigate]);
  
  useEffect(() => {
    if (role !== undefined && userRole !== role) {
      navigate("/unauthorized");
    }
  }, [userRole, role, navigate]);

  if (role === undefined) return <div>Loading...</div>;

  return userRole === role ? children : null;
}

export default ProtectedRoute;
