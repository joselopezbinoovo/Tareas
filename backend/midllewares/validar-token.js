const jwt = require("jsonwebtoken");
const Usuario = require('../models/usuarios');

const validarJWT = (req, res, next) => {
  // Leer el Token
  const token = req.headers.authorization;
  var tokenSlice = token.slice(7);
  console.log(token);

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const verify = jwt.verify(tokenSlice, process.env.JWT_SECRET);
    //La id de la reques es la id que yo lei del token
    if (verify) {
      next();
    }
        
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};



const ValiarAdmin_Role = async ( req, res , next)=>{

  try{
    const id = req.params.id
    console.log(req.params)
    console.log(id)
    const user = await Usuario.findById(id)
    console.log(user);
    const admin = "ADMIN_ROLE"; 
    if(user.role != admin) return res.status(401).json('No eres admin')
    next()
  }catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:"No funcionar" 
    })
  }
}

module.exports = {
  validarJWT,ValiarAdmin_Role
  
};
