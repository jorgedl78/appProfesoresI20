const conexion = require('../Database/conexion');

const alumnoMateria = async (req, res) => {
    const codigoMateria  = req.body.materia;
    const divisionMateria = req.body.division;
   
    const querymateria = `SELECT a.Permiso, 
                        a.Nombre, 
                        f.Parcial1, 
                        f.Parcial2, 
                        f.Totalizador, 
                        f.Recuperatorio1, 
                        f.Recuperatorio2, 
                        f.Practico1, 
                        f.Practico2, 
                        f.Practico3, 
                        f.Practico4, 
                        f.Practico5, 
                        f.Cursada, 
                        f.Asistencia, 
                        f.AsistenciaPorcentaje
                    FROM  
                        Finales f, 
                        Alumnos a,
                        Materias m
                    WHERE 
                        f.Materia = ${codigoMateria} 
                        AND f.Ano = (Select AñoMatriculacion from Parametros)
                        AND f.Libre = 0
                        AND f.Alumno = a.Permiso  
                        AND f.Materia = m.Codigo
                        AND f.Division = ${divisionMateria} 

                        
                    ORDER BY 
                        a.Nombre`;

    try {
        const data = await conexion.query(querymateria);

        if (data && data.length > 0) {
            res.json(data).status(200);
        } else {
            res.status(404).json({ error: "No se encontraron Alumnos" });
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: "Error en la consulta", details: error.message });
    }
};

module.exports = alumnoMateria;

/*
CarrerasHechas
Condicion
AND 
AND a.Permiso = ch.Permiso
AND ch.Condición = c.Codigo 
*/