// Configurar el texto del botón y la posición
alertify.defaults.glossary.ok = "OK"; // Cambia el texto del botón "OK"
alertify.defaults.transition = "zoom";       // Agrega una animación de zoom al mostrar la alerta
alertify.defaults.theme.ok = "btn-primary";  // Aplica una clase de estilo al botón (puedes personalizarla en CSS)
alertify.defaults.notifier.position = "center"; // Ubica las notificaciones en el centro superior de la pantalla



// Funcionalidades de la página de mesas de materias
document.addEventListener('DOMContentLoaded', () => {
    const spinner = document.getElementById('spinner');
    const materiasBtn = document.getElementById('materiaUsuario');
    materiasBtn.addEventListener('click', async () => {
        spinner.style.display = 'block';
        try {
            const userDataString = sessionStorage.getItem('userData');
    
            if (!userDataString) {
                alert('No se encontraron datos de usuario.');
                return;
            }
            const userData = JSON.parse(userDataString);
            const codigo = userData.Codigo;
            if (codigo === undefined) {
                alertify
                .alert("¡Algo pasó!", "El código es undefined. Verifica el valor antes de enviarlo", function(){
                }).set({
                    'movable': false,           // Desactiva el movimiento para mantener el diálogo centrado
                    'closableByDimmer': false    // Evita que se cierre al hacer clic fuera del cuadro
                })
                return;
            }
            const loginData = await cargarMateria("/materias", { profesorCodigo: codigo });
    
            if (loginData && loginData.length > 0) {
                spinner.style.display = 'none';
                const materiasData = loginData;
                materiasPagina(materiasData);
            } else {
                spinner.style.display = 'none';
                alertify
                .alert("¡Algo pasó!", "No se encontraron materias para el usuario", function(){
                }).set({
                    'movable': false,           // Desactiva el movimiento para mantener el diálogo centrado
                    'closableByDimmer': false    // Evita que se cierre al hacer clic fuera del cuadro
                })
            }
        } catch (error) {
            spinner.style.display = 'none';
            window.location.href = '/html/error.html';
        }
    });
    
});
// Funcion para el envio al servidor con la respuesta
const cargarMateria = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud POST a ${url}: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData || [];
    } catch (error) {
        throw error;
    }
};

// Guarda los datos en un sessionStorage y redirige a la página de materias
const materiasPagina = (data) => {
    try {
        // Almacena los datos en sessionStorage
        sessionStorage.setItem('materiasData', JSON.stringify(data));

        // Redirige a la página de materias
        window.location.href = '/html/materias.html';
    } catch (error) {
        console.error('Error al redirigir a la página de materias:', error);
    }
};
