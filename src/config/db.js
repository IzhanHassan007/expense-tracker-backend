const mongoose = require('mongoose');
const { mongoUri, nodeEnv } = require('./env');

let memoryServer = null;

async function connectToDatabase() {
  mongoose.set('strictQuery', true);

  if (mongoUri) {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log('MongoDB Connected Successfully !!');
    return;
  }

  if (nodeEnv !== 'production') {
    // Lazy-load to avoid dependency if not used
    const { MongoMemoryServer } = require('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    const memUri = memoryServer.getUri();
    await mongoose.connect(memUri);
    console.log('MongoDB Connected Successfully !!');
    return;
  }

  throw new Error('MONGODB_URI is not set');
}

async function disconnectFromDatabase() {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
}

module.exports = { connectToDatabase, disconnectFromDatabase };



