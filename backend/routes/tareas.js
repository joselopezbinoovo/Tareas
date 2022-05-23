const { Router } = require('express');
const { check } = require('express-validator');
const {validarcampos} = require('../midllewares/validar-campos')


const { getTareas,getTarea,crearTareas,updateTareas,deleteTareas,asignar,asignacion} = require('../controllers/tareas');
const { validarJWT,ValiarAdmin_Role } = require('../midllewares/validar-token');


const router = Router();

router.get('/:id', validarJWT,ValiarAdmin_Role, getTareas);

router.get('/:id',validarJWT,getTarea);

router.post('/create/:id',[
    validarJWT,
    check("nombre",'El nombre de la tarea es necesario').not().isEmpty(),ValiarAdmin_Role,
    validarcampos
],crearTareas);


router.put('/update/:id',[
    validarJWT,
    check("nombre",'El nombre de la tarea es necesario').not().isEmpty(),ValiarAdmin_Role,validarcampos
],updateTareas);

router.put('/asignacion/:id',[validarJWT,validarcampos],asignacion);



router.post('/asignar/:id',[
    validarJWT,ValiarAdmin_Role,validarcampos
],asignar);

router.delete('/delete/:id',validarJWT,ValiarAdmin_Role,deleteTareas);


module.exports = router;