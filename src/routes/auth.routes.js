const router = require('express').Router();
const validate = require('../middleware/validate');
const { signupSchema, loginSchema } = require('../validators/auth.validator');
const { signup, login } = require('../controllers/auth.controller');

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

module.exports = router;








