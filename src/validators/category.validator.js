const Joi = require('joi');

const categoryCreateSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
});

module.exports = { categoryCreateSchema };




