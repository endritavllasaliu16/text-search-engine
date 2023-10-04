import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Dashboard from "../Dashboard/Dashboard";

const RootRedirect: React.FC = () => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Dashboard />;
	}

	return <Navigate to='/login' />;
};

export default RootRedirect;
