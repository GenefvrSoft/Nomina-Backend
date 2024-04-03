import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const editarAsignacion = (req, res) => {
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

  const { idasignacion, tipo_asignacion, nombre_empleado, monto_asignacion } = req.body;

  let verify = 'SELECT * FROM nomina_database.asignacion where `idasignacion`= ' + `'${idbonificaciones}'`;

  let update =
    'UPDATE nomina_database.asignacion SET `monto_asignacion`= ' +
    `'${monto_asignacion}', ` +
    '`tipo_asignacion`= ' +
    `'${tipo_asignacion}'` +
    '`nombre_empleado`= ' +
    `'${nombre_empleado}'` +
    'where `idasignacion`= ' +
    `'${idasignacion}'`;

  //Verificando la existencia de la Asignacion
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Actualizando la Asignacion
        conexion.query(update, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Asignacion Actualizado
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
