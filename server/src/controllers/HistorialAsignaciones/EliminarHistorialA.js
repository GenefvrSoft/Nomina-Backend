import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const EliminarHistorialA = (req, res) => {
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

  const { id_b } = req.body;

  let verify = 'SELECT * FROM nomina_database.historialAsignacion where `id_asignacion`= ' + `'${id_asignacion}'`;

  let DELETE = 'DELETE FROM nomina_database.historialAsignacion where `id_asignacion`= ' + `'${id_asignacion}'`;

  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        conexion.query(DELETE, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('No existe el historial del empleado que estas buscando');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
