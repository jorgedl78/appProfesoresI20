const conexion = require('../Database/conexion');

const modificarProfesor = async (req, res) => {
  
  const {
    codigo,
    nombre,
    documento,
    postal,
    domicilio,
    telefono,
    localidad,

  } = req.body;
  const query = `UPDATE Personal SET Nombre = '${nombre}', Postal = '${postal}', Domicilio = '${domicilio}', Telefono = '${telefono}', Localidad = '${localidad}' WHERE Codigo = ${codigo} AND Documento='${documento}'`;

  conexion
    .query(query)
    .then(data => {
      if (data && data.affectedRows > 0) {
        res.status(200).json({ mensaje: 'Datos actualizados exitosamente' });
      } else {
        res.status(404).json({ error: 'No se encontraron datos para actualizar' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error en la consulta', details: error.message });
    });
};

const cambiarContrasena = async (req, res) => {
    const { codigo, oldPassword, newPassword } = req.body;

    // Verificar que la contraseña actual sea correcta
    const queryCheck = `SELECT Contrasena FROM Personal WHERE Codigo = ${codigo}`;
    const result = await conexion.query(queryCheck);
    
    if (result[0].Contrasena !== oldPassword) {
        return res.status(400).json({ error: 'La contraseña actual no es correcta.' });
    }

    // Actualizar la contraseña
    const queryUpdate = `UPDATE Personal SET Contrasena = '${newPassword}' WHERE Codigo = ${codigo}`;
    conexion.query(queryUpdate)
        .then(() => res.status(200).json({ mensaje: 'Contraseña cambiada exitosamente' }))
        .catch(error => res.status(500).json({ error: 'Error al cambiar la contraseña', details: error.message }));
};
module.exports = { modificarProfesor, cambiarContrasena };