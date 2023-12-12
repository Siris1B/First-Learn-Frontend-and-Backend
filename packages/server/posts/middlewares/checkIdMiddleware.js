function checkIdMiddleware(schema) {
  return async function checkId(req, res, next) {
    try {
      await schema.validate(req.params, {
        abortEarly: false,
      });
    } catch (e) {
      return res.status(401).send(e.errors);
    }
    next();
  };
}

export default checkIdMiddleware;
