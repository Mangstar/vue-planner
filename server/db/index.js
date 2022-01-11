const mongoose = require('mongoose');

let mongoConnection;

async function createMongoConnection() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = async function getMongoConnection () {
  if (!mongoConnection) {
    mongoConnection = await createMongoConnection();
  }

  return mongoConnection;
}
