/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const {validarcampos} = require('../midllewares/validar-campos')
const { validarJWT,ValiarAdmin_Role} = require('../midllewares/validar-token')


const { getUsuarios, crearUsuarios,UpdateUsuarios,deleteUsuarios,getUsuario,Registro} = require('../controllers/usuarios');



const router = Router();


router.get( '/todos/:id', validarJWT,ValiarAdmin_Role, getUsuarios );

router.get( '/miTarea/:id', validarJWT,getUsuario );

router.post( '/create/:id',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    validarcampos,
    ValiarAdmin_Role
], crearUsuarios );

router.post( '/registro',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    validarcampos,
], Registro );


router.put( '/edit/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    validarcampos,
    ValiarAdmin_Role,
], UpdateUsuarios );

router.delete('/delete/:id',validarJWT,ValiarAdmin_Role,deleteUsuarios);

module.exports = router;