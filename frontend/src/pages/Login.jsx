import { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import {toast} from 'react-toastify'
import './Auth.css'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const {login, isAuthenticated} = useAuth()
    const navigate = useNavigate()

    // If user is already authenticated, redirect to dashboard
    // If not, clear any stale credentials
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        } else {
            // Clear any stale tokens when visiting login page
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await login(formData);
            if (result.success) {
                toast.success('Login successful');
                navigate('/dashboard')
            }
        } catch (error) {
            console.log('Login error: ', error)
            toast.error(error.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>🏫 Campus Utility</h1>
                    <p>Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label  htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
                    </div>

                    <button type="submit" disabled={loading} className="auth-btn">
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div>
                    <p>Don't have an account?<Link to='/signup'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    )

}
export default Login