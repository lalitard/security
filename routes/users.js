var express = require('express');
var router = express.Router();
/* Módulo jsonwebtoken */
const jwt = require('jsonwebtoken');
/* Módulo crypto */
let crypto = require('crypto');


/* Referencia a los modelos */
const Users = require('../models').users;
const Roles = require('../models').roles;
const UsersRoles = require('../models').users_roles;
const { Op } = require("sequelize");


/* GET users listing. */
router.post('/register', async (req, res,next) => {

  // Parámetros en el cuerpo del requerimiento
  let { name, password, roleName } = req.body;

  try {

      // Encripte la contraseña con SALT
      let salt = process.env.SALT
      let hash = crypto.createHmac('sha512',salt).update(password).digest("base64");
      let passwordHash = salt + "$" + hash

      // Guarde los datos del usuario
      let user = await Users.create({ name: name, password: passwordHash })

      // Obtenga el rol en función del nombre
      let role = await Roles.findOne({ 
        where: { 
          [Op.and]: [
            {name: roleName}
          ]
        } 
      })

      // Cree la relación usuario-rol
      await UsersRoles.create({ users_iduser: user.iduser, roles_idrole: role.idrole })

      // Redirige a la página de registros
      res.redirect('/users')

  } catch (error) {
      res.status(400).send(error)
  }

})
router.get('/', async function(req, res, next) {
  let users = await Users.findAll({ })
  res.render('register', { title: 'User Registration', users: users });
});

module.exports = router;
