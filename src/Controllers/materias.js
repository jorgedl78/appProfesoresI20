const conexion = require('../Database/conexion');

const materiasProfesor = async (req, res) => {
    // Verifica si el cuerpo de la solicitud tiene una propiedad 'profesorCodigo'
    const codigo = req.body.profesorCodigo;

    const querymateria = `SELECT
                        c.Codigo AS Codigo_carrera,
                        c.Nombre AS Nombre_carrera,
                        m.Curso AS Curso,
                        m.Codigo AS Materia_codigo,
                        m.Nombre AS Materia,
                        d.Ano AS Año,
                        d.Division,
                        Count(f.Alumno) as Inscriptos
                    FROM 
                        Personal p,
                        Divisiones d,
                        Materias m,
                        Carreras c,
                        Finales f,
                        Alumnos a
                    WHERE 
                        m.Carrera = c.Codigo
                        AND f.Libre = 0
                        AND m.Codigo = f.Materia
                        AND a.Permiso = f.Alumno
                        AND d.Materia = m.Codigo
                        AND d.Profesor = p.Codigo
                        AND p.Codigo = ${codigo}
                        AND p.Codigo = f.Profesor
                        AND f.Ano = (Select AñoMatriculacion from Parametros)
                        AND d.Ano = (Select AñoMatriculacion from Parametros)
                    GROUP BY 
                        c.Codigo,
                        c.Nombre,
                        m.Curso,
                        m.Codigo,
                        m.Nombre,
                        d.Ano,
                        d.Division
                    ORDER BY 
                        c.Nombre,
                        m.Curso`;

    try {
        const data = await conexion.query(querymateria);

        if (data && data.length > 0) {
            res.json(data).status(200);
        } else {
            res.status(404).json({ error: "No se encontraron materias para el profesor" });
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: "Error en la consulta", details: error.message });
    }
};

module.exports = materiasProfesor;