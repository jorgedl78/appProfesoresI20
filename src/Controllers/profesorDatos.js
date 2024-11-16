const conexion = require('../Database/conexion');

const profesorDatos = (req, res) => {
    const codigo = req.body.profesorCodigo;

    const query = `SELECT Nombre, Documento, Postal, Domicilio, Telefono, Localidad, Contrasena FROM Personal WHERE Codigo= ${codigo}`;

    conexion
        .query(query)
        .then(data => {
            if (data && data.length > 0) {
                res.json(data).status(200)
            } else {
                res.status(401).json({ error: "Credenciales incorrectas" });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "Error en la consulta" });
        });
};

module.exports = profesorDatos;
