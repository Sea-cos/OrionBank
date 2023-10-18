import React, { useContext } from "react";

import{
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";

import Login from '../pages/Login';
import Home from '../pages/Home';
import SolicitarConta from '../pages/SolicitarConta';

import { AuthProvider, AuthContext } from "../contexts/auth";

const AppRoutes = () => {

    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading){
            return <div className="loading"> Carregando...</div>
        }
        
        if (!authenticated){
            return <Navigate to = "/login"/>
        }

        return children;
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={ <Login/> }/>
                    <Route exact path="/" element={ <Private><Home/></Private>}/>
                    <Route exact path="/solicitarconta" element={ <SolicitarConta/> }/>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;