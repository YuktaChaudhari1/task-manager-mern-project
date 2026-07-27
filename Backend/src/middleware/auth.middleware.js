const jwt = require("jsonwebtoken");

async function middleware(req, res, next) {
  const authHeader = req.cookies.token;

  if (!authHeader) {
    return res.status(401).json("token is missing, Please  login");
  }

  const token = authHeader;

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}
module.exports = middleware;
