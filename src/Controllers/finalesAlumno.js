const conexion = require('../Database/conexion');

const finalesAlumno = (req, res) => {
    try {
        const mesa = req.body.mesa;

        const queryFinal = `SELECT a.Permiso, a.Nombre, a.Documento, a.correo, a.telefono, i.Cursada as Cursada, i.Libre as Libre
                            FROM Inscripciones i, Alumnos a
                            WHERE i.FechaBorrado IS NULL AND i.Mesa = ${mesa} AND i.Alumno = a.Permiso 
                            ORDER BY a.Nombre`;
        conexion.query(queryFinal)
            .then((data) => {
                if (data && data.length > 0) {
                    res.json(data).status(200);
                } else {
                    res.status(404).json({ error: "No se encontraron alumnos disponibles" });
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: "Error en la consulta" });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

module.exports = finalesAlumno;
