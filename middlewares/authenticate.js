const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(new HttpError(401, "Not authorized"));
  }

  jwt.verify(token, SECRET_KEY, async (err, decode) => {
    if (err) {
      if (
        err.name === "TokenExpiredError" ||
        err.name === "JsonWebTokenError"
      ) {
        return res.status(401).json({ error: "Token Error" });
      }

      return next(err);
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY);

      const user = await User.findById(id);
      if (!user || !user.token || user.token !== token) {
        return next(new HttpError(401, "Not authorized"));
      }

      req.user = user;
      next();
    } catch (error) {
      return next(new HttpError(401, "Not authorized"));
    }
  });
};

module.exports = authenticate;
