import { Router } from 'express'
import { getUsers, getUser, updateUser, createUser, deleteUser } from '../controllers/user.controller.js';
import {authorize, isAdmin}  from '../middlewares/auth.middleware.js';
const userRouter = Router();

userRouter.get('/', authorize, isAdmin, getUsers);
userRouter.get("/:id", authorize, getUser);
userRouter.put("/:id", authorize, updateUser);
userRouter.post("/", authorize, createUser);
userRouter.delete("/:id", authorize, deleteUser);

export default userRouter;
