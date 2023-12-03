function createValidatinMiddlevare(schema) {
  return async function validationMiddlevare(req, res, next) {
    try {
      const paramsToValidate = req.method === 'POST' ? req.body : req.params;
      await schema.validate(paramsToValidate, {
        abortEarly: false,
      });
    } catch (e) {
      return res.status(401).send(e.errors);
    }
    next();
  };
}

export default createValidatinMiddlevare;
