import { Router } from 'express'

const userRouter = Router();

userRouter.get('/',getAllUser());
userRouter.get("/:id", getUser());
userRouter.put("/:id", updateUser());
userRouter.post("/", createUser());
userRouter.delete("/:i", deleteUser());

export default userRouter;
