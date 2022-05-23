const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    tareas:[{
        type: Schema.Types.ObjectId,
        ref: 'Tarea'
    }]
});


module.exports = model( 'Usuario', UsuarioSchema );
