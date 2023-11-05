import React from 'react';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "./contexts/AuthContext";
import { SolicitarContaProvider } from "./contexts/SolicitarContaContext";
import { BuscarCEPProvider } from "./contexts/BuscarCEPContext";
import { RecuperarSenhaProvider } from "./contexts/RecuperarSenhaContext";
import { BrowserRouter as Router } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <ErrorBoundary>
          <RecuperarSenhaProvider>
            <SolicitarContaProvider>
              <BuscarCEPProvider>
                <AuthProvider>
                  <AppRoutes />
                  <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
                </AuthProvider>
              </BuscarCEPProvider>
            </SolicitarContaProvider>
          </RecuperarSenhaProvider>
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;