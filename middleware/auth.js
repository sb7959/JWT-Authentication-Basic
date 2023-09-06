const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index");
//const { StatusCodes } = require("http-status-codes");

const authMiddleware = async (req, res, next) => {
  console.log(req.headers.authorization);
  const authorisation = req.headers.authorization;

  if (!authorisation || !authorisation.startsWith("Bearer ")) {
    throw new UnauthenticatedError("no token provided");
  }

  const token = authorisation.split(" ")[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("not authorised to access this route");
  }
};

module.exports = authMiddleware;
