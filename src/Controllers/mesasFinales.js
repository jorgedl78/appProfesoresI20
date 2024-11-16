const conexion = require('../Database/conexion');

const mesasAlumnos = (req, res) => {
  const codigo = req.body.profesorCodigo;
/*
  const mesaQuery = `SELECT Mesas.Numero, Format(Mesas.Fecha, 'dd/mm/yyyy') as Fecha,  Format(Mesas.Hora, 'HH:MM') as Hora, Mesas.Titular as CodigoTitular, Mesas.Impresas, Carreras.Abreviatura as Carrera, Materias.Curso, Materias.Nombre as Materia, Personal.Nombre as Titular, Personal_1.Nombre as Integrante1, Personal_2.Nombre as Integrante2, Mesas.Lugar as Lugar, (SELECT Count(Inscripciones.Alumno) AS Total 
  FROM Inscripciones
  WHERE (((Inscripciones.Mesa)=Mesas.Numero) AND ((Inscripciones.FechaBorrado) Is Null))) as Inscriptos
  FROM (((Mesas INNER JOIN (Materias INNER JOIN Carreras ON Materias.Carrera = Carreras.Codigo) ON Mesas.Materia = Materias.Codigo) INNER JOIN Personal ON Mesas.Titular = Personal.Codigo) INNER JOIN Personal AS Personal_1 ON Mesas.Integrante1 = Personal_1.Codigo) INNER JOIN Personal AS Personal_2 ON Mesas.Integrante2 = Personal_2.Codigo
  WHERE (Personal.Codigo=${codigo} AND Mesas.Turno = (Select TurnoLlamado from Parametros) AND Mesas.Ano= (Select AñoLlamado from Parametros)) OR (Personal_1.Codigo=${codigo} AND Mesas.Turno = (Select TurnoLlamado from Parametros) AND Mesas.Ano=(Select AñoLlamado from Parametros)) OR (Personal_2.Codigo = ${codigo} AND Mesas.Turno = (Select TurnoLlamado from Parametros) AND Mesas.Ano=(Select AñoLlamado from Parametros))
  ORDER BY Mesas.Fecha`;*/
  
  const mesaQuery = `SELECT Mesas.Numero, Format(Mesas.Fecha, 'dd/mm/yyyy') as Fecha,  Format(Mesas.Hora, 'HH:MM') as Hora, Mesas.Titular as CodigoTitular, Mesas.Impresas, Carreras.Abreviatura as Carrera, Materias.Curso, Materias.Nombre as Materia, Personal.Nombre as Titular, Personal_1.Nombre as Integrante1, Personal_2.Nombre as Integrante2, Mesas.Lugar as Lugar, (SELECT Count(Inscripciones.Alumno) AS Total 
  FROM Inscripciones
  WHERE (((Inscripciones.Mesa)=Mesas.Numero) AND ((Inscripciones.FechaBorrado) Is Null))) as Inscriptos
  FROM (((Mesas INNER JOIN (Materias INNER JOIN Carreras ON Materias.Carrera = Carreras.Codigo) ON Mesas.Materia = Materias.Codigo) INNER JOIN Personal ON Mesas.Titular = Personal.Codigo) INNER JOIN Personal AS Personal_1 ON Mesas.Integrante1 = Personal_1.Codigo) INNER JOIN Personal AS Personal_2 ON Mesas.Integrante2 = Personal_2.Codigo
  WHERE (Personal.Codigo=${codigo} AND Mesas.Turno = (12) AND Mesas.Ano= (2024)) OR (Personal_1.Codigo=${codigo} AND Mesas.Turno = (Select TurnoLlamado from Parametros) AND Mesas.Ano=(Select AñoLlamado from Parametros)) OR (Personal_2.Codigo = ${codigo} AND Mesas.Turno = (Select TurnoLlamado from Parametros) AND Mesas.Ano=(Select AñoLlamado from Parametros))
  ORDER BY Mesas.Fecha`;
  
  conexion
    .query(mesaQuery)
    .then((mesaData) => {
      if (mesaData && mesaData.length > 0) {
        res.json(mesaData).status(200);
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