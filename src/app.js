// Configuramos nuestro servidor
require ('dotenv').config()
//const morgan = require('morgan')
const express = require ('express')
const path = require ('path'); // Para concatenar ruta del index.html
const rutas = require('./Router/rutas')
const app = express();


// Configuraciones
app.set('port', process.env.PORT || 3000); // Asignamos un puerto disponible por defecto o puerto 3000.
const port = app.get('port');

// Middlewares (Servicios intermedios)
//app.use(morgan("dev")); //Genera los status y tiempo de respuesta por consola cuando detecta eventos en la página.
app.use(express.json()); //Para interpretar el formato JSON automáticamente (Evitamos especificar el Content-Type="text/json").
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'Views')));

// Rutas (URL´s) con router
app.use('/', rutas);

// Iniciamos el servidor
app.listen(port, ()=>{
});

module.exports = app;