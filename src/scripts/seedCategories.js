require('dotenv').config();
const mongoose = require('mongoose');
const { mongoUri } = require('../config/env');
const Category = require('../models/Category');

const DEFAULTS = ['Food','Transport','Shopping','Bills','Entertainment','Health','Education','Others'];

async function run() {
  if (!mongoUri) throw new Error('MONGODB_URI required');
  await mongoose.connect(mongoUri);
  console.log('Seeding default categories...');
  for (const name of DEFAULTS) {
    await Category.updateOne({ userId: null, name }, { $setOnInsert: { userId: null, name } }, { upsert: true });
  }
  console.log('Done.');
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});








