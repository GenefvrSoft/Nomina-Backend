import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const eliminarAsignacion = (req, res) => {
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

  const { idasignacion } = req.body;

  let verify = 'SELECT * FROM nomina_database.asignacion where `idasignacion`= ' + `'${idasignacion}'`;

  let DELETE = 'DELETE FROM nomina_database.bonificaciones where `idasignacion`= ' + `'${idasignacion}'`;

  //Verificando la existencia de la Asignacion
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Eliminando la Asignacion
        conexion.query(DELETE, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Asignacion Eliminada
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('No existe la Asignacion');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
