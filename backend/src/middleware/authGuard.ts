import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/CustomError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../config";
import { User } from "../modules/user/user.model";

export const authGuard = (...roles: string[]) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      try {
         if (!token) {
            throw new CustomError(401, "Access token missing");
         }

         const decodeToken = jwt.verify(
            token,
            envConfig.ACCESS_TOKEN_SECRET as string
         ) as JwtPayload;

         const { id, role, exp } = decodeToken;

         // Correct expiration check (exp is in seconds)
         if (exp && exp < Math.floor(Date.now() / 1000)) {
            throw new CustomError(401, "Access token expired");
         }

         const user = await User.findById(id);

         if (!user || user.isDeleted) {
            throw new CustomError(401, "User not found or deleted");
         }

         // Check for required role (authorization)
         if (roles.length && !roles.includes(role)) {
            throw new CustomError(403, "Forbidden: insufficient permissions");
         }

         // Attach user info to request object
         req.user = decodeToken;

         next();
      } catch (error) {
         // Optional: Handle token expiration separately if you want
         if (
            error instanceof Error &&
            (error as any).name === "TokenExpiredError"
         ) {
            next(new CustomError(401, "Access token expired"));
         } else {
            next(error);
         }
      }
   };
};
