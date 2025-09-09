const mongoose = require("mongoose");

const connectDB = async() =>{
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "MongoDB connected",
      connect.connection.host,
      connect.connection.name,
      connect.connection.port
    );
  } catch (error) {
    console.log(error);
     console.log(
      "MongoDB disconnected")
    process.exit(1);
  }
}
module.exports = connectDB;

