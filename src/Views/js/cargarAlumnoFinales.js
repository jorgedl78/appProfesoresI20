// Configurar el texto del botón y la posición
alertify.defaults.glossary.ok = "OK"; // Cambia el texto del botón "OK"
alertify.defaults.transition = "zoom";       // Agrega una animación de zoom al mostrar la alerta
alertify.defaults.theme.ok = "btn-primary";  // Aplica una clase de estilo al botón (puedes personalizarla en CSS)
alertify.defaults.notifier.position = "center"; // Ubica las notificaciones en el centro superior de la pantalla


// importamos los elementos del DOM
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const usuarioLogin = sessionStorage.getItem('userData');
        const usuarioFinal = sessionStorage.getItem('finalesData');

        if (usuarioLogin && usuarioFinal) {
            const user = JSON.parse(usuarioLogin);
            const finales = JSON.parse(usuarioFinal);

            // Actualiza el contenido del elemento con el ID 'nombreUsuario'
            document.getElementById('nombreUsuario').textContent = user.Nombre || 'Nombre de Usuario';

            // Obtén una referencia al contenedor de materias
            const materiasContainer = document.getElementById('materiasContainer');
            // Limpia el contenido actual del contenedor de materias
            materiasContainer.innerHTML = '';

            finales.forEach(final => {
                const finalElement = document.createElement('div');
                finalElement.classList.add('materia');

                const mostrarValor = valor => {
                    return valor === 0 ? '0' : valor || 'Valor no disponible';
                };

                finalElement.innerHTML = `
                <div class="materiaCard">
                    <div class="materiaHeader">
                        <p class="pCurso">${final.Fecha || 'Fecha'}</p>
                        <p class="pCurso">${final.Hora || 'Hora'}</p>
                        <div class="estudianteHeader">
                            <span class="estudianteIcon">
                                <img src="../images/estudiante.png" alt="estudiante">
                                <p class="pCantidadInscriptos">${mostrarValor(final.Inscriptos) || 'Numero de inscriptos'}</p>
                            </span>
                        </div>
                    </div>
                    <div class="materiaMain">
                        <p class="pMateria" name="${final.Numero}">${final.Materia || 'Nombre de Materia'} <img src="../images/down.png" class="imagenBoton"></p>
                    </div>
                </div>`;
                materiasContainer.appendChild(finalElement);
            });

            // Agregar evento clic para abrir el modal
            const modalButtons = document.querySelectorAll('.pMateria');
            modalButtons.forEach(button => {
                button.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const codigoMesa = button.getAttribute('name');

                    const alumnoData = await cargarAlumnoFinal("/finalesAlumno", { mesa: codigoMesa });

                    if (alumnoData && alumnoData.length > 0) {
                        const modal = document.getElementById('modal');
                        const tablaFinal = document.getElementById('tablaFinal');

                        tablaFinal.innerHTML = '';

                        alumnoData.forEach(alumno => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                            <td class="permiso">${alumno.Permiso || 'Permiso'}</td>
                            <td class="documento">${alumno.Documento || 'DNI'}</td>
                            <td class="nombreAlumno">${alumno.Nombre || 'NOMBRE'}</td>
                            <td class="cursada">${alumno.Cursada || 'AÑO'}</td>
                            `;
                            // //validar si es true checkbox checked disabled o si es false texto vacio
                            alumno.Libre ? row.innerHTML += `<td><input class="datosAlumnosFinales" type="checkbox" name="libre" value="${alumno.Libre}" disabled checked></td>` : row.innerHTML += `<td></td>`;
                            //validar si es false checkbox checked enabled o si es true texto vacio
                            //alumno.Libre ? row.innerHTML += `<td></td>` : row.innerHTML += `<td><input class="datosAlumnosFinales" type="checkbox" name="libre" value="${alumno.Libre}" disabled checked></td>`;
                            tablaFinal.appendChild(row);
                        });
                        modal.style.display = "block";
                    } else {
                        alertify
                            .alert("¡Algo pasó!", "No se encontraron datos de alumnos", function(){
                            }).set({
                                'movable': false,           // Desactiva el movimiento para mantener el diálogo centrado
                                'closableByDimmer': false    // Evita que se cierre al hacer clic fuera del cuadro
                            })
                    }
                });
            });

            const closeModal = document.querySelector('.close');
            closeModal.addEventListener('click', () => {
                const modal = document.getElementById('modal');
                modal.style.display = "none";
            });

            window.onclick = function(event) {
                const modal = document.getElementById('modal');
                if (event.target == modal) {
                    modal.style.display = "none";
                }
              }

        } else {
            console.error('No se encontraron datos de usuario o materias.');
        }
    } catch (error) {
        console.error('Error al cargar la página:', error);
    }
});
// Funcion de envio de datos al servidor
const cargarAlumnoFinal = async (url, data) => {
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
