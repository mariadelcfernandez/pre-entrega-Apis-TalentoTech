import React, { Children } from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectRoute({isAuthenticated, childre }) {
    const location = useLocation();

    if (!isAuthenticated){
        //PAsa el state actual (que contieneel carrito) a /login
        return <Navigate to ='/login' state={location.state} replace />
    }
    return Children;
}
export default ProtectRoute