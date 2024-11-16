const conexion = require('../Database/conexion');

const modificarAlumnos = async (req, res) => {
    const datosAlumnos = req.body.alumnos;

    if (!datosAlumnos || datosAlumnos.length === 0) {
        return res.status(400).json({ error: 'Datos de alumnos no válidos' });
    }
    // Arreglo para almacenar promesas de consultas SQL
    const consultas = [];
    for (const datos of datosAlumnos){
        const codigoMateria = datos.codigoMateria;
        for (const alumno of datos.alumnos){
            const { Permiso, Parcial1, Parcial2, Totalizador, Recuperatorio1, Recuperatorio2, Practico1, Practico2, Practico3, Practico4, Practico5, Cursada, Asistencia } = alumno;

            const query = `
                UPDATE Finales
                SET 
                    Parcial1 = ${Parcial1}, 
                    Parcial2 = ${Parcial2}, 
                    Totalizador = ${Totalizador}, 
                    Recuperatorio1 = ${Recuperatorio1}, 
                    Recuperatorio2 = ${Recuperatorio2}, 
                    Practico1 = ${Practico1}, 
                    Practico2 = ${Practico2}, 
                    Practico3 = ${Practico3}, 
                    Practico4 = ${Practico4}, 
                    Practico5 = ${Practico5}, 
                    Cursada = ${Cursada}, 
                    Asistencia = ${Asistencia}
                WHERE 
                    Alumno = ${Permiso}
                    AND Materia = ${codigoMateria}
                    AND Ano = (SELECT AñoMatriculacion FROM Parametros)
            `;
            consultas.push(conexion.query(query));
        }
    }

    try {
        await Promise.all(consultas);
        res.status(200).json({ mensaje: 'Datos actualizados exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la consulta', details: error.message });
    }
};


module.exports = modificarAlumnos;
