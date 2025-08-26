const router = require('express').Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { expenseCreateSchema, expenseUpdateSchema, expenseListSchema } = require('../validators/expense.validator');
const { createExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expense.controller');

router.use(auth);

router.post('/', validate(expenseCreateSchema), createExpense);
router.get('/', validate(expenseListSchema, 'query'), getExpenses);
router.put('/:id', validate(expenseUpdateSchema), updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;








