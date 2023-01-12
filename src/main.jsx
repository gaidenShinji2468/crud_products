import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/main.css';

// Este es el punto de entrada inicial, puede llamarse de cualquier forma
import CRUDProducts from "./CRUDProducts";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CRUDProducts/>    
    </React.StrictMode>
);
