const mongoose = require("mongoose");
const config = require("./index");
/**
 * Connect to datebase.
 *
 */
const connect = async () => {
  let uri = config.mongodb.uri;
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error("Error al conectar a la BD: retrying in 5 sec", {
      err: err.message,
    });
    setTimeout(connect, 5000);
  }
};

/**
 * Disconnect from datebase.
 *
 */
const disconnect = () => {
  mongoose.connection.close();
};

mongoose.connection.on("disconnected", () => console.log("disconnected"));
mongoose.connection.on("connected", () => console.log("connected"));
mongoose.connection.on("connecting", () => console.log("connecting"));
mongoose.connection.on("disconnecting", () => console.log("disconnecting"));

module.exports = {
  connect,
  disconnect,
  connection: mongoose.connection,
};
