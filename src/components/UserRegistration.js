import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './UserRegistration.css';

function UserRegistration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); // Novo estado para a mensagem de sucesso
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null); // Reseta a mensagem de sucesso antes de cada submissão

        try {
            const response = await registerUser({ name, email, password });
            console.log(response);
            if (response.status === 201) {
                setSuccess('Usuário registrado com sucesso!');
                setName('');
                setEmail('');
                setPassword('');
            }
        } catch (err) {
            setError('Erro ao registrar o usuário. Tente novamente.');
        }
    };

    return (
        <div className="registration-form">
            <h2>Cadastro de Usuário</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                {success && <p className="success-message">{success}</p>}
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default UserRegistration;