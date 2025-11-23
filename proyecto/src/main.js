// ⬅️ CORRECCIÓN: Importar la instancia de supabase
import { supabase } from "./supabase.js"; 

import { mostrarRegistro } from './register.js';
import { mostrarLogin } from './login.js';
import { mostrarMVP } from './mvp.js';
import { mostrarUser } from './user.js';
import { mostrarAdmin } from './admin.js';

// Funciones de navegación disponibles para ser llamadas
const routes = {
    'registro': mostrarRegistro,
    'login': mostrarLogin,
    'actividades': mostrarMVP,
    'usuarios': mostrarUser,
    'admin': mostrarAdmin
};

async function CerrarSesion() {
    await supabase.auth.signOut();
    // Después de cerrar sesión, recargar el menú y mostrar el registro
    await cargarMenu();
    mostrarRegistro();
}

// 🧩 Control de navegación según el estado del usuario
export async function cargarMenu() {
    const menu = document.getElementById("menu");
    const { data: { user } } = await supabase.auth.getUser();

    // 🔹 Lógica para construir el menú según el estado de la sesión
    if (!user) {
        menu.innerHTML = `
            <div>
                <button data-action="registro">Registrarse</button>
                <button data-action="login">Iniciar sesión</button>
            </div>
        `;
    } else {
        // Se mantiene la verificación simple para el botón de admin
        menu.innerHTML = `
            <div>
                <button data-action="actividades">Actividades</button>
                <button data-action="usuarios">Usuarios</button>
                <button data-action="logout">Cerrar sesión</button>
                ${user.email === 'admin@mail.com' ? '<button data-action="admin">Admin</button>' : ''}
            </div>
        `;
    }

    // 🌟 ASIGNACIÓN DE EVENT LISTENERS (Con la mejora de la envoltura)
    menu.querySelectorAll('button').forEach(button => {
        const action = button.getAttribute('data-action');
        
        if (action === 'logout') {
            button.addEventListener('click', CerrarSesion);
        } else if (routes[action]) {
            // MEJORA: Envuelve la función de la ruta para mayor control
            button.addEventListener('click', () => {
                routes[action]();
            });
        }
    });
}

// 🌀 Llamamos la función apenas cargue la página
document.addEventListener("DOMContentLoaded", cargarMenu);
