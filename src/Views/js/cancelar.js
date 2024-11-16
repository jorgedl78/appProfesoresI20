// Cancela la operación de registro de datos
const closeModal = document.getElementById('cancelar-datos')
closeModal.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
});