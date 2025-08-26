const router = require('express').Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { categoryCreateSchema } = require('../validators/category.validator');
const { getCategories, addCategory } = require('../controllers/category.controller');

router.use(auth);

router.get('/', getCategories);
router.post('/', validate(categoryCreateSchema), addCategory);

module.exports = router;








