import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/api'; // Importar a função de criação de postagens
import './PostCreate.css';

function PostCreate() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    // Verifica se o usuário está autenticado
    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!isAuthenticated()) {
            setError('Você precisa estar autenticado para criar uma postagem.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await createPost(title, content, token);
            setSuccessMessage('Postagem criada com sucesso!');
            setTitle('');
            setContent('');
            setTimeout(() => {
                navigate('/'); // Redirecionar após 2 segundos
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="post-create-form">
            <h2>Criar Nova Postagem</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Conteúdo:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <button type="submit">Criar Postagem</button>
            </form>
        </div>
    );
}

export default PostCreate;