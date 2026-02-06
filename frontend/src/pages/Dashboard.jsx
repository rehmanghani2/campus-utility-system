import { useState, useEffect } from "react";
import { requestAPI } from "../services/api";

import { FaPlus, FaClipboardList, FaClock, FaCheckCircle,
          FaSpinner, FaTimesCircle } from "react-icons/fa";

import './Dashboard.css'
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const {user} = useAuth()
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchStats = async () => {
        try {
            const response = await requestAPI.getStats();
            setStats(response.data.data)
        } catch (error) {
            console.log('Error fetching stats:', error)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchStats();
    }, [])

    if (loading) {
        return <div className="loading">Loading....</div>
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Welcome, {user?.name}!</h1>
                <p>Manage your campus utility service requests</p>
            </div>

            <div className="stats-grid">
                <div className="stats-card total">
                    <div className="stat-icon">
                        <FaClipboardList />
                    </div>
                    <div className="stat-info">
                        <h3>{stats?.total || 0}</h3>
                        <p>Total Requests</p>
                    </div>
                </div>

                <div className="stat-card pending">
                    <div className="stat-icon">
                        <FaClock />
                    </div>
                    <div className="stat-info">
                        <h3>{stats?.pending || 0}</h3>
                        <p>Pending</p>
                    </div>
                </div>

                <div className="stat-card progress">
                    <div className="stat-icon">
                        <FaSpinner />
                    </div>
                    <div className="stat-info">
                        <h3>{stats?.inProgress || 0}</h3>
                        <p>In Progress</p>
                    </div>
                </div>

                <div className="stat-card resolved">
                    <div className="stat-icon">
                        <FaCheckCircle />
                    </div>
                    <div className="stat-info">
                        <h3>{stats?.resolved || 0}</h3>
                        <p>Resolved</p>
                    </div>
                </div>
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="actions-grid">
                    <Link to='/new-request' className="action-card">
                        <FaPlus className="action-icon" />
                        <h3>New Request</h3>
                        <p>Submit a new service request</p>
                    </Link>

                    <Link to="/my-requests" className="action-card">
                        <FaClipboardList  className="action-icon"/>
                        <h3>My requests</h3>
                    <p>View all your requests</p>
                    </Link>
                </div>
            </div>

            <div className="info-section">
                <h2>Service Categories</h2>
                <div className="categories-grid">
                    {['Plumbing', 'Electrical', 'Internet/Network', 'Cleaning',
                        'Furniture', 'AC/Ventilatio', 'Security', 'Other'
                    ].map(cat => (
                        <div key={cat} className="category-chip">
                            {cat}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
