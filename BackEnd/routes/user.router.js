import { Router } from 'express'
import { getAllUser, getUser, updateUser, createUser, deleteUser } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', getAllUser);
userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
