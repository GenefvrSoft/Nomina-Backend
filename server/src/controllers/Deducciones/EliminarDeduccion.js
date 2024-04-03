import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const EliminarDeduccion = (req, res) => {
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

  const { iddeduccion } = req.body;

  let verify = 'SELECT * FROM nomina_database.deduccion where `iddeduccion`= ' + `'${iddeduccion}'`;

  let DELETE = 'DELETE FROM nomina_database.deduccion where `iddeduccion`= ' + `'${iddeduccion}'`;

  //Verificando la existencia de la Deduccion
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Eliminando la Deduccion
        conexion.query(DELETE, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Deduccion Eliminada
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('No existe la Deduccion');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
