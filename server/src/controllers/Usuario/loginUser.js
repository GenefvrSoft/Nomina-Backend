import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { token as jwt_hash } from '../../index.js';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const IniciarSesion = (req, res) => {
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

  const { user, pass } = req.body;

  let query = 'SELECT * FROM nomina_database.Usuario where `username`= ' + `'${user}'`;

  conexion.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      if (results.length == 0) {
        res.sendStatus(401);
      } else {
        bcrypt.compare(pass, results[0].password).then((result) => {
          if (result) {
            let token = jwt.sign(
              {
                Usuario: user,
                exp: Date.now() + 60 * 50000,
              },
              jwt_hash
            );
            res.json({
              Usuario: user,
              token: token,
              Status: 200,
            });
          } else {
            res.sendStatus(401);
          }
        });
      }
    }
  });
};
