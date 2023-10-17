import{
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";

import Login from '../pages/Login';
import Home from '../pages/Home';
import SolicitarConta from '../pages/SolicitarConta';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/login" element={Login}/>
                <Route exact path="/" element={Home}/>
                <Route exact path="/solicitarconta" element={SolicitarConta}/>
            </Routes>
        </Router>
    );
};

export default AppRoutes;