const express = require('express');
const rutas = express.Router();
const controlador = require('../Controllers/controlador');
const { modificarProfesor, cambiarContrasena } = require('../Controllers/profesorModificar');


rutas
    .get('/', controlador.inicio)
    .post('/inicioSesion', controlador.obtenerDatos)
    .post('/materias', controlador.materiasProfesor)
    .post('/alumnoMateria', controlador.alumnoMateria)
    .post('/alumnoModificar', controlador.alumnoModificar)
    .post('/mesasFinales', controlador.mesasAlumnos)
    .post('/finalesAlumno', controlador.AlumnoFinal)
    .post('/profesorDatos', controlador.profesorDatos)
    .post('/profesorModificar', modificarProfesor) // Actualiza datos del profesor
    .post('/profesorCambiarContrasena', cambiarContrasena); // Cambia la contraseña del profesor

module.exports = rutas;
