import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

import {EliminarVacaciones} from '../vacaciones/eliminar_vacaciones.js'

export const EliminarEmpleado = (req, res) => {
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
  const { idEmpleado } = req.body;

  let verify = 'SELECT * FROM nomina_database.empleado where `idEmpleado`= ' + `'${idEmpleado}'`;

  let DELETE = 'DELETE FROM nomina_database.empleado where `idEmpleado`= ' + `'${idEmpleado}'`;

  //Verificando la existencia del Empleado
  conexion.query(verify, (err, result) => {
    
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Eliminando el Empleado
        conexion.query(DELETE, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Empleado Eliminado
            console.log(results);
            conexion.end();
            EliminarVacaciones(idEmpleados);
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
