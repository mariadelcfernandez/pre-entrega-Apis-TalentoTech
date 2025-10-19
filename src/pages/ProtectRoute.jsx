import React, { Children } from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectRoute({isAuthenticated, children }) {
    const location = useLocation();

    if (!isAuthenticated){
        // Pasa el state actual (que contiene el carrito) a /login
        return <Navigate to='/login' state={location.state} replace />
    }
    return children;
}
export default ProtectRoute