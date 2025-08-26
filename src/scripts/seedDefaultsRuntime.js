const Category = require('../models/Category');

const DEFAULTS = ['Food','Transport','Shopping','Bills','Entertainment','Health','Education','Others'];

async function seedDefaultCategoriesIfNeeded() {
  const existingCount = await Category.countDocuments({ userId: null });
  if (existingCount > 0) return;
  const docs = DEFAULTS.map((name) => ({ userId: null, name }));
  await Category.insertMany(docs, { ordered: false });
  console.log('Seeded default categories');
}

module.exports = { seedDefaultCategoriesIfNeeded };
