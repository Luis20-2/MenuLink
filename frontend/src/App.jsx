import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Páginas
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Categories from './pages/Categories.jsx';
import MenuItems from './pages/MenuItems.jsx';
import Preview from './pages/Preview.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import VerifyCode from './pages/VerifyCode.jsx';
import Confirm from './pages/Confirm.jsx';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="/verify-code" element={<VerifyCode />} />
					<Route path="/confirm" element={<Confirm />} />

					<Route
						path="/dashboard"
						element={(
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						)}
					/>
					<Route
						path="/categories"
						element={(
							<ProtectedRoute>
								<Categories />
							</ProtectedRoute>
						)}
					/>
					<Route
						path="/menu-items"
						element={(
							<ProtectedRoute>
								<MenuItems />
							</ProtectedRoute>
						)}
					/>
					<Route
						path="/preview"
						element={(
							<ProtectedRoute>
								<Preview />
							</ProtectedRoute>
						)}
					/>

					<Route path="*" element={<div style={{ padding: '2rem' }}>Página no encontrada</div>} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;