document.addEventListener('DOMContentLoaded', async () => {

    const mesasContainer = document.querySelector('.mesasContainer');
    
    const data = JSON.parse(sessionStorage.getItem('finalesData'));

    data.forEach((item) => {

        const detailsMesa = document.createElement('details');
        detailsMesa.className = 'detailsMesa';
        detailsMesa.open = true;

        const summaryMesa = document.createElement('summary');
        summaryMesa.className = 'summaryMesa';

        summaryMesa.innerHTML = `
            <div>
                <div>
                    <p class="pFecha">${item.mesa.Fecha}</p>
                    <p class="pHora">${item.mesa.Hora}</p>
                </div>
                <span class="estudianteIcon">
                    <img src="../images/estudiante.png" alt="estudiante">
                    <p class="pCantidadInscriptos">${item.mesa.Inscriptos}</p>
                </span>
            </div>
            <div>
                <p class="pMateria">${item.mesa.Materia}</p>
                <span class="rotateIcon">
                    <img src="../images/down.png" alt="arrow">
                </span>
            </div>
        `;

        const contenedorMesa = document.createElement('section');
        contenedorMesa.className = 'contenedorMesa';

        contenedorMesa.innerHTML = `
            <table class="tableMesa">
                <tbody>
                    <tr>
                        <td data-label="Carrera">${item.mesa.Carrera}</td>
                        <td data-label="Lugar">${item.mesa.Lugar}</td>
                    </tr>
                </tbody>
            </table>
            <table class="tableAlumnos">
                <thead>
                    <tr>
                        <th class="thPermiso">Perm</th>
                        <th class="thDni">DNI</th>
                        <th>Nombre</th>
                        <th class="thAñoCursada">Año</th>
                    </tr>
                </thead>
                <tbody>
                    ${item.alumnosData.map(alumno => `
                        <tr>
                            <td>${alumno.Permiso}</td>
                            <td>${alumno.Documento}</td>
                            <td class="tdNombreAlumno">${alumno.Nombre}</td>
                            <td>${alumno.Ano}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        detailsMesa.appendChild(summaryMesa);
        detailsMesa.appendChild(contenedorMesa);
        mesasContainer.appendChild(detailsMesa);

    });

    const allDetails = document.querySelectorAll('.detailsMesa');
        
    allDetails.forEach( details => {
        const summary = details.querySelector('.summaryMesa');
        const contenedor = details.querySelector('.contenedorMesa');
    
        contenedor.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita que el evento de clic se propague al padre
        });
        
        summary.addEventListener('click', (event) => {
            event.preventDefault();
            toggleDetails(details, summary, contenedor);
        });
    });

});
//  Rotar el icono y mostrar/ocultar los detalles
const toggleDetails = (details, summary, contenedor) => {
    const span = details.querySelector('.rotateIcon');

    summary.classList.toggle('open');
    span.classList.toggle('open');
    contenedor.classList.toggle('open');

    const transitionEndHandler = () => {
        modifedOverflowY(contenedor);
        contenedor.removeEventListener('transitionend', transitionEndHandler);
    };

    contenedor.addEventListener('transitionend', transitionEndHandler);

    const isOpen = contenedor.classList.contains('open');
    details.setAttribute('aria-expanded', isOpen);
}

const modifedOverflowY = (contenedor) => {
    if (contenedor.classList.contains('open')) {
        var estilos = window.getComputedStyle(contenedor);

        var maxHeight = estilos.getPropertyValue('max-height');

        var height = estilos.getPropertyValue('height');

        if (height >= maxHeight) {
            contenedor.style.overflowY = 'auto';
        }
        else {
            contenedor.style.overflowY = 'hidden';
        }
    }
    else {
        contenedor.style.overflowY = 'hidden';
    }
}
