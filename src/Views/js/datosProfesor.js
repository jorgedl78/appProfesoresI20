document.addEventListener('DOMContentLoaded', () => {
    const spinner = document.getElementById('spinner');
    const datosBtn = document.getElementById('datosPersonal');
    datosBtn.addEventListener('click', async () => {
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
            alert('El código es undefined. Verifica el valor antes de enviarlo.');
            return;
        }
        const loginData = await cargarProfesor("/profesorDatos", { profesorCodigo: codigo });

        if (loginData && loginData.length > 0) {
            spinner.style.display = 'none';   
            const datoData = loginData;
            datosPagina(datoData);
        } else {
            spinner.style.display = 'none';
            // Manejar el caso en el que no hay datos de personales
            alert('No se encontraron datos de personales.');
        }
    } catch (error) {
        spinner.style.display = 'none';
        alert('Error al conectar con el servidor: ' + error.message);
    }
    })
});
// funcion para enviar los datos al servidor
const cargarProfesor = async (url, data) => {
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
// Guarda los datos en un sessionStorage y redirige a la página de datos
const datosPagina = (data) => {
    try {
        sessionStorage.setItem('datosData', JSON.stringify(data));
        window.location.href = '/html/datos.html';
    } catch (error) {
        console.error('Error al redirigir a la página de datos:', error);
    }
};