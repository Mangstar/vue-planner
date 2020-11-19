const mongoose = require('mongoose');

let mongoConnection = null;

async function createMongoConnection()
{
  try
  {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
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