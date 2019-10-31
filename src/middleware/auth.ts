// Imports
import jwt = require("jsonwebtoken");

/**
 * Authorization.
 * @param {req} - containing authorization params included in a bearer token
 * This function will decode the token and add userId and isAuth in header
 */
export function isAuth(req: any, res: any, next: any) {
  // Get Authorization from header
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  // Get token from Authorization header and removing Bearer
  const token = authHeader.split(" ")[1];
  // Decode token to check if user is authorized
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET) as any;
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.userId = decodedToken.userId;
  req.isAuth = true;
  next();
}
