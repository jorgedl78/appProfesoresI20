// funcion para mostrar o ocultar el div
function toggleDiv() {
    var hiddenDiv = document.getElementById('hidden-div');
    if (hiddenDiv.style.display === 'none' || hiddenDiv.style.display === '') {
        hiddenDiv.style.display = 'block';
    } else {
        hiddenDiv.style.display = 'none';
    }
}