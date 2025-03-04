import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {

  console.log('token iss res', req.cookies)

  const token = req.cookies.access_token;

  console.log('access token is', token)

  if (!token) return next(errorHandler(401, 'Unauthorized'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(errorHandler(403, 'Forbidden'));

      req.user = user;
      next();
    })
};

export const verifyAdmin = (req, res, next) => {
  console.log('req.user:', req.user);

  if (!req.user || req.user.status !== "admin") {
    return res.status(403).json({ message: "Access denied." });
  }
  next();
};