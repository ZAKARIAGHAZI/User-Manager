import { Router } from 'express'
import { getUsers, getUser, updateUser, createUser, deleteUser } from '../controllers/user.controller.js';
import authorize  from '../middlewares/auth.middleware.js';
const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get("/:id",authorize, getUser);
userRouter.put("/:id", updateUser);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
