import express from "express"
import { PORT } from './config/env.js'
import userRouter from './routes/user.router.js'
import authRouter from "./routes/auth.router.js";
import connectToDatabase from "./database/mongodb.js";

const server = express();


server.use('/api/v1/user' , userRouter)
server.use("/api/v1/auth", authRouter);


server.listen( PORT , async () => {
  console.log(`UserManager API running on http://localhost:${PORT}`);

  await connectToDatabase();
});


export default server;