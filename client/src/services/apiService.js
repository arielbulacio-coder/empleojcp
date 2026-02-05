import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    }
};

export const courseService = {
    getCourses: async () => {
        const response = await api.get('/courses');
        return response.data;
    }
};

export const jobService = {
    getJobs: async () => {
        const response = await api.get('/jobs');
        return response.data;
    },
    getJobById: async (id) => {
        const response = await api.get(`/jobs/${id}`);
        return response.data;
    },
    createJob: async (jobData) => {
        const response = await api.post('/jobs', jobData);
        return response.data;
    },
    applyToJob: async (jobId) => {
        // This would require an applications model/table
        const response = await api.post(`/jobs/${jobId}/apply`);
        return response.data;
    }
};

export default api;
