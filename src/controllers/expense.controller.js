const Expense = require('../models/Expense');
const asyncHandler = require('../utils/asyncHandler');
const { getPagination, buildPaginationMeta } = require('../utils/pagination');

exports.createExpense = asyncHandler(async (req, res) => {
  const payload = { ...req.body, userId: req.user.id };
  const created = await Expense.create(payload);
  res.status(201).json(created);
});

exports.getExpenses = asyncHandler(async (req, res) => {
  const { category, startDate, endDate } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  const filter = { userId: req.user.id };
  if (category) filter.category = category;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  const [items, total] = await Promise.all([
    Expense.find(filter).sort({ date: -1 }).skip(skip).limit(limit),
    Expense.countDocuments(filter),
  ]);

  res.json({ data: items, pagination: buildPaginationMeta(page, limit, total) });
});

exports.updateExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updated = await Expense.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Expense not found' } });
  res.json(updated);
});

exports.deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });
  if (!deleted) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Expense not found' } });
  res.json({ message: 'Expense deleted' });
});




