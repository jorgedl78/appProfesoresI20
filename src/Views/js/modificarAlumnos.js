const guardarDatosButton = document.getElementById('guardar-datos');
guardarDatosButton.addEventListener('click', async () => {
    const alumnos = datosAlumno();
    console.log(alumnos)
    const modificadoData = await modificarDatosAlumno("/alumnoModificar", alumnos);
    if (modificadoData && modificadoData.length > 0) {
        const datoData = modificadoData;
    }else{
        alert('No se han modificado los datos');
    }

});

function datosAlumno() {
    const tabla = document.getElementById('tablaAlumnos');
    const labels = document.querySelectorAll('label');
    const inputs = document.querySelectorAll('input');
    const alumnosObjeto = {};
    const modal = document.getElementById('modal');
    const codigoMateria = modal.getAttribute('data-codigo-materia');

    tabla.querySelectorAll('tr').forEach(fila => {
        const permisoSpan = fila.querySelector('.permiso-span');
        
        if (permisoSpan) {
            const permiso = permisoSpan.textContent.trim();
            
            alumnosObjeto[permiso] = { Datos: {} };

            labels.forEach((label, index) => {
                const key = label.textContent.trim().slice(0, -1);
                const input = inputs[index];
                let value;

                if (input.type !== 'checkbox') {
                    value = parseFloat(input.value.trim());
                    // Asignar 0 si el valor es NaN o está vacío
                    alumnosObjeto[permiso].Datos[key] = isNaN(value) ? 0 : value;
                } else {
                    // Asignar 'activado' o 'desactivado' en lugar de true o false
                    alumnosObjeto[permiso].Datos[key] = input.checked
                }
            });
            alumnosObjeto[permiso].Datos['codigoMateria'] = codigoMateria;
        }
    });
    return alumnosObjeto;
}

const modificarDatosAlumno = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ alumnosDatos: data }),
        });

        if (!response.ok) {
            throw new Error(`Error al enviar los datos modificados al servidor: ${response.status}`);
        }
    } catch (error) {
        console.error('Error al enviar los datos modificados:', error);
        alert('Ocurrió un error al enviar los datos modificados al servidor');
    }
};