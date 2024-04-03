import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import { SaltRounds } from '../../index.js';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const EditarEmpleado = (req, res) => {
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

  const {
    idEmpleado,
    cedula,
    nombre,
    apellido,
    sexo,
	  correo,
    fecha_ingreso,
    estatus,
	  telefono,
    codigo_cargo,
    codigo_departamento,
  } = req.body;

  let verify = 'SELECT * FROM nomina_database.empleado where `idEmpleado`= ' + `'${idEmpleado}'`;

  //let encripted_password = bcrypt.hashSync(pass, parseInt(SaltRounds));

  let update =
    'UPDATE nomina_database.empleados SET `cedula`= ' +
    `'${cedula}'` +
    ',`cedula`= ' +
    `'${nombre}'` +
    ',`nombre`= ' +
    `'${apellido}'` +
    ', `apellido`= ' +
    `'${sexo}'` +
    ', `sexo`= ' +
    `'${correo}'` +
    ', `correo`= ' +
    `'${fecha_ingreso}'` +
    ', `fecha_ingreso`= ' +
    `'${estatus}'` +
    ', `estatus`= ' +
    `'${telefono}'` +
    ', `telefono`= ' +
    `'${codigo_cargo}'` +
    ', `codigo_cargo`= ' +
    `'${codigo_departamento}'` +
    ', `codigo_departamento`= ' +

  //Verificando la existencia del empleado
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Actualizando el empleado
        conexion.query(update, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Empleado Actualizado
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('No existe el empleado');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
