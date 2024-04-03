import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const CrearDeduccion = (req, res) => {
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

  const { monto_deduccion, tipo_deduccion } = req.body;

  let verify = 'SELECT * FROM nomina_database.deduccion where `tipo_deduccion_deduccion`= ' + `'${ tipo_deduccion}'`;

  let query = 'INSERT INTO `nomina_database`.`deduccion` (`monto_deduccion_deduccion`, ` tipo_deduccion_deduccion`) VALUES ';

  query += `('${monto_deduccion}', '${tipo_deduccion}')`;

  //Verificando la existencia de la Deduccion
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length == 0) {
        //Creando la Deduccion
        conexion.query(query, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Agregando la Deduccion
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('Ya existe la Deduccion');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
