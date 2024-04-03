import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const ListarEmpleado = (req, res) => {
  var conexion = mysql.createConnection({
    host: host,
    port: port,
    user: username,
    password: password,
    multipleStatements: true,
  });

  conexion.connect(function (err) {
    if (err) {
      console.error('Error de conexion: ' + err.stack);
      return;
    }
  });

  let query = `SELECT E.idEmpleado,
	E.cedula,
	E.nombre,
	E.apellido,
  E.sexo,
	E.correo,
  E.fecha_ingreso,
  E.estatus,
	E.telefono,
  E.codigo_cargo,
  E.codigo_departamento,
FROM nomina_database.empleados E,
nomina_database.cargos c,
nomina_database.departamentos d,
nomina_database.Empresas em
where c.idcargos = E.codigo_cargo
and d.iddepartamentos = E.codigo_departamento
and em.idEmpresas = E.codigo_empresa`;

  //Verificando la existencia del empleado
  conexion.query(query, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else if (result.length == 0) {
      //La Tabla de empleado no tiene datos
      console.log(result);
      conexion.end();
      res.status(400).send({ error: 'no hay datos' });
    } else {
      //Empleado Listado
      conexion.end();
      res.send(result);
    }
  });
};
