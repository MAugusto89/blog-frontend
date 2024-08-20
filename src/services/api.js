import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Substitua pela URL do seu backend
});

export const registerUser = (userData) => {
    return api.post('/users', userData);
};

export const login = async (email, password) => {
    const response = await fetch("http://localhost:3000/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao fazer login.');
    }

    return response.json();
};

export const createPost = async(title, content, token) => {
    try {
        const response = await axios.post("http://localhost:3000/posts", { title, content }, {
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
        const response = await axios.get("http://localhost:3000/posts");
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
}

export default api;