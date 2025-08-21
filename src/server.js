const { connectToDatabase } = require('./config/db');
const { port } = require('./config/env');
const app = require('./app');

async function start() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server listening on PORT:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();



