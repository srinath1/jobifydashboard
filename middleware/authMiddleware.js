import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/CustomError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("authentication invalid");
  }

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "6623c14237d074e04e1ac05d";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};
export const checkFortestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo user only");
  }
  next();
};
export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Not Authorized");
    }

    next();
  };
};
