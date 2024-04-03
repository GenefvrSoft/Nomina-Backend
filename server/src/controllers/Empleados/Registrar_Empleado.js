import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import { SaltRounds } from '../../index.js';
import {AgregarVacaciones} from '../vacaciones/agregar_vacaciones.js'

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const Crear_Empleado = (req, res) => {
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

  const fecha = new Date();
  const antiguedad = `${fecha.getFullYear()}-` + `${fecha.getMonth() + 1}-` + `${fecha.getDate()}`;

  let verify = 'SELECT * FROM nomina_database.empleado where `cedula`= ' + `'${cedula}'`;

  

  //let encripted_password = bcrypt.hashSync(pass, parseInt(SaltRounds));

  let query =
    'INSERT INTO `nomina_database`.`empleado` (`cedula`, `nombre`, `apellido`, `fecha_ingreso`, `sexo`, `correo`, `telefono`, `codigo_cargo`, `codigo_departamento`, `estatus` ) VALUES ';

  query += `('${cedula}', '${nombre}', '${apellido}', '${fecha_ingreso}', '${sexo}', '${correo}', '${telefono}', '${codigo_cargo}', '${codigo_departamento}', '${estatus}')`;

  //Verificar la Existencia del Empleado
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length == 0) {
        conexion.query(query, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            console.log(results);
            conexion.end();
            AgregarVacaciones(results.insertId, nombre, apellido)
            res.sendStatus(200);
          }
        });
      } else {
        console.log('Ya existe el cargo');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
