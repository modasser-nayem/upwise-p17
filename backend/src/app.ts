import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./routes";
import notFoundRoute from "./middleware/notFoundRoute";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { envConfig } from "./config";

const app: Application = express();

app.use(cookieParser());
app.use(express.json());

app.use(
   cors({
      origin: [
         envConfig.FRONTEND_URL,
         "https://upwise-edu.vercel.app",
         "http://localhost:3000",
      ],
      credentials: true,
   })
);

app.use("/api/v1", routes);

// Root route
app.get("/", (req, res) => {
   res.send("Server is Running");
});

//not found route handler
app.use(notFoundRoute);

//global error controller/ handler
app.use(globalErrorHandler);

export default app;
