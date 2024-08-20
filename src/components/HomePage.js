import React, { useState, useEffect } from 'react';
import UserRegistration from './UserRegistration';
import Login from './Login';
import PostCreate from './PostCreate'; 
import { fetchPosts } from '../services/api'; // Importar a função de busca de postagens
import './HomePage.css';

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showRegistration, setShowRegistration] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showPostCreate, setShowPostCreate] = useState(false);

    const postsPerPage = 5; // Número de posts por página

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts(currentPage, postsPerPage);
                setPosts(data.posts); 
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error(err.message);
            }
        };

        loadPosts();
    }, [currentPage]);

    const handleRegisterClick = () => {
        setShowRegistration(!showRegistration);
        setShowLogin(false);
        setShowPostCreate(false);
    };

    const handleLoginClick = () => {
        setShowLogin(!showLogin);
        setShowRegistration(false);
        setShowPostCreate(false);
    };

    const handlePostCreateClick = () => {
        setShowPostCreate(!showPostCreate);
        setShowRegistration(false);
        setShowLogin(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const isAnyFormVisible = showLogin || showRegistration || showPostCreate;

    return (
        <div className="home-page">
            <header className="header">
                <h1>Bem-vindo ao Blog</h1>
                <nav>
                    <ul>
                    <li><a href="/" onClick={handleLoginClick}>
                            {'Pagina Inicial'}
                        </a></li>
                        <li><a href="#!" onClick={handleLoginClick}>
                            {showLogin ? 'Fechar Login' : 'Login'}
                        </a></li>
                        <li><a href="#!" onClick={handleRegisterClick}>
                            {showRegistration ? 'Fechar Cadastro' : 'Cadastrar Usuário'}
                        </a></li>
                        <li><a href="#!" onClick={handlePostCreateClick}>
                            {showPostCreate ? 'Fechar Criação de Postagem' : 'Criar Postagem'}
                        </a></li>
                    </ul>
                </nav>
            </header>
            <main>
                {!isAnyFormVisible && (
                    <div className="posts">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post.id} className="post">
                                    <h3>{post.title}</h3>
                                    <p>{post.content}</p>
                                </div>
                            ))
                        ) : (
                            <p>Não há postagens para exibir.</p>
                        )}
                        <div className="pagination">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <span>Página {currentPage} de {totalPages}</span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Próxima
                            </button>
                        </div>
                    </div>
                )}
                
                {showLogin && (
                    <div className="form-section">
                        <Login />
                    </div>
                )}

                {showRegistration && (
                    <div className="form-section">
                        <UserRegistration />
                    </div>
                )}

                {showPostCreate && (
                    <div className="form-section">
                        <PostCreate />
                    </div>
                )}
            </main>
        </div>
    );
}

export default HomePage;