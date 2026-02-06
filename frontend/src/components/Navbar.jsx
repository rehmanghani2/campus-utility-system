import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {FaHome, FaPlus, FaList, FaUser, FaSignOutAlt, FaCog} from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
    const {user, logout, isAdmin} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear all auth data,
        logout();
        // clear any cached data
        localStorage.clear() // Or be specific: localStorage.removeItem('token'); etc.
        // Redirect to login
        navigate('/login', { replace: true });
    };
    return (
       <nav className="navbar">
        <div className='navbar-brand'>
            <Link to="/dashboard">
                🏫 Campus Utility
            </Link>
        </div>

        <div className='navbar-menu'>
            <Link to='/dashboard' className='nav-link'>
                <FaHome /> Dashboard
            </Link>
            <Link to='/new-request' className='nav-link'>
                <FaPlus /> New Request
            </Link>
            <Link to='/my-requests' className='nav-link'>
                <FaList /> My Requests
            </Link>
            {isAdmin && (
                <Link to='/admin' className='nav-link admin-link'>
                    <FaCog /> Admin Panel
                </Link>
            )}
        </div>

        <div className='navbar-user'>
            <span className='user-info'>
                <FaUser /> {user?.name}
                <span className='user-role'>({user?.role})</span>
            </span>
            <button onClick={handleLogout} className='logout-btn'>
                <FaSignOutAlt /> Logout
            </button>
        </div>
       </nav>
    )
}
export default Navbar;