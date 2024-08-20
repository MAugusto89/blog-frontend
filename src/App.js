import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserRegistration from './components/UserRegistration';
import Login from './components/Login';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<UserRegistration />} />
                    <Route path="/login" element={<Login />} />
                    {/* Outras rotas podem ser adicionadas aqui */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;