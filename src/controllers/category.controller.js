const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');

exports.getCategories = asyncHandler(async (req, res) => {
  const [defaults, custom] = await Promise.all([
    Category.find({ userId: null }).select('name -_id'),
    Category.find({ userId: req.user.id }).select('name -_id'),
  ]);
  const all = [...defaults, ...custom].map((c) => c.name);
  res.json({ data: all });
});

exports.addCategory = asyncHandler(async (req, res) => {
  const name = req.body.name.trim();
  // Enforce case-insensitive uniqueness per user
  const exists = await Category.findOne({ userId: req.user.id, name: new RegExp(`^${name}$`, 'i') });
  if (exists) return res.status(409).json({ error: { code: 'CONFLICT', message: 'Category already exists' } });

  const created = await Category.create({ userId: req.user.id, name });
  res.status(201).json({ message: 'Category added', name: created.name });
});




