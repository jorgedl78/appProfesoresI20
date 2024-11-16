// Objetivo: Cerrar la sesión del usuario y redirigirlo a la página de inicio de sesión
document.addEventListener('DOMContentLoaded', () => {
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

    cerrarSesionBtn.addEventListener('click', () => {
        // Eliminar datos de sessionStorage o localStorage
        sessionStorage.removeItem('userData');
        sessionStorage.removeItem('materiasData');
        sessionStorage.removeItem('finalesData');
        sessionStorage.removeItem('datosData');

        // Modificar el historial del navegador para que no pueda volver atrás
        const state = { page: 'index' };
        const title = 'Inicio';
        const url = '/index.html';

        // Reemplazar todas las entradas del historial con la página de inicio
        history.replaceState(state, title, url);

        // Redirigir a la página de inicio de sesión
        window.location.href = '/index.html';
    });

    // Bloquear el evento popstate para evitar que el usuario retroceda o avance
    window.addEventListener('popstate', (event) => {
        // Restaurar la entrada actual en el historial para evitar que retroceda
        history.pushState(null, document.title, location.href);

        // Verificar si la ubicación actual es una de las direcciones prohibidas
        const direccionesProhibidas = ['Views/html/home.html', 'Views/html/materias.html', 'Views/html/inscriptos_finales.html', 'Views/html/datos.html'];
        if (direccionesProhibidas.includes(location.pathname)) {
            // Redirigir a la página de inicio de sesión si está en una dirección prohibida
            window.location.href = '/index.html';
        }
    });
});
