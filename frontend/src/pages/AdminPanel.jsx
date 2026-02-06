import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import { toast } from 'react-toastify';
import { 
    FaUsers, FaClipboardList, FaCheck, FaClock, FaTimes 
} from 'react-icons/fa';
import './AdminPanel.css';

const AdminPanel = () => {
    const [stats, setStats] = useState(null);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [updateData, setUpdateData] = useState({
        status: '',
        assignedTo: '',
        remarks: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, requestsRes] = await Promise.all([
                adminAPI.getStats(),
                adminAPI.getAllRequests()
            ]);
            setStats(statsRes.data.data);
            setRequests(requestsRes.data.data);
        } catch (error) {
            toast.error('Failed to load admin data');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateRequest = async (e) => {
        e.preventDefault();
        try {
            await adminAPI.updateRequest(selectedRequest._id, updateData);
            toast.success('Request updated successfully!');
            setSelectedRequest(null);
            fetchData();
        } catch (error) {
            toast.error('Failed to update request');
        }
    };

    const openUpdateModal = (request) => {
        setSelectedRequest(request);
        setUpdateData({
            status: request.status,
            assignedTo: request.assignedTo,
            remarks: request.remarks || ''
        });
    };

    if (loading) {
        return <div className="loading">Loading admin panel...</div>;
    }

    return (
        <div className="admin-panel">
            <div className="page-header">
                <h1>🔧 Admin Panel</h1>
                <p>Manage all service requests</p>
            </div>

            {/* Stats Overview */}
            <div className="admin-stats">
                <div className="stat-card">
                    <FaUsers className="stat-icon" />
                    <div>
                        <h3>{stats?.users?.total || 0}</h3>
                        <p>Total Users</p>
                    </div>
                </div>
                <div className="stat-card">
                    <FaClipboardList className="stat-icon" />
                    <div>
                        <h3>{stats?.requests?.total || 0}</h3>
                        <p>Total Requests</p>
                    </div>
                </div>
                <div className="stat-card pending">
                    <FaClock className="stat-icon" />
                    <div>
                        <h3>{stats?.requests?.pending || 0}</h3>
                        <p>Pending</p>
                    </div>
                </div>
                <div className="stat-card resolved">
                    <FaCheck className="stat-icon" />
                    <div>
                        <h3>{stats?.requests?.resolved || 0}</h3>
                        <p>Resolved</p>
                    </div>
                </div>
            </div>

            {/* Requests Table */}
            <div className="requests-table-container">
                <h2>All Requests</h2>
                <table className="requests-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>User</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request._id}>
                                <td>{request.title}</td>
                                <td>
                                    {request.userId?.name}
                                    <br />
                                    <small>{request.userId?.department}</small>
                                </td>
                                <td>{request.category}</td>
                                <td>
                                    <span className={`priority-badge ${request.priority.toLowerCase()}`}>
                                        {request.priority}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-badge ${request.status.toLowerCase().replace(' ', '-')}`}>
                                        {request.status}
                                    </span>
                                </td>
                                <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="update-btn"
                                        onClick={() => openUpdateModal(request)}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            {selectedRequest && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Update Request</h3>
                            <button 
                                className="close-btn"
                                onClick={() => setSelectedRequest(null)}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleUpdateRequest}>
                            <div className="modal-body">
                                <p><strong>Title:</strong> {selectedRequest.title}</p>
                                <p><strong>Description:</strong> {selectedRequest.description}</p>
                                
                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        value={updateData.status}
                                        onChange={(e) => setUpdateData({
                                            ...updateData,
                                            status: e.target.value
                                        })}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Assigned To</label>
                                    <input
                                        type="text"
                                        value={updateData.assignedTo}
                                        onChange={(e) => setUpdateData({
                                            ...updateData,
                                            assignedTo: e.target.value
                                        })}
                                        placeholder="Technician name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Remarks</label>
                                    <textarea
                                        value={updateData.remarks}
                                        onChange={(e) => setUpdateData({
                                            ...updateData,
                                            remarks: e.target.value
                                        })}
                                        placeholder="Add any remarks..."
                                        rows="3"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn-secondary"
                                    onClick={() => setSelectedRequest(null)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    Update Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;