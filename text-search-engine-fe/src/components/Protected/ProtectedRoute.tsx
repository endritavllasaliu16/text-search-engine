import React from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type ProtectedRouteProps = {
	children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	let { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
