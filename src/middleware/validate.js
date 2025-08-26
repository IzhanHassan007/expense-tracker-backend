function validate(schema, property = 'body') {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], { abortEarly: false, stripUnknown: true });
    if (error) {
      const details = error.details.map((d) => ({ field: d.path.join('.'), issue: d.message }));
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details } });
    }
    req[property] = value;
    next();
  };
}

module.exports = validate;








