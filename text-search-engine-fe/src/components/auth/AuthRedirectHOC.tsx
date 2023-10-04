import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const withAuthRedirect = (WrappedComponent: React.ComponentType<any>) => {
	return (props: any) => {
		const { isAuthenticated } = useAuth();

		if (isAuthenticated) {
			return <Navigate to='/dashboard' />;
		}

		return <WrappedComponent {...props} />;
	};
};

export default withAuthRedirect;
