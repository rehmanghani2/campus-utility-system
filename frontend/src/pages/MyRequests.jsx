import { useState, useEffect } from 'react';
import { requestAPI } from '../services/api';
import RequestCard from '../components/RequestCard';
import { FaFilter, FaSearch } from 'react-icons/fa';
import './MyRequests.css';

const MyRequests = () => {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchRequests();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [requests, filter, searchTerm]);

    const fetchRequests = async () => {
        try {
            const response = await requestAPI.getMyRequests();
            setRequests(response.data.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let result = [...requests];

        // Apply status filter
        if (filter !== 'all') {
            result = result.filter(req => req.status === filter);
        }

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(req =>
                req.title.toLowerCase().includes(term) ||
                req.category.toLowerCase().includes(term) ||
                req.description.toLowerCase().includes(term)
            );
        }

        setFilteredRequests(result);
    };

    if (loading) {
        return <div className="loading">Loading your requests...</div>;
    }

    return (
        <div className="my-requests-page">
            <div className="page-header">
                <h1>📋 My Requests</h1>
                <p>Track and manage all your service requests</p>
            </div>

            <div className="filters-bar">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search requests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-buttons">
                    <FaFilter className="filter-icon" />
                    {['all', 'Pending', 'In Progress', 'Resolved', 'Rejected'].map(status => (
                        <button
                            key={status}
                            className={`filter-btn ${filter === status ? 'active' : ''}`}
                            onClick={() => setFilter(status)}
                        >
                            {status === 'all' ? 'All' : status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="requests-count">
                Showing {filteredRequests.length} of {requests.length} requests
            </div>

            {filteredRequests.length === 0 ? (
                <div className="no-requests">
                    <p>No requests found.</p>
                    {requests.length === 0 && (
                        <p>Submit your first service request!</p>
                    )}
                </div>
            ) : (
                <div className="requests-grid">
                    {filteredRequests.map(request => (
                        <RequestCard key={request._id} request={request} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRequests;