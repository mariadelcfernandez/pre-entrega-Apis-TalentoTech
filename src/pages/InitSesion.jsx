import react, { useState } from 'react'
import products from './Products';
import { useNavigate, Route, useLocation } from 'react-router-dom'

export default function InitSesion({setAutenticated, setUser}) {
    const Navigate = useNavigate();
    const ubication = useLocation();
    const [form, setForm] = useState({name: '', email: ''});

    //Manejar sesion, si inicio la sesion.
    const manejarEnvio =(e) => {
        e.preventDefault();
        if (form.name && form.email){
            setAutenticated(true);
            setUser(form);
        // Si viene por el lado del card
          if (ubication.state?.card) {
            Navigate('/pay', {state: { card: ubication.state.card} });
          } else {
            Navigate('/products');
          }       
        } else {
            alert('Por favor debe completar todos los datos.');
        }
    };

    return (
      <div>
        <h1>Inicia sesion para continuar</h1>
        <form onSubmit={manejarEnvio}>
            <input
            type='text'
            placeholder='FullName'
            value={form.name}
            onChange={(e) => setForm ({...form, name: e.target.value})}
            required
            />
               <input
            type='email'
            placeholder='Email'
            value={form.email}
            onChange={(e) => setForm ({...form, email: e.target.value})}
            required
            />
            <button type='submit'>Iniciar Sesión</button>
            <strong></strong>
            <button type='button' onClick={() => Navigate('/products')}>
                Cancelar
            </button>
        </form>
        </div>
         )
    
    // Si viene por el lado del card
}