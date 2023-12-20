const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING)
    console.log(
      'Database established: ',
      connect.connection.host, // other parameters
      connect.connection.name, // other parameters
    )
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = connectDb;
