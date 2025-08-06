import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const envConfig = {
   NODE_ENV: process.env.NODE_ENV as string,
   PORT: process.env.PORT,
   DATABASE_URL: process.env.DATABASE_URL as string,
   ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
   REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
   ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE,
   REFRESH_TOKEN_EXPIRE: process.env.REFRESH_TOKEN_EXPIRE,
   BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS),
   FRONTEND_URL: process.env.FRONTEND_URL as string,
   STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY as string,
   STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
   STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET as string,
};
