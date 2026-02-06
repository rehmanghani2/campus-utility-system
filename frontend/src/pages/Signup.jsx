import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {toast} from 'react-toastify'
import './Auth.css'

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
        studentId: '',
        department: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const departments = [
        'Computer Science',
        'Electronics',
        'Mechanical',
        'Civil',
        'Electrical',
        'Administration',
        'Other'
    ];
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const { confirmPassword, ...signupData} = formData;
            const result = await signup(signupData);
            if(result.success) {
                toast.success('Account created successfully!')
                navigate('/dashboard')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Signup failed')
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="auth-container">
            <div className="auth-card signup-card">
                <div className="auth-header">
                    <h1>🏫 Campus Utility</h1>
                    <p>Create your acccount</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input 
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value='student'>Student</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="department">Department</label>
                            <select
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {formData.role === 'student' && (
                        <div className="form-group">
                            <label htmlFor="studentId">Student ID</label>
                            <input 
                                type="text"
                                id="studentId"
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleChange}
                                placeholder="Enter your Student ID"
                                required={formData.role === 'student'}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input 
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter 10-digit phone number"
                            pattern="[0-9]{10}"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Min 6 characters"
                                minLength='6'
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm characters"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="auth-btn">
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                
                <div className="auth-footer">
                    <p>Already have an account? <Link to='/login'>Sign In</Link></p>
                </div>
            </div>
        </div>
    )
}
export default Signup;