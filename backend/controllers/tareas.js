const { response } = require("express");
const Tareas = require("../models/tareas");
const Usuario = require("../models/usuarios");

const getTareas = async (req, res = response) => {
  const tareas = await Tareas.find({}).populate("usuarioId", {
    nombre: 1,
    _id: 1,
  });
  res.json({
    ok: true,
    tareas,
  });
};

const getTarea = async (req, res) => {
  const id = req.params.id;
  try {
    const tareas = await Tareas.findById(id);

    if (!tareas) {
      return res.status(400).json({
        ok: false,
        msg: "Tarea no encontrado",
      });
    }
    res.json({
      ok: true,
      tareas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const crearTareas = async (req, res = response) => {
  try {
    const tarea = new Tareas({
      ...req.body,
    });

    const tareaDB = await tarea.save();

    res.json({
      ok: true,
      tarea: tareaDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const updateTareas = async (req, res = response) => {
  try {
    const id = req.body.id;
    const existeTarea = await Tareas.findById(id);
    console.log(id);
    console.log(existeTarea);

    if (!existeTarea) {
      return res.status(400).json({
        ok: false,
        msg: "Tarea no encontrada",
      });
    }

    const cambiosTareeas = req.body;

    const tareasActualizada = await Tareas.findByIdAndUpdate(
      id,
      cambiosTareeas,
      { new: true }
    );

    res.json({
      ok: true,
      msg: "ActualizarTatrea",
      tareasActualizada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const deleteTareas = async (req, res = response) => {
  const id = req.body.id;

  try {
    const tareas = await Tareas.findById(id);

    if (!tareas) {
      return res.status(400).json({
        ok: false,
        msg: "Tarea no encontrado",
      });
    }
    await Tareas.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Tarea Eliminada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const asignar = async (req, res = response) => {
  try {
    const id = req.body.id;
    const existeTarea = await Tareas.findById(id);
    console.log(id);
    console.log(existeTarea);

    if (!existeTarea) {
      return res.status(400).json({
        ok: false,
        msg: "Tarea no encontrada",
      });
    }

    const cambiosTareeas = req.body;

    const tareasActualizada = await Tareas.findByIdAndUpdate(
      id,
      cambiosTareeas,
      { new: true }
    );

    res.json({
      ok: true,
      msg: "Tarea Asignada",
      tareasActualizada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};


const asignacion = async (req, res = response) => {
  
    try {
      
      const idUser = req.body.id;
      const usuarioDB = await Usuario.findById(idUser);
      console.log(idUser);

      const id = req.params.id;
      const tareaId = await Tareas.findById(id);

      if (!tareaId) {
        return res.status(400).json({
          ok: false,
          msg: "Tarea no encontrada",
        });
      }
  
  
      const tarea = { 
          usuarioId:usuarioDB._id
        };
  
        const tareaDB = await tarea.findByIdAndUpdate(id, tarea, {new:true} );
        usuarioDB.tareas = usuarioDB.tareas.concat(tareaDB._id);
        await usuarioDB.save();
        res.json({
            ok: true,
            tarea: tareaDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
};

module.exports = {
  getTareas,
  getTarea,
  crearTareas,
  updateTareas,
  deleteTareas,
  asignar,
  asignacion
};
