// src/Views/js/cambiarContrasena.js
import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {
    const cambioContrasena = document.getElementById('cambiar-contrasena');
    cambioContrasena.addEventListener('click', async (event) => {
        event.preventDefault();
        try {
            const oldPassword = document.getElementById('oldPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (newPassword !== confirmPassword) {
				Swal.fire({
                title: '¡Éxito!',
                text: 'Tu acción fue completada con éxito.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
                //alert("Las contraseñas no coinciden");
                //return;
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
                alert('Contraseña cambiada exitosamente.');
            } else {
                alert('Error al cambiar la contraseña.');
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            alert('Error al cambiar la contraseña.');
        }
    });
});

// Función para alternar la visibilidad del formulario de cambio de contraseña
function togglePasswordDiv() {
    const div = document.getElementById('password-div');
    div.classList.toggle('hidden-content');
}
