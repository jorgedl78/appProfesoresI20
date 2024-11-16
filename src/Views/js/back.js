// Redirigir a la página de inicio
document.addEventListener('DOMContentLoaded', () => {
    const volver = document.getElementById('volver');
    volver.addEventListener('click', () => {
        window.location.href = '/html/home.html';
    });
});