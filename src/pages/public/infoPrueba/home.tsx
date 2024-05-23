// src/pages/Home.tsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../service/AuthContext';

const Home: React.FC = () => {

    const navigate = useNavigate();

    const {userState} = useContext(AuthContext)
    const nombre = userState.name;

    const handleNavigate = () => {
        navigate('/info');
    };
    const handleNavigatePrueba = () => {
        navigate('/prueba');
    };

    return (
        <div>
            <h1>INICIO: BIENVENIDO {nombre.firstName} {nombre.lastName}!</h1>
            <button onClick={handleNavigate}>ir a Info -- privada</button>
            <button onClick={handleNavigatePrueba}>ir a  prueba - publica</button>
        </div>
    );
};

export default Home;
