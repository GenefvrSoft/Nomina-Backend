import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const agregarAsignacion = (req, res) => {
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

  const { tipo_asignacion, monto_asignacion, nombre_empleado } = req.body;

  let verify = 'SELECT * FROM nomina_database.asignacion where `tipo_asignacion`= ' + `'${tipo_asignacion}'`;

  let query = 'INSERT INTO `nomina_database`.`asignacion` (`tipo_asignacion`,`monto_asignacion`,`nombre_empleado` ) VALUES ';

  query += `('${tipo_asignacion}','${monto_asignacion}','${nombre_empleado}')`;

  //Verificando la existencia del tipo de asignacion
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length == 0) {
        //Creando la Asignacion
        conexion.query(query, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Agregando la Asignacion
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('Ya existe la Asignacion');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
