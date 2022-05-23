const mongoose = require("mongoose");


const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN); //Variable de entorno donde se encutra el enlce de mongoDB

    console.log("BD online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la BD ver logs");
  }
};
module.exports = {
  dbConnection,
};
