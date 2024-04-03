import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const FiltrarHistorialA = (req, res) => {
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
  const {id_empleado} = req.body
  let query = 'SELECT * FROM nomina_database.historialAsignacion WHERE id_empleado = ' + `'${id_empleado}'`;

  conexion.query(query, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else if (result.length == 0) {
      console.log(result);
      conexion.end();
      res.status(400).send({error:'no hay datos'})
    } else {
      conexion.end();
      res.send(result);
    }
  });
};
