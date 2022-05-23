const { response } = require("express");
const Usuario = require("../models/usuarios");
const Tareas = require("../models/tareas");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
  try {
    const usuario = await Usuario.find().populate("tareas", {
      nombre: 1,
    });
    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "No funciona",
    });
  }
};

const getUsuario = async (req, res) => {
  const _id = req.params.id;
  try {
    //Buscamos el usuario
    const usuario = await Usuario.findById(_id).populate("tareas", {
      nombre: 1,
      descripcion:1
    });
    //Comprobamos is no exisite
    if (!usuario) {
      return res.status(500).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }
    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el admin",
    });
  }
};

const crearUsuarios = async (req, res = response) => {
  const { nombre, email, password, role } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }

    const usuario = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    usuario.save();

    const token = await generarJWT(usuario._id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const Registro = async (req, res = response) => {
  const { nombre, email, password, role } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }

    const usuario = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    usuario.save();
console.log(usuario);
    const token = await generarJWT(usuario._id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const UpdateUsuarios = async (req, res) => {
  try {
    //Buscamos el usuario
    const id = req.body.id; //id que viene de la request
    const usuarioDB = await Usuario.findById(id);
    //Comprobamos is no exisite
    if (!usuarioDB) {
      return res.status(500).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    //Cmapos que le entran por la req
    const { email, ...campos } = req.body;

    //Si el usuario
    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email }); //Verificacion de email
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }
    campos.email = email;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id,campos,{ new: true }
);
    res.json({
      ok: true,
      usuarioActualizado
    }); 
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el admin",
    });
  }
};


const deleteUsuarios = async (req, res) => {
  const id = req.body.id;
  try {
    //Buscamos el usuario
    const usuarioDB = await Usuario.findById(id);
    //Comprobamos is no exisite
    if (!usuarioDB) {
      return res.status(500).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }
    //Si existe borramos
    await Usuario.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Usuario Eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el admin",
    });
  }
};
/*

const tareaAsignada = async (req, res) =>{

  try {

    const _id = req.params.id;
    //Buscamos la tarea
    const tareas = await Tareas.findById(_id);

      const usuario = req.body;

      const asignarUsuario = await Usuario.create(tareas);

      console.log(asignarUsuario);

      const tarea = asignarUsuario.idTarea;
      tarea.push(_id);
      
      const ObjetoTarea = { 
        idTarea:usuario,
        Usuario :asignarUsuario,
    };

      res.status(200).json(ObjetoTarea);

  } catch (error) {
      res.status(500).send('Ha ocurrido un error', error)
  }
} */

module.exports = {
  getUsuarios,
  getUsuario,
  crearUsuarios,
  UpdateUsuarios,
  deleteUsuarios,
  Registro,
};
