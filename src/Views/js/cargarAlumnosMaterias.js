// Configurar el texto del botón y la posición
alertify.defaults.glossary.ok = "OK"; // Cambia el texto del botón "OK"
alertify.defaults.transition = "zoom";       // Agrega una animación de zoom al mostrar la alerta
alertify.defaults.theme.ok = "btn-primary";  // Aplica una clase de estilo al botón (puedes personalizarla en CSS)
alertify.defaults.notifier.position = "center"; // Ubica las notificaciones en el centro superior de la pantalla


// Importamos los elementos del DOM
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const usuarioLogin = sessionStorage.getItem('userData');
        const usuarioMateria = sessionStorage.getItem('materiasData');

        if (usuarioLogin && usuarioMateria) {
            const user = JSON.parse(usuarioLogin);
            const materias = JSON.parse(usuarioMateria);

            // Actualiza el contenido del elemento con el ID 'nombreUsuario'
            const nombreUsuarioElement = document.getElementById('nombreUsuario');
            if (nombreUsuarioElement) {
                nombreUsuarioElement.textContent = user.Nombre || 'Nombre de Usuario';
            } else {
                console.error('Elemento con ID "nombreUsuario" no encontrado');
            }

            // Obtén una referencia al contenedor de materias
            const materiasContainer = document.getElementById('materiasContainer');
            if (materiasContainer) {
                // Limpia el contenido actual del contenedor de materias
                materiasContainer.innerHTML = '';

                // Itera sobre cada materia y crea un elemento para mostrarla
                materias.forEach(materia => {
                    const materiaElement = document.createElement('div');
                    materiaElement.classList.add('materia');

                    materiaElement.innerHTML = `
                        <div class="materiaCard">
                            <div class="materiaHeader">
                                <p class="pCurso">CURSO: ${materia.Curso || 'Curso'}</p>
                                <p class="pCurso">Div: ${materia.Division || 'Division'}</p>
                                <p class="pCurso">AÑO: ${materia.Año || 'Año'}</p>
                                <div class="estudianteHeader">
                                    <span class="estudianteIcon">
                                        <img src="../images/estudiante.png" alt="estudiante">
                                        <p class="pCantidadInscriptos">${materia.Inscriptos || 'Numero de inscriptos'}</p>
                                    </span>
                                </div>
                            </div>
                            <div class="materiaMain">
                                <p class="pMateria" name="${materia.Materia_codigo}" id="${materia.Division}">${materia.Materia || 'Nombre de Materia'} <img src="../images/down.png" class="imagenBoton"></p>
                            </div>
                        </div>
                    `;
                    materiasContainer.appendChild(materiaElement);
                });

                // Agregar evento clic para abrir el modal
                const modalButtons = document.querySelectorAll('.pMateria');
                modalButtons.forEach(button => {
                    button.addEventListener('click', async (e) => {
                        e.preventDefault();
                        const alumnos = [];
                        const codigoMateria = button.getAttribute('name');
                        const divisionMateria = button.getAttribute('id');
                        const alumnoMateriasData = await cargarAlumnoMateria("/alumnoMateria", { materia: codigoMateria, division: divisionMateria });

                        if (alumnoMateriasData && alumnoMateriasData.length > 0) {
                            // Crear un objeto que contenga el código de la materia y los datos de los alumnos
                            const datosMateriaAlumnos = {
                                codigoMateria: codigoMateria,
                                alumnos: alumnoMateriasData
                            };
                            // Llamar a la función mostrarAlumnosEnModal con el objeto creado
                            alumnos.push(datosMateriaAlumnos);
                             mostrarAlumnosEnModal(datosMateriaAlumnos);
                        } else {
                            alertify
                            .alert("¡Algo pasó!", "No se encontraron datos de alumnos", function(){
                            }).set({
                                'movable': false,           // Desactiva el movimiento para mantener el diálogo centrado
                                'closableByDimmer': false    // Evita que se cierre al hacer clic fuera del cuadro
                            })
                        }
                            const guardarDatosButton = document.getElementById('guardar-datos');
                            guardarDatosButton.addEventListener('click', async () => {
                                for(let alumno of alumnos) {
                                    //Setear valores vacios o nulos a 0
                                    for(let i = 0; i < alumno.alumnos.length; i++) {
                                        let campos = [
                                            "Parcial1", "Parcial2", "Totalizador",
                                            "Practico1", "Practico2", "Practico3", "Practico4", "Practico5",
                                            "Recuperatorio1", "Recuperatorio2"
                                          ];
                                        
                                          for (let campo of campos) {
                                            let valor = alumno.alumnos[i][campo];
                                        
                                            if (valor === "" || isNaN(valor)) {
                                              alumno.alumnos[i][campo] = 0;
                                            } else {
                                              valor = Number(valor);
                                              if (valor > 10) {
                                                alumno.alumnos[i][campo] = 10;
                                              } else if (valor < 0) {
                                                alumno.alumnos[i][campo] = 0;
                                              }
                                            }
                                          }
                                    }
                                }
                                // Llamar a la función modificarDatosAlumno con el arreglo de alumnos
                                await modificarDatosAlumno("/alumnoModificar", alumnos);
                                window.location.reload();
                            });
                    });
                });

                window.onclick = function(event) {
                    const modal = document.getElementById('modal');
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                  }
                const closeModal = document.querySelector('.close');
                if (closeModal) {
                    closeModal.addEventListener('click', () => {
                        const modal = document.getElementById('modal');
                        if (modal) {
                            modal.style.display = "none";
                        } else {
                            console.error('Elemento con ID "modal" no encontrado');
                        }
                    });
                } else {
                    console.error('Elemento con clase "close" no encontrado');
                }
            } else {
                console.error('Elemento con ID "materiasContainer" no encontrado');
            }
        } else {
            console.error('No se encontraron datos de usuario o materias.');
        }
    } catch (error) {
        console.error('Error al cargar la página:', error);
    }
});
// funcion de envio de datos al servidor
const cargarAlumnoMateria = async (url, data) => {
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
// Funcion para mostrar y luego almacenar los valores para poder enviarlos en la llamada al servidor
function mostrarAlumnosEnModal(datosMateriaAlumnos) {
    const modal = document.getElementById('modal');
    const tablaAlumnos = document.getElementById('tablaAlumnos');
    if (modal && tablaAlumnos) {
        tablaAlumnos.innerHTML = '';

        // Extraer el código de la materia y los datos de los alumnos del objeto recibido
        const codigoMateria = datosMateriaAlumnos.codigoMateria;
        modal.dataset.codigoMateria = codigoMateria;
        const alumnos = datosMateriaAlumnos.alumnos;

        // Crear una fila para cada alumno
        alumnos.forEach(datosAlumno => {
            const filaPermisoNombre = document.createElement('tr');
            filaPermisoNombre.classList.add('filaPermisoNombre');
            const filaDetalles = document.createElement('tr');
            filaDetalles.classList.add('filaDetalles');

            // Crea las celdas para Permiso y Nombre
            const permisoCell = document.createElement('td');
            permisoCell.textContent = datosAlumno['Permiso'];
            permisoCell.classList.add('permiso-span');
            filaPermisoNombre.appendChild(permisoCell);

            const nombreCell = document.createElement('td');
            nombreCell.textContent = datosAlumno['Nombre'];
            filaPermisoNombre.appendChild(nombreCell);

            // Crea la fila de detalles con las celdas adicionales
            const detallesCell = document.createElement('td');
            detallesCell.setAttribute('colspan', '15'); // Colspan para ocupar todas las columnas
            const detallesDiv = document.createElement('div');
            detallesDiv.classList.add('detallesAlumno');

            const inputGrid = document.createElement('div');
            inputGrid.classList.add('inputGrid');

            // Itera sobre las claves del objeto datosAlumno, excepto Permiso y Nombre
            for (const key in datosAlumno) {
                if (Object.hasOwnProperty.call(datosAlumno, key) && key !== 'Permiso' && key !== 'Nombre') {
                    const fieldContainer = document.createElement('div');

                    const label = document.createElement('label');
                    label.textContent = `${key}: `;
                    label.classList.add('label');

                    const input = document.createElement('input');
                    input.dataset.key = key; // Para identificar la clave de los datos
                    input.classList.add('datos'); // Agrega la clase para estilos de inputs

                    if (key === 'Cursada' || key === 'Asistencia') {
                        input.type = 'checkbox';
                        input.checked = datosAlumno[key];
                    } else {
                        input.type = 'number';
                        input.value = datosAlumno[key];
                    }

                    // Deshabilitar los campos "Asistencia" y "Porcentaje de asistencia"
                    if (key === 'Asistencia' || key === 'AsistenciaPorcentaje') {
                        label.style.display = 'none';
                        input.type = 'hidden'
                    }

                    // Agrega un evento para guardar los cambios al editar el input
                    input.addEventListener('change', function () {
                        //funcion blur para validar el valor del campo antes de guardarlo
                        input.addEventListener('blur', function() {
                            if (input.value < 0 || input.value > 10) {
                                input.value = 0
                                alert('El valor ingresado no es válido. Debe ser un número entre 0 y 10.');
                            }
                        });
                        if (key === 'Cursada' || key === 'Asistencia') {
                            datosAlumno[key] = input.checked;
                        } else {
                            datosAlumno[key] = input.value;
                        }
                    });

                    fieldContainer.appendChild(label);
                    fieldContainer.appendChild(input);
                    inputGrid.appendChild(fieldContainer);
                }
            }

            detallesDiv.appendChild(inputGrid);

            // Oculta la fila de detalles por defecto
            filaDetalles.style.display = 'none';
            filaDetalles.appendChild(detallesCell);
            detallesCell.appendChild(detallesDiv);

            // Agrega los eventos de clic para expandir y contraer la fila de detalles
            filaPermisoNombre.addEventListener('click', function () {
                if (filaDetalles.style.display === 'none') {
                    filaDetalles.style.display = 'table-row';
                } else {
                    filaDetalles.style.display = 'none';
                }
            });

            tablaAlumnos.appendChild(filaPermisoNombre);
            tablaAlumnos.appendChild(filaDetalles);
        });

        modal.style.display = "block";
    }
}
// funcion para enviar los datos al servidor
const modificarDatosAlumno = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ alumnos: data }),
        });

        if (!response.ok) {
            throw new Error(`Error al enviar los datos modificados al servidor: ${response.status}`);
        }
    } catch (error) {
        alertify
        .alert("¡Muy bien!", "Datos actualizados exitosamente", function(){
        }).set({
            'movable': false,           // Desactiva el movimiento para mantener el diálogo centrado
            'closableByDimmer': false    // Evita que se cierre al hacer clic fuera del cuadro
        })
    }
};