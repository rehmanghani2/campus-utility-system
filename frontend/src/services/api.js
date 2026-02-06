import axios from 'axios'

// ============ API URL CONFIGURATION ============
const getApiUrl = () => {
    // Production URL (your deployed backend)
    if (process.env.NODE_ENV === 'production') {
        return  'https://campus-utility-api.vercel.app/api';
    }
    // Development URL
    return 'http://localhost:5000/api';
};

const API_URL = getApiUrl();

console.log('API URL:', API_URL);

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": 'application/json'
    }
});

//List of public endpoints that don't need token
const publicEndpoints = ['/auth/login', '/auth/signup'];

// Add token to requests (except public endpoints)
api.interceptors.request.use(
    (config) => {
        // Check if this is a public endpoint
        const isPublicEndpoint = publicEndpoints.some(endpoint => 
            config.url.includes(endpoint)
        );

        // Only add token for protected routes
        if(!isPublicEndpoint) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
);
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // If token is expired or invalid, logout user
        if(error.response?.status === 401) {
            const isAuthRoute = publicEndpoints.some(endpoint => 
                error.config.url.includes(endpoint)
            );

            // Only clear token if it's not a login/signup request
            if(!isAuthRoute) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                // optionally redirect to login
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if(token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config
// })


// Auth API Calls
export const authAPI = {
    signup: (userData) => api.post('/auth/signup', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getProfile: () => api.get('/auth/me'),
    updateProfile: (data) => api.put('/auth/profile', data)
}

// Request API Calls
export const requestAPI = {
    create: (requestData) => api.post('/requests', requestData),
    getMyRequests: () => api.get('/requests/my-requests'),
    getOne: (id) => api.get(`/requests/${id}`),
    update: (id, data) => api.put(`/requests/${id}`, data),
    delete: (id) => api.delete(`/requests/${id}`),
    getState: () => api.get('/requests/stats')
}

// Admin API Calls
export const adminAPI = {
    getAllRequests: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return api.get(`/admin/requests?${params}`);
    },
    updateRequest: (id, data) => api.put(`/admin/requests/${id}`, data),
    getStats: () => api.get('/admin/stats'),
    getUsers: () => api.get('/admin/users')
}

export default api;