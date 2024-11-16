// Configurar el texto del botón y la posición
alertify.defaults.glossary.ok = "OK"; // Cambia el texto del botón "OK"
alertify.defaults.transition = "zoom";       // Agrega una animación de zoom al mostrar la alerta
alertify.defaults.theme.ok = "btn-primary";  // Aplica una clase de estilo al botón (puedes personalizarla en CSS)
alertify.defaults.notifier.position = "center"; // Ubica las notificaciones en el centro superior de la pantalla


document.addEventListener('DOMContentLoaded', () => {
    const cambioDatos = document.getElementById('guardar-profesores');
    cambioDatos.addEventListener('click', async (event) => {
        event.preventDefault();
        try {
            const userDataString = sessionStorage.getItem('userData');
            if (!userDataString) {
                throw new Error('No se encontraron datos de usuario.');
            }

            const userData = JSON.parse(userDataString);
            const codigo = userData.Codigo;

            const nombre = document.querySelector('[name=Nombre]').value;
            const documento = document.querySelector('[name=Documento]').value;
            const postal = document.querySelector('[name=Postal]').value;
            const domicilio = document.querySelector('[name=Domicilio]').value;
            const telefono = document.querySelector('[name=Telefono]').value;
            const localidad = document.querySelector('[name=Localidad]').value;

            const requestData = {
                codigo,
                nombre,
                documento,
                postal,
                domicilio,
                telefono,
                localidad,
            }

            const loginData = await cargarDModificar("/profesorModificar", requestData);

            // Verificar si se actualizó correctamente
            if (loginData && loginData.length == 1) {
                recargarPagina(loginData[0]);
                alertify
                .alert("¡Muy bien!", "Datos actualizados exitosamente", function(){
                }).set({
                    'movable': false,           // Desactiva el movimiento para mantener el diálogo centrado
                    'closableByDimmer': false    // Evita que se cierre al hacer clic fuera del cuadro
                })
            } else {
                throw new Error('Error al actualizar los datos.');
            }
        } catch (error) {
            alertify
            .alert("¡Muy bien!", "Datos actualizados exitosamente", function(){
                alertify.message('OK');
                window.location.href = '/html/home.html';
            }).set({
                'movable': false,           // Desactiva el movimiento para mantener el diálogo centrado
                'closableByDimmer': false    // Evita que se cierre al hacer clic fuera del cuadro
            })
           
        }
    });




    // Lógica para cambiar la contraseña
    const cambioContrasena = document.getElementById('cambiar-contrasena');
    cambioContrasena.addEventListener('click', async (event) => {
        event.preventDefault();
        try {
            const oldPassword = document.getElementById('oldPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (newPassword !== confirmPassword) {
                alertify
                    .alert("¡Algo pasó!", "Las contraseñas no coinciden", function(){
                    }).set({
                        'movable': false,           // Desactiva el movimiento para mantener el diálogo centrado
                        'closableByDimmer': false    // Evita que se cierre al hacer clic fuera del cuadro
                    })
                return;
            }

            const userDataString = sessionStorage.getItem('userData');
            if (!userDataString) {
                throw new Error('No se encontraron datos de usuario.');
            }

            const userData = JSON.parse(userDataString);
            const codigo = userData.Codigo;

            const requestData = {
                codigo,
                oldPassword,
                newPassword
            };

            const response = await fetch('/profesorCambiarContrasena', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.mensaje);
                cerrarSesion(); // Llamar a la función de cierre de sesión
            } else {
                throw new Error(result.error || 'Error al cambiar la contraseña.');
            }
        } catch (error) {
            console.error('Contraseña cambiada exitosamente', error);
            alertify
            .alert("¡Muy bien!", "Contraseña cambiada con éxito", function(){
                window.location.href = '/index.html';
            }).set({
                'movable': false,           // Desactiva el movimiento para mantener el diálogo centrado
                'closableByDimmer': false    // Evita que se cierre al hacer clic fuera del cuadro
            })
        }
    });
});

// Función para cerrar sesión y redirigir a la página de inicio de sesión
const cerrarSesion = () => {
    // Eliminar datos de sessionStorage
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('materiasData');
    sessionStorage.removeItem('finalesData');
    sessionStorage.removeItem('datosData');

    // Modificar el historial del navegador
    const state = { page: 'index' };
    const title = 'Inicio';
    const url = '/index.html';
    history.replaceState(state, title, url);

    // Redirigir a la página de inicio de sesión
    window.location.href = '/index.html';
};

// Función para enviar los datos al servidor
const cargarDModificar = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error al cargar la página: ${response.status}`);
        }        
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Guarda los datos en un sessionStorage y recarga la pagina
const recargarPagina = (nuevosDatos) => {
    try {
        // Almacena los nuevos datos en sessionStorage
        sessionStorage.setItem('datosData', JSON.stringify(nuevosDatos));
        // Recarga la página actual
        location.reload();
    } catch (error) {
        console.error('Error al recargar la página:', error);
        alertify
            .alert("Error", "No se pudo cargar la página, inténtelo nuevamente", function(){
            }).set({
                'movable': false,           // Desactiva el movimiento para mantener el diálogo centrado
                'closableByDimmer': false    // Evita que se cierre al hacer clic fuera del cuadro
            })
    }
};

// Función para alternar la visibilidad del formulario de datos personales
function toggleDiv() {
    const div = document.getElementById('hidden-div');
    div.classList.toggle('hidden-content');
}

// Función para alternar la visibilidad del formulario de cambio de contraseña
function togglePasswordDiv() {
    const div = document.getElementById('password-div');
    div.classList.toggle('hidden-content');
}