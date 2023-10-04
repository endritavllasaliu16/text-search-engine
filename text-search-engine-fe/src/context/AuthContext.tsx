import React, {
	createContext,
	useContext,
	ReactNode,
	useState,
	useMemo,
} from "react";

import { API_BASE_URL } from "../config/api";

type AuthContextType = {
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	register: (name: string, email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!localStorage.getItem("authToken"),
	);

	const login = async (email: string, password: string) => {
		try {
			const response = await fetch(`${API_BASE_URL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				const data = await response.json();

				if (data.statusIsOk) {
					localStorage.setItem("authToken", data.token);
					setIsAuthenticated(true);
				}
			} else {
				throw new Error("Login failed");
			}
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	const register = async (name: string, email: string, password: string) => {
		try {
			const response = await fetch(`${API_BASE_URL}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});

			if (response.ok) {
				const data = await response.json();

				if (data.statusIsOk) {
					localStorage.setItem("authToken", data.token);
					setIsAuthenticated(true);
				}
			} else {
				throw new Error("Registration failed");
			}
		} catch (error) {
			console.error("Registration error:", error);
		}
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		setIsAuthenticated(false);
	};

	const value = useMemo(
		() => ({
			isAuthenticated,
			login,
			logout,
			register,
		}),
		[isAuthenticated],
	);

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
