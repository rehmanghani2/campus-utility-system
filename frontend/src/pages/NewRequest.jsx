import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestAPI } from '../services/api';
import { toast } from 'react-toastify';
import './NewRequest.css';

const NewRequest = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        building: '',
        floor: '',
        roomNumber: '',
        priority: 'Medium'
    });

    const categories = [
        'Plumbing', 'Electrical', 'Internet/Network', 'Cleaning',
        'Furniture', 'AC/Ventilation', 'Security', 'Other'
    ];

    const priorities = ['Low', 'Medium', 'High', 'Urgent'];

    const buildings = [
        'Main Building', 'Science Block', 'Engineering Block',
        'Library', 'Hostel A', 'Hostel B', 'Cafeteria',
        'Sports Complex', 'Admin Block'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.title.trim()) {
            toast.error('Please enter a title');
            return;
        }
        if (!formData.category) {
            toast.error('Please select a category');
            return;
        }
        if (!formData.description.trim()) {
            toast.error('Please enter a description');
            return;
        }
        if (!formData.building) {
            toast.error('Please select a building');
            return;
        }

        setLoading(true);

        try {
            // ✅ Format data correctly for the backend
            const requestData = {
                title: formData.title.trim(),
                category: formData.category,
                description: formData.description.trim(),
                location: {
                    building: formData.building,
                    floor: formData.floor || '',
                    roomNumber: formData.roomNumber || ''
                },
                priority: formData.priority
            };

            console.log('Submitting request:', requestData);

            const response = await requestAPI.create(requestData);
            
            console.log('Response:', response.data);

            if (response.data.success) {
                toast.success('Service request submitted successfully!');
                navigate('/my-requests');
            } else {
                toast.error(response.data.message || 'Failed to submit request');
            }
        } catch (error) {
            console.error('Submit error:', error);
            const errorMessage = error.response?.data?.message || 'Failed to submit request';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="new-request-page">
            <div className="page-header">
                <h1>📝 New Service Request</h1>
                <p>Fill out the form below to submit a new service request</p>
            </div>

            <form onSubmit={handleSubmit} className="request-form">
                <div className="form-section">
                    <h3>Request Details</h3>
                    
                    <div className="form-group">
                        <label htmlFor="title">Request Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Brief title for your request"
                            maxLength="100"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="category">Category *</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="priority">Priority *</label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                {priorities.map(pri => (
                                    <option key={pri} value={pri}>{pri}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the issue in detail..."
                            rows="5"
                            maxLength="500"
                        />
                        <span className="char-count">
                            {formData.description.length}/500
                        </span>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Location Details</h3>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="building">Building *</label>
                            <select
                                id="building"
                                name="building"
                                value={formData.building}
                                onChange={handleChange}
                            >
                                <option value="">Select Building</option>
                                {buildings.map(bld => (
                                    <option key={bld} value={bld}>{bld}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="floor">Floor</label>
                            <input
                                type="text"
                                id="floor"
                                name="floor"
                                value={formData.floor}
                                onChange={handleChange}
                                placeholder="e.g., Ground, 1st, 2nd"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="roomNumber">Room Number</label>
                            <input
                                type="text"
                                id="roomNumber"
                                name="roomNumber"
                                value={formData.roomNumber}
                                onChange={handleChange}
                                placeholder="e.g., 101, Lab-3"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => navigate(-1)}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Request'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewRequest;