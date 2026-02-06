import {Link} from 'react-router-dom'
import { FaClock, FaMapMarkerAlt, FaTag } from 'react-icons/fa'
import './RequestCard.css'

const RequestCard =({ request }) => {
    const getStatusColor = (status) => {
        switch (status){
            case 'Pending': return '#ffc107';
            case 'In Progress': return '#17a2b8';
            case 'Resolved': return '#28a745';
            case 'Rejected': return '#dc3545';
            default: return '#6c757d';
        }
    }
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Urgent': return '#dc3545';
            case 'Hign': return '#fd7e14';
            case 'Medium': return '#ffc107';
            case 'Low': return '#28a745';
            default: return '#6c757d'
        }
    }
    const formatData = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: "2-digit"
        })
    }

    return (
        <div className='request-card'>
          <div className='card-header'>
            <h3 className='card-title'>{request.title}</h3>
            <span className='status-badge'
                style={{ backgroundColor: getStatusColor(request.status)}}>
                {request.title}
            </span>
          </div>

        <div className='card-body'> 
            <p className='card-description'>{request.description}</p>

            <div className='card-meta'>
                <span className='meta-item'>
                    <FaTag /> {request.category}
                </span>
                <span className='meta-item'>
                    <FaMapMarkerAlt />
                    {request.location.building}, Room {request.location.roomNumber}
                </span>
                <span className='meta-item'>
                    <FaClock /> {formatData(request.createdAt)}
                </span>
            </div>

            <div className='card-footer'>
                <span className='priority-badge'
                    style={{ backgroundColor: getPriorityColor(request.priority)}}>
                    {request.priority} Priority
                </span>
                <Link to={`/request/${request._id}`} className='view-details-btn'>
                    View Details →
                </Link>
            </div>

        </div>

        </div>
    )
}

export default RequestCard;