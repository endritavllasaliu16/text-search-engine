import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import {
	AuthRedirectedForgotPassword,
	AuthRedirectedLogin,
	AuthRedirectedRegister,
	Dashboard,
	NotFound,
	ProtectedRoute,
	RootRedirect,
} from "./components";
import { DocumentProvider } from "./context/DocumentContext";

function App() {
	return (
		<Router>
			<AuthProvider>
				<DocumentProvider>
					<div className='App'>
						<Routes>
							<Route path='/' element={<RootRedirect />} />
							<Route
								path='/login'
								element={<AuthRedirectedLogin />}
							/>
							<Route
								path='/register'
								element={<AuthRedirectedRegister />}
							/>
							<Route
								path='/forgot-password'
								element={<AuthRedirectedForgotPassword />}
							/>
							<Route
								path='/dashboard'
								element={
									<ProtectedRoute>
										<Dashboard />
									</ProtectedRoute>
								}
							/>
							<Route
								path='*'
								element={
									<ProtectedRoute>
										<NotFound />
									</ProtectedRoute>
								}
							/>
						</Routes>
					</div>
				</DocumentProvider>
			</AuthProvider>
		</Router>
	);
}

export default App;
