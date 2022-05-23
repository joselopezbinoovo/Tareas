const { Router } = require ( 'express'); 

const {login,renewToken} = require ('../controllers/auth')
const { check } = require('express-validator');
const { validarcampos } = require('../midllewares/validar-campos');
const { validarJWT } = require('../midllewares/validar-token');

const router = Router();

router.post ('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatorio').not().isEmpty(),
    validarcampos
] ,login)

router.get( '/renew',
    validarJWT,
    renewToken
)

module.exports = router; 

