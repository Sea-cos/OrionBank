import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from '../pages/Login';
import Home from '../pages/Home';
import SolicitarConta from '../pages/SolicitarConta';
import SucessoSolicitacao from '../pages/SolicitarConta/SucessoSolicitacao';
import RecuperarSenha from '../pages/RecuperarSenha';
import SucessoRecuperarSenha from '../pages/RecuperarSenha/SucessoRecuperar';
import TermosPolitica from '../pages/TermosPolitica';

import { AuthContext } from "../contexts/AuthContext";
import ErrorBoundary from "../components/ErrorBoundary";

const AppRoutes = () => {

    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading"> Carregando...</div>
        }

        if (!authenticated) {
            return <Navigate to="/login" />
        }

        return children;
    }

    return (
        <Routes>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/" element={<Private><Home/></Private>}/>
            <Route exact path="/solicitarconta" element={<SolicitarConta/>} />
            <Route exact path="/sucessoSolicitacao/:nome" element={<SucessoSolicitacao/>} />
            <Route exact path="/recuperar" element={<RecuperarSenha/>}/>
            <Route exact path="/sucessoRecuperar/:tipoSucesso" element={<SucessoRecuperarSenha/>} />
            <Route exact path="/termosPoliticas" element={<TermosPolitica/>} />
            <Route path="*" element={<ErrorBoundary pathError={true}/>} />
        </Routes>
    );
};

export default AppRoutes;