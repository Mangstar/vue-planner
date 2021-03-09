const mongoose = require('mongoose');

let mongoConnection;

async function createMongoConnection()
{
  try
  {
    const connection = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    return connection;
  } catch (err)
  {
    console.error(err);
  }
}

module.exports = async function getMongoConnection ()
{
  if (!mongoConnection)
  {
    mongoConnection = await createMongoConnection();
  }

  return mongoConnection;
}