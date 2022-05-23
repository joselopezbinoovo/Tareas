const { Schema, model } = require('mongoose');


const TareaSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    usuarioId:[{
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }]
});


module.exports = model( 'Tarea', TareaSchema );
