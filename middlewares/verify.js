const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.accessToken;
//   if (!token) return res.status(401).json("You are not logged in ");
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(401).json("Invalid token");
//     } else {
//       req.user = user;
//       next();
//     }
//   });
// };

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  console.log("HJere", token);
  if (!token) return res.status(401).json("You are not logged in");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json("Invalid token");
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = verifyToken;
