const conexion = require('../Database/conexion');

const mesasAlumnos = (req, res) => {
  const codigo = req.body.profesorCodigo;
  const año = new Date().getFullYear();

  const mesaQuery = `SELECT Mesas.Numero, Format(Mesas.Fecha, 'dd/mm/yyyy') as Fecha,  Format(Mesas.Hora, 'HH:MM') as Hora, Mesas.Titular as CodigoTitular, Mesas.Impresas, Carreras.Abreviatura as Carrera, Materias.Curso, Materias.Nombre as Materia, Personal.Nombre as Titular, Personal_1.Nombre as Integrante1, Personal_2.Nombre as Integrante2, Mesas.Lugar as Lugar, (SELECT Count(Inscripciones.Alumno) AS Total 
  FROM Inscripciones
  WHERE (((Inscripciones.Mesa)=Mesas.Numero) AND ((Inscripciones.FechaBorrado) Is Null))) as Inscriptos
  FROM (((Mesas INNER JOIN (Materias INNER JOIN Carreras ON Materias.Carrera = Carreras.Codigo) ON Mesas.Materia = Materias.Codigo) INNER JOIN Personal ON Mesas.Titular = Personal.Codigo) INNER JOIN Personal AS Personal_1 ON Mesas.Integrante1 = Personal_1.Codigo) INNER JOIN Personal AS Personal_2 ON Mesas.Integrante2 = Personal_2.Codigo
  WHERE (Personal.Codigo=${codigo} AND Mesas.Ano=${año}) OR (Personal_1.Codigo=${codigo} AND Mesas.Ano=${año}) OR (Personal_2.Codigo = ${codigo} AND Mesas.Ano=${año})
  ORDER BY Mesas.Fecha`;
  conexion
    .query(mesaQuery)
    .then(async (mesaData) => {
      if (mesaData && mesaData.length > 0) {
        const resultados = [];

        for (const mesa of mesaData) {
          const numeroMesa = mesa.Numero;

          const alumnosQuery = `SELECT Alumnos.Permiso, Alumnos.Nombre, Alumnos.Documento, Finales.Ano, Finales.Division, Finales.Parcial1, Finales.Recuperatorio1, Finales.Parcial2, Finales.Recuperatorio2
          FROM ((Inscripciones INNER JOIN Alumnos ON Inscripciones.Alumno = Alumnos.Permiso) INNER JOIN Mesas ON Inscripciones.Mesa = Mesas.Numero) INNER JOIN Finales ON (Mesas.Materia = Finales.Materia) AND (Alumnos.Permiso = Finales.Alumno)
          WHERE (((Inscripciones.FechaBorrado) Is Null) AND ((Inscripciones.Mesa)=${numeroMesa})) and Finales.Cursada=True Order By Alumnos.Nombre`;

          try {
            const alumnosData = await conexion.query(alumnosQuery);
            resultados.push({ mesa, alumnosData });
          } catch (error) {
            res.status(500).json({ error: `Error en la consulta de alumnos para la mesa ${numeroMesa}` });
            return;
          }
        }
        res.json(resultados).status(200);
      } else {
        res.status(404).json({ error: "No se encontraron mesas disponibles" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error en la consulta de mesas" });
    });
};

module.exports = mesasAlumnos;