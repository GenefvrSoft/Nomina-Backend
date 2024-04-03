import mysql from 'mysql2';
import bcrypt from 'bcrypt';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

import { SaltRounds } from '../../index.js';

export const newUser = (req, res) => {
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

  const { nombre, apellido, user, pass } = req.body;

  var pass_crypt = bcrypt.hashSync(pass, parseInt(SaltRounds));

  let verify = 'SELECT * FROM nomina_database.Usuarios where `username`= ' + `'${user}'`;

  let query = 'INSERT INTO `nomina_database`.`Usuarios` (`nombre`, `apellido`, `username` , `password`) VALUES ';

  query += `('${nombre}', '${apellido}', '${user}', '${pass_crypt}')`;

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
            res.sendStatus(200);
          }
        });
      } else {
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
