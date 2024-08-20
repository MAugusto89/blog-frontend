import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api'; 
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // Novo estado para mensagem de sucesso
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null); // Limpar mensagens anteriores

        try {
            const data = await login(email, password);
            localStorage.setItem('token', data.token);
            setSuccessMessage('Login bem-sucedido! Redirecionando...'); // Definir mensagem de sucesso
            setTimeout(() => {
                navigate('/'); // Redirecionar após 2 segundos
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>} {/* Exibir mensagem de sucesso */}
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;