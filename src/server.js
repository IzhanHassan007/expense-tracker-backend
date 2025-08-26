const { connectToDatabase } = require('./config/db');
const { port } = require('./config/env');
const app = require('./app');
const { seedDefaultCategoriesIfNeeded } = require('./scripts/seedDefaultsRuntime');

async function start() {
  try {
    await connectToDatabase();
    await seedDefaultCategoriesIfNeeded();

    // Render gives PORT automatically, so prefer process.env.PORT
    const PORT = process.env.PORT || port || 8080;

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

start();
