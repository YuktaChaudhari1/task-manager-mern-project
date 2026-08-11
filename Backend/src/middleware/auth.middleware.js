const jwt = require("jsonwebtoken");

async function middleware(req, res, next) {
  const authHeader = req.headers.authorization;

  let token;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      message: "Token is missing, please login",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = middleware;
