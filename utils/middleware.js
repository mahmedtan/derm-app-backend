//The custom defined middleware are handled here

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }
  next();
};

const errorHandler = (error, req, res, next) => {
  console.log(error.name);

  if (error.name === "ValidationError" || error.name === "ValidatorError") {
    res.status(400).json({ error: error.message }).end();
  }
  if (error.name === "CastError") {
    res.status(404).json({ error: error.message }).end();
  }
  if (error.name === "JsonWebTokenError") {
    res.status(401).json({ error: "token missing or invalid" }).end();
  }

  next(error);
};

module.exports = {
  tokenExtractor,
  errorHandler,
};
