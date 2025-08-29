import express from "express"
import { PORT } from './config/env.js'
import userRouter from './routes/user.router.js'
import authRouter from "./routes/auth.router.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.meddleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import cors from "cors";





const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(arcjetMiddleware);
server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


server.use('/api/v1/users' , userRouter);
server.use("/api/v1/auth", authRouter);
server.use(errorMiddleware)


server.listen( PORT , async () => {
  console.log(`UserManager API running on http://localhost:${PORT}`);

  await connectToDatabase();
});


export default server;