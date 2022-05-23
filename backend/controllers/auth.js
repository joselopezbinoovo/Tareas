const bcryptjs = require("bcryptjs");
const { response } = require("express");
const Usuario = require("../models/usuarios");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //Verificar email
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no valido",
      });
    }
    //verificar password

    const Validapassword = bcryptjs.compareSync(password, usuarioDB.password);

    if (!Validapassword) {
      return res.status(404).json({
        ok: false,
        msg: "Contraseña no valida",
      });
    }

    //generar token
    const token = await generarJWT(usuarioDB._id);

    res.json({
      ok: true,
      usuarioDB,
      token
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Habla con el admin",
    });
  }
};


const renewToken = async (req, res = response) => {
  //Funcion que crea un nuveo token a un usuario si este ya ha expirado es decir nos renueva el token

  const _id = req._id; //Id del usuario

  const token = await generarJWT(_id);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  login,
  renewToken,
};
