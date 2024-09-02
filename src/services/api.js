import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const registerUser = (userData) => {
    return api.post('/users', userData);
};

export const login = async (email, password) => {
    try {
        const response = await api.post('/users/login', { email, password });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Erro ao fazer login.');
        } else if (error.request) {
            throw new Error('Erro ao conectar com o servidor. Tente novamente mais tarde.');
        } else {
            throw new Error('Erro inesperado. Tente novamente mais tarde.');
        }
    }
};

export const createPost = async (title, content, token) => {
    try {
        const response = await api.post('/posts', { title, content }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Erro ao criar postagem.');
        } else if (error.request) {
            throw new Error('Erro ao conectar com o servidor. Tente novamente mais tarde.');
        } else {
            throw new Error('Erro inesperado. Tente novamente mais tarde.');
        }
    }
};

export const fetchPosts = async () => {
    try {
        const response = await api.get('/posts');
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Erro ao buscar postagens.');
        } else if (error.request) {
            throw new Error('Erro ao conectar com o servidor. Tente novamente mais tarde.');
        } else {
            throw new Error('Erro inesperado. Tente novamente mais tarde.');
        }
    }
};

export default api;

