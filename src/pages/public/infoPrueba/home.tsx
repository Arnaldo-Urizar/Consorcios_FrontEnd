// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {

    const navigate = useNavigate();
    

    const handleNavigate = () => {
        navigate('/info');
    };
    const handleNavigatePrueba = () => {
        navigate('/prueba');
    };

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={handleNavigate}>ir a Info -- privada</button>
            <button onClick={handleNavigatePrueba}>ir a  prueba - publica</button>
        </div>
    );
};

export default Home;
