const inicio = require ('./inicioAplicacion')
const obtenerDatos = require ('./inicioSesion')
const materiasProfesor = require ('./materias')
const alumnoMateria = require ('./alumnoMateria')
const mesasAlumnos = require('./mesasFinales')
const AlumnoFinal = require('./finalesAlumno')
const profesorDatos = require('./profesorDatos')
const modificarProfesor = require('./profesorModificar')
const alumnoModificar = require ('./alumnoModificar')

const controlador = {
    inicio, 
    obtenerDatos,
    materiasProfesor,
    alumnoMateria,
    mesasAlumnos,
    AlumnoFinal,
    profesorDatos,
    modificarProfesor,
    alumnoModificar
}

module.exports = controlador