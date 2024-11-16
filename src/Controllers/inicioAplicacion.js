const path = require('path'); // Módulo para manejar concatenación de rutas

const inicio = (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Acá enviamos la ruta concatenando con 'path.join'.
};

module.exports = inicio;