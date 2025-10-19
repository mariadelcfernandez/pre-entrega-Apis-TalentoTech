import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Products from "./Products";

export default function Pay({ isAuthenticated, setIsAuthenticated, user, setUser}) {
    const location = useLocation();
    const Navigate = useNavigate();
    //Datos de caarito
    const card = location.state?.card || [];
    //Calculo del total
    const total = card.reduce((sum, Product) => sum + Number(Product.price),0);
    // Funcion para finalizar la compra
    const buy = () => {
        alert( '¡La compra se realizó con éxito.! Muchas gracias por elegirnos.');
        Navigate('/products');
    };
    //Funcion para cerrar sesion
    const logeout = () => {
        setIsAuthenticated(false);
        setUser({name: '',email: '' });
    };
}