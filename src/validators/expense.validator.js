const Joi = require('joi');

const expenseCreateSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  amount: Joi.number().greater(0).required(),
  category: Joi.string().min(1).required(),
  date: Joi.date().iso().required(),
  notes: Joi.string().max(300).allow('', null),
});

const expenseUpdateSchema = Joi.object({
  title: Joi.string().min(1).max(100),
  amount: Joi.number().greater(0),
  category: Joi.string().min(1),
  date: Joi.date().iso(),
  notes: Joi.string().max(300).allow('', null),
}).min(1);

const expenseListSchema = Joi.object({
  category: Joi.string().min(1).optional(),
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10),
});

module.exports = { expenseCreateSchema, expenseUpdateSchema, expenseListSchema };




