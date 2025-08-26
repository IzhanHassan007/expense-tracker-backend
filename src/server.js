const { connectToDatabase } = require('./config/db');
const { port } = require('./config/env');
const app = require('./app');
const { seedDefaultCategoriesIfNeeded } = require('./scripts/seedDefaultsRuntime');

async function start() {
  try {
    // Connect DB
    await connectToDatabase();

    // Seed categories if missing
    await seedDefaultCategoriesIfNeeded();

    // Render gives PORT automatically, fallback to .env or 8080
    const PORT = process.env.PORT || port || 8080;

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
