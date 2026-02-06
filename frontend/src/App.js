import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NewRequest from './pages/NewRequest';
import MyRequests from './pages/MyRequests';
import AdminPanel from './pages/AdminPanel';

import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* Protected Routes */}
                        <Route path="/dashboard" element={
                            <PrivateRoute>
                                <Navbar />
                                <Dashboard />
                            </PrivateRoute>
                        } />

                        <Route path="/new-request" element={
                            <PrivateRoute>
                                <Navbar />
                                <NewRequest />
                            </PrivateRoute>
                        } />

                        <Route path="/my-requests" element={
                            <PrivateRoute>
                                <Navbar />
                                <MyRequests />
                            </PrivateRoute>
                        } />

                        {/* Admin Routes */}
                        <Route path="/admin" element={
                            <PrivateRoute adminOnly>
                                <Navbar />
                                <AdminPanel />
                            </PrivateRoute>
                        } />

                        {/* Redirect */}
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>

                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;